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
function indexDoc(content: string, { file, title, section, base }) {
  if (docBlocks.has(file)) miniSearch.removeAll(docBlocks.get(file));
  let heading: RegExpExecArray;
  const headingRE = /^\n?(#*)\s+(.*)\n\n([^#]*)/gm;
  const blocks = [];
  while ((heading = headingRE.exec(content))) {
    const [, level, headline, body] = heading;
    let url = base + file;
    if (level.length > 1) url += `#${headline.toLowerCase()}`;
    blocks.push({ id: url, title, section, headline, body });
  }
  docBlocks.set(file, blocks);
  miniSearch.addAll(blocks);
}

export const search = async (searchValue: string, docs: string[]) => {
  if (docBlocks.size === 0) {
    await Promise.all(
      docs.map((p) =>
        Promise.all([import(p + '?raw'), import(p + '?docmeta')]).then(
          ([{ default: content }, meta]) => indexDoc(content, meta)
        )
      )
    );
  }
  return miniSearch.search(searchValue);
};
