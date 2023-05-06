function (_, oldDoc, user) {
  //See https://docs.couchdb.org/en/stable/ddocs/ddocs.html#validate-document-update-functions

  function advise(todo) {
    throw({unauthorized: `Before editing this document, please ${todo} first.`});
  }

  if (user.roles.includes('_admin')) return true;

  if (!user.name) advise('log in');

  if (oldDoc && oldDoc.editors && !oldDoc.editors.includes(user.name)) {
    advise('request authorization to its editors');
  }

}
