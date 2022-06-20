FROM node:14
ARG MONGO_USER
ENV ENV_MONGO_USER=$MONGO_USER

WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm ci
# COPY . .
EXPOSE ${port}

RUN echo "1"
RUN echo $MONGO_USER

# Only working solution
CMD npm run "_${ENV_MONGO_USER}_"