import type { Context } from '@divriots/studio-doc-compiler';
import MiniSearch from 'minisearch';

interface SearchDocument {
  id: string;
  title: string;
  section: string;
  headline: string;
  body: string;
}

const miniSearch = new MiniSearch<SearchDocument>({
  fields: ['title', 'headline', 'body', 'section'], // fields to index for full-text search
  storeFields: ['title', 'headline', 'body', 'section'], // fields to return with search results
  searchOptions: {
    boost: { headline: 4, title: 3, section: 2 },
    fuzzy: 0.2,
    prefix: true,
  },
});

const searchDocuments = new Map();
function indexDoc(
  content: string,
  {
    url,
    input: file,
    base,
    title,
    section,
  }: {
    url: string;
    input: string;
    base: string;
    title: string;
    section: string;
  }
) {
  if (searchDocuments.has(file)) {
    miniSearch.removeAll(searchDocuments.get(file));
  }
  let heading: RegExpExecArray | null;
  const headingRE = /^\n?(#*)\s+(.*)\n\n([^#]*)/gm;
  const documents: SearchDocument[] = [];
  while ((heading = headingRE.exec(content))) {
    const [, level, headline, body] = heading;
    let id = base + url;
    if (level.length > 1) id += `#${headline.toLowerCase()}`;
    documents.push({ id, title, section, headline, body });
  }
  searchDocuments.set(file, documents);
  miniSearch.addAll(documents);
}

export const search = async (searchValue: string, { pages, base }: Context) => {
  if (searchDocuments.size === 0)
    for (const { content, url, input, data } of pages)
      indexDoc(content, {
        url,
        input,
        base,
        title: data.title as string,
        section: data.section as string,
      });
  return miniSearch.search(searchValue);
};
