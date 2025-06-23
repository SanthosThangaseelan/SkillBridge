import React, { useState } from "react";
import { motion } from "framer-motion";

const RequestSkill = () => {
  const [form, setForm] = useState({
    title: "", description: "", tags: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = () => {
    // TODO: connect with backend POST /api/skills
    console.log("Submitted:", form);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Request a Skill</h2>
      <input
        name="title"
        placeholder="Skill Title"
        className="input mb-4"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Describe what you want to learn..."
        rows={4}
        className="input mb-4 resize-none"
        onChange={handleChange}
      />
      <input
        name="tags"
        placeholder="Tags (comma-separated)"
        className="input mb-4"
        onChange={handleChange}
      />
      <button
        onClick={submitRequest}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </motion.div>
  );
};

export default RequestSkill;
