import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";

const WatchVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
      setVideo(res.data);
    };
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
    };

    fetchVideo();
    fetchUser();
  }, [id]);

  const toggleLike = async () => {
    await axios.put(`http://localhost:5000/api/videos/like/${id}`, {}, { withCredentials: true });
    const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
    setVideo(res.data);
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    await axios.post(`http://localhost:5000/api/videos/comment/${id}`, { text: comment }, { withCredentials: true });
    const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
    setVideo(res.data);
    setComment("");
  };

  if (!video) return <div className="p-10 text-center text-gray-600">Loading video...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Video Player */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <video src={video.videoUrl} className="w-full" controls />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h1>
          <p className="text-gray-600 text-sm mb-2">{video.description}</p>
          <p className="text-sm text-gray-500">Uploaded by: <span className="font-medium">{video.user?.name}</span></p>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={toggleLike}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition"
            > 
              <FaThumbsUp className="inline mb-1.5"/>  {video.likes?.length || 0}
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white p-6 shadow-sm rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            Post
          </button>
        </div>

        <div className="space-y-4">
          {[...video.comments].reverse().map((c, i) => (
            <div key={i} className="border-b pb-3">
              <p className="text-sm font-semibold text-gray-700">
                {c.user?.name || "User"}
              </p>
              <p className="text-sm text-gray-600 mt-1">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
