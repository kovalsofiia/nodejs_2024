const taskService = require("../services/task.service");
const createError = require("http-errors");

async function createTriangle(req, res, next) {
  try {
    const newTriangle = await taskService.create(req.body);

    res.status(201).json({
      status: 201,
      message: "triangle has been created successfully.",
      data: { newTriangle },
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getTriangles(req, res, next) {
  try {
    const { searchString = "", page = 1, perPage = 10 } = req.query;
    const triangles = await taskService.find({ searchString, page, perPage });

    res.status(200).json({
      status: 200,
      message: "Triangles list loaded successfully.",
      data: triangles,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getTriangle(req, res, next) {
  try {
    const { triangleId } = req.params;
    const triangle = await taskService.findById(triangleId);

    if (!triangle) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "triangle has not been found.",
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "triangle loaded successfully.",
      data: triangle,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function deleteTriangle(req, res, next) {
  try {
    const { triangleId } = req.params;
    await taskService.findByIdAndDelete(triangleId);

    res.status(200).json({
      status: 200,
      message: "triangle has been deleted successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

module.exports = {
  createTriangle,
  getTriangles,
  getTriangle,
  deleteTriangle,
};
