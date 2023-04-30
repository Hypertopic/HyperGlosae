function (_, oldDoc, user) {
  //See https://docs.couchdb.org/en/stable/ddocs/ddocs.html#validate-document-update-functions

  function advise(todo) {
    throw({unauthorized: `Before editing this document, please ${todo} first.`});
  }

  if (!user.name) advise('log in');

}
