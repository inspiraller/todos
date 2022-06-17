CREATE TABLE IF NOT EXISTS ${PG_TABLE}(
id SERIAL PRIMARY KEY,
"todoText"  VARCHAR(500) NOT NULL UNIQUE,
completed BOOLEAN NOT NULL);

-- in order to have case sensitive column names, they must be quoted.

COPY ${PG_TABLE} FROM '/var/lib/postgresql/data/init.table.csv' DELIMITER ',' CSV HEADER;
