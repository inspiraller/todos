const exportCsv = require("../export");

const { env } = process;
const { PG_HOST, PG_DB, PG_USER, PG_PWD, PG_TABLE } = env;

// const output = "./postgresql_data/latest.csv";
const output = "./copy-into-data/latest.csv";
const cmdExport = `docker exec postgres1 psql -U ${PG_USER} -d ${PG_DB} -c \"COPY ${PG_TABLE} TO STDOUT WITH CSV HEADER\" > ${output}`;

console.log('postgres export...')
exportCsv({ cmdExport, host: PG_HOST, output });
