const ExportsService = require("../services/exports.service");
const createError = require("http-errors");

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { json } = require("express");
const deleteFileAsync = promisify(fs.unlink);

async function createExport(req, res, next) {
  try {
    const newExport = await ExportsService.create(req.body);

    res.status(201).json({
      status: 201,
      message: "Export item has been created successfully.",
      data: { newExport },
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getExports(req, res, next) {
  try {
    res.status(200).json({
      status: 200,
      message: "Exports list loaded successfully.",
      data: await ExportsService.find(req.query),
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function getExport(req, res, next) {
  try {
    const { exportId } = req.params;
    const exportItem = await ExportsService.findById(exportId);

    if (!exportItem) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "Export item has not been found.",
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "Export loaded successfully.",
      data: exportItem,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function updateExport(req, res, next) {
  try {
    const { exportId } = req.params;
    const exportData = req.body;
    await ExportsService.findByIdAndUpdate(exportId, exportData);

    res.status(200).json({
      status: 200,
      message: "Export item updated successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function partiallyUpdateExport(req, res, next) {
  try {
    const { exportId } = req.params;
    const exportData = req.body;

    if (!exportId) {
      return res.status(400).json({
        status: 400,
        error: {
          message: "Export ID is required.",
        },
      });
    }

    const existingExport = await ExportsService.findById(exportId);
    if (!existingExport) {
      return res.status(404).json({
        status: 404,
        error: {
          message: "Export item has not been found.",
        },
      });
    }

    await ExportsService.patchById(exportId, exportData);
    const updatedExport = await ExportsService.findById(exportId);

    res.status(200).json({
      status: 200,
      message: "Export item has been updated successfully.",
      data: updatedExport,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function deleteExport(req, res, next) {
  try {
    const { exportId } = req.params;
    await ExportsService.findByIdAndDelete(exportId);

    res.status(200).json({
      status: 200,
      message: "Export item has been deleted successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function updateExport(req, res, next) {
  try {
    const { exportId } = req.params;

    // Check if req.file contains the uploaded file
    if (!req.file || !req.file.filename) {
      throw createError.BadRequest("File is missing or invalid.");
    }

    const exportItem = await ExportsService.findById(exportId);

    if (!exportItem) {
      throw createError.NotFound("Export item not found.");
    }
    //ТУТ ДОПИСАТИ КОД ДЛЯ ЦІЛОГО ОБЄКТУ

    // Delete previous profile picture if it exists
    if (exportItem.profilePicture) {
      const filePath = path.join(
        __dirname,
        "..",
        "MKR2",
        "public",
        "profilePictures",
        exportItem.profilePicture
      );
      await deleteFileAsync(filePath); // Delete the existing file
    }

    console.log(req.file);
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "profilePictures",
      `${req.file.filename}.${String(req.file.mimetype).split("/")[1]}`
    );

    const updatedExport = await ExportsService.findByIdAndUpdate(exportId, {
      profilePicture: req.file.filename,
    });

    if (!updatedExport) {
      throw createError.InternalServerError("Failed to update export item.");
    }

    res.status(200).json({
      status: 200,
      message: "Export item updated successfully.",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

async function uploadExports(req, res, next) {
  try {
    console.log(req.file);
    const jsonData = JSON.parse(req.file.buffer.toString());
    console.log(jsonData);

    //create from json data
    const newExport = await ExportsService.create(jsonData);
    res.status(201).json({
      status: 201,
      data: newExport,
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
}

module.exports = {
  createExport,
  getExports,
  getExport,
  updateExport,
  partiallyUpdateExport,
  deleteExport,
  updateExport,
  uploadExports,
};
