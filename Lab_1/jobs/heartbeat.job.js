const CronJob = require("cron").CronJob;
const createError = require("http-errors");

async function startHeartBeatJob(req, res, next) {
  try {
    const { reminderWater } = req.body;

    if (reminderWater) {
      const job = new CronJob("0 0 * * * *", () => {
        console.log("[heartbeat.job] You will see this message every hour.");
      });

      job.start();
    }

    res.status(200).json({
      status: 200,
      message: "Water reminder job created successfully",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}
// function startHeartBeatJob(result) {
//   const job = new CronJob(
//     "0 * * * * *", // At every minute
//     () => {
//       console.log("[heartbeat.job] You will see this message every minute.");
//     }
//   );

//   job.start();
// }

module.exports = startHeartBeatJob;
