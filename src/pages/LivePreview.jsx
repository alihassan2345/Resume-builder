import { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function LivePreview() {
  const [data, setData] = useState({
    image: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    education: [],
    skills: [],
    languages: [],
    expertise: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData({
      ...data,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  const handleArrayInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleDownload = () => {
    const resume = document.getElementById("live-resume");
    html2canvas(resume, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${data.name || "resume"}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6 grid md:grid-cols-2 gap-6">
      {/* LEFT: FORM */}
      <div className="bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Live Resume Builder</h1>

        {/* PROFILE */}
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="mb-3" />
        <input name="name" placeholder="Full Name" onChange={handleChange} className="input-box" />
        <input name="role" placeholder="Your Role" onChange={handleChange} className="input-box" />
        <input name="email" placeholder="Email" onChange={handleChange} className="input-box" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input-box" />
        <input name="address" placeholder="Address" onChange={handleChange} className="input-box" />
        <textarea name="about" placeholder="About Me" onChange={handleChange} className="input-box" />

        {/* MULTI INPUTS */}
        <input name="education" placeholder="Education (comma separated)" onChange={handleArrayInput} className="input-box" />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleArrayInput} className="input-box" />
        <input name="languages" placeholder="Languages (comma separated)" onChange={handleArrayInput} className="input-box" />
        <input name="expertise" placeholder="Experience (comma separated)" onChange={handleArrayInput} className="input-box" />

        <button
          onClick={handleDownload}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          Download PDF
        </button>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <motion.div
        id="live-resume"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-2xl p-8 overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex items-center gap-6 border-b pb-6 mb-6">
          {data.image && (
            <img
              src={data.image}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name || "Your Name"}</h1>
            <p className="text-xl text-indigo-600">{data.role || "Your Role"}</p>
            <p className="text-gray-500 mt-2">{data.email}</p>
            <p className="text-gray-500">{data.phone}</p>
            <p className="text-gray-500">{data.address}</p>
          </div>
        </div>

        {/* ABOUT */}
        <section className="mb-6">
          <h2 className="section-title">About Me</h2>
          <p className="section-text">{data.about || "Tell something about yourself..."}</p>
        </section>

        {/* EDUCATION */}
        <section className="mb-6">
          <h2 className="section-title">Education</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {data.education.map((edu, i) => <li key={i}>{edu}</li>)}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6">
          <h2 className="section-title">Experience</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {data.expertise.map((exp, i) => <li key={i}>{exp}</li>)}
          </ul>
        </section>

        {/* SKILLS & LANGUAGES */}
        <div className="grid grid-cols-2 gap-6">
          <section>
            <h2 className="section-title">Skills</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {data.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="section-title">Languages</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {data.languages.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
