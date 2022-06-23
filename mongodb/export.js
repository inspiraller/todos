const fs = require('fs');
const path = require('path');
const exportCsv = require("../export");

const { env } = process;
const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_COLLECTION, MONGO_USER, MONGO_PASS} = env;

const file = 'latest.csv';
const output = `/data/db/${file}`;
const fields = 'id,todoText,created_timestamp,completed';
const cmdExport = `docker exec ${MONGO_HOST} mongoexport --authenticationDatabase admin -h ${MONGO_HOST} --port ${MONGO_PORT} -u ${MONGO_USER} -p ${MONGO_PASS} -d ${MONGO_DB} -c ${MONGO_COLLECTION}  --type csv --fields ${fields} --out ${output}`;


console.log('mongo export...')
exportCsv({cmdExport, host: MONGO_HOST, output, cb: async () => {
  const pathLocal = path.join(__dirname, `/mongodb_data/${file}`)
  // onsuccess

  const data = await fs.readFileSync(pathLocal, 'utf8')
  if (data.search(/\S/)===-1) {
    fs.writeFile(pathLocal, fields, err => {
      if (err) {
        console.error('error writing to file', err);
      }
    });
  }
}})
