const studentService = require("../services/students.service");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const {
  StudentCreateSchema,
} = require("../joi_validation_schemas/students.schemas");

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { json } = require("express");
const deleteFileAsync = promisify(fs.unlink);

async function createStudent(req, res, next) {
  try {
    const newStudent = await studentService.create(req.body);

    res.status(201).json({
      status: 201,
      message: "Student has been created successfully.",
      data: { newStudent },
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

async function updateStudentProfilePicture(req, res, next) {
  try {
    const { studentId } = req.params;

    // Check if req.file contains the uploaded file
    if (!req.file || !req.file.filename) {
      throw createError.BadRequest("Profile picture is missing or invalid.");
    }

    const student = await studentService.findById(studentId);

    if (!student) {
      throw createError.NotFound("Student not found.");
    }

    // Delete previous profile picture if it exists
    if (student.profilePicture) {
      const filePath = path.join(
        __dirname,
        "..",
        "Lab_1",
        "public",
        "profilePictures",
        student.profilePicture
      );
      await deleteFileAsync(filePath); // Delete the existing file
    }

    // Update the student's profilePicture field
    console.log(req.file);
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "profilePictures",
      `${req.file.filename}.${String(req.file.mimetype).split("/")[1]}`
    );

    // Resize and convert the uploaded file to JPEG
    await sharp(req.file.path)
      .resize({ width: 300, height: 300 }) // Resize to 300x300 pixels (optional)
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toFile(imagePath);

    const updatedStudent = await studentService.findByIdAndUpdate(studentId, {
      profilePicture: req.file.filename,
    });

    if (!updatedStudent) {
      throw createError.InternalServerError(
        "Failed to update student profile picture."
      );
    }

    res.status(200).json({
      status: 200,
      message: "Student profile picture updated successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function uploadStudents(req, res, next) {
  try {
    console.log(req.file);
    const jsonData = JSON.parse(req.file.buffer.toString());
    console.log(jsonData);

    //create from json data
    const newStudent = await studentService.create(jsonData);
    res.status(201).json({
      status: 201,
      data: newStudent,
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
  updateStudentProfilePicture,
  uploadStudents,
};
