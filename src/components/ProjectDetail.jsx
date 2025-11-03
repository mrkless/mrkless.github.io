import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when visiting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Load project data
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-white text-xl">Project not found.</div>
      </div>
    );
  }

  const images = project.Images || [
    "proj/welcome.jpg",
    "proj/continue.jpg",
    "proj/signup.jpg",
    "proj/verification.jpg",
    "proj/dashboard.jpg",
    "proj/profile.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden px-4 md:px-8 py-10">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 px-4 py-2 mb-10 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Project Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
        {project.Title}
      </h1>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {images.slice(0, 6).map((src, index) => (
          <div key={index} className="relative flex justify-center group">
            {/* Outer Frame */}
            <div
              className="relative bg-gradient-to-br from-purple-800/40 via-purple-700/30 to-blue-700/20 
              p-[8px] rounded-[3rem] border border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.7)] 
              w-[280px] h-[580px] flex flex-col items-center transition-transform duration-500 group-hover:scale-105"
            >
              {/* Notch */}
              <div className="absolute top-[10px] w-[140px] h-[28px] bg-black rounded-b-3xl flex items-center justify-center z-20 shadow-md">
                <div className="w-[48px] h-[6px] bg-gray-700 rounded-full" />
              </div>

              {/* Inner Display */}
              <div
                className="relative bg-[#0a0a1a] rounded-[2.7rem] w-full h-full overflow-hidden border border-purple-500/20
                flex items-center justify-center"
              >
                <img
                  src={src}
                  alt={`Project Screenshot ${index + 1}`}
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent rounded-[2.7rem] pointer-events-none" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Code Button */}
      <div className="flex justify-center mt-12">
        <a
          href={project.Github || "https://github.com/mrkless/CapstoneProject/tree/main/flutter_project/flutter_application_2/lib"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-lg font-medium 
          bg-gradient-to-r from-purple-600/20 to-blue-600/20 
          border border-purple-500/30 hover:border-purple-400 
          hover:from-purple-600/30 hover:to-blue-600/30 
          transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
        >
          <Github className="w-5 h-5" />
          View Code
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
