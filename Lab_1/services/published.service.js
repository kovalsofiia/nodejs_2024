const publishedModel = require("../models/published.model.js");

async function create(item) {
  return await publishedModel.create(item);
}

async function find({ createdBy, searchString = "", page = 1, perPage = 20 }) {
  const filter = {
    createdBy,
    publishedBody: { $regex: `^${searchString}`, $options: "i" },
  };

  return {
    items: await publishedModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage)),
    count: await publishedModel.countDocuments(filter),
  };
}

module.exports = {
  create,
  find,
};
