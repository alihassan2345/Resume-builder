// import { createContext, useContext, useState } from "react";

// const ResumeContext = createContext();

// export const ResumeProvider = ({ children }) => {
//   const [resumeData, setResumeData] = useState({
//     image: "",
//     name: "",
//     role: "",
//     contact: { email: "", phone: "", address: "" },
//     about: "",
//     education: [],
//     skills: [],
//     languages: [],
//     expertise: []
//   });

//   return (
//     <ResumeContext.Provider value={{ resumeData, setResumeData }}>
//       {children}
//     </ResumeContext.Provider>
//   );
// };

// export const useResume = () => useContext(ResumeContext);
// src/context/ResumeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ResumeContext = createContext();

const defaultTemplate = {
  personal: {
    name: '',
    email: '',
    phone: '',
    address: '',
    picture: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  template: 'modern',
  darkMode: false,
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultTemplate);
  const [currentResumeId, setCurrentResumeId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('currentResume');
    if (saved) {
      const data = JSON.parse(saved);
      setResumeData(data);
      setCurrentResumeId(data.id || uuidv4());
    } else {
      const newId = uuidv4();
      setCurrentResumeId(newId);
      setResumeData({ ...defaultTemplate, id: newId });
    }
  }, []);

  useEffect(() => {
    if (currentResumeId) {
      localStorage.setItem('currentResume', JSON.stringify({ ...resumeData, id: currentResumeId }));
    }
  }, [resumeData, currentResumeId]);

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: uuidv4(), school: '', degree: '', year: '' }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: uuidv4(),
        jobTitle: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: uuidv4(), name: '', level: 70 }]
    }));
  };

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: uuidv4(), title: '', description: '', link: '' }]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: uuidv4(), name: '', issuer: '', year: '' }]
    }));
  };

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(item => item.id !== id)
    }));
  };

  const setTemplate = (template) => {
    setResumeData(prev => ({ ...prev, template }));
  };

  const toggleDarkMode = () => {
    setResumeData(prev => ({ ...prev, darkMode: !prev.darkMode }));
    document.documentElement.classList.toggle('dark');
  };

  const resetResume = () => {
    const newId = uuidv4();
    setCurrentResumeId(newId);
    setResumeData({ ...defaultTemplate, id: newId });
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      currentResumeId,
      updatePersonal,
      updateSummary,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      addSkill,
      updateSkill,
      removeSkill,
      addProject,
      updateProject,
      removeProject,
      addCertification,
      updateCertification,
      removeCertification,
      setTemplate,
      toggleDarkMode,
      resetResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};