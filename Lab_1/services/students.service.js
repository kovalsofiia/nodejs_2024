const studentModel = require("../models/student.model");

async function create(item) {
  return studentModel.create(item);
}

async function find({
  searchString = "",
  page = 1,
  perPage = Number.MAX_SAFE_INTEGER,
}) {
  const filter = {
    firstName: { $regex: `^${searchString}`, $options: "Ко" },
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

async function findByIdAndUpdate(id, update) {
  return studentModel.findByIdAndUpdate(id, update, {
    upsert: false,
    new: true,
  });
}

async function findByIdAndDelete(id) {
  return studentModel.findByIdAndDelete(id);
}

module.exports = {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
