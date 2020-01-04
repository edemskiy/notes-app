const { Schema, Types, model } = require("mongoose");

const noteSchema = new Schema({
  title: { type: String },
  text: { type: String },
  labels: [{ type: String }],
  color: { type: String },
  createdAt: { type: Date },
  editedAt: { type: Date },
  isTrashed: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Note", noteSchema);
