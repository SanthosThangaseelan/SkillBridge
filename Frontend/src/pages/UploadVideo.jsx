import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video || !form.title.trim()) {
      return setMessage("Title and video file are required.");
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tags", form.tags);

    try {
      const res = await axios.post("http://localhost:5000/api/videos/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        }
      });

      setMessage("✅ Upload successful!");
      setForm({ title: "", description: "", tags: "" });
      setVideo(null);
      setProgress(0);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    }

    setUploading(false);
  };

  return (
    <motion.div
      className="min-h-screen py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold font-roboto text-purple-700 mb-6">
          Upload Your Skill Video
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Video Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Short Description"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={form.tags}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="video/*"
            className="w-full p-2 border rounded-md"
            onChange={handleFileChange}
          />

          {progress > 0 && (
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-3"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded text-sm font-medium ${message.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}>
              {message}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
              }`}
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadVideo;
