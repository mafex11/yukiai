"use client";

import Image from "next/image";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Image src="/logowithoutbg.svg" alt="YukiAI" width={28} height={28} />
            <div>
              <div className="text-white text-2xl tracking-wide">YukiAI</div>
              <div className="text-white/60 text-sm mt-1">© {new Date().getFullYear()} Yuki</div>
            </div>
          </div>

          {/* Middle: Links */}
          <nav className="text-white/80 text-sm grid grid-cols-2 md:grid-cols-1 gap-3 md:justify-center">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#blogs" className="hover:text-white transition-colors">Blogs</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Right: Newsletter */}
          <div className="w-full">
            <p className="text-white/80 text-sm mb-3">Sign up for our newsletter</p>
            <form className="flex items-center gap-3 w-full">
              <div className="flex-1">
                <Input
                  placeholder="Your Email Here"
                  className="h-11 rounded-full bg-zinc-900 border border-white/10 text-white placeholder:text-white/60"
                  type="email"
                />
              </div>
              <button
                type="submit"
                className="px-6 h-11 rounded-full bg-white/40 text-black hover:bg-white transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-14 mb-20 ">
          <p className="text-white/80 text-lg md:text-3xl">Transforming vision into reality.</p>
        </div>
      </div>
    </footer>
  );
}


