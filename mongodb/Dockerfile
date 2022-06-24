FROM node:16 
# Need node 16 for modern es6 methods. Eg array.at() etc...
RUN apt-get update && apt-get install -y netcat

WORKDIR /usr/src/app
COPY node-import-csv ./node-import-csv
COPY copy-into-data ./copy-into-data

RUN chmod +x node-import-csv/scripts/wait.sh
RUN cd node-import-csv && npm ci
CMD cd node-import-csv && echo "${PWD}" && sh scripts/wait.sh && echo "next command..." && npm start

EXPOSE 8000
