// src/components/ResumeForm.jsx
import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Upload, X } from 'lucide-react';

const ResumeForm = () => {
  const {
    resumeData,
    updatePersonal,
    updateSummary,
    addEducation, updateEducation, removeEducation,
    addExperience, updateExperience, removeExperience,
    addSkill, updateSkill, removeSkill,
    addProject, updateProject, removeProject,
    addCertification, updateCertification, removeCertification
  } = useResume();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('picture', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => updatePersonal('picture', '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-10 p-4 sm:p-6 lg:p-10"
    >
      {/* === PERSONAL INFO === */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-8">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['name', 'email', 'phone', 'address'].map((field, idx) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
              className="relative"
            >
              <input
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                value={resumeData.personal[field]}
                onChange={(e) => updatePersonal(field, e.target.value)}
                className="peer w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-transparent text-sm sm:text-base"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
              <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white peer-focus:bg-gradient-to-r peer-focus:from-blue-500 peer-focus:to-purple-500">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </motion.div>
          ))}

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="sm:col-span-2"
          >
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Profile Picture
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                {resumeData.personal.picture ? (
                  <div className="relative group">
                    <img
                      src={resumeData.personal.picture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/20 shadow-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {resumeData.personal.name.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>

              <label className="cursor-pointer w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center sm:justify-start items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Photo</span>
                </motion.div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* === SUMMARY === */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
          Professional Summary
        </h2>
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none h-28 sm:h-32 text-sm sm:text-base"
          placeholder="Craft a compelling summary that highlights your expertise, achievements, and career goals..."
        />
      </motion.div>

      {/* === DYNAMIC SECTIONS === */}
      {[
        {
          title: 'Education',
          items: resumeData.education,
          add: addEducation,
          update: updateEducation,
          remove: removeEducation,
          fields: ['school', 'degree', 'year']
        },
        {
          title: 'Work Experience',
          items: resumeData.experience,
          add: addExperience,
          update: updateExperience,
          remove: removeExperience,
          fields: ['jobTitle', 'company', 'duration'],
          hasDescription: true
        },
        {
          title: 'Projects',
          items: resumeData.projects,
          add: addProject,
          update: updateProject,
          remove: removeProject,
          fields: ['title', 'link'],
          hasDescription: true
        },
        {
          title: 'Certifications',
          items: resumeData.certifications,
          add: addCertification,
          update: updateCertification,
          remove: removeCertification,
          fields: ['name', 'issuer', 'year']
        }
      ].map((section, secIdx) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + secIdx * 0.1 }}
          className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {section.title}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={section.add}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Add {section.title.slice(0, -1)}</span>
            </motion.button>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {section.items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 sm:p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {section.fields.map((field, fIdx) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fIdx * 0.05 }}
                    >
                      <input
                        type="text"
                        value={item[field]}
                        onChange={(e) => section.update(item.id, field, e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      />
                    </motion.div>
                  ))}
                  <div className="flex items-center justify-end">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => section.remove(item.id)}
                      className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {section.hasDescription && (
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => section.update(item.id, 'description', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none h-20 sm:h-24 text-sm sm:text-base"
                    placeholder="Describe your responsibilities, achievements, or technologies used..."
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* === SKILLS === */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addSkill}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Skill</span>
          </motion.button>
        </div>

        <div className="space-y-5">
          {resumeData.skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className="flex-1 px-4 py-2 bg-transparent border-b-2 border-blue-500 focus:border-purple-500 focus:outline-none transition-colors font-medium text-sm sm:text-base"
                placeholder="e.g., React, Python"
              />
              <div className="flex items-center gap-3 w-full sm:w-48">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${skill.level}%, #e5e7eb ${skill.level}%, #e5e7eb 100%)`
                  }}
                />
                <span className="text-sm font-bold text-blue-600 w-12 text-right">
                  {skill.level}%
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeSkill(skill.id)}
                className="self-end sm:self-auto p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeForm;
