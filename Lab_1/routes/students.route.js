const express = require("express");
const router = express.Router();

const controller = require("../controllers/students.controller");

router.route("/").get(controller.getStudents).post(controller.createStudent);

router
  .route("/:studentId")
  .get(controller.getStudent)
  .patch(controller.updateStudent)
  .delete(controller.deleteStudent);

module.exports = router;
