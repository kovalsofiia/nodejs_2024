const mockData = require("../helpers/mock-data");

function _generateId() {
  const crypto = require("crypto");
  return crypto.randomBytes(16).toString("hex");
}

async function create(item) {
  const newItem = { id: _generateId(), ...item };
  mockData.students.push(newItem);
  return newItem;
}

async function find({
  searchString = "",
  page = 1,
  perPage = Number.MAX_SAFE_INTEGER,
}) {
  searchString = searchString?.toLowerCase();
  const searchResult = mockData.students.filter((u) =>
    u.lastName?.toLowerCase().includes(searchString)
  );

  return {
    items: searchResult.slice((page - 1) * perPage, page * perPage),
    count: searchResult.length,
  };
}

async function findById(id) {
  return mockData.students.find((item) => item.id == id);
}

async function update(itemId, itemData) {
  const index = mockData.students.findIndex((item) => item.id === itemId);

  if (index === -1) return;

  const updatedItem = { ...mockData.students[index], ...itemData, id: itemId };

  mockData.students[index] = updatedItem;
}

async function remove(id) {
  mockData.students = mockData.students.filter((item) => item.id != id);
}

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
