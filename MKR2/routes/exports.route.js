const express = require("express");
const router = express.Router();

const controller = require("../controllers/exports.controller");
const middleware = require("../middlewares/exports.middleware");

router
  .route("/")
  .get(controller.getExports)
  .post(
    middleware.checkDuplicateExport,
    middleware.getTotal,
    controller.createExport
  );

router
  .route("/:exportId")
  .get(controller.getExport)
  .put(controller.updateExport)
  .patch(controller.partiallyUpdateExport)
  .delete(controller.deleteExport);

router
  .route("/upload")
  .post(
    middleware.exportsUpload,
    middleware.checkDuplicateStudentFromFile,
    controller.uploadExports
  );

module.exports = router;
