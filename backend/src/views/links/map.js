function (doc) {
  const { getMetadata, getRelatedDocuments, emitMetadata, emitPassages} = require('views/lib/links');

  let metadata = getMetadata(doc); 
  let related = getRelatedDocuments(doc);
  let { _id, text = '', isPartOf = _id } = doc;

  emitMetadata({metadata, id: isPartOf, related});
  emitPassages({text, isPartOf, related});
}
