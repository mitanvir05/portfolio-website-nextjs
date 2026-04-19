"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, ImagePlus, X, UploadCloud } from "lucide-react";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [repoType, setRepoType] = useState<"single" | "separate">("single");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    frontendLink: "",
    backendLink: "",
  });

  // Fetch the existing project data when the page loads
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          techStack: data.techStack ? data.techStack.join(", ") : "",
          liveLink: data.liveLink || "",
          githubLink: data.githubLink || "",
          frontendLink: data.frontendLink || "",
          backendLink: data.backendLink || "",
        });

        if (data.frontendLink || data.backendLink) {
          setRepoType("separate");
        }

        if (data.imageUrls) {
          setExistingImages(data.imageUrls);
        }
      } catch (error) {
        toast.error("Could not load project data.");
        router.push("/dashboard/manage-projects");
      } finally {
        setIsFetching(false);
      }
    };
    fetchProject();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    }
  };

  const removeNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("techStack", formData.techStack);
    if (formData.liveLink) submitData.append("liveLink", formData.liveLink);

    if (repoType === "single") {
      submitData.append("githubLink", formData.githubLink);
      submitData.append("frontendLink", ""); // Clear it out if switching back
      submitData.append("backendLink", "");
    } else {
      submitData.append("frontendLink", formData.frontendLink);
      submitData.append("backendLink", formData.backendLink);
      submitData.append("githubLink", ""); // Clear it out if switching back
    }

    // Only append new images if the user selected them
    imageFiles.forEach((file) => {
      submitData.append("images", file);
    });

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        body: submitData,
      });

      if (!res.ok) throw new Error("Failed to update project");

      toast.success("Project updated successfully!");
      router.push("/dashboard/manage-projects");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong updating the project.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-darkBg text-white flex items-center justify-center">
        Loading project data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBg text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard/manage-projects"
          className="inline-flex items-center text-gray-400 hover:text-neonBlue transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Manage Projects
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-8 text-white">
            <span className="text-neonBlue">/</span> Edit Project
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
              />
            </div>

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

              {repoType === "single" ? (
                <Input
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="bg-darkBg/50 border-white/10 text-white"
                  placeholder="Code Repository URL"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="frontendLink"
                    value={formData.frontendLink}
                    onChange={handleChange}
                    className="bg-darkBg/50 border-white/10 text-white"
                    placeholder="Frontend URL"
                  />
                  <Input
                    name="backendLink"
                    value={formData.backendLink}
                    onChange={handleChange}
                    className="bg-darkBg/50 border-white/10 text-white"
                    placeholder="Backend URL"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <ImagePlus size={16} /> Cover Images
              </label>

              {/* Show Existing Images if no new ones are selected */}
              {imageFiles.length === 0 && existingImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Current Images (Uploading new images will replace these):
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    {existingImages.map((url, index) => (
                      <div
                        key={index}
                        className="aspect-video rounded-lg overflow-hidden border border-white/10"
                      >
                        <img
                          src={url}
                          alt="existing"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview Grid for NEW Images */}
              {imageFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {imageFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden border border-neonBlue bg-white/5 group"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-neonBlue/50 transition-all cursor-pointer group">
                <UploadCloud
                  className="text-gray-400 group-hover:text-neonBlue transition-colors mb-2"
                  size={24}
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-200">
                  Upload New Images
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  (Leave blank to keep existing images)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neonBlue hover:bg-neonBlue/80 text-black font-bold py-6 text-lg rounded-xl transition-all mt-4"
            >
              {isLoading ? "Saving Changes..." : "Update Project"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
