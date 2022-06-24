const fs = require("fs");
const path = require("path");
const exportCsv = require("../export");

const { env } = process;
const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_COLLECTION,
  MONGO_USER,
  MONGO_PASS,
} = env;

const file = "latest.csv";
const outputMongoContainer = `/data/db/${file}`;
const outputLocalData = `/mongodb_data/${file}`;
const outputDestination = `./copy-into-data/${file}`;
const fields = "id,todoText,created_timestamp,completed";
const cmdExport = `docker exec ${MONGO_HOST} mongoexport --authenticationDatabase admin -h ${MONGO_HOST} --port ${MONGO_PORT} -u ${MONGO_USER} -p ${MONGO_PASS} -d ${MONGO_DB} -c ${MONGO_COLLECTION}  --type csv --fields ${fields} --out ${outputMongoContainer}`;

console.log("mongo export...");
exportCsv({
  cmdExport,
  host: MONGO_HOST,
  outputMongoContainer,
  cb: async () => {

    const pathLocal = path.join(__dirname, outputLocalData);
    console.log('mongo export - READ', pathLocal)
    let data = await fs.readFileSync(pathLocal, "utf8");
    data = data.search(/\S/) === -1 ? fields : data

    const pathDestination = path.join(__dirname, outputDestination);
    console.log('mongo export - WRITE', pathDestination)
    fs.writeFile(pathDestination, data, (err) => {
      if (err) {
        console.error("error writing to file", err);
      }
    });
  },
});
