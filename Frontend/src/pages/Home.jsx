import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Banner from '../assets/Banner.jpeg'

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen text-gray-800">
      {/* Hero */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center px-8 md:px-20 py-16">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-600">SkillBridge</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A collaborative learning platform where you exchange skills, connect with mentors, and grow together – all through real-time video learning!
          </p>
          <div className="flex gap-4">
            <Link to="/register">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">Register</button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Login</button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img src={Banner} alt="collaboration" className="w-full max-w-md" />
        </motion.div>
      </div>

      {/* Why SkillBridge Section */}
      <div className="bg-white py-14 px-8 md:px-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          Why <span className="text-blue-600">SkillBridge?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold mb-2">Real Skill Exchange</h3>
            <p>Post what you want to learn and help others in return. Everyone grows together!</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold mb-2">Video Sessions</h3>
            <p>Directly connect with friends or mentors via smooth real-time video sessions.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold mb-2">Earn & Unlock</h3>
            <p>Earn tokens by helping. Unlock badges, profile upgrades, and leaderboard status.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
