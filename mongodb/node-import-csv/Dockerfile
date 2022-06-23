FROM node:16 
# Need node 16 for modern es6 methods. Eg array.at() etc...
RUN apt-get update && apt-get install -y netcat

WORKDIR /usr/src/app
COPY . .
RUN chmod +x scripts/wait.sh
RUN npm ci
CMD sh scripts/wait.sh && echo "next command..." && npm start

EXPOSE 8000
