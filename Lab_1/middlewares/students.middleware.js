const createError = require("http-errors");
const ObjectId = require("mongoose").Types.ObjectId;
const studentService = require("../services/students.service");

async function studentByIdValidation(req, res, next) {
  try {
    const { studentId } = req.params;

    if (!ObjectId.isValid(studentId)) {
      throw createError.BadRequest("Student id is not valid.");
    }

    const student = await studentService.findById(studentId);

    if (!student) {
      throw createError.NotFound(
        `Student with id ${studentId} has not been found.`
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}

async function studentByAverage(req, res, next) {
  try {
    const { averageGrade } = req.body;

    if (averageGrade > 5 || averageGrade < 0) {
      throw createError.BadRequest(
        `Students grade not accepted. It must be from 0 to 5.`
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  studentByIdValidation,
  studentByAverage,
};
