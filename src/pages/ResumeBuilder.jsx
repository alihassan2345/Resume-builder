// src/pages/ResumeBuilder.jsx
import { motion } from 'framer-motion';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import DownloadButton from '../components/DownloadButton';
import { useRef } from 'react';

const ResumeBuilder = () => {
  const previewRef = useRef();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Create Your Professional Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill in your details on the left and watch your resume come to life on the right
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="order-2 xl:order-1">
            <ResumeForm />
          </div>
          <div className="order-1 xl:order-2">
            <ResumePreview previewRef={previewRef} />
          </div>
        </div>

        <DownloadButton />
      </div>
    </div>
  );
};

export default ResumeBuilder;