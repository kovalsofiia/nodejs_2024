const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    lastName: {
      type: String,
      trim: true,
    },
    yearOfBirth: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("student", studentSchema);
