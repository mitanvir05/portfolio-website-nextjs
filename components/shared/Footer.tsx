import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa"; 

export default function Footer() {
  return (
    <footer className="bg-darkBg text-white border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white block mb-2">
            TANVIR<span className="text-neonPurple">.DEV</span>
          </Link>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        
        <div className="flex gap-6">
          <Link href="https://github.com/mitanvir05" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <FaGithub size={24} />
          </Link>
          <Link href="https://linkedin.com/in/muhaimin-tanvir" target="_blank" className="text-gray-400 hover:text-neonBlue transition-colors">
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}