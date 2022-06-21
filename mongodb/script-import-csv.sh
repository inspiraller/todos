#!/bin/bash
echo "args= ${1} ${2}"
ENV_DB=""
ENV_TABLE=""
ENV_USER=""
ENV_PASS=""
if [ $# -gt 1 ]; then
  ENV_DB="$1"
  ENV_TABLE="$2"
  ENV_USER="$3"
  ENV_PASS="$4"
fi

echo "start - mongo import csv ${ENV_DB} ${ENV_TABLE} ${ENV_USER} ${ENV_PASS}"
mongoimport -d $ENV_DB -c $ENV_TABLE --type csv --file ./latest.csv --columnsHaveTypes --fieldFile=./field_file_types.txt  -u "${ENV_USER}" -p "${ENV_PASS}" --uri "mongodb://mongo1:27017"

# mongoimport -d $ENV_DB -c $ENV_TABLE --type csv --file ./latest.csv --columnsHaveTypes --fieldFile=./field_file_types.txt  --uri "mongodb://${ENV_USER}:${ENV_PASS}@mongo1:27017"
# mongoimport -d $ENV_DB -c $ENV_TABLE --type csv --file ./latest.csv --headerline  
echo "end - mongo import"