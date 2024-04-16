const createError = require("http-errors");
const bcrypt = require("bcrypt");
const studentService = require("../services/students.service");
const authService = require("../services/auth.service");
const { SignInSchema } = require("../joi_validation_schemas/auth.schemas");

async function signIn(req, res, next) {
  try {
    const { error } = SignInSchema.validate(req.body);

    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    const { email, password } = req.body;

    const user = await studentService.findOne({ email });

    if (!user) {
      throw createError.NotFound("There is no student with such email");
    }

    // Log the retrieved user object for debugging
    console.log("Retrieved user:", user);

    const passwordCheck = bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      throw createError.Unauthorized("Incorrect password");
    }

    const accessToken = await authService.signAccessToken(user);
    await usersService.findByIdAndUpdate(user.id, { lastLoginAt: Date.now() });

    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(201)
      .json({
        status: 201,
        data: { accessToken },
      });
  } catch (err) {
    next(err);
  }
}

async function signOut(req, res, next) {
  try {
    res.clearCookie("access_token").status(200).json({
      status: 200,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signIn,
  signOut,
};
