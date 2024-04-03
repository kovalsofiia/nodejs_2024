const taskModel = require("../models/task.model");

async function create(item) {
  return taskModel.create(item);
}

async function find({ searchString = "", page = 1, perPage = 10 }) {
  const filter = {};

  return {
    items: await taskModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await taskModel.countDocuments(filter),
  };
}

async function findById(id) {
  return taskModel.findById(id);
}

async function findByIdAndDelete(id) {
  return taskModel.findByIdAndDelete(id);
}
module.exports = {
  create,
  find,
  findById,
  findByIdAndDelete,
};
