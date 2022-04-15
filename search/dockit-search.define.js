import { Search } from './src/Search.ts';

customElements.define('dockit-search', Search);

// deprecated
customElements.define('doc-search', class extends Search {});
