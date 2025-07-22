import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Instructions = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-40 pb-16 bg-gradient-to-br from-purple-50 via-white to-blue-100 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-10 justify-center items-start"
        >
          {/* Getting Started Section */}
          <section className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-blue-300 hover:shadow-md transition-transform hover:scale-95 duration-300">
            <h1 className="text-3xl md:text-4xl font-roboto font-bold text-blue-700 mb-6">
              Getting Started
            </h1>
            <ul className="list-disc ml-5 space-y-4 text-gray-700 px-5 text-base leading-relaxed">
              <li> Register and complete your profile to get started.</li>
              <li> Browse or request the skills you want to learn.</li>
              <li> Accept a skill request and become someone’s mentor.</li>
              <li> Schedule a video session. The other user will be notified.</li>
              <li> Attend your session and give/receive help live!</li>
              <li> Upload recorded tutorials to SkillTube.</li>
              <li> Earn badges, grow your reputation, and inspire others.</li>
            </ul>
          </section>

          {/* Community Guidelines Section */}
          <section className="flex-1 bg-blue-50 p-8 rounded-2xl shadow-sm border border-blue-200 hover:shadow-md transition-transform hover:scale-95 duration-300">
            <h2 className="text-3xl font-bold font-roboto text-blue-700 mb-6">Community Guidelines</h2>
            <ul className="list-disc ml-5 space-y-4 text-gray-700 text-base p-6 leading-relaxed">
              <li> Always be respectful to learners and mentors.</li>
              <li> Avoid offensive, inappropriate, or misleading content.</li>
              <li> Do not share personal or sensitive information unnecessarily.</li>
              <li> Focus on adding value during live sessions and uploads.</li>
              <li> Encourage, support, and celebrate skill growth in others.</li>
              <li> Report any abuse or misconduct to the SkillBridge team.</li>
            </ul>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Instructions;
