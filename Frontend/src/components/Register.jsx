import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import registerImg from "../assets/register.jpg";
import Footer from "./Footer";

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    language: "",
    city: "",
    bio: "",
    tags: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      const tagsArray = form.tags.split(",").map((tag) => tag.trim());
      const payload = { ...form, tags: tagsArray };
      await axios.post("http://localhost:5000/api/auth/register", payload, {
        withCredentials: true,
      });
      setMessage({
        type: "success",
        text: "✅ Registered! Redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Registration failed",
      });
    }
  };

  const fields = [
    { type: "text", name: "name", placeholder: "Name" },
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "text", name: "phone", placeholder: "Phone Number" },
    { type: "text", name: "language", placeholder: "Language" },
    { type: "text", name: "city", placeholder: "City" },
    { type: "textarea", name: "bio", placeholder: "Short Bio" },
    { type: "text", name: "tags", placeholder: "Skills (comma-separated)" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl bg-white mt-10 shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-3">
          {/* 🖼️ Left Column (Image) */}
          <div className="hidden md:flex col-span-1 flex-col items-center justify-center bg-gradient-to-bl from-lime-50 to-blue-50 p-6">
            <motion.img
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              src={registerImg}
              alt="SkillBridge Registration"
              className="max-w-[330px]"
            />
            <h2 className="text-blue-700 font-bold mt-4">Join SkillBridge</h2>
            <p className="text-gray-600 text-sm mt-1 text-center">
              Learn. Teach. Grow together.
            </p>
          </div>

          {/* 📋 Right Column (Form) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 p-8 md:p-10"
          >
            <h2 className="text-3xl font-semibold font-roboto text-center mb-6 text-blue-700">
             Register
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, i) => (
                <motion.div
                  key={field.name}
                  custom={i}
                  variants={inputVariant}
                  initial="hidden"
                  animate="visible"
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={3}
                      required
                      onChange={handleChange}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      maxLength={field.name === "phone" ? 10 : 50}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </motion.div>
              ))}
            </div>

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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={registerUser}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-all duration-300"
            >
              Register
            </motion.button>

            <p className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>
            </p>
          </motion.div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Register;
