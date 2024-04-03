const task2Model = require("../models/task2.model");

async function create(item) {
  return task2Model.create(item);
}

async function find({ searchString = "", page = 1, perPage = 10 }) {
  const filter = {};

  return {
    items: await task2Model
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await task2Model.countDocuments(filter),
  };
}

async function findById(id) {
  return task2Model.findById(id);
}

async function findByIdAndDelete(id) {
  return task2Model.findByIdAndDelete(id);
}
module.exports = {
  create,
  find,
  findById,
  findByIdAndDelete,
};
