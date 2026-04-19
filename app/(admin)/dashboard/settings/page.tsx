"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FaArrowLeft, FaFilePdf } from "react-icons/fa";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResume, setCurrentResume] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.resumeUrl) setCurrentResume(data.resumeUrl);
      });
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a PDF file first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setCurrentResume(data.resumeUrl);
      setFile(null); // Clear the input
      toast.success("Resume updated successfully!");
    } catch (error) {
      toast.error("Failed to update resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-400 hover:text-neonBlue transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Command Center
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-8">
            <span className="text-neonPurple">/</span> Global Settings
          </h1>

          <div className="space-y-6">
            <div className="p-6 bg-darkBg/50 border border-white/10 rounded-xl">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <FaFilePdf className="text-red-400" /> Resume / CV
              </h2>

              {currentResume ? (
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">
                    Current Active Resume:
                  </p>
                  <a
                    href={currentResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neonBlue hover:underline break-all text-sm"
                  >
                    {currentResume}
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-6">
                  No resume uploaded yet.
                </p>
              )}

              <form onSubmit={handleUpload} className="space-y-4">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-white/5 border-white/10 file:text-neonBlue file:bg-transparent file:border-0 cursor-pointer"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !file}
                  className="w-full bg-neonBlue hover:bg-neonBlue/80 text-black font-bold"
                >
                  {isLoading ? "Uploading..." : "Update Resume"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
