const { Schema, Types, model } = require("mongoose");

const noteSchema = new Schema({
  title: { type: String },
  text: { type: String },
  labels: [{ type: String }],
  color: { type: String },
  createdAt: { type: Date },
  editedAt: { type: Date },
  trashedAt: { type: Date, default: new Date(0) },
  pinned: { type: Boolean, default: false },
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Note", noteSchema);
