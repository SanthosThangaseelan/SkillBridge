import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos/my", { withCredentials: true })
      .then((res) => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">📁 My Uploaded Videos</h2>

      {loading ? (
        <p>Loading...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">You haven't uploaded any videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video._id} to={`/videos/${video._id}`}>
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <video
                  src={video.videoUrl}
                  className="w-full h-40 object-cover rounded"
                  controls
                  muted
                />
                <h3 className="text-lg font-semibold mt-2 truncate">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(video.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVideos;
