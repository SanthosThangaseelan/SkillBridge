// routes/friends.js
const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Not logged in" });

  try {
    const user = await User.findById(req.session.userId).populate("friends", "name email language");
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: "Failed to load friends" });
  }
});
router.get("/suggest", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userId);
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    const suggestions = await User.find({
      _id: { $ne: currentUser._id },
      language: currentUser.language,
      _id: { $nin: currentUser.friends } // not already friends
    }).select("name email language").limit(5);

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: "Suggestion failed" });
  }
});
router.put("/add", async (req, res) => {
  const { friendId } = req.body;

  try {
    await User.findByIdAndUpdate(req.session.userId, {
      $addToSet: { friends: friendId }
    });
    await User.findByIdAndUpdate(friendId, {
      $addToSet: { friends: req.session.userId }
    });
    res.json({ message: "Friend added" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add friend" });
  }
});


module.exports = router;
