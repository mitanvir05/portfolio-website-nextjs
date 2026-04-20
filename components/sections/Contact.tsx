"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaSpinner,
  FaEnvelope,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa"; // Removed FaFacebook
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      id: 1,
      icon: <FaEnvelope size={20} />,
      label: "Email",
      value: "tanvir.cse05@gmail.com",
      link: "mailto:tanvir.cse05@gmail.com",
    },
    {
      id: 2,
      icon: <FaMobileAlt size={22} />,
      label: "Phone",
      value: "+8801700955009",
      link: "tel:+8801700955009",
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt size={20} />,
      label: "Location",
      value: "Dhaka, Bangladesh",
      link: null,
    },
  ];

  // UPDATED: Removed Facebook and added specific brand colors for hover states
  const socialLinks = [
    {
      id: 1,
      icon: <FaGithub size={24} />,
      href: "https://github.com",
      hoverColor: "hover:text-white",
    },
    {
      id: 2,
      icon: <FaLinkedin size={24} />,
      href: "https://linkedin.com",
      hoverColor: "hover:text-[#0077b5]", // LinkedIn Blue
    },
    {
      id: 3,
      icon: <FaWhatsapp size={24} />,
      href: "https://wa.me/8801700955009?text=Hello%20Tanvir!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20contact%20with%20you.",
      hoverColor: "hover:text-[#25D366]", // WhatsApp Green
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 md:py-24 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
          >
            <span className="text-neonPurple">/</span> Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-sm md:text-base text-gray-400"
          >
            Have a question or a project idea? Drop me a message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="flex flex-col gap-8">
              {contactInfo.map((info) => (
                <div key={info.id} className="flex items-center gap-5 group">
                  <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-neonPurple group-hover:border-neonPurple/50 group-hover:bg-neonPurple/10 transition-all duration-300">
                    {info.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 tracking-wider mb-1 uppercase">
                      {info.label}
                    </span>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-base font-medium text-gray-200 hover:text-white transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-base font-medium text-gray-200">
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* UPDATED: Injected the dynamic hoverColor into the class string */}
            <div className="flex items-center gap-6 mt-12 pl-2">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 hover:-translate-y-1 transition-all duration-300 ${social.hoverColor}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-gray-400 tracking-wide">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-gray-400 tracking-wide">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-400 tracking-wide">
                  Message
                </label>
                <Textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white min-h-[150px] rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-neonBlue hover:bg-neonBlue/80 text-black font-bold py-6 text-base md:text-lg rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane size={16} />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
