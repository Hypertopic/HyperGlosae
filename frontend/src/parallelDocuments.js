function ParallelDocuments(id, content = [], margin, raw = false) {

  const filteredContent = content.filter(
    x => [x.id, x.value.isPartOf].includes(id) || margin && [x.id, x.value.isPartOf].includes(margin)
  );

  const hasRubrics = (doc_id) =>
    filteredContent.some(x => x.value.rubric !== '0' && x.value.isPartOf === doc_id && x.value.text);

  this.doesSourceHaveRubrics = hasRubrics(id);

  this.doesMarginHaveRubrics = hasRubrics(margin);

  const getCaption = ({dc_title, dc_spatial}) => [dc_title, dc_spatial].filter(Boolean).join(', ');

  const getText = ({doc, value}) => {
    if (value.text) return value.text;
    let includedImage = (value.inclusion !== 'whole' ? '#' + value.inclusion : '')
      + ` "${doc ? getCaption(doc) : ''}"`;
    let imageReference = /!\[[^\]]*\]\([^)]+/;
    return doc?.text?.replace(imageReference, '$&' + includedImage);
  };

  this.isFromScratch = id === margin;

  const shouldBeAligned = !raw
    && this.doesSourceHaveRubrics
    && (!margin || this.doesMarginHaveRubrics);

  const xor = (x, y) => x !== y;

  this.passages = filteredContent.reduce(({whole, part}, x, i, {length}) => {
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
