require("dotenv").config();

const config = {
  port: process.env.PORT || 6012,
  mongodb_uri:
    process.env.MONGODB_URI ||
    "mongodb+srv://kovalsofiia:root@nodejs4sem.qm53cjv.mongodb.net/labs",
};

module.exports = config;
