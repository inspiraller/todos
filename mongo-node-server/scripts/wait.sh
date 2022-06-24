#!/bin/bash
# Depends on variables: $WAIT_HOST, $WAIT_PORT

echo "start - wait.sh ????? host = ${WAIT_HOST}"
COUNTER=0
MAX_WAIT_SECONDS=60
waitHost() {
  COUNTER=$((COUNTER+1))
  if [[ ${COUNTER} -eq MAX_WAIT_SECONDS ]]; then
    echo "Error: Host did not connect within ${MAX_WAIT_SECONDS} seconds."
    exit 2
  fi
  echo "Waiting for host ${WAIT_HOST}: ${COUNTER}/${MAX_WAIT_SECONDS} seconds"
}
until nc -z $WAIT_HOST $WAIT_PORT
do
  sleep 2
  waitHost
done

echo "success - wait.sh = host ready"
exit 0

