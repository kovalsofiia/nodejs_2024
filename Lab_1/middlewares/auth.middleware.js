const createError = require("http-errors");
const bcrypt = require("bcrypt");
const studentService = require("../services/students.service");
const authService = require("../services/auth.service");
const { SignInSchema } = require("../joi_validation_schemas/auth.schemas");

async function authenticationCheck(req, res, next) {
  try {
    // if (!req.cookies.access_token) {
    //   throw createError.Unauthorized("Access token is required");
    // }
    // req.auth = await authService.verifyAccessToken(req.cookies.access_token);

    if (!req.headers["x-auth"]) {
      throw createError.Unauthorized("Access token is required");
    }
    req.auth = await authService.verifyAccessToken(req.headers["x-auth"]);

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

async function signInDataValidation(req, res, next) {
  try {
    const { error } = SignInSchema.validate(req.body);

    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    const { email, password } = req.body;

    const user = await studentService.findOne({ email }, {});

    if (!user) {
      throw createError.NotFound("There is no student with such email");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      throw createError.Unauthorized("Incorrect password");
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authenticationCheck,
  signInDataValidation,
};
