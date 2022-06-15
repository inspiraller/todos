FROM postgres
ARG PG_TABLE

ADD seed.sql /docker-entrypoint-initdb.d/seed.sql

# pass variable PG_TABLE to script.sh to replace ${PG_TABLE} with .env variable in seed.sql
WORKDIR /scripts
COPY script.sh .
RUN chmod +x script.sh
RUN /scripts/script.sh PG_TABLE "${PG_TABLE}"

