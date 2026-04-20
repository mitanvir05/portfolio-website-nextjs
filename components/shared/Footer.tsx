import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-darkBg text-white border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-white block mb-2"
          >
            TANVIR<span className="text-neonPurple">.DEV</span>
          </Link>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <Link
            href="https://github.com/mitanvir05"
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={24} />
          </Link>
          <Link
            href="https://linkedin.com/in/muhaimin-tanvir"
            target="_blank"
            className="text-gray-400 hover:text-[#0077b5] transition-colors"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            href="https://wa.me/8801700955009?text=Hello%20Tanvir!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20contact%20with%20you."
            target="_blank"
            className="text-gray-400 hover:text-[#25D366] transition-colors"
          >
            <FaWhatsapp size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
