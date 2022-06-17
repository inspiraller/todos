const child_process = require("child_process");
const dotEnv = require("dotenv");
const path = require("path");
dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;
const { PG_DB, PG_USER, PG_PWD, PG_TABLE } = env;
const { exec } = child_process;

const output = "export-dead.csv";

const volume = "postgres-db_pgdata"; // 'pgdata'
const cmd = `docker run --name=sqldumpcontainer -e POSTGRES_USER=${PG_USER} -e POSTGRES_DB=${PG_DB} -e POSTGRES_PASSWORD=${PG_PWD} -e PGDATA=/temp -v ${volume} -d postgres:12`;
//const cmd = `docker exec -t --user {${PG_USER} container-db ${PG_DB} -c -U ${PG_USER} > dump_${new Date().getTime()}.sql`
exec(cmd, {}, (error, stdout) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Export csv success: ", output);
  }
});
