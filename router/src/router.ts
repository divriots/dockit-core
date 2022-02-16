let initialPageStateSet: boolean;

export function installRouter() {
  initialPageStateSet = false;
  document.body.addEventListener('click', (e) => onClick(e));
  window.addEventListener('popstate', (e) => onPopState(e));
}

async function onClick(event: MouseEvent) {
  const link = event
    .composedPath()
    .find((e) => (e as HTMLElement).nodeName === 'A') as HTMLAnchorElement;
  if (link && link.hasAttribute('data-page-render-doc-url')) {
    if (!initialPageStateSet) {
      saveInitialPageState();
      initialPageStateSet = true;
    }
    event.preventDefault();
    const renderDocUrl = convertRelativeToAbsolute(
      link.getAttribute('data-page-render-doc-url')
    );
    const renderDoc = (await import(renderDocUrl))
      .default as () => Promise<void>;
    history.pushState({ renderDocUrl }, document.title, link.href);
    renderDoc();
    window.scrollTo(0, 0);
  }
}

async function onPopState(event: PopStateEvent) {
  const { renderDocUrl } = event.state;
  const renderDoc = (await import(renderDocUrl)).default as () => Promise<void>;
  renderDoc();
}

function saveInitialPageState() {
  const element = document.querySelector('[data-current-page-render-doc-url]');
  if (element) {
    const renderDocUrl = convertRelativeToAbsolute(
      element.getAttribute('data-current-page-render-doc-url')
    );
    history.replaceState({ renderDocUrl }, document.title, location.href);
  }
}

function convertRelativeToAbsolute(url: string): string {
  const a = document.createElement('a');
  a.href = url;
  return a.href;
}
