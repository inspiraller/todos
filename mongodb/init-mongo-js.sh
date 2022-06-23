#!/bin/bash

# /usr/bin/env bash === passes the environment variables ??

# set -e
# set -e causes the whole script to exit when a command fails, so the script can't silently fail and startup mongo.
MONGO_USER=$MONGO_INITDB_ROOT_USERNAME
MONGO_PASS=$MONGO_INITDB_ROOT_PASSWORD
MONGO_DB=$MONGO_INITDB_DATABASE
echo "Create user with permission= ${MONGO_USER}"
echo "Create Collection '${MONGO_COLLECTION}' for DB '${MONGO_DB}'"

# Note: This allows an admin user to connect to any database, so user still has to login as an admin
mongo <<EOF
use admin 
db.createUser(
  {
    user: "${MONGO_USER}",
    pwd: "${MONGO_PASS}",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

use ${MONGO_DB}
db.createCollection("${MONGO_COLLECTION}")
EOF

echo "Success - created user permissions and collection"