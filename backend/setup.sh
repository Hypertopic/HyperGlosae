#! /bin/sh
alias put='curl -X PUT -u "${COUCHDB_USER}:${COUCHDB_PASSWORD}"'

put localhost:5984/_node/nonode@nohost/_config/chttpd/enable_cors --data '"true"'
put localhost:5984/_node/nonode@nohost/_config/cors/origins --data '"*"'
put localhost:5984/hyperglosae/_security --data '{"members":{"roles":[]},"admins":{"roles":["_admin"]}}'
put localhost:5984/_users
put localhost:5984/_users/org.couchdb.user:alice --data '{"name":"alice", "password":"whiterabbit", "roles":[], "type":"user"}'
put localhost:5984/_users/org.couchdb.user:bill --data '{"name":"bill", "password":"madhatter", "roles":[], "type":"user"}'
