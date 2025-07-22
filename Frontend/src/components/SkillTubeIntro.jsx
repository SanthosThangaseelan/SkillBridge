import React from "react";
import { motion } from "framer-motion";
import { FaPlayCircle, FaUpload, FaLightbulb } from "react-icons/fa";

const SkillTubeIntro = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md  mt-20 rounded-xl p-6 md:p-10 mb-10"
    >
      <h2 className="text-3xl md:text-4xl font-roboto font-extrabold text-blue-700 mb-4">
         Welcome to SkillTube
      </h2>

      <p className="text-gray-700 mb-6 text-lg leading-relaxed">
        SkillTube is your personal video library inside SkillBridge where learners and mentors
        can <strong>upload tutorials</strong>, <strong>share experiences</strong>, and
        <strong> grow their knowledge</strong> together!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div className="p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
          <FaPlayCircle className="text-blue-600 text-3xl mb-2" />
          <h4 className="font-bold text-lg">Watch & Learn</h4>
          <p className="text-sm mt-1">Browse videos shared by mentors across various skill domains.</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
          <FaUpload className="text-green-600 text-3xl mb-2" />
          <h4 className="font-bold text-lg">Upload Your Videos</h4>
          <p className="text-sm mt-1">Teach others by uploading your recorded tutorials and tips.</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
          <FaLightbulb className="text-yellow-500 text-3xl mb-2" />
          <h4 className="font-bold text-lg">Grow Together</h4>
          <p className="text-sm mt-1">Get recognized for your contributions and level up your profile.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillTubeIntro;
