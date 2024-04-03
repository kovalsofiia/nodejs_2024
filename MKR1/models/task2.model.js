const { Schema, model } = require("mongoose");

const task2Schema = new Schema(
  {
    a: { type: Number, required: true },
    n: { type: Number, required: true },
    answer: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("operations", task2Schema);
