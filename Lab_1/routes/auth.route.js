const express = require("express");
const router = express.Router();

const controllers = require("../controllers/auth.controller");
const middlewares = require("../middlewares/auth.middleware");

router
  .route("/signIn")
  .post(middlewares.signInDataValidation, controllers.signIn);

router.route("/signOut").delete(controllers.signOut);

module.exports = router;
