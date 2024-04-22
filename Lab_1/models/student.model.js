const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Number,
    },
    group: {
      type: String,
      trim: true,
    },
    faculty: {
      type: String,
      trim: true,
    },
    averageGrade: {
      type: Number,
    },
    workplace: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    lastLoginAt: {
      type: Date,
    },
    reminderWater: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("students", studentSchema);
