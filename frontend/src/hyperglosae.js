import {Buffer} from 'buffer';

const service = 'http://localhost:5984/hyperglosae';

const LOCALSTORAGE_BASIC_AUTH_KEY = 'hyperglosae-basic-auth';

function Hyperglosae(logger) {
  this.credentials = {};

  let persistBasicAuth = () => {
    if (!this.credentials) return;
    localStorage.setItem(LOCALSTORAGE_BASIC_AUTH_KEY, JSON.stringify(this.credentials));
  };

  let retrieveBasicAuth = () => {
    if (localStorage.getItem(LOCALSTORAGE_BASIC_AUTH_KEY)) {
      try {
        const basicAuth = JSON.parse(localStorage.getItem(LOCALSTORAGE_BASIC_AUTH_KEY));
        this.credentials = {...this.credentials, ...basicAuth};
      } catch {
        console.error('Unable to parse basic auth');
        localStorage.removeItem(LOCALSTORAGE_BASIC_AUTH_KEY);
      }
    }
  };

  retrieveBasicAuth();

  this.getView = ({view, id, options = []}) =>
    fetch(`${
      service
    }/_design/app/_view/${
      view
    }?${
      id ? `startkey=["${id}"]&endkey=["${id}",{}]` : ''
    }&${
      options.map(x => x + '=true').join('&')
    }`)
      .then(x => x.json())
      .then(x => x.rows);

  this.getDocument = (id) =>
    fetch(`${service}/${id}`)
      .then(x => x.json());

  let basicAuthentication = ({force}) => {
    retrieveBasicAuth();
    let { base64} = this.credentials;
    if (!force && !base64) return ({});
    return ({
      'Authorization': 'Basic ' + base64
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
      });

  this.authenticate = ({name, password}) => {
    this.credentials = {
      base64: Buffer.from(`${name}:${password}`).toString('base64'),
      name
    };
    persistBasicAuth();

    return fetch(`${service}`, {
      method: 'GET',
      headers: basicAuthentication({force: true})
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          this.credentials = {};
          localStorage.removeItem(LOCALSTORAGE_BASIC_AUTH_KEY);
          logger(x.reason);
          throw new Error(x.reason);
        }
      });
  };

  this.refreshMetadata = (id, callback) => {
    this.getView({view: 'metadata', id, options: ['include_docs']})
      .then(
        (rows) => {
          let documents = rows.map(x => x.doc);
          callback(documents);
        }
      );
  };

  this.refreshContent = (id, callback) => {
    this.getView({view: 'content', id, options: ['include_docs']})
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
    this.getView({view: 'all_documents', options: ['group']})
      .then((rows) => {
        callback(
          rows.map(
            ({value}) => ({...value.metadata, referenced: value.referenced})
          )
        );
      });
  };

  return this;
}

export default Hyperglosae;
