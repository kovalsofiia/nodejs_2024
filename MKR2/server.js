// Створити таблицю БД “Export”, що містить інформацію про дані з полями:
// код;
// найменування товару;
// країна, що експортує товар;
// об’єм товару в одиницях; ///кількість
// ціна.

// Реалізувати можливість імпорту даних через файл. Тобто завантажити дані у файлі на сервер, прочитати файл і зберегти ці дані у БД;

// Реалізувати фонове завдання: Обчислити загальну вартість товару.

const mongoose = require("mongoose");
const express = require("express");
const createError = require("http-errors");
const multer = require("multer");

const { port, mongodb_uri } = require("./config");

const exportsRouter = require("./routes/exports.route");
const startScheduleJobs = require("./jobs");
mongoose
  .connect(mongodb_uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    startScheduleJobs;
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
      message: "Node.js MKR2 App",
    },
  });
});

// Rest of routs
app.use("/exports", exportsRouter);

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
  console.log(`MKR2 app listening on port ${port}`);
});
