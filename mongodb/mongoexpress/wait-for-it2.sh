#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available
# NOTE: No spaces between variable and equals
ENV_URL=""
if [ $# -gt 0 ]; then
  ENV_URL="$1"
fi

until $(curl --output /dev/null --silent --head --fail $ENV_URL); do
    echo "Waiting for: ${ENV_URL}"
    sleep 5
done