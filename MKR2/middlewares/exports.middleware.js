const createError = require("http-errors");

const {
  ExportCreateSchema,
} = require("../joi_validation_schemas/exports.schemas");

const multer = require("multer");

async function getTotal(req, res, next) {
  try {
    const { itemCount, itemAmount } = req.body;

    //ОБЧИСЛЕННЯ ЗАГАЛЬНОЇ ВАРТОСТІ ТА ДОДАВАННЯ ЇЇ У BODY.
    const total = itemAmount * itemCount;
    req.body.total = total;

    next();
  } catch (err) {
    next(err);
  }
}

async function checkDuplicateExport(req, res, next) {
  try {
    const { error } = ExportCreateSchema.validate(req.body);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    next();
  } catch (error) {
    next(error);
  }
}

const exportsUpload = multer().single("file");

async function checkDuplicateStudentFromFile(req, res, next) {
  try {
    const jsonData = JSON.parse(req.file.buffer.toString());

    const { error } = ExportCreateSchema.validate(jsonData);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTotal,
  checkDuplicateExport,
  exportsUpload,
  checkDuplicateStudentFromFile,
};
