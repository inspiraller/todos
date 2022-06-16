const child_process = require('child_process');
const dotEnv = require("dotenv");
const path = require("path")
dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;
const {PG_DB,PG_USER, PG_PWD,PG_TABLE} = env;
const {exec} = child_process;

const output = 'export.csv'
const cmd = `docker exec container-db psql -U ${PG_USER} -d ${PG_DB} -c \"COPY ${PG_TABLE} TO STDOUT WITH CSV HEADER\" > ${output}`;

exec(cmd, {}, (error, stdout) => {
  if (error) {
    console.error(error);
  }
  console.log('Export csv success: ', output )
})
  // if (error) {);