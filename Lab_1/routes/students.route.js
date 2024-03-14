const express = require("express");
const router = express.Router();

const controller = require("../controllers/students.controller");
const middleware = require("../middlewares/students.middleware");

router.route("/").get(controller.getStudents).post(controller.createStudent);

router
  .route("/:studentId")
  .get(middleware.studentByIdValidation, controller.getStudent)
  .put(middleware.studentByIdValidation, controller.updateStudent)
  .patch(middleware.studentByIdValidation, controller.partiallyUpdateStudent)
  .delete(middleware.studentByIdValidation, controller.deleteStudent);

module.exports = router;
