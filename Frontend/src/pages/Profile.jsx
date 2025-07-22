import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhoneAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBriefcase,
  FaQuoteLeft,
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <div className="text-center py-10 text-gray-500">Loading profile...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-1/2 py-16 px-6  flex items-start justify-center"
    >
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md border border-blue-100 shadow-2xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Side */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-blue-700">{user.name}</h2>
          <p className="text-gray-600 flex items-center gap-2 text-sm">
            <FaEnvelope className="text-blue-500" />
            {user.email}
          </p>
          <p className="text-gray-500 flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-blue-500" />
            {user.city || "Unknown Location"}
          </p>
        </div>

        {/* Right Side */}
        <div className="md:col-span-2 grid gap-6 text-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <FaPhoneAlt className="text-blue-500" />
                Phone
              </label>
              <p className="font-medium">{user.phone || "Not Provided"}</p>
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <FaGlobe className="text-blue-500" />
                Language
              </label>
              <p className="font-medium">{user.language || "Not Provided"}</p>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <FaQuoteLeft className="text-blue-500" />
              Bio
            </label>
            <p className="text-gray-700 leading-relaxed text-sm">
              {user.bio || "No bio provided."}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <FaBriefcase className="text-blue-500" />
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {user.tags?.length > 0 ? (
                user.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No skills listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
