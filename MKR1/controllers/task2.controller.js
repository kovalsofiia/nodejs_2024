const task2Service = require("../services/task2.service");
const createError = require("http-errors");

async function createOperation(req, res, next) {
  try {
    const newOp = await task2Service.create(req.body);

    res.status(201).json({
      status: 201,
      message: "operation has been created successfully.",
      data: { newOp },
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getOperations(req, res, next) {
  try {
    const { searchString = "", page = 1, perPage = 10 } = req.query;
    const operations = await task2Service.find({ searchString, page, perPage });

    res.status(200).json({
      status: 200,
      message: "operations list loaded successfully.",
      data: operations,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getOperation(req, res, next) {
  try {
    const { opId } = req.params;
    const op = await task2Service.findById(opId);

    if (!op) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "operation has not been found.",
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "operation loaded successfully.",
      data: op,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function deleteOperation(req, res, next) {
  try {
    const { opId } = req.params;
    await task2Service.findByIdAndDelete(opId);

    res.status(200).json({
      status: 200,
      message: "operation has been deleted successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

module.exports = {
  createOperation,
  getOperations,
  getOperation,
  deleteOperation,
};
