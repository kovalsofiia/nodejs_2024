const CronJob = require("cron").CronJob;
const studentModel = require("../models/student.model");

function startHeartBeatJob() {
  console.log("started water reminder");
  const job = new CronJob("0 * * * * *", async () => {
    const students = await studentModel.find({});
    students.forEach((student) => {
      if (student.reminderWater && student.reminderWater === "true")
        console.log(`[heartbeat.job] Drink water for student ${student.email}`);
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
