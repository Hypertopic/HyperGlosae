function (metadata) {
  if(!metadata.type_name) return;
  emit(metadata._id);
}