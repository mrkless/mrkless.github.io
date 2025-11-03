import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/mrklessbucag@gmail.com";

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("_subject", "New Message from Portfolio Website");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Success!",
        text: "Your message was sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="Contact"
      className="h-auto pb-12 text-white overflow-hidden 
                 px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
    >
      {/* Top heading */}
      <div className="text-center lg:mb-8 mb-2 px-[5%]">
        <div className="inline-block relative group">
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
                       bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            data-aos="zoom-in-up"
            data-aos-duration="600"
          >
            Contact Me
          </h2>
        </div>
        <p
          className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
          data-aos="zoom-in-up"
          data-aos-duration="800"
        >
          Got a question or want to collaborate? Send me a message and I'll get back to you!
        </p>
      </div>


      {/* Two-column content */}
      <div className="flex-1 flex items-center justify-center" id="Contact">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left: Get In Touch (form) */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get In Touch
                </h3>
                <p className="text-gray-400 text-sm">
                  Want to discuss something? Drop me a message and let's chat!
                </p>
              </div>
              <Share2 className="w-8 h-8 text-[#6366f1] opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30"
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30"
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 h-40"
                  required
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Contact Info
              </h3>
              <Share2 className="w-8 h-8 text-[#6366f1] opacity-50" />
            </div>

            <p className="text-gray-400">
              Prefer direct contact? Use the email or socials below.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href="mailto:mrklessbucag@gmail.com"
                className="flex items-center gap-3 text-gray-100 hover:text-white"
              >
                <Mail className="w-5 h-5 text-[#a855f7]" />
                <span className="font-medium">mrklessbucag@gmail.com</span>
              </a>

              <div className="pt-4 border-t border-white/10">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;