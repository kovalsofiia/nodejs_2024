const ExportModel = require("../models/exports.model");

async function create(item) {
  return ExportModel.create(item);
}

async function find({ searchString = "", page = 1, perPage = 10 }) {
  const filter = {
    itemName: { $regex: `^${searchString}`, $options: "i" },
  };

  return {
    items: await ExportModel.find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await ExportModel.countDocuments(filter),
  };
}

async function findById(id) {
  return ExportModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
  return ExportModel.findByIdAndUpdate(id, update, {
    upsert: false,
    new: true,
  });
}

async function findByIdAndDelete(id) {
  return ExportModel.findByIdAndDelete(id);
}

async function patchById(id, update) {
  return ExportModel.findByIdAndUpdate(id, update, { new: true });
}

async function findOne(filter) {
  return ExportModel.findOne(filter);
}

module.exports = {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  patchById,
  findOne,
};
