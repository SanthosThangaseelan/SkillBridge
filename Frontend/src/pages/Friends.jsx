import React from "react";
import { motion } from "framer-motion";

const Friends = () => {
  const friends = [
    { name: "Ashwin", city: "Chennai" },
    { name: "Meena", city: "Madurai" },
  ];

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Your Friends</h2>
      <ul className="space-y-4">
        {friends.map((friend, index) => (
          <li key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{friend.name}</h3>
              <p className="text-gray-500 text-sm">{friend.city}</p>
            </div>
            <button className="text-sm text-blue-600 hover:underline">Chat</button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Friends;
