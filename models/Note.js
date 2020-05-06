const { Schema, Types, model } = require("mongoose");

const noteSchema = new Schema({
  title: { type: String, default: "" },
  text: { type: String, default: "" },
  labels: [{ type: String }],
  color: { type: String, default: "white" },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
  isTrashed: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Note", noteSchema);
