import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton"; // We'll create this tiny client component next
import { PlusCircle, LayoutGrid } from "lucide-react";

export default async function DashboardPage() {
  // 1. Secure the route on the server side
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-darkBg text-white">
      {/* Admin Navbar */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-tight">
          TANVIR<span className="text-neonPurple">.ADMIN</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Logged in as Admin</span>
          <LogoutButton />
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto p-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add New Project Card */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-neonBlue/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 bg-neonBlue/10 rounded-xl flex items-center justify-center mb-6 text-neonBlue group-hover:scale-110 transition-transform">
              <PlusCircle size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Add New Project</h2>
            <p className="text-gray-400">
              Upload a new project to your portfolio database.
            </p>
          </div>

          {/* Manage Projects Card */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-neonPurple/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 bg-neonPurple/10 rounded-xl flex items-center justify-center mb-6 text-neonPurple group-hover:scale-110 transition-transform">
              <LayoutGrid size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Manage Projects</h2>
            <p className="text-gray-400">
              Edit, delete, or toggle featured status on existing projects.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
