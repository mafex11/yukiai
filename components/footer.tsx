"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Image src="/logo-mark.svg" alt="Yuki" width={32} height={32} />
            <div>
              <div className="text-white text-2xl tracking-wide">Yuki</div>
              <div className="text-white/60 text-sm mt-1">© {new Date().getFullYear()} Yuki · MIT licensed</div>
            </div>
          </div>

          {/* Middle: Links */}
          <nav className="text-white/80 text-sm grid grid-cols-2 md:grid-cols-1 gap-3 md:justify-center">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#download" className="hover:text-white transition-colors">Download</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Right: GitHub */}
          <div className="w-full text-sm">
            <p className="text-white/80 mb-3">Free &amp; open source, macOS 13+ Apple Silicon</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/mafex11/yuki-mac-use"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                github.com/mafex11/yuki-mac-use
              </a>
              <a
                href="https://github.com/mafex11/yuki-mac-use/releases/tag/v0.5.0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                Latest release · v0.5.0
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
