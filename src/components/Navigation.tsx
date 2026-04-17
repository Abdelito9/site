"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { NavLink } from "@/lib/strapi";
import MagneticButton from "./ui/MagneticButton";

interface NavigationProps {
  brandName?: string;
  brandMark?: string;
  links?: NavLink[];
  ctaLabel?: string;
}

const navLinksFallback: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Processus", href: "#processus" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation({ brandName, brandMark, links, ctaLabel }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = links && links.length > 0 ? links : navLinksFallback;
  const logoName = brandName || "Prisme";
  const logoMark = brandMark || "P";
  const buttonLabel = ctaLabel || "Lancer un projet";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl"
      >
        <div className="flex items-center justify-between rounded-full border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-2xl px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-[#050505] text-xs font-bold">{logoMark}</span>
            </div>
            <span className="hidden sm:inline">{logoName}</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] text-text-secondary transition-all duration-300 hover:bg-white/[0.04] hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton
              href="#contact"
              ariaLabel={buttonLabel}
              className="rounded-full border border-white/10 bg-gradient-to-b from-white to-white/90 px-4 py-1.5 text-[13px] font-medium text-background shadow-[0_10px_30px_-15px_rgba(255,255,255,0.8)] hover:-translate-y-[1px] hover:bg-white"
            >
              <span>{buttonLabel}</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
                <ArrowUpRight size={12} weight="bold" />
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Menu"
          >
            <motion.span
              animate={
                isOpen
                  ? { rotate: 45, y: 0, width: 18 }
                  : { rotate: 0, y: -4, width: 18 }
              }
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute h-[1.5px] bg-foreground rounded-full origin-center"
            />
            <motion.span
              animate={
                isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="absolute h-[1.5px] w-[18px] bg-foreground rounded-full"
            />
            <motion.span
              animate={
                isOpen
                  ? { rotate: -45, y: 0, width: 18 }
                  : { rotate: 0, y: 4, width: 12 }
              }
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute h-[1.5px] bg-foreground rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-[#050505]/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="text-3xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="mt-6"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent text-[#050505] px-8 py-3 text-base font-semibold"
                >
                  {buttonLabel}
                  <ArrowUpRight size={18} weight="bold" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
