const child_process = require("child_process");
const dotEnv = require("dotenv");
const path = require("path");
dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;
const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_COLLECTION, MONGO_USER, MONGO_PASS} = env;
const { exec } = child_process;

const output = "/data/db/latest.csv";

const cmdExport = `docker exec ${MONGO_HOST} mongoexport --authenticationDatabase admin -h ${MONGO_HOST} --port ${MONGO_PORT} -u ${MONGO_USER} -p ${MONGO_PASS} -d ${MONGO_DB} -c ${MONGO_COLLECTION}  --type csv --fields id,todoText,created_timestamp,completed --out ${output}`;
const cmdContainerStopped = `docker container ls -f "status=exited" -f "name=${MONGO_HOST}"'`;
const cmdContainerExist = `docker container ls -f "name=${MONGO_HOST}"`
const cmdRestartContainer = `docker restart ${MONGO_HOST}`;

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
    if (stdout.indexOf(MONGO_HOST) !== -1) {
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
        if (stdout.indexOf(MONGO_HOST) === -1) {
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

