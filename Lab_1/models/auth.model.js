const { Schema, model } = require("mongoose");
const authSchema = new Schema({
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});
module.exports = model("auths", authSchema);
