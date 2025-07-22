import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkillTubeIntro from "../components/SkillTubeIntro";

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/videos")
      .then(res => setVideos(res.data));
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(search.toLowerCase()) ||
    video.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    video.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      

      <div className="flex justify-between items-center flex-wrap mb-6 gap-4">
        <h2 className="text-2xl font-bold text-orange-700">All Videos</h2>
        <input
          type="text"
          placeholder="Search by title, creator, or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <Link key={video._id} to={`/videos/${video._id}`}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="w-full h-44 bg-black">
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    controls
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">By {video.user?.name}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 mt-8">No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default AllVideos;
