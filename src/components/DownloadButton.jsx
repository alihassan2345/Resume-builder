// src/components/DownloadButton.jsx
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { pdf } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';

export default function DownloadButton() {
  const { resumeData } = useResume();

  const handleDownload = async () => {
    try {
      const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personal.name || 'Resume'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-xl"
    >
      <Download className="h-5 w-5" />
      Download PDF
    </motion.button>
  );
}