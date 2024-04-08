const express = require("express");
const router = express.Router();

const controller = require("../controllers/students.controller");
const middleware = require("../middlewares/students.middleware");

const { authenticationCheck } = require("../middlewares/auth.middleware");

router
  .route("/")
  .post(
    middleware.studentByAverage,
    middleware.checkDuplicateStudent,
    controller.createStudent
  );

// Router-level middleware. Executed every time the app receives a request and checked authentication
router.use(authenticationCheck);

router.route("/").get(controller.getStudents);

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
