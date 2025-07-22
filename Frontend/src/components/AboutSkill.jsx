import { motion } from "framer-motion";
import learn from "../assets/learn.svg";
import help from "../assets/help.svg";

const roles = [
  {
    title: "Learner",
    desc: "Post what you want to learn and find skill buddies who can teach you in live sessions.",
    img: learn,
  },
  {
    title: "Helper",
    desc: "Help others by teaching your skills and earn tokens, badges, and recognition.",
    img: help,
  },
];

const AboutSkillBridge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-6 py-16 md:px-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-roboto text-blue-700 mb-4">
          Welcome to SkillBridge!
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          SkillBridge is a collaborative learning platform where you can{" "}
          <strong>request help</strong> with skills you're learning or{" "}
          <strong>offer help</strong> in areas you're confident. Connect
          through live video calls, chat with partners, and grow together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {roles.map((role, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-lg border border-blue-100 p-8 rounded-2xl shadow-xl text-center"
          >
            <img
              src={role.img}
              alt={role.title}
              className="w-36 h-36 mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              {role.title}
            </h3>
            <p className="text-gray-600">{role.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutSkillBridge;
