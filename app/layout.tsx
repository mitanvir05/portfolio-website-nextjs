import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tanvir | Frontend Developer",
  description: "Portfolio of MD. Muhaimin Islam Tanvir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-darkBg text-white selection:bg-neonBlue/30">
        <Navbar />
        {children}
      </body>
    </html>
  );
}