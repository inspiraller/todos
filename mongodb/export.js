const exportCsv = require("../export");

const { env } = process;
const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_COLLECTION, MONGO_USER, MONGO_PASS} = env;

const output = "/data/db/latest.csv";
const cmdExport = `docker exec ${MONGO_HOST} mongoexport --authenticationDatabase admin -h ${MONGO_HOST} --port ${MONGO_PORT} -u ${MONGO_USER} -p ${MONGO_PASS} -d ${MONGO_DB} -c ${MONGO_COLLECTION}  --type csv --fields id,todoText,created_timestamp,completed --out ${output}`;


console.log('mongo export...')
exportCsv({cmdExport, host: MONGO_HOST, output})
