function (doc) {
  const { getRelatedDocuments, emitPassages } = require('views/lib/links');

  let { _id, text = '', isPartOf = _id, links = [] } = doc;
  let related = getRelatedDocuments({isPartOf, links});

  emitPassages({text, isPartOf, related});
}
