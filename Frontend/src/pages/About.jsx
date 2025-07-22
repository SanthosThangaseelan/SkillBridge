import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/about.jpeg"; // Use a nice illustration or SVG
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-12">
      
      {/* Left Side: Image */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 mb-10 md:mb-0 flex justify-center"
      >
        <img
          src={aboutImg}
          alt="Skill Sharing Illustration"
          className="max-w-[400px] w-full rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Right Side: Content */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-white p-8 md:p-10 rounded-2xl shadow-md"
      >
        <h1 className="text-3xl md:text-4xl font-roboto font-extrabold text-blue-700 mb-6">
          What is SkillBridge?
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>SkillBridge</strong> is your gateway to collaborative, real-time learning. Whether you're here to
          <span className="text-blue-600 font-semibold"> learn a new skill </span>
          or
          <span className="text-blue-600 font-semibold"> share your expertise</span>, this platform empowers you to grow with peers around the world.
        </p>

        <p className="text-gray-600 text-md leading-relaxed mb-4">
          💡 Join live video sessions, build real connections, and turn knowledge into community. No recorded lectures — just pure, human interaction.
        </p>

        <p className="text-gray-600 text-md leading-relaxed mb-4">
          🎓 Learn anything — from programming, design, music, language, to even niche hobbies. Our gamified system encourages consistent engagement, recognition, and growth.
        </p>

        <p className="text-gray-600 text-md leading-relaxed">
          🌍 At SkillBridge, everyone can be a mentor. Empower others by teaching, earn tokens, get badges, and build your profile in a space where your knowledge has value.
        </p>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
