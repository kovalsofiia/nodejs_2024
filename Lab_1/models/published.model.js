const { Schema, model } = require("mongoose");
const publishedSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    publishedBody: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("published", publishedSchema);
