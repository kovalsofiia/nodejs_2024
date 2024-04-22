const config = require("../config");
const startHeartBeatJob = require("./heartbeat.job");

function start() {
  if (!config.enableScheduleJobs) {
    console.warn("Jobs scheduling is not enabled.");
    return;
  }
  startHeartBeatJob().catch((err) => {
    console.error("Error starting heartbeat job:", err);
  });
}

module.exports = start;
