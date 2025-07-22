import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const links = [
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Request", path: "/dashboard/request" },
  { name: "Feed", path: "/dashboard/feed" },
  { name: "Assignments", path: "/dashboard/assignments" },
  { name: "My Requests", path: "/dashboard/myrequests" },
  { name: "Friends", path: "/dashboard/friends" },
  //{ name: "Suggested Friends", path: "/dashboard/suggest-friends" },
  { name: "🎬 SkillTube", path: "/videos" },
  //{ name: "📁 My Videos", path: "/videos/my" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-gray-100 border-r shadow-md p-6 z-30">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">SkillBridge</h2>
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `py-2 px-4 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          transition={{ duration: 0.3 }}
          className="fixed md:hidden top-0 left-0 h-full w-64 bg-white z-50 shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-700">SkillBridge</h2>
            <button onClick={toggleSidebar} className="text-xl text-gray-600">
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `py-2 px-4 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={() => {
                toggleSidebar();
                fetch("http://localhost:5000/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                }).then(() => window.location.href = "/login");
              }}
              className="mt-4 text-red-500 hover:text-red-600 font-medium text-left"
            >
              Logout
            </button>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
