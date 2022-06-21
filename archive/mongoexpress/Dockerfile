FROM node:8

ADD . /app
WORKDIR /app

COPY package*.json ./

RUN mkdir -p .npm-global
RUN mkdir -p cacache
# add `.npm-global/bin` to $PATH
RUN export PATH=.npm-global/bin:$PATH
RUN npm config set prefix '.npm-global'
RUN npm config set cache '_cacache'

COPY wait-for-it.sh /wait-for-it2.sh
RUN chmod +x /wait-for-it2.sh

# Should work - but seems to be in perpetual loop. 
# CMD ./wait-for-it2.sh "mongodb://${ENV_MONGO_USER}:${ENV_MONGO_PASS}@mongo1:27017/admin"

# CMD ./wait-for-it2.sh "mongodb://mongo1:27017"
# CMD ./wait-for-it2.sh "localhost:27017"
# CMD ./wait-for-it2.sh "mongo:27017"
# CMD ./wait-for-it2.sh "mongodb://localhost:27017/?compressors=disabled&gssapiServiceName=mongodb"