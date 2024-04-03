const express = require("express");
const router = express.Router();

const controller = require("../controllers/task2.controller");
const middleware = require("../middlewares/task2.middleware");

router
  .route("/")
  .get(controller.getOperations)
  .post(middleware.validateParamsForOperation, controller.createOperation);

router
  .route("/:opId")
  .get(controller.getOperation)
  .delete(controller.deleteOperation);

module.exports = router;
