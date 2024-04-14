// 1) сутність "студент-практикант": прізвище, рік народження, група,
// факультет, середній бал, місце роботи, місто.

const mongoose = require("mongoose");
const express = require("express");
const createError = require("http-errors");
const multer = require("multer");

const { port, mongodb_uri } = require("./config");

const authRouter = require("./routes/auth.route");
const studentsRouter = require("./routes/students.route");
const publishedRouter = require("./routes/published.route");

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
app.use(express.static("public"));

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
      message: "Node.js Students App",
    },
  });
});

// Rest of routs
app.use("/students", studentsRouter);
app.use("/auth", authRouter);
app.use("/published", publishedRouter);

// Application-level middleware. Handling requests for a non-existent path
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Multer error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      throw createError.BadRequest(
        "File size limit exceeded. Please upload a smaller file."
      );
    }
  }

  next(err);
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
