const createError = require("http-errors");
const ObjectId = require("mongoose").Types.ObjectId;
const studentService = require("../services/students.service");
const {
  StudentCreateSchema,
} = require("../joi_validation_schemas/students.schemas");

const multer = require("multer");

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

async function studentPassword(req, res, next) {
  try {
    const { password } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).+$/;

    if (!passwordRegex.test(password)) {
      throw createError.BadRequest(
        `Students password not accepted. It must include 1 number and 1 symbol that is not a letter.`
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}

async function checkDuplicateStudent(req, res, next) {
  try {
    const { error } = StudentCreateSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    const { firstName, lastName, yearOfBirth } = req.body;
    const existingStudent = await studentService.findByFullNameAndYearOfBirth(
      firstName,
      lastName,
      yearOfBirth
    );

    if (existingStudent) {
      return res
        .status(409)
        .json({ error: "Student with the same data already exists." });
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function checkUpdatedDataStudent(req, res, next) {
  try {
    const { error } = StudentCreateSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
}

const studentUploadProfilePicture = multer({
  storage: multer.diskStorage({
    destination: "Lab_1/public/profilePictures/",
  }),
  limits: { fileSize: 100 * 1024 /* bytes */ },
  fileFilter: (req, file, callback) => {
    if (
      !["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
        file.mimetype
      )
    ) {
      return callback(createError.BadRequest("File is not allowed"));
    }

    callback(null, true);
  },
}).single("file");

const studentsUpload = multer().single("file");

module.exports = {
  studentByIdValidation,
  studentByAverage,
  studentPassword,
  checkDuplicateStudent,
  checkUpdatedDataStudent,
  studentUploadProfilePicture,
  studentsUpload,
};
