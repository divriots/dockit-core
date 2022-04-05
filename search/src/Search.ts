import { LitElement, css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './Search.scss';

const beforeHitMatch = 20;
const afterHitMatch = beforeHitMatch;
const markChar = '\0';

export class SearchBox extends LitElement {
  search = null;
  hits = null;
  keydownListener = null;

  connectedCallback() {
    super.connectedCallback();
    this.keydownListener = (e: Event) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.updateHits();
      } else if (e.key === 'Escape') this.hideHits();
    };
    addEventListener('keydown', this.keydownListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(this.keydownListener);
  }

  render() {
    return html`<div>
      <form action="" role="search" novalidate="">
        <label aria-label="Search">
          <input
            aria-autocomplete="list"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            maxlength="64"
            type="search"
            enterkeyhint="go"
            placeholder=${this.placeHolder}
            @input=${(e: { target: { value: string } }) =>
              this.updateHits(e.target.value)}
            @focus=${(e: { target: { value: string } }) =>
              this.updateHits(e.target.value)}
          />
        </label>
      </form>
      <ul class="hits">
        ${this.hits === null
          ? html`<li><i>Type for searching...</i></li>`
          : this.hits.length === 0
          ? html`<li><i>No match found</i></li>`
          : this.hits.map(
              (hit) =>
                html`<li>
                  <a href="${hit.id}" @click=${this.hideHits}>
                    ${unsafeHTML(this.hitHTML(hit))}
                  </a>
                </li>`
            )}
      </ul>
      <div class="overlay" @click=${this.hideHits}></div>
    </div>`;
  }

  hitHTML(hit) {
    return `
      <header>
        ${hit.headline}
        <span class="tags">
          ${hit.title ? `<span>${hit.title}</span>` : ''}
          ${hit.section ? `<span>${hit.section}</span>` : ''}
        </span>
      </header>
      ${hit.body ? `<pre class="content">${hit.body}</pre>` : ''}`;
  }

  async updateHits(searchValue?: string) {
    if (!searchValue) {
      this.hits = null;
    } else {
      this.hits = (await this.search?.(searchValue))
        .filter(Boolean)
        .slice(0, 10)
        .map(this.mark)
        .map((hit) => {
          hit.headline = this.highlight(hit.headline) || hit.headline;
          hit.body = this.highlight(hit.body) || ' ';
          return hit;
        });
    }
    this.searchOverlay.style.display = 'block';
    this.searchHits.style.display = 'block';
    this.searchInput.focus();
    this.searchInput.placeholder = '';
    this.requestUpdate();
  }

  mark(hit) {
    for (const t of hit.terms.sort((a, b) => b.length - a.length))
      for (const m of hit.match[t])
        hit[m] = hit[m]
          .replace(new RegExp(`([^\0]?)(${t})([^\0]?)`, 'gi'), '$1\0$2\0$3')
          .replace(/</gm, '&lt;')
          .replace(/>/gm, '&gt;');
    return hit;
  }

  highlight(content: string) {
    const first = content.indexOf(markChar);
    if (first >= 0) {
      const last = content.lastIndexOf(markChar);
      const start = Math.max(0, first - beforeHitMatch);
      const end = Math.min(
        Math.max(last, first) + afterHitMatch,
        content.length
      );
      content =
        (start > 0 ? '...' : '') +
        content.slice(start, end) +
        (end < content.length - 1 ? '...' : '');
      return content.replace(
        /\0(.*?)\0/g,
        '<strong class="highlight">$1</strong>'
      );
    }
  }

  hideHits() {
    this.searchHits.style.display = 'none';
    this.searchOverlay.style.display = 'none';
    this.searchInput.value = '';
    this.searchInput.placeholder = this.placeHolder;
  }

  get placeHolder() {
    return window.navigator.platform === 'MacIntel' ? '⌘K' : 'Ctrl+K';
  }

  get searchInput(): HTMLInputElement {
    return this.shadowRoot.querySelector('input[type="search"]');
  }

  get searchHits(): HTMLUListElement {
    return this.shadowRoot.querySelector('.hits');
  }

  get searchOverlay(): HTMLDivElement {
    return this.shadowRoot.querySelector('.overlay');
  }

  static get styles() {
    return unsafeCSS(styles);
  }
}
