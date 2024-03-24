const express = require("express");
const router = express.Router();

const controller = require("../controllers/students.controller");
const middleware = require("../middlewares/students.middleware");

router
  .route("/")
  .get(controller.getStudents)
  .post(
    middleware.studentByAverage,
    middleware.checkDuplicateStudent,
    controller.createStudent
  );

router
  .route("/:studentId")
  .get(middleware.studentByIdValidation, controller.getStudent)
  .put(
    middleware.studentByIdValidation,
    middleware.studentByAverage,
    middleware.checkUpdatedDataStudent,
    controller.updateStudent
  )
  .patch(
    middleware.studentByIdValidation,
    middleware.studentByAverage,
    middleware.checkUpdatedDataStudent,
    controller.partiallyUpdateStudent
  )
  .delete(middleware.studentByIdValidation, controller.deleteStudent);

module.exports = router;
