export interface SpeedyLinksOptions {
  mapLinkUrlToModuleUrl: (
    url: string
  ) => string | undefined | Promise<string | undefined>;
  linkSelector?: string;
  moduleExecutor?: (module: any) => Promise<void>;
}

let teardownSpeedyLinks: undefined | VoidFunction;
let opts: SpeedyLinksOptions;
let linkSelector: string;
const modulesCache = {};

export function setupSpeedyLinks(options: SpeedyLinksOptions): VoidFunction {
  if (teardownSpeedyLinks) {
    return teardownSpeedyLinks;
  }
  opts = options;
  linkSelector = opts.linkSelector ? opts.linkSelector : 'a';
  document.body.addEventListener('click', onClick);
  window.addEventListener('popstate', onPopState);
  teardownSpeedyLinks = () => {
    teardownSpeedyLinks = undefined;
    document.body.removeEventListener('click', onClick);
    window.removeEventListener('popstate', onPopState);
  };
  return teardownSpeedyLinks;
}

async function onClick(event: MouseEvent): Promise<void> {
  const link = event
    .composedPath()
    .find(
      (e) => e instanceof HTMLElement && e.matches(linkSelector)
    ) as HTMLAnchorElement;
  if (link && link.href) {
    const url = link.href;
    const hash = new URL(url).hash;

    if (isDifferentOriginUrl(url)) {
      return;
    }

    event.preventDefault();

    if (isSamePageUrl(url)) {
      if (url !== location.href) {
        pushNewUrlToHistory(url);
      }
      tryScrollToHashOrResetScroll(hash);
    } else {
      pushNewUrlToHistory(url);
      await renderPage(url);
      tryScrollToHashOrResetScroll(hash);
    }
  }
}

async function onPopState(): Promise<void> {
  await renderPage(location.href);
}

function isDifferentOriginUrl(url: string): boolean {
  return new URL(url).origin !== location.origin;
}

function isSamePageUrl(url: string): boolean {
  return removeHash(url) === removeHash(location.href);
}

function pushNewUrlToHistory(url: string): void {
  history.pushState({}, document.title, url);
}

function tryScrollToHashOrResetScroll(hash?: string): void {
  let hashEl;
  if (hash) {
    try {
      hashEl = document.querySelector(hash);
    } catch {}
  }
  if (hashEl) {
    hashEl.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

async function renderPage(url: string): Promise<void> {
  const urlWithoutHash = removeHash(url);
  let module = modulesCache[urlWithoutHash];
  if (!module) {
    const moduleUrl = await opts.mapLinkUrlToModuleUrl(urlWithoutHash);
    if (!moduleUrl) {
      location.href = url;
      return;
    }
    module = await import(moduleUrl);
    modulesCache[urlWithoutHash] = module;
  }
  try {
    if (opts.moduleExecutor) {
      await opts.moduleExecutor(module);
    } else {
      const render = module.default as () => Promise<void>;
      await render();
    }
  } catch (e) {
    location.href = url;
  }
}

function removeHash(url: string): string {
  return url.split('#')[0];
}
