// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Zap, Eye, Download } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Perfect Resume</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Create professional, modern resumes in minutes. Choose from beautiful templates, 
            preview in real-time, and download as PDF.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: FileText, title: "Easy Editing", desc: "Intuitive form with live preview" },
            { icon: Zap, title: "Instant Preview", desc: "See changes in real-time" },
            { icon: Eye, title: "Professional Design", desc: "Modern, clean templates" },
            { icon: Download, title: "PDF Export", desc: "Download high-quality PDF" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="card text-center p-6"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/builder">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Building Your Resume
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;