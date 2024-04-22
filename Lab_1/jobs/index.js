const config = require("../config");
const startHeartBeatJob = require("./heartbeat.job");

function start() {
  if (!config.enableScheduleJobs) {
    console.warn("Jobs scheduling is not enabled.");
    return;
  }
  startHeartBeatJob();
}

module.exports = start;
