const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  language: { type: String, default: "English" },
  city: { type: String },
  bio: { type: String, default: "" },
  tags: { type: [String], default: [] },
  tokens: { type: Number, default: 0 },
  role: { type: String, default: "user" },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("User", userSchema);
