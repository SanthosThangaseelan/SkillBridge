import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 md:px-20 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Section 1 */}
        <div>
          <h3 className="text-xl font-bold mb-2">SkillBridge</h3>
          <p className="text-sm text-gray-300">
            Bridging skills across the world – learn, teach, and grow together.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/instructions" className="hover:underline">Instructions</Link></li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" title="LinkedIn" className="hover:text-gray-300">🔗</a>
            <a href="#" title="Twitter" className="hover:text-gray-300">🐦</a>
            <a href="#" title="GitHub" className="hover:text-gray-300">💻</a>
            <a href="#" title="YouTube" className="hover:text-gray-300">📺</a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} SkillBridge | Built with 💙 by Santhosh Thangaseelan
      </div>
    </footer>
  );
};

export default Footer;
