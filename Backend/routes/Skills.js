const router = require("express").Router();
const SkillRequest = require("../models/SkillRequest");
const User = require('../models/User');
require("dotenv").config();
const { sendAssignmentMail } = require("../utils/mailer");
//const { sendWhatsAppMessage } = require("../utils/whatsapp");
const moment = require("moment");



// Create request
router.post("/", async (req, res) => {
  const { title, description, tags, exchangeSkill, durationMinutes } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newRequest = new SkillRequest({
      user: req.session.userId,
      title,
      description,
      tags,
      exchangeSkill,
      durationMinutes
    });

    await newRequest.save();
    res.status(201).json({ message: "Skill request submitted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post skill request" });
  }
});
// GET /api/skills/:id - fetch one request with user details
router.get("/:id", async (req, res) => {
  try {
    const request = await SkillRequest.findById(req.params.id).populate("user", "name language email");
    if (!request) return res.status(404).json({ message: "Skill request not found" });

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching skill request" });
  }
});

// Assign request

router.put("/assign/:id", async (req, res) => {
  const { scheduledAt } = req.body;

  if (!req.session.userId)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    // Fetch the skill request
    const skill = await SkillRequest.findById(req.params.id).populate("user");
    const assigner = await User.findById(req.session.userId);

    if (!skill || !assigner)
      return res.status(404).json({ message: "Invalid request or user" });

    // Prevent assigning own request
    if (skill.user._id.equals(assigner._id))
      return res.status(400).json({ message: "You cannot assign your own request" });

    // Update the skill request
    skill.status = "assigned";
    skill.assignedTo = assigner._id;
    skill.scheduledAt = scheduledAt;
    await skill.save();

    // Re-fetch with full population
    const updatedSkill = await SkillRequest.findById(req.params.id)
      .populate("user")
      .populate("assignedTo");

    // Send email to requester
    if (updatedSkill && updatedSkill.user?.email) {
      const sessionLink = `http://localhost:5173/session/${updatedSkill._id}`;
      const scheduled = updatedSkill.scheduledAt
        ? new Date(updatedSkill.scheduledAt).toLocaleString()
        : "Not yet scheduled";

      await sendAssignmentMail(
        updatedSkill.user.email,
        "📌 Your SkillBridge Request Has Been Assigned!",
        `
        <h2>Hey ${updatedSkill.user.name},</h2>
        <p>Your request "<strong>${updatedSkill.title}</strong>" has been accepted by <strong>${updatedSkill.assignedTo.name}</strong>.</p>
        <p><strong>Scheduled:</strong> ${scheduled}</p>
        <a href="${sessionLink}" style="padding: 10px 15px; background-color: #4f46e5; color: white; border-radius: 6px; text-decoration: none;">🎥 Join Your Session</a>
        <br/><br/>
        <p>Happy Learning!<br/>– SkillBridge Team</p>
        `
      );
    }

    res.json({ message: "Assigned and scheduled successfully", skill: updatedSkill });

  } catch (err) {
    console.error("Assignment failed:", err);
    res.status(500).json({ message: "Internal error" });
  }
});


router.put("/unassign/:id", async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const request = await SkillRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Not found" });
    if (request.assignedTo?.toString() !== req.session.userId) {
      return res.status(403).json({ message: "Not your assignment" });
    }

    request.status = "unassigned";
    request.assignedTo = null;
    await request.save();

    res.json({ message: "Assignment cancelled", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to unassign" });
  }
});

router.put("/complete/:id", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const skill = await SkillRequest.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: "Request not found" });

    // Only allowed for users involved
    if (
      !skill.user.equals(req.session.userId) &&
      !skill.assignedTo.equals(req.session.userId)
    ) {
      return res.status(403).json({ message: "You are not part of this session" });
    }

    skill.status = "completed";
    await skill.save();

    res.json({ message: "Session marked as completed" });
  } catch (err) {
    console.error("❌ Completion error:", err);
    res.status(500).json({ message: "Failed to mark complete" });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const request = await SkillRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only the owner can delete
    if (!request.user.equals(req.session.userId)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Only if unassigned
    if (request.status !== "unassigned") {
      return res.status(400).json({ message: "Cannot delete assigned or completed request" });
    }

    await SkillRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});


//  GET all skill requests
router.get("/", async (req, res) => {
  try {
    const allRequests = await SkillRequest.find()
      .populate("user", "name email")
      .populate("assignedTo", "name email");
    res.json(allRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch skill requests" });
  }
});

module.exports = router;
