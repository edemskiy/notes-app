const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: Types.ObjectId, ref: "Note" }]
});

module.exports = model("User", userSchema);
