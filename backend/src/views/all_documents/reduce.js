function (_, values) {
  return values.reduce((previous, {metadata, referenced}) => ({
    metadata: metadata || previous.metadata,
    referenced: referenced + previous.referenced
  }));
}
