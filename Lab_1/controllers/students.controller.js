const studentService = require("../services/students.service");
const createError = require("http-errors");

async function createStudent(req, res, next) {
  try {
    const newStudent = await studentService.create(req.body);

    res.status(200).json({
      status: 200,
      message: "Student has been created successfully.",
      data: newStudent,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getStudents(req, res, next) {
  try {
    res.status(200).json({
      status: 200,
      message: "Students list loaded successfully.",
      data: await studentService.find(req.query),
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getStudent(req, res, next) {
  try {
    const { studentId } = req.params;
    const student = await studentService.findById(studentId);

    if (!student) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "Student has not been found.",
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "Student loaded successfully.",
      data: student,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function updateStudent(req, res, next) {
  try {
    const { studentId } = req.params;
    const studentData = req.body;
    await studentService.findByIdAndUpdate(studentId, studentData);

    res.status(200).json({
      status: 200,
      message: "Student updated successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function partiallyUpdateStudent(req, res, next) {
  try {
    const { studentId } = req.params;
    const studentData = req.body;

    if (!studentId) {
      return res.status(400).json({
        status: 400,
        error: {
          message: "Student ID is required.",
        },
      });
    }

    const existingStudent = await studentService.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "Student has not been found.",
        },
      });
    }

    await studentService.patchById(studentId, studentData);
    const updatedStudent = await studentService.findById(studentId);

    res.status(200).json({
      status: 200,
      message: "Student has been updated successfully.",
      data: updatedStudent,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function deleteStudent(req, res, next) {
  try {
    const { studentId } = req.params;
    await studentService.findByIdAndDelete(studentId);

    res.status(200).json({
      status: 200,
      message: "Student has been deleted successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  partiallyUpdateStudent,
  deleteStudent,
};
