const express = require("express");
const router = express.Router();

const controllers = require("../controllers/published.controller");

const { authenticationCheck } = require("../middlewares/auth.middleware");

router.use(authenticationCheck);
router
  .route("/")
  .get(controllers.getPublished)
  .post(controllers.createPublished);

module.exports = router;
