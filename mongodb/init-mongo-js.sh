#!/bin/bash
set -e


echo "Creating mongo users..."
mongo admin --host localhost -u ${MONGO_USER} -p ${MONGO_PASS} --eval "db.createUser({user: '${MONGO_USER}', pwd: '${MONGO_PASS}', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Mongo users created."

# mongo <<EOF
# use admin 
# db.createUser(
#   {
#     user: "${MONGO_USER}",
#     pwd: "${MONGO_PASS}",
#     roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
#   }
# )

# EOF


# set -e causes the whole script to exit when a command fails, so the script can't silently fail and startup mongo.

# mongoimport --db ${MONGO_DB_NAME} --collection ${MONGO_TABLE_COLLECTION_NAME} --type=csv --
# headerline --file=./db/latest.csv
# use ${MONGO_DB_NAME}
# db.createCollection()
# db["${MONGO_TABLE_COLLECTION_NAME}"].insert({
#   "id": '',
#   "todoText": '',
#   "created_timestamp" : '',
#   "completed": ''
# })
