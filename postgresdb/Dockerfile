FROM postgres
# Env variable is not sufficient here. Need arg.
ARG PG_TABLE
# Not working ? Can't access /var/lib/postgresql/data/latest.csv on next build stage
# COPY copy-into-data/latest.csv /var/lib/postgresql/data/latest.csv
ADD seed.sql /docker-entrypoint-initdb.d/seed.sql

# pass variable PG_TABLE to script.sh to replace ${PG_TABLE} with .env variable in seed.sql
WORKDIR /scripts
COPY script.sh .
RUN chmod +x script.sh
RUN /scripts/script.sh PG_TABLE "${PG_TABLE}"
