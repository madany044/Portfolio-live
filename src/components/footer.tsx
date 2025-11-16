import Link from "next/link";

import { socialLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-16 text-white/50">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Currently open to</p>
          <p className="mt-2 text-sm text-white/80">Full stack roles · Web application development · Data-driven projects</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
          {socialLinks.map((link) => (
            <Link
              key={`footer-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/30 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-white/40">
       <center> © {new Date().getFullYear()} Designed And Developed By Madan Y. </center>
      </p>
    </footer>
  );
}

