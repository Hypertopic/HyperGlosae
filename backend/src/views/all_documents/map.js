function (metadata) {
  if (!metadata.dc_title) return;
  (metadata.links || []).forEach(({object}) => {
    emit(object, {referenced: 1});
  });
  emit(metadata._id, {metadata, referenced: 0});
}
