import React from "react";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-blue-100 shadow-xl rounded-xl p-10 text-center max-w-md w-full"
      >
        <div className="text-blue-600 text-5xl mb-4 flex justify-center">
          <FaTools />
        </div>
        <h1 className="text-3xl font-bold font-roboto text-blue-700 mb-2">Coming Soon</h1>
        <p className="text-gray-600 text-sm mb-6">
          We’re building something awesome! This feature is under development and will be available shortly. Stay tuned!
        </p>
        <div className="animate-pulse text-sm text-blue-500">
          🚧 Feature in progress...
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
