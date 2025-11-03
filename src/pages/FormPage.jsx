"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { motion } from "framer-motion";

export default function FormPage() {
  const { setResumeData } = useResume();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    portfolio: "",
    github: "",
    about: "",
    education: "",          // format: "Degree|School|Year, Degree|School|Year"
    expertise: "",          // comma separated
    languages: "",          // comma separated
    skillsFrontend: "",     // multiline with \n
    skillsBackend: "",      // multiline with \n
    skillsTools: "",        // multiline with \n
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse education: "Degree|School|Year"
    const educationArray = form.education
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setResumeData({
      image: form.image,
      name: form.name,
      role: form.role,
      contact: {
        email: form.email,
        phone: form.phone,
        address: form.address,
      },
      portfolio: form.portfolio,
      github: form.github,
      about: form.about,
      education: educationArray,
      expertise: form.expertise.split(",").map((s) => s.trim()).filter(Boolean),
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      skills: {
        frontend: form.skillsFrontend,
        backend: form.skillsBackend,
        tools: form.skillsTools,
      },
    });

    navigate("/resume");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Build Your Resume</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill the fields below – the resume will look exactly like your PDF.
          </p>
        </div>

        {/* Image */}
        <div className="flex flex-col items-center">
          <label className="font-medium text-gray-700">Profile Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600 mt-3 shadow"
            />
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="input" required />
          <input name="role" placeholder="Role (e.g. MERN Stack Developer)" onChange={handleChange} className="input" required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} className="input" required />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input" required />
          <input name="address" placeholder="Address" onChange={handleChange} className="md:col-span-2 input" required />
          <input name="portfolio" placeholder="Portfolio URL" onChange={handleChange} className="input" />
          <input name="github" placeholder="GitHub Username" onChange={handleChange} className="input" />
        </div>

        {/* About */}
        <textarea
          name="about"
          placeholder="About Me (professional summary)"
          rows={4}
          onChange={handleChange}
          className="w-full input resize-none"
          required
        />

        {/* Education – use "|" separator */}
        <input
          name="education"
          placeholder="Education (Degree|School|Year, Degree|School|Year)"
          onChange={handleChange}
          className="input"
          required
        />

        {/* Expertise & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="expertise" placeholder="Expertise (comma separated)" onChange={handleChange} className="input" />
          <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} className="input" />
        </div>

        {/* Skills – multiline */}
        <div className="space-y-4">
          <textarea
            name="skillsFrontend"
            placeholder="Frontend Skills (one per line)"
            rows={3}
            onChange={handleChange}
            className="w-full input resize-none"
          />
          <textarea
            name="skillsBackend"
            placeholder="Backend & Others (one per line)"
            rows={3}
            onChange={handleChange}
            className="w-full input resize-none"
          />
          <textarea
            name="skillsTools"
            placeholder="Tools & Platforms (one per line)"
            rows={3}
            onChange={handleChange}
            className="w-full input resize-none"
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium shadow-md hover:from-indigo-700 hover:to-purple-700"
        >
          Generate Resume
        </motion.button>
      </motion.form>
    </div>
  );
}

/* Tailwind helper */
const inputClass = "border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition";