"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We will connect this to a real backend later
    toast.success("Message sent successfully! I'll get back to you soon.");
  };

  return (
    <section
      id="contact"
      className="py-20 bg-darkBg text-white px-6 md:px-20 border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-neonPurple">/</span> Let's Work Together
          </h2>
          <p className="text-gray-400">
            Have a project in mind or looking for a frontend developer? Drop me
            a message.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <Input
                required
                placeholder="John Doe"
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <Input
                required
                type="email"
                placeholder="john@example.com"
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Message</label>
            <Textarea
              required
              placeholder="Tell me about your project..."
              className="min-h-[150px] bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white resize-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-neonBlue hover:bg-neonBlue/80 text-black font-bold py-6 text-lg rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)]"
          >
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
