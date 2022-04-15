import { SearchBox } from './src/Search.ts';

customElements.define('dockit-search', SearchBox);

// deprecated
customElements.define('doc-search', class extends SearchBox {});
