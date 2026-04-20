"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
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

  return (
    <section
      id="contact"
      className="py-10 md:py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-center">
          <span className="text-neonPurple">/</span> Let's Connect
        </h2>

        <p className="text-center text-sm md:text-base text-gray-400 mb-6 md:mb-12">
          Have a question or a project idea? Drop me a message below.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <Input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white h-10 md:h-12"
                />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white h-10 md:h-12"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-medium text-gray-300">
                Message
              </label>
              <Textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white min-h-[120px] md:min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neonBlue hover:bg-neonBlue/80 text-black font-bold py-5 md:py-6 text-base md:text-lg rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] flex items-center justify-center gap-2"
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
        </div>
      </div>
    </section>
  );
}
