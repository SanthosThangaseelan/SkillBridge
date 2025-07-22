const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Video = require("../models/Video");

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "skillbridge_videos",
    resource_type: "video",
    format: async () => "mp4", // force mp4
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const parser = multer({ storage });

// Upload route
router.post("/upload", parser.single("video"), async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { title, description, tags } = req.body;
    const tagsArray = tags.split(",").map(t => t.trim());

    const newVideo = new Video({
      user: req.session.userId,
      title,
      description,
      tags: tagsArray,
      videoUrl: req.file.path,
      thumbnailUrl: req.file.thumbnail_url || "", // optional if returned
    });

    await newVideo.save();

    res.status(201).json({ message: "Video uploaded", video: newVideo });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

router.get("/my", async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const myVideos = await Video.find({ user: req.session.userId }).sort({ uploadedAt: -1 });
    res.json(myVideos);
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    res.status(500).json({ message: "Could not fetch videos" });
  }
});

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "name").sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    res.status(500).json({ message: "Error loading videos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("user", "name") 
      .populate("comments.user", "name");  

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error fetching video" });
  }
});

router.put("/like/:id", async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Unauthorized" });

  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Not found" });

  const userId = req.session.userId;
  const alreadyLiked = video.likes.includes(userId);

  if (alreadyLiked) {
    video.likes.pull(userId);
  } else {
    video.likes.push(userId);
  }

  await video.save();
  res.json({ liked: !alreadyLiked, totalLikes: video.likes.length });
});

router.post("/comment/:id", async (req, res) => {
  const { text } = req.body;
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Not found" });

  video.comments.push({ user: req.session.userId, text });
  await video.save();

  res.json({ message: "Comment added" });
});

module.exports = router;
