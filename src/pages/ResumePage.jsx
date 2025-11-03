"use client";

import { useResume } from "../context/ResumeContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ResumePage() {
  const { resumeData } = useResume();
  const navigate = useNavigate();

  const handleDownload = async () => {
    const el = document.getElementById("resume");
    if (!el) return;

    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(w / canvas.width, h / canvas.height);

    pdf.addImage(
      img,
      "PNG",
      (w - canvas.width * ratio) / 2,
      0,
      canvas.width * ratio,
      canvas.height * ratio
    );
    pdf.save(`${resumeData.name || "Resume"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center p-6">
      {/* A4 Container */}
      <motion.div
        id="resume"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-[210mm] min-h-[297mm] shadow-2xl overflow-hidden relative"
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "10.5pt",
        }}
      >
        {/* Slanted Deep Blue Header */}
        <div
          className="absolute top-0 left-0 w-full h-64"
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          }}
        />

        {/* Profile Photo – Gold Border */}
        <div className="absolute top-8 left-8 w-36 h-36 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl z-10">
          {resumeData.image ? (
            <img src={resumeData.image} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Photo</span>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6 pt-48 px-8 pb-8">
          {/* LEFT COLUMN */}
          <aside className="col-span-4 space-y-7 text-white">
            {/* Name & Role */}
            <div>
              <h1 className="text-3xl font-bold text-yellow-300 drop-shadow-sm">
                {resumeData.name || "Muhammad Faizan"}
              </h1>
              <p className="text-xl mt-1 opacity-95">{resumeData.role || "MERN Stack Developer"}</p>
            </div>

            {/* Contact */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-300/30">
              <h3 className="font-bold text-yellow-200 flex items-center gap-2 mb-2">
                📞 Contact
              </h3>
              <div className="text-sm space-y-1">
                {resumeData.contact?.phone && (
                  <p>
                    <span className="text-yellow-300 font-semibold">Phone:</span>{" "}
                    {resumeData.contact.phone}
                  </p>
                )}
                {resumeData.contact?.email && (
                  <p>
                    <span className="text-yellow-300 font-semibold">Email:</span>{" "}
                    {resumeData.contact.email}
                  </p>
                )}
                {resumeData.contact?.address && (
                  <p>
                    <span className="text-yellow-300 font-semibold">Address:</span>{" "}
                    {resumeData.contact.address}
                  </p>
                )}
                {resumeData.portfolio && (
                  <p>
                    <span className="text-yellow-300 font-semibold">Web:</span>{" "}
                    <a href={resumeData.portfolio} className="underline">
                      {resumeData.portfolio}
                    </a>
                  </p>
                )}
                {resumeData.github && (
                  <p>
                    <span className="text-yellow-300 font-semibold">GitHub:</span>{" "}
                    <a
                      href={`https://github.com/${resumeData.github}`}
                      className="underline"
                    >
                      {resumeData.github}
                    </a>
                  </p>
                )}
              </div>
            </section>

            {/* Expertise */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-300/30">
              <h3 className="font-bold text-yellow-200 mb-2">💡 Expertise</h3>
              <ul className="text-sm space-y-1">
                {(resumeData.expertise || []).map((e, i) => (
                  <li key={i}>• {e}</li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-300/30">
              <h3 className="font-bold text-yellow-200 mb-2">🌐 Languages</h3>
              <ul className="text-sm space-y-1">
                {(resumeData.languages || []).map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </section>
          </aside>

          {/* RIGHT COLUMN */}
          <main className="col-span-8 space-y-7">
            {/* Education */}
            <section>
              <h3 className="text-xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-1 mb-3">
                🎓 Education
              </h3>
              <div className="space-y-3">
                {(resumeData.education || []).map((edu, i) => {
                  const [deg, school, year] = edu.split("|").map((s) => s.trim());
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-700 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{deg}</p>
                        <p className="text-sm text-gray-700">{school}</p>
                        {year && <p className="text-xs text-gray-500">{year}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* About */}
            <section>
              <h3 className="text-xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-1 mb-3">
                👤 About Me
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {resumeData.about ||
                  "I am a passionate MERN Stack Developer skilled in HTML, CSS, JavaScript, React, Node.js, and Python, focused on creating efficient, scalable, and modern web applications."}
              </p>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-1 mb-3">
                ⚙️ Skills
              </h3>
              <div className="space-y-4">
                {resumeData.skills?.frontend && (
                  <div>
                    <p className="font-semibold text-blue-700">Frontend</p>
                    <p className="text-sm text-gray-700 ml-4">
                      {resumeData.skills.frontend}
                    </p>
                  </div>
                )}
                {resumeData.skills?.backend && (
                  <div>
                    <p className="font-semibold text-blue-700">Backend & Others</p>
                    <p className="text-sm text-gray-700 ml-4">
                      {resumeData.skills.backend}
                    </p>
                  </div>
                )}
                {resumeData.skills?.tools && (
                  <div>
                    <p className="font-semibold text-blue-700">Tools & Platforms</p>
                    <p className="text-sm text-gray-700 ml-4">
                      {resumeData.skills.tools}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2.5 rounded-lg shadow hover:from-gray-700 hover:to-gray-800 transition"
        >
          Edit Resume
        </button>
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg shadow hover:from-green-700 hover:to-emerald-700 transition flex items-center gap-2"
        >
          Download PDF
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
