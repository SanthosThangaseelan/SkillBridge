const router = require("express").Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const { from, to, message } = req.body;
  try {
    const saved = await Message.create({ from, to, message });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving message" });
  }
});

router.get("/:friendId", async (req, res) => {
  const userId = req.session.userId;
  const friendId = req.params.friendId;
  try {
    const messages = await Message.find({
      $or: [
        { from: userId, to: friendId },
        { from: friendId, to: userId }
      ]
    }).sort("timestamp");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
