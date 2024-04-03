const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    side1: { type: Number, required: true },
    side2: { type: Number, required: true },
    side3: { type: Number, required: true },
    area: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("triangles", taskSchema);
