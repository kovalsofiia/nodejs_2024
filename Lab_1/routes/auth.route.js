const express = require("express");
const router = express.Router();

const controllers = require("../controllers/auth.controller");

router.post("/signIn", controllers.signIn);
router.delete("/signOut", controllers.signOut);

module.exports = router;
