const studentService = require("../services/students.service");

async function createStudent(req, res) {
  try {
    const newStudent = await studentService.create(req.body);

    res.status(200).json({
      status: 200,
      data: newStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function getStudents(req, res) {
  try {
    res.status(200).json({
      status: 200,
      data: await studentService.find(req.query),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function getStudent(req, res) {
  try {
    const { studentId } = req.params;
    const student = await studentService.findById(studentId);

    if (!student) {
      return res.status(400).json({
        status: 400,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const { studentId } = req.params;
    const studentData = req.body;
    await studentService.update(studentId, studentData);

    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;
    await studentService.remove(studentId);

    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      error: err,
    });
  }
}

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
