function (doc) {
  const { getMetadata, getRelatedDocuments, emitMetadata } = require('views/lib/links');

  let metadata = getMetadata(doc);
  let related = getRelatedDocuments(doc);

  emitMetadata({metadata, id: doc._id, related});
}
