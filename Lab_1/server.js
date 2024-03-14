// 1) сутність "студент-практикант": прізвище, рік народження, група,
// факультет, середній бал, місце роботи, місто.

const mongoose = require("mongoose");
const express = require("express");
const createError = require("http-errors");
const { port, mongodb_uri } = require("./config");
const studentsRouter = require("./routes/students.route");
const { authenticationCheck } = require("./middlewares/auth.middleware");

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

// Application-level middleware. Executed every time the app receives a request
app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

// An endpoint to hadle base url route GET request
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: "Node.js ExApp",
    },
  });
});

// Application-level middleware. Executed every time the app receives a request and checked simple authentication
app.use(authenticationCheck);

// Rest of routs
app.use("/students", studentsRouter);

// Application-level middleware. Handling requests for a non-existent path
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error-handling middleware. Handling global application errors
app.use((err, req, res, next) => {
  const erorrStatus = err.status || 500;
  console.error(
    `${"\x1b[31m"}[${new Date().toUTCString()}] ${req.method}: ${
      req.path
    }. Error(${erorrStatus}): ${err.message}`,
    "\x1b[0m"
  );
  res.status(erorrStatus).send({
    status: erorrStatus,
    error: err,
  });
});

// Starting the application

app.listen(port, () => {
  console.log(`Students app listening on port ${port}`);
});
