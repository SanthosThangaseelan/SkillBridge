import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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

  if (!user) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700">My Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Language:</strong> {user.language}</div>
        <div><strong>City:</strong> {user.city}</div>
        <div className="md:col-span-2">
          <strong>Bio:</strong>
          <p className="mt-1">{user.bio || "No bio added."}</p>
        </div>
        <div className="md:col-span-2">
          <strong>Skills:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.tags?.map((tag, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
