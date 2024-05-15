const CronJob = require("cron").CronJob;
const ExportModel = require("../models/exports.model");

function startHeartBeatJob() {
  console.log("started total calculation");
  const job = new CronJob("* * * * *", async () => {
    const exportsList = await ExportModel.find({});
    exportsList.forEach((exportItem) => {
      if (exportItem.itemAmount && exportItem.itemPrice) {
        console.log(
          `[heartbeat.job] Total price for item code ${exportItem.id} is ${
            exportItem.itemAmount * exportItem.itemPrice
          }`
        );
      }
    });
  });
  job.start();
}

// function startHeartBeatJob() {
//   const job = new CronJob(
//     "0 * * * * *", // At every minute
//     () => {
//       console.log("[heartbeat.job] You will see this message every minute.");
//     }
//   );

//   job.start();
// }

module.exports = startHeartBeatJob;
