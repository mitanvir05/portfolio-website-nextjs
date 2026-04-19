"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, ImagePlus } from "lucide-react";

export default function AddProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // New state to toggle repository type UI
  const [repoType, setRepoType] = useState<"single" | "separate">("single");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "", // For single repo
    frontendLink: "", // For separate repos
    backendLink: "", // For separate repos
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("techStack", formData.techStack);

    if (formData.liveLink) submitData.append("liveLink", formData.liveLink);

    // Conditionally append repo links based on the toggle state
    if (repoType === "single" && formData.githubLink) {
      submitData.append("githubLink", formData.githubLink);
    } else if (repoType === "separate") {
      if (formData.frontendLink)
        submitData.append("frontendLink", formData.frontendLink);
      if (formData.backendLink)
        submitData.append("backendLink", formData.backendLink);
    }

    if (imageFile) submitData.append("image", imageFile);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) throw new Error("Failed to create project");

      toast.success("Project deployed successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-400 hover:text-neonBlue transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Command Center
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-8 text-white">
            <span className="text-neonBlue">/</span> Create New Project
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Project Title *
              </label>
              <Input
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
                placeholder="e.g., ShopNest E-commerce"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Description *
              </label>
              <Textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white min-h-[100px]"
                placeholder="Briefly describe what this project does..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Tech Stack * (Comma separated)
              </label>
              <Input
                name="techStack"
                required
                value={formData.techStack}
                onChange={handleChange}
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
                placeholder="React.js, Node.js, MongoDB, Tailwind CSS"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Live URL
              </label>
              <Input
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
                placeholder="https://..."
              />
            </div>

            {/* Repository Toggle Controls */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="repoType"
                    checked={repoType === "single"}
                    onChange={() => setRepoType("single")}
                    className="accent-neonBlue"
                  />
                  Single Repository
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="repoType"
                    checked={repoType === "separate"}
                    onChange={() => setRepoType("separate")}
                    className="accent-neonBlue"
                  />
                  Separate Frontend/Backend
                </label>
              </div>

              {/* Conditional Repository Inputs */}
              {repoType === "single" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Code Repository
                  </label>
                  <Input
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Frontend Repo
                    </label>
                    <Input
                      name="frontendLink"
                      value={formData.frontendLink}
                      onChange={handleChange}
                      className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Backend Repo
                    </label>
                    <Input
                      name="backendLink"
                      value={formData.backendLink}
                      onChange={handleChange}
                      className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <ImagePlus size={16} /> Cover Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-darkBg/50 border-white/10 focus-visible:ring-neonBlue text-white file:text-neonBlue file:bg-transparent file:border-0 file:font-semibold cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a screenshot from your device (JPG, PNG, WebP)
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neonBlue hover:bg-neonBlue/80 text-black font-bold py-6 text-lg rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] mt-4"
            >
              {isLoading ? "Uploading & Deploying..." : "Deploy Project"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
