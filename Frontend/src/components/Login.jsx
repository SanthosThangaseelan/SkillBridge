import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import loginImg from "../assets/log-in banner.jpg"; 
import Footer from "./Footer";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form, {
        withCredentials: true,
      });
      setMessage({ type: "success", text: "✅ Login successful!" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl  overflow-hidden grid md:grid-cols-2">
          
          {/* Left: Image/Illustration (visible only on md and above) */}
          <div className="hidden md:flex flex-col justify-center  items-center bg-blue-50 p-14">
            <motion.img
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              src={loginImg}
              alt="Login visual"
              className="w-full max-w-sm max-h-96"
            />
            <h2 className="text-blue-700 font-roboto text-xl font-bold mt-4">
              Welcome Back to SkillBridge!
            </h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              Continue learning, teaching, and building together.
            </p>
          </div>

          {/* Right: Login Form */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-10"
          >
            <h2 className="text-3xl font-semibold font-roboto text-center mb-6 text-blue-700">
              Login
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />

            <button
              onClick={loginUser}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              Login
            </button>

            {message.text && (
              <div
                className={`mt-4 p-3 rounded text-sm text-center font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 underline">
                Register
              </a>
            </p>
          </motion.div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
