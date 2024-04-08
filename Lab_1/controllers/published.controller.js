const publishedService = require("../services/published.service");
const createError = require("http-errors");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

async function createPublished(req, res, next) {
  try {
    const newPublished = await publishedService.create({
      ...req.body,
      createdBy: req.auth.id,
    });

    res.status(201).json({
      status: 201,
      message: "Published has been created successfully.",
      data: { newPublished },
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getPublished(req, res, next) {
  try {
    res.status(200).json({
      status: 200,
      message: "Published list loaded successfully.",
      data: await publishedService.find({
        ...req.query,
        createdBy: req.auth.id,
      }),
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}
module.exports = { createPublished, getPublished };
