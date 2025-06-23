import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 }
  })
};

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", language: "", city: "", bio: "", tags: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      const tagsArray = form.tags.split(",").map(tag => tag.trim());
      const payload = { ...form, tags: tagsArray };
      await axios.post("http://localhost:5000/api/auth/register", payload, { withCredentials: true });
      
      setMessage({ type: "success", text: "✅ Registration successful! Redirecting to login..." });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Registration failed"
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
    { type: "text", name: "tags", placeholder: "Skills (comma-separated)" }
  ];

  return (
    <motion.div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.01 }}
        className="bg-white p-8 m-5 rounded-2xl shadow-2xl w-full max-w-xl"
      >
        <h2 className="text-3xl font-extrabold font-roboto text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        {fields.map((field, i) => (
          <motion.div key={field.name} custom={i} variants={inputVariant} initial="hidden" animate="visible" className="mb-4">
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                required
                className="w-full p-3 border focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-none"
                rows={3}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                required
                maxLength={field.name === "phone" ? 10 : 50}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            )}
          </motion.div>
        ))}

        {message.text && (
          <div className={`mb-4 p-3 rounded text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {message.text}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={registerUser}
          className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg w-full font-semibold shadow-md transition-all duration-300"
        >
          Register
        </motion.button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
