import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Banner from '../assets/banner1.jpg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
      <div className="bg-gradient-to-br from-white to-blue-50 min-h-screen mt-10 text-gray-800">
        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-12 gap-12">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold  mb-5 font-roboto leading-snug">
              Unlock <span className="text-blue-600">Skill Power</span><br />
              through Real-Time Collaboration
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Join SkillBridge — where passionate learners and mentors connect,
              exchange skills, and grow through live video sessions.
            </p>
            <div className="flex gap-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition"
                >
                  Login
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={Banner}
              alt="SkillBridge collaboration"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </motion.div>
        </div>

        {/* Why SkillBridge Section */}
        <div className="bg-white py-16 px-6 md:px-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-roboto font-bold text-center mb-12 text-gray-800"
          >
            Why Choose <span className="text-blue-600">SkillBridge?</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real Skill Exchange",
                desc: "Post what you want to learn, and help others in return. Everyone grows together!"
              },
              {
                title: "Live Video Sessions",
                desc: "Connect in real-time with mentors and peers to share knowledge instantly."
              },
              {
                title: "Gamified Progress",
                desc: "Earn tokens and badges for every session. Unlock profile levels and leaderboard ranks."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.1 }}
                className="bg-blue-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Explore More Section */}
        <div className="bg-blue-50 py-16 px-6 md:px-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold font-roboto text-center mb-10 text-blue-800"
          >
            Explore More
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center"
            >
              <h3 className="text-xl font-semibold font-roboto text-blue-700 mb-2">About SkillBridge</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Discover our mission, vision, and how SkillBridge empowers people to grow together.
              </p>
              <Link
                to="/about"
                className="inline-block mt-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Read More
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center"
            >
              <h3 className="text-xl font-semibold font-roboto text-blue-700 mb-2">How It Works</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Step-by-step instructions to guide users from signup to creating real video sessions.
              </p>
              <Link
                to="/instructions"
                className="inline-block mt-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Guide
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Home;
