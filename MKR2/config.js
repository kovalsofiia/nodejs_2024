require("dotenv").config();

const config = {
  port: process.env.PORT || 9012,
  mongodb_uri:
    process.env.MONGODB_URI ||
    "mongodb+srv://kovalsofiia:root@nodejs4sem.qm53cjv.mongodb.net/labs",
  enableScheduleJobs: process.env.ENABLE_SCHEDULE_JOBS || true,
};

module.exports = config;
