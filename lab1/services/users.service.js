const mockData = require('../helpers/mock-data');

function _generateId() {
    const crypto = require("crypto");
    return crypto.randomBytes(16).toString("hex");
}

async function create(user) {
    const newUser = { id: _generateId(), ...user };
    mockData.users.push(newUser);

    return newUser;
}

async function find({ searchString = '', page = 1, perPage = Number.MAX_SAFE_INTEGER }) {
    searchString = searchString?.toLowerCase();
    const searchResult = mockData.users.filter(u => u.firstName?.toLowerCase().includes(searchString));

    return {
        items: searchResult.slice((page - 1)*perPage, page * perPage),
        count: searchResult.length,
    }
}

async function findById(id) {
    return mockData.users.find(u => u.id == id);
}

async function update(userId, userData) {
    const index = mockData.users.findIndex(u => u.id === userId);

    if (index === -1) return;

    const updatedUser = { ...mockData.users[index], ...userData, id: userId };

    mockData.users[index] = updatedUser;
};

async function remove(id) {
    mockData.users = mockData.users.filter(u => u.id != id);
};

module.exports = {
    create,
    find,
    findById,
    update,
    remove,
};