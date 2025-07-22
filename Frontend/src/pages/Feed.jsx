import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Feed = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => setUserId(res.data._id));

    axios.get("http://localhost:5000/api/skills", { withCredentials: true })
      .then(res => setRequests(res.data));
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-10 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold font-roboto text-blue-700 mb-8 text-center">
          Skill Requests Feed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests
            .filter(req => req.status !== "completed")
            .map((req, i) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`shadow-sm rounded-xl p-6 border transition-all duration-300
          ${req.scheduledAt
                    ? "bg-green-50 border-green-200 hover:shadow-green-300"
                    : "bg-white border-blue-100 hover:shadow-md"}
        `}
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2">{req.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {req.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="font-medium">{req.user.name}</span>
                  <span>{req.user.language}</span>
                </div>
                {req.scheduledAt && (
                  <p className="text-sm text-green-700 font-medium mb-2">
                    📅 Scheduled on: {new Date(req.scheduledAt).toLocaleString()}
                  </p>
                )}
                <Link
                  to={`/dashboard/feed/${req._id}`}
                  className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm w-full transition"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
        </div>

      </div>
    </motion.main>
  );
};

export default Feed;
