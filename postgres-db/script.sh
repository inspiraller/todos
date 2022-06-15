#!/usr/bin/env bash
 
echo ">>>>>>>>>>>>>>> script.sh"
while test $# -gt 0
do
    echo "replace: $1=$2"
    sed  -i "s/\${$1}/$2/g" /docker-entrypoint-initdb.d/seed.sql
    shift
    shift
done


# example usecase on command line: 
# sh script.sh PG_TABLE todos

