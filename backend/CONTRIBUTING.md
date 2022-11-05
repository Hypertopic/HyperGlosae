# Testing and developping HyperGlosae backend

These settings are for development and tests only.
Data added interactively (by hand or by automated tests) are wiped out when the
container is shut down. It is on purpose.

Production settings will be provided in a different document.

## Run with test data

1. Start CouchDB and push the code and samples:

  ```sh
  export COUCHDB_USER="TO BE CHANGED"
  export COUCHDB_PASSWORD="TO BE CHANGED"
  docker-compose up -d
  ```

2. Enable CORS in CouchDB.
3. Set public access to the database:

  ```sh
  curl -X PUT -u ${COUCHDB_USER}:${COUCHDB_PASSWORD} -i http://localhost:5984/hyperglosae/_security --data '{"members":{"roles":[]},"admins":{"roles":["_admin"]}}'
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

## Shut down the backend (and remove data added interactively)

```sh
docker-compose down
```

