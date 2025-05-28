function ParallelDocuments(id, rawContent = [], margin, raw = false) {

  this.doesSourceHaveInclusions = rawContent.some(x => x.doc);

  // Should have the same definition as in `backend/hyperglosae/src/lib/links.js`
  const parseText = (text) => {
    if (!text) return [];
    const PASSAGE = /{([^{]+)} ([^{]*)/g;
    let passages = [...text.matchAll(PASSAGE)];
    passages = (passages.length) ? passages : [[null, '0', text]];
    return passages.map(([_, rubric, passage]) => ({
      rubric,
      passage,
      parsed_rubric: rubric.match(/(?:(\d+)[:., ])?(\d+) ?([a-z]?)/)
        .slice(1)
        .filter(x => !!x)
        .map(x => {
          let n = Number(x) ;
          return Number.isNaN(n) ? x : n;
        })
    }));
  };

  const content = rawContent
    .filter(
      x => [x.id, x.value.isPartOf].includes(id) || margin && [x.id, x.value.isPartOf].includes(margin)
    )
    .map(({id, key, value, doc}) => (doc)
      ? parseText(doc.text).map(
        ({parsed_rubric, passage, rubric}) => ({
          key: [key[0], ...parsed_rubric],
          value: {...value, text: passage, rubric, _id: null},
          ...doc.dc_title && {doc}
        }))
      : ({id, key, value})
    )
    .flat()
    .sort((a, b) => a.key[1] - b.key[1]);

  const hasRubrics = (doc_id) =>
    content.some(x => x.value.rubric !== '0' && x.value.isPartOf === doc_id && x.value.text);

  this.doesSourceHaveRubrics = hasRubrics(id);

  this.doesMarginHaveRubrics = hasRubrics(margin);

  const getCaption = ({dc_title, dc_spatial}) => [dc_title, dc_spatial].filter(Boolean).join(', ');

  const getText = ({doc, value}) => {
    let includedImage = (value.inclusion !== 'whole' ? '#' + value.inclusion : '')
      + ` "${doc ? getCaption(doc) : ''}"`;
    let imageReference = /!\[[^\]]*\]\([^)]+/;
    return value.text?.replace(imageReference, '$&' + includedImage);
  };

  this.isFromScratch = id === margin;

  const shouldBeAligned = !raw
    && this.doesSourceHaveRubrics
    && (!margin || this.doesMarginHaveRubrics);

  const xor = (x, y) => x !== y;

  this.passages = content.reduce(({whole, part}, x, i, {length}) => {
    if (part.rubric && x.value.rubric !== part.rubric) {
      whole.push(part);
      part = {source: [], scholia: []};
    }
    if (shouldBeAligned) {
      part.rubric = x.value.rubric;
    }
    let text = getText(x);
    if (text) {
      let isPartOf = x.value.isPartOf;
      if (!this.isFromScratch && isPartOf === id) {
        part.source.push(text);
      }
      if (xor(!this.isFromScratch, isPartOf === id)) {
        if (!raw || !part.scholia.length || part.scholia[part.scholia.length - 1].id !== x.id) {
          let rubric = x.value.rubric;
          part.scholia.push({id: x.id, text, isPartOf, ...(rubric !== '0' && {rubric})});
        }
      }
    }
    if (i === length - 1) {
      return [...whole, part];
    }
    return {whole, part};
  }, {whole: [], part: {source: [], scholia: []}});
  this.passages = Array.isArray(this.passages) ? this.passages : [];

  return this;
}

export default ParallelDocuments;
