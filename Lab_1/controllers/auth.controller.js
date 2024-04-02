const createError = require("http-errors");
const bcrypt = require("bcrypt");
const studentService = require("../services/students.service");
const authService = require("../services/auth.service");
const { SignInSchema } = require("../joi_validation_schemas/auth.schemas");

async function signIn(req, res, next) {
  try {
    const { email } = req.body;

    const user = await studentService.findOne({ email });

    const accessToken = await authService.signAccessToken(user);

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
