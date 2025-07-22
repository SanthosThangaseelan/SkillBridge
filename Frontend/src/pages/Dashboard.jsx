import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto mt-20 p-6 bg-red-50 border border-red-200 rounded-xl shadow-lg text-center"
      >
        <div className="text-4xl mb-3">⚠️</div>
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Session Expired or Not Logged In
        </h2>
        <p className="text-gray-600 mb-4">
          You must be logged in to access this page. Please log in again to continue.
        </p>
        <a
          href="/login"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Go to Login
        </a>
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardNavbar toggleSidebar={toggleSidebar} />

        {/* Main content below navbar */}
        <main className="pt-20 px-4 pb-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
