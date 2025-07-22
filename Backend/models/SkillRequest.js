const mongoose = require("mongoose");

const skillRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  tags: [String],
  exchangeSkill: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed","unassigned", "assigned"], // ✅ Add "completed"
    default: "unassigned",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  scheduledAt: {
    type: Date,
    default: null,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SkillRequest", skillRequestSchema);
