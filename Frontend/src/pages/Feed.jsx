import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Feed = () => {
  const [skills, setSkills] = useState([
    { title: "Learn JavaScript", description: "I want to master JS for web dev.", tags: ["js", "web"] },
    { title: "Python Basics", description: "Need help with loops and functions", tags: ["python", "beginner"] }
  ]);

  // TODO: Fetch from backend via axios
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Skill Feed</h2>
      {skills.map((skill, index) => (
        <div key={index} className="bg-white p-6 mb-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800">{skill.title}</h3>
          <p className="text-gray-600 mt-1">{skill.description}</p>
          <div className="mt-2 flex gap-2">
            {skill.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-sm text-blue-700 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Feed;
