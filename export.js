const child_process = require("child_process");
const { exec } = child_process;

const fnExport = ({cmdExport, host, output}) => {
  console.log(cmdExport)
  exec(cmdExport, {}, (error, stdout) => {
    if (error) {
      console.error('Cant export csv:', error);
    } else {
      console.log("Export csv success: ", output);
    }
  });
};

const exportCsv = ({cmdExport, host, output}) => {
  const cmdContainerStopped = `docker container ls -f "status=exited" -f "name=${host}"'`;
  const cmdContainerExist = `docker container ls -f "name=${host}"`
  const cmdRestartContainer = `docker restart ${host}`;

  console.log(cmdContainerStopped)
  exec(cmdContainerStopped, {}, (error, stdout) => {
    if (stdout.indexOf(host) !== -1) {
      console.log(stdout);

      console.log(cmdRestartContainer)
      exec(cmdRestartContainer, {}, (error, stdout) => {
        if (error) {
          console.error('Cant restart container: ', error);
        } else {
          fnExport({cmdExport, host, output});
        }
      });
    } else {

      console.log(cmdContainerExist);
      exec(cmdContainerExist, {}, (err, stdout) => {
        if (stdout.indexOf(host) === -1) {
          console.error(`
          Container does not exist anymore. 
          Remember next time to run db-export periodically before destroying the container.
          `);
        } else {
          fnExport({cmdExport, host, output});
        }
      })
    }
  });
}

module.exports = exportCsv


