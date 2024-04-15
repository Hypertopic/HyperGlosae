import {Buffer} from 'buffer';

const service = 'http://localhost:5984/hyperglosae';

function Hyperglosae(logger) {

  this.credentials = {};

  this.getView = ({view, startkey, endkey, options = []}) =>
    fetch(`${
      service
    }/_design/app/_view/${
      view
    }?${
      startkey ? `startkey=${JSON.stringify(startkey)}&` : ''
    }${
      endkey ? `endkey=${JSON.stringify(endkey)}&` : ''
    }${
      options.map(x => x + '=true').join('&')
    }`)
      .then(x => x.json())
      .then(x => x.rows);

  this.getDocument = (id) =>
    fetch(`${service}/${id}`)
      .then(x => x.json());

  let basicAuthentication = ({force}) => {
    let {name, password} = this.credentials;
    if (!force && !name && !password) return ({});
    return ({
      'Authorization': 'Basic ' + Buffer.from(`${name}:${password}`).toString('base64')
    });
  };

  this.putDocument = (doc) =>
    fetch(`${service}/${doc._id}`, {
      method: 'PUT',
      headers: basicAuthentication({force: false}),
      body: JSON.stringify(doc)
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          logger(x.reason);
          throw new Error(x.reason);
        }
        return x;
      });

  this.authenticate = ({name, password}) => {
    this.credentials = {name, password};
    return fetch(`${service}`, {
      method: 'GET',
      headers: basicAuthentication({force: true})
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          this.credentials = {};
          logger(x.reason);
          throw new Error(x.reason);
        }
      });
  };

  this.refreshMetadata = (id, callback) => {
    const startKey = [id];
    const endKey = [id, {}];
    this.getView({view: 'metadata', startkey: startKey, endkey: endKey, id, options: ['include_docs']})
      .then(
        (rows) => {
          let documents = rows.map(x => x.doc);
          callback(documents);
        }
      );
  };

  this.refreshContent = (id, callback) => {
    const startKey = [id];
    const endKey = [id, {}];
    this.getView({view: 'content', startkey: startKey, endkey: endKey, id, options: ['include_docs']})
      .then(
        (rows) => {
          callback(rows);
        },
        (error) => {
          console.log(error.message);
        }
      );
  };

  this.refreshDocuments = (callback) => {
    const editorKey = this.credentials.name || 'null';
    const startKey = [editorKey];
    const endKey = [editorKey, {}];
    this.getView({view: 'all_documents', startkey: startKey, endkey: endKey, options: ['group']})
      .then(rows => {
        callback(rows.map(({value}) => ({...value.metadata, referenced: value.referenced})));
      });
  };

  return this;
}

export default Hyperglosae;