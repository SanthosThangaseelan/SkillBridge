import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaVideo, FaUpload, FaFolder, FaHome, FaBars, FaTimes } from "react-icons/fa";

const SkillTubeLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            🎬 SkillTube
          </h1>

          {/* Hamburger Toggle for small devices */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-blue-700">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-600">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }
            >
              <FaHome className="inline mr-1 mb-1" /> Home
            </NavLink>
            <NavLink
              to="/videos/Allvideos"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }
            >
              <FaVideo className="inline mr-1 mb-1" /> Watch
            </NavLink>
            <NavLink
              to="/videos/upload"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }
            >
              <FaUpload className="inline mr-1 mb-1" /> Upload
            </NavLink>
            <NavLink
              to="/videos/my"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }
            >
              <FaFolder className="inline mr-1 mb-1" /> My Videos
            </NavLink>
          </nav>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white px-4 py-4 border-t shadow-sm space-y-4">
            <NavLink
              to="/dashboard"
              onClick={toggleMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              <FaHome className="inline mr-2 mb-1" /> Home
            </NavLink>
            <NavLink
              to="/videos/Allvideos"
              onClick={toggleMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              <FaVideo className="inline mr-2 mb-1" /> Watch
            </NavLink>
            <NavLink
              to="/videos/upload"
              onClick={toggleMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              <FaUpload className="inline mr-2 mb-1" /> Upload
            </NavLink>
            <NavLink
              to="/videos/my"
              onClick={toggleMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              <FaFolder className="inline mr-2 mb-1" /> My Videos
            </NavLink>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SkillTubeLayout;
