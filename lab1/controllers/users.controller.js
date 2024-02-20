const userService = require('../services/users.service');

async function createUser(req, res) {
    try {
       const newUser = await userService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getUsers(req, res) {
    try {
        res.status(200).json({
            status: 200,
            data: await userService.find(req.query),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await userService.findById(userId);

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'User not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function updateUser(req, res) {
    try {
        const { userId } = req.params;
        const userData = req.body;
        await userService.update(userId, userData);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function deleteUser(req, res) {
    try {
        const { userId } = req.params;
        await userService.remove(userId);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};