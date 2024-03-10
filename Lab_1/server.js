// 1) сутність "студент-практикант": прізвище, рік народження, група,
// факультет, середній бал, місце роботи, місто.

const mongoose = require("mongoose");
const express = require("express");
const { port, mongodb_uri } = require("./config");
const studentsRouter = require("./routes/students.route");

mongoose
  .connect(mongodb_uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });

const app = express();

app.use(express.json());

app.use("/students", studentsRouter);

app.listen(port, () => {
  console.log(`Students app listening on port ${port}`);
});
