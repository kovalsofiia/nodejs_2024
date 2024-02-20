// 1) сутність "студент-практикант": прізвище, рік народження, група,
// факультет, середній бал, місце роботи, місто.

const express = require("express");
const { port } = require("./config");
const studentsRouter = require("./routes/students.route");

const app = express();

app.use(express.json());

app.use("/students", studentsRouter);

app.listen(port, () => {
  console.log(`Students app listening on port ${port}`);
});
