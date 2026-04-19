"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react"; // Using standard generic icon

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid credentials. Access denied.");
      setIsLoading(false);
    } else {
      toast.success("Welcome back, Tanvir!");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center relative overflow-hidden px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neonPurple/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
            <Lock className="text-neonPurple" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-2">Restricted Area</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-darkBg/50 border-white/10 text-white focus-visible:ring-neonPurple h-12"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-darkBg/50 border-white/10 text-white focus-visible:ring-neonPurple h-12"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neonPurple hover:bg-neonPurple/80 text-white font-bold py-6 text-lg rounded-xl transition-all shadow-[0_0_15px_rgba(157,78,221,0.2)]"
          >
            {isLoading ? "Authenticating..." : "Enter Command Center"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
