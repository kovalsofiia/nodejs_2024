const studentModel = require("../models/student.model");
const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

async function create(item) {
  const studentClone = { ...item };
  const hashedPassword = await bcrypt.hash(studentClone.password, 10);
  studentClone.password = hashedPassword;
  const studentCreated = await studentModel.create(studentClone);
  await authModel.create({
    email: studentCreated.email,
    password: studentCreated.password,
  });
  return studentCreated;
}

async function find({ searchString = "", page = 1, perPage = 10 }) {
  const filter = {
    lastName: { $regex: `^${searchString}`, $options: "i" },
  };

  return {
    items: await studentModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await studentModel.countDocuments(filter),
  };
}

async function findById(id) {
  return studentModel.findById(id);
}

async function findByFullNameAndYearOfBirth(firstName, lastName, yearOfBirth) {
  try {
    const student = await studentModel.findOne({
      firstName,
      lastName,
      yearOfBirth,
    });
    return student;
  } catch (error) {
    throw new Error(
      `Error finding student by full name and year of birth: ${error.message}`
    );
  }
}

async function findByAllFields(
  firstName,
  lastName,
  yearOfBirth,
  group,
  faculty,
  averageGrade,
  workplace,
  city
) {
  try {
    const student = await studentModel.findOne({
      firstName,
      lastName,
      yearOfBirth,
      group,
      faculty,
      averageGrade,
      workplace,
      city,
    });
    return student;
  } catch (error) {
    throw new Error(`Error finding student by all fields: ${error.message}`);
  }
}

async function findByIdAndUpdate(id, update) {
  return studentModel.findByIdAndUpdate(id, update, {
    upsert: false,
    new: true,
  });
}

async function findByIdAndDelete(id) {
  return studentModel.findByIdAndDelete(id);
}

async function patchById(id, update) {
  return studentModel.findByIdAndUpdate(id, update, { new: true });
}

async function findOne(filter) {
  return studentModel.findOne(filter);
}

module.exports = {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  patchById,
  findByFullNameAndYearOfBirth,
  findByAllFields,
  findOne,
};
