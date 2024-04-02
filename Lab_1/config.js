require("dotenv").config();

const config = {
  port: process.env.PORT || 3012,
  mongodb_uri:
    process.env.MONGODB_URI ||
    "mongodb+srv://kovalsofiia:root@nodejs4sem.qm53cjv.mongodb.net/labs",
  jwtSecret: process.env.JWT_SECRET || "secret",
};

module.exports = config;
