import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

const links = [
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Request", path: "/dashboard/request" },
  { name: "Feed", path: "/dashboard/feed" },
  { name: "Assignments", path: "/dashboard/assignments" },
  { name: "My Requests", path: "/dashboard/myrequests" },
  { name: "Friends", path: "/dashboard/friends" },
  //{ name: "Suggested", path: "/dashboard/suggest-friends" },
  { name: "🎬 SkillTube", path: "/videos" },
  //{ name: "📁 My Videos", path: "/videos/my" },
];

const DashboardNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-40 bg-white border-b border-blue-600 shadow-sm flex items-center justify-between px-4 md:px-8 py-3"
    >
      {/* Left: Brand + Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-blue-600 md:hidden"
        >
          <FaBars />
        </button>
        <Link
          to="/dashboard"
          className="text-xl font-extrabold font-roboto text-blue-700 tracking-wide"
        >
          SkillBridge
        </Link>
      </div>

      {/* Right: Full nav links for md+ */}
      <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-700">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-blue-600 transition ${location.pathname === link.path ? "text-blue-600 font-semibold" : ""
              }`}
          >
            {link.name}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 font-medium transition"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardNavbar;
