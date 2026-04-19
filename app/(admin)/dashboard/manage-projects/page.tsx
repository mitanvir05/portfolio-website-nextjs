"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaTrash,
  FaStar,
  FaRegStar,
  FaEdit,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { toast } from "sonner";
import { ProjectType } from "@/components/sections/Projects";

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error("Could not load projects.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- REORDER LOGIC ---
  const moveProject = async (index: number, direction: "up" | "down") => {
    const newProjects = [...projects];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    // Prevent moving out of bounds
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;

    // Swap the projects in the array
    [newProjects[index], newProjects[targetIndex]] = [
      newProjects[targetIndex],
      newProjects[index],
    ];

    // Create the payload mapping the new array positions to their database IDs
    const updatePayload = newProjects.map((p, i) => ({
      id: p._id,
      order: i,
    }));

    // Optimistically update UI instantly
    setProjects(newProjects);

    // Send the new order to the database secretly in the background
    try {
      await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatePayload }),
      });
    } catch (error) {
      toast.error("Failed to save new order");
      fetchProjects(); // Revert to database state if it fails
    }
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This cannot be undone.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Project deleted successfully");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  // --- FEATURED TOGGLE LOGIC ---
  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success(
        currentStatus ? "Removed from featured" : "Marked as featured",
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, featured: !currentStatus } : p,
        ),
      );
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-400 hover:text-neonBlue transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Command Center
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-neonPurple">/</span> Manage Projects
            </h1>
            <Link
              href="/dashboard/add-project"
              className="bg-neonBlue/10 text-neonBlue border border-neonBlue/30 hover:bg-neonBlue hover:text-black px-4 py-2 rounded-lg font-medium transition-all"
            >
              + Add New
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-400 animate-pulse">
              Loading database...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10 text-gray-400 border border-dashed border-white/10 rounded-xl">
              No projects found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm">
                    <th className="py-4 px-4 font-medium w-24 text-center">
                      Order
                    </th>
                    <th className="py-4 px-4 font-medium">Project</th>
                    <th className="py-4 px-4 font-medium">Tech Stack</th>
                    <th className="py-4 px-4 font-medium text-center">
                      Featured
                    </th>
                    <th className="py-4 px-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      {/* Order Buttons */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={() => moveProject(index, "up")}
                            disabled={index === 0}
                            className="p-1.5 text-gray-500 hover:text-neonBlue disabled:opacity-20 disabled:hover:text-gray-500 transition-colors"
                          >
                            <FaArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => moveProject(index, "down")}
                            disabled={index === projects.length - 1}
                            className="p-1.5 text-gray-500 hover:text-neonBlue disabled:opacity-20 disabled:hover:text-gray-500 transition-colors"
                          >
                            <FaArrowDown size={12} />
                          </button>
                        </div>
                      </td>

                      {/* Title & Image Column */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-darkBg rounded overflow-hidden border border-white/10 shrink-0">
                            {project.imageUrls && project.imageUrls[0] ? (
                              <img
                                src={project.imageUrls[0]}
                                alt="thumb"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                No Img
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-neonBlue transition-colors">
                              {project.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Tech Stack Column */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-500">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Featured Column */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() =>
                            toggleFeatured(
                              project._id!,
                              project.featured as boolean,
                            )
                          }
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                          {project.featured ? (
                            <FaStar className="text-yellow-400 text-xl" />
                          ) : (
                            <FaRegStar className="text-gray-500 text-xl hover:text-yellow-400/50" />
                          )}
                        </button>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/edit-project/${project._id}`}
                            className="p-2 text-gray-400 hover:text-neonBlue bg-white/5 hover:bg-neonBlue/10 rounded-lg transition-colors block"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(project._id!)}
                            className="p-2 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
