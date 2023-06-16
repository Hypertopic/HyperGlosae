import { Buffer } from 'buffer';

const service = 'http://localhost:5984/hyperglosae';

function Hyperglosae(logger) {

  this.credentials = {};

  this.getView = ({ view, id, options = [] }) =>
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

  let basicAuthentication = ({ force }) => {
    let { name, password } = this.credentials;
    if (!force && !name && !password) return ({});
    return ({
      'Authorization': 'Basic ' + Buffer.from(`${name}:${password}`).toString('base64')
    });
  };

  this.putDocument = (doc) =>
    fetch(`${service}/${doc._id}`, {
      method: 'PUT',
      headers: basicAuthentication({ force: false }),
      body: JSON.stringify(doc)
    })
      .then(x => x.json())
      .then(x => {
        if (x.reason) {
          logger(x.reason);
          throw new Error(x.reason);
        }
      });

  this.authenticate = ({ name, password }) => {
    this.credentials = { name, password };
    return fetch(`${service}`, {
      method: 'GET',
      headers: basicAuthentication({ force: true })
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

  return this;
}

export default Hyperglosae;
