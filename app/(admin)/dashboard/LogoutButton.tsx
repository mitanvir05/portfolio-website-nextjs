"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </Button>
  );
}
