// src/components/ResumePreview.jsx
import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, ExternalLink, Award } from 'lucide-react';

const ResumePreview = ({ previewRef }) => {
  const { resumeData } = useResume();

  return (
    <motion.div
      ref={previewRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card sticky top-24 max-h-screen overflow-y-auto"
      style={{ maxHeight: 'calc(100vh - 120px)' }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-xl">
        <div className="flex items-center space-x-6">
          {resumeData.personal.picture ? (
            <img
              src={resumeData.personal.picture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl font-bold">{resumeData.personal.name.charAt(0)}</span>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{resumeData.personal.name || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {resumeData.personal.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{resumeData.personal.email}</span>
                </div>
              )}
              {resumeData.personal.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{resumeData.personal.phone}</span>
                </div>
              )}
              {resumeData.personal.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{resumeData.personal.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {resumeData.summary && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-blue-600 pb-1 inline-block">
              Professional Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{resumeData.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-blue-600 pb-1 inline-block">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 border-l-2 border-blue-600">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.jobTitle}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exp.duration}</p>
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-blue-600 pb-1 inline-block">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{edu.school}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-blue-600 pb-1 inline-block">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="skill-fill"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-blue-600 pb-1 inline-block">
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{proj.title}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View</span>
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-blue-600 pb-1 inline-block">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{cert.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default ResumePreview;