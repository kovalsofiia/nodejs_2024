const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');

router.route('/')
    .get(controller.getUsers)
    .post(controller.createUser);

router.route('/:userId')
    .get(controller.getUser)
    .patch(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;