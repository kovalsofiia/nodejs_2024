const createError = require("http-errors");
const authService = require("../services/auth.service");
const studentService = require("../services/students.service");
const jwt = require("jsonwebtoken");

async function authenticationCheck(req, res, next) {
  try {
    if (!req.headers["x-auth"]) {
      throw createError.Unauthorized("Access token is required");
    }
    req.auth = await authService.verifyAccessToken(req.headers["x-auth"]);

    const token = req.headers["x-auth"];
    const decoded = jwt.verify(token, "secret");
    const userId = decoded.id;

    console.log(`Current user id: ${userId}`);

    const user = await studentService.findById(userId);
    if (!user) {
      throw createError.Unauthorized("Invalid token");
    }

    req.user = user; // Attach the user object to the request for further use
    // if (req.headers["x-auth"] !== "3012") {
    //   return next(
    //     createError.Unauthorized(
    //       "Your access token is invalid or missing. Check it, if you want to access the db."
    //     )
    //   );
    // }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authenticationCheck,
};
