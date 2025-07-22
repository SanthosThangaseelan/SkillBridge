import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const RequestSkill = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    exchangeSkill: "",
    durationMinutes: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = async () => {
    const { title, description, tags, exchangeSkill, durationMinutes } = form;

    if (!title || !description || !tags || !exchangeSkill || !durationMinutes) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    if (isNaN(durationMinutes) || parseInt(durationMinutes) <= 0) {
      setMessage({ type: "error", text: "Duration must be greater than 0." });
      return;
    }

    try {
      const tagsArray = tags.split(",").map(tag => tag.trim());
      await axios.post("http://localhost:5000/api/skills", {
        ...form,
        tags: tagsArray,
        durationMinutes: parseInt(durationMinutes)
      }, { withCredentials: true });

      setMessage({ type: "success", text: "Skill request posted successfully!" });
      setForm({ title: "", description: "", tags: "", exchangeSkill: "", durationMinutes: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Submission failed. Try again." });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto my-10 bg-white rounded-2xl shadow-xl p-10"
    >
      <h2 className="text-3xl font-extrabold font-roboto text-blue-700 mb-8 text-center">
        Request a New Skill Session
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="title"
          placeholder="Skill you want to learn"
          className="input-field"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="exchangeSkill"
          placeholder="Skill you'll teach in return"
          className="input-field"
          value={form.exchangeSkill}
          onChange={handleChange}
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          className="input-field"
          value={form.tags}
          onChange={handleChange}
        />
        <input
          name="durationMinutes"
          type="number"
          placeholder="Duration (in minutes)"
          className="input-field"
          value={form.durationMinutes}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        rows={4}
        placeholder="Describe your learning goal in detail"
        className="input-field mt-6"
        value={form.description}
        onChange={handleChange}
      />

      {message.text && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm font-semibold ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        onClick={submitRequest}
        className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        Submit Request
      </button>
    </motion.div>
  );
};

export default RequestSkill;
