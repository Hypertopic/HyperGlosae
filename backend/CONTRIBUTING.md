# Testing and developping HyperGlosae backend

These settings are for development and tests only.
Data added interactively (by hand or by automated tests) are wiped out when the
container is shut down. It is on purpose.

Production settings will be provided in a different document.

## Run with test data

1. Start CouchDB and push the code and samples:

  ```sh
  export COUCHDB_USER="TO_BE_CHANGED"
  export COUCHDB_PASSWORD="TO_BE_CHANGED"
  docker-compose up -d
  ```

2. Enable CORS in CouchDB.

  ```sh
  alias put='curl -X PUT -u "${COUCHDB_USER}:${COUCHDB_PASSWORD}"'
  put localhost:5984/_node/nonode@nohost/_config/chttpd/enable_cors --data '"true"'
  put localhost:5984/_node/nonode@nohost/_config/cors/origins --data '"*"'
  ```

3. Set public access to the database:

  ```sh
  put localhost:5984/hyperglosae/_security --data '{"members":{"roles":[]},"admins":{"roles":["_admin"]}}'
  ```

4. Create test users:

  ```sh
  put localhost:5984/_users
  put localhost:5984/_users/org.couchdb.user:alice --data '{"name":"alice", "password":"whiterabbit", "roles":[], "type":"user"}'
  put localhost:5984/_users/org.couchdb.user:bill --data '{"name":"bill", "password":"madhatter", "roles":[], "type":"user"}'
  ```

## Contribute to test data

Update documents in `../samples` and push them to the backend:

```sh
docker-compose up updated_samples
```

## Contribute to the code

Update code in `src` and push it to the backend:

```sh
docker-compose up updated_code
```

The backend is coded in JavaScript as CouchDB views (see [documentation](https://docs.couchdb.org/en/stable/ddocs/views/)). Documents stored in CouchDB can be created, updated and deleted (esp. by the frontend) using CouchDB REST API (see [documentation](https://docs.couchdb.org/en/stable/api/document/)).

## Shut down the backend (and remove data added interactively)

```sh
docker-compose down
```

