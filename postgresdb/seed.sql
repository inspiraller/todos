CREATE TABLE IF NOT EXISTS ${PG_TABLE}(
  id SERIAL PRIMARY KEY,
  "todoText"  VARCHAR(500) NOT NULL UNIQUE,
  created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed TIMESTAMP
);

-- in order to have case sensitive column names, they must be quoted.

COPY ${PG_TABLE} FROM '/var/lib/postgresql/data/latest.csv' DELIMITER ',' CSV HEADER;
