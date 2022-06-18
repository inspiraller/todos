const child_process = require("child_process");
const dotEnv = require("dotenv");
const path = require("path");
dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;
const { PG_DB, PG_USER, PG_PWD, PG_TABLE } = env;
const { exec } = child_process;

const output = "./postgresql_data/latest.csv";

const cmdExport = `docker exec container-db psql -U ${PG_USER} -d ${PG_DB} -c \"COPY ${PG_TABLE} TO STDOUT WITH CSV HEADER\" > ${output}`;
const cmdContainerStopped = 'docker container ls -f "status=exited" -f "name=container-db"';
const cmdContainerExist = 'docker container ls -f "name=container-db"'
const cmdRestartContainer = "docker restart container-db";

const fnExport = () => {

  console.log(cmdExport)
  exec(cmdExport, {}, (error, stdout) => {
    if (error) {
      console.error('Cant export csv:', error);
    } else {
      console.log("Export csv success: ", output);
    }
  });
};

const runIfContainerStartedOrStopped = (cb) => {

  console.log(cmdContainerStopped)
  exec(cmdContainerStopped, {}, (error, stdout) => {
    if (stdout.indexOf("container-db") !== -1) {
      console.log(stdout);

      console.log(cmdRestartContainer)
      exec(cmdRestartContainer, {}, (error, stdout) => {
        if (error) {
          console.error('Cant restart container: ', error);
        } else {
          cb();
        }
      });
    } else {

      console.log(cmdContainerExist);
      exec(cmdContainerExist, {}, (err, stdout) => {
        if (stdout.indexOf("container-db") === -1) {
          console.error(`
          Container does not exist anymore. 
          There are ways to backup using WAL archive on server crashing but is beyond the scope of this example.
          (Also it repeatedly creates archives and can steal storage space, grinding memory to a halt so needs dedicated and experienced administration)
          Remember next time to run db-export periodically before destroying the container.
          `);
        } else {
          cb();
        }
      })

    }
  });
}

runIfContainerStartedOrStopped(fnExport);

