import type { BuildContext } from '@divriots/studio-doc-compiler';
import MiniSearch from 'minisearch';

const miniSearch = new MiniSearch({
  fields: ['title', 'headline', 'body', 'section'], // fields to index for full-text search
  storeFields: ['title', 'headline', 'body', 'section'], // fields to return with search results
  searchOptions: {
    boost: { headline: 4, title: 3, section: 2 },
    fuzzy: 0.2,
    prefix: true,
  },
});

const docBlocks = new Map();
function indexDoc(content: string, { url, input: file, title, section, base }) {
  if (docBlocks.has(file)) miniSearch.removeAll(docBlocks.get(file));
  let heading: RegExpExecArray;
  const headingRE = /^\n?(#*)\s+(.*)\n\n([^#]*)/gm;
  const blocks = [];
  while ((heading = headingRE.exec(content))) {
    const [, level, headline, body] = heading;
    let id = base + url;
    if (level.length > 1) id += `#${headline.toLowerCase()}`;
    blocks.push({ id, title, section, headline, body });
  }
  docBlocks.set(file, blocks);
  miniSearch.addAll(blocks);
}

export const search = async (
  searchValue: string,
  { pages, base }: BuildContext
) => {
  if (docBlocks.size === 0)
    for (const { data, content, ...rest } of pages)
      indexDoc(content, { base, ...data, ...rest });
  return miniSearch.search(searchValue);
};
