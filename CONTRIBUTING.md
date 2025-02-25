# Contributing to Hyperglosae

## Requirements

- A UNIX-like terminal (preferably WSL if you are on Windows),
- Git,
- Node.js (preferably through nvm),
- Docker (preferably through Docker Desktop).

## Installing software

Get the code:

```shell
git clone https://github.com/Hypertopic/HyperGlosae.git
```

Install the backend:

```shell
docker compose --file docker-compose.dev.yml pull
```

Install the frontend:

```
cd frontend
npm install
```

## Launching software

From the root folder of Hyperglosae, launch the backend:

```shell
export COUCHDB_USER="TO_BE_CHANGED"
export COUCHDB_PASSWORD="TO_BE_CHANGED"
docker compose --file docker-compose.dev.yml up --detach
```

Open <http://localhost:5984/_utils> to view its Web console.

From the `frontend` folder of Hyperglosae, compile and launch the frontend:

```
npm start
```
Don't close the terminal or interrupt the command unless you want to "kill" the service.


Open <http://localhost:3000> to browse sample data in the application.
To test edit features, log in as user `alice` with `whiterabbit` as the password.

## Running tests

From the `frontend` folder of Hyperglosae, type the following command:

```shell
npm run test2
```

Select `E2E testting`, `Electron`, and then the tests you want to run.

## Developping

### Frontend developping

The frontend is coded in JavaScript with the React framework (see [documentation](https://reactjs.org/docs/getting-started.html)).

Everytime you update code in `frontend/src`, the frontend page is reloaded.
You may also see any lint errors in the console.

### Backend developping

The backend is coded in JavaScript as CouchDB views (see [documentation](https://docs.couchdb.org/en/stable/ddocs/views/)). Documents stored in CouchDB can be created, updated and deleted (esp. by the frontend) using CouchDB REST API (see [documentation](https://docs.couchdb.org/en/stable/api/document/)).

Everytime you update code or settings in `backend`, please push them to the backend with:

```shell
docker compose --file docker-compose.dev.yml run updated_code
```

And then refresh the frontend (or backend) page.

### Samples writing

Everytime you update sample data in `samples`, please push them to the backend with:

```shell
docker compose --file docker-compose.dev.yml run updated_samples
```

### Cleaning the data

If (and only if) you want to remove ANY DATA added by hand or through automated tests, launch the following command:

```shell
docker-compose --file docker-compose.dev.yml down
docker compose --file docker-compose.dev.yml up --detach
```

