import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
    { name: "About", path: "/about" },
    { name: "Instructions", path: "/instructions" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-roboto font-bold text-blue-600">
                    Skill<span className="text-indigo-800">Bridge</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-sm font-medium ${pathname === item.path
                                    ? "text-blue-700 border-b-2 border-blue-600 pb-1"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-gray-600 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden px-6 pb-4"
                    >
                        {navItems.map((item) => (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden px-6 pb-4"
                            >
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`block py-2 text-sm ${pathname === item.path
                                            ? "text-blue-700 font-semibold"
                                            : "text-gray-600 hover:text-blue-600"
                                        }`}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
