function (doc) {
  const { getRelatedDocuments, emitPassages } = require('views/lib/links');

  let related = getRelatedDocuments(doc);
  let { _id, text = '', isPartOf = _id } = doc;

  emitPassages({text, isPartOf, related});
}
