import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Request Skill", path: "/dashboard/request" },
  { name: "Feed", path: "/dashboard/feed" },
  { name: "Friends", path: "/dashboard/friends" },
  { name: "Logout", path: "/logout" },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="min-h-screen w-64 bg-white border-r px-6 py-8 shadow-lg hidden md:block"
    >
      <h2 className="text-2xl font-bold mb-10 text-blue-600">SkillBridge</h2>
      <nav className="flex flex-col gap-4">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `py-2 px-4 rounded transition ${
                isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
