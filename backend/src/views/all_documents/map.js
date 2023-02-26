function (metadata) {
  const { parseReference } = require('views/lib/links');

  if (!metadata.dc_title) return;
  (metadata.links || []).forEach(({object}) => {
    emit(parseReference(object).id, {referenced: 1});
  });
  emit(metadata._id, {metadata, referenced: 0});
}
