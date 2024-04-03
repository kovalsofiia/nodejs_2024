const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");
const middleware = require("../middlewares/task.middleware");

router
  .route("/")
  .get(controller.getTriangles)
  .post(middleware.validateParamsForTriangle, controller.createTriangle);

router
  .route("/:triangleId")
  .get(controller.getTriangle)
  .delete(controller.deleteTriangle);

module.exports = router;
