"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "@phosphor-icons/react";
import type { SiteContent } from "@/lib/strapi";
import MagneticButton from "./ui/MagneticButton";
import TextScramble from "./ui/TextScramble";

interface HeroProps {
  data?: {
    badge: string;
    heading_start: string;
    scramble_phrases: string[];
    heading_end: string;
    description: string;
  };
  siteSettings?: Pick<
    SiteContent,
    | "hero_primary_cta_label"
    | "hero_secondary_cta_label"
    | "hero_social_proof_title"
    | "hero_social_proof_subtitle"
  >;
}

export default function Hero({ data, siteSettings }: HeroProps) {
  const content = data || {
    badge: "Studio Digital Indépendant",
    heading_start: "Nous créons des",
    scramble_phrases: ["Sites Vitrines", "Expériences", "Applications Web", "E-commerces"],
    heading_end: "qui convertissent.",
    description: "Prisme est une agence créative spécialisée dans le design et le développement d'interfaces premium. Nous combinons esthétique minimaliste et ingénierie de pointe."
  };
  const primaryLabel = siteSettings?.hero_primary_cta_label || "Demarrez votre projet";
  const secondaryLabel = siteSettings?.hero_secondary_cta_label || "Voir notre reel";
  const socialProofTitle = siteSettings?.hero_social_proof_title || "Rejoignez 40+ entreprises";
  const socialProofSubtitle = siteSettings?.hero_social_proof_subtitle || "qui nous ont fait confiance.";
  const reelTarget = "#portfolio";

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-20 w-full flex items-center overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="mesh-gradient" aria-hidden="true" />
      
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        
        {/* Left Column - Typography */}
        <div className="flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-text-secondary">
              {content.badge}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.05] text-foreground">
            {content.heading_start} <br className="hidden md:block" />
            <span className="text-accent italic pr-2">
              <TextScramble 
                phrases={content.scramble_phrases} 
                speed={50}
                pauseDuration={3500}
              />
            </span>
            <br />
            {content.heading_end}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-[50ch]"
          >
            {content.description}
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <MagneticButton
              href="#contact"
              ariaLabel={primaryLabel}
              className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-background shadow-[0_0_30px_-6px_rgba(52,211,153,0.6)] transition-all duration-300 hover:bg-accent/80 hover:shadow-[0_0_40px_-6px_rgba(52,211,153,0.8)] hover:-translate-y-[1px]"
            >
              <span>{primaryLabel}</span>
              <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-[2px]">
                <ArrowRight size={14} weight="bold" />
              </span>
            </MagneticButton>
            
            <a
              href={reelTarget}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-surface/50 px-6 py-3.5 text-[15px] font-medium backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-surface-light"
            >
              <PlayCircle size={24} weight="light" className="text-text-secondary group-hover:text-foreground transition-colors" />
              <span className="text-text-secondary transition-colors group-hover:text-foreground">{secondaryLabel}</span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors group-hover:border-white/20 group-hover:text-foreground">
                Portfolio
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Reponse sous 24h
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-text-secondary">
              Sites sur mesure
            </div>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-surface-light">
                  <Image
                    src={`https://picsum.photos/seed/prismeclient${i}/100/100`}
                    alt="Client"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-foreground">{socialProofTitle}</div>
              <div className="text-text-muted">{socialProofSubtitle}</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Interactive Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="hidden lg:block relative perspective-[2000px]"
        >
          {/* Main 3D Composition */}
          <motion.div 
            animate={{ 
              y: [-10, 10, -10],
              rotateX: [2, -2, 2],
              rotateY: [-2, 2, -2]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
            className="relative transform-style-3d w-full aspect-[4/5] rounded-[2.5rem] border border-white/[0.12] bg-surface/60 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)] p-6"
          >
            {/* Visual content representing digital work */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] pointer-events-none" />
            
            {/* Abstract UI Elements */}
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-32 rounded-2xl bg-surface-light/50 border border-white/5 flex items-center justify-between p-6">
                <div className="flex flex-col gap-3">
                  <div className="w-24 h-4 rounded-full bg-white/20" />
                  <div className="w-16 h-3 rounded-full bg-white/10" />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 bg-accent rounded-sm rotate-45" />
                </div>
              </div>
              
              <div className="flex gap-4 h-48">
                <div className="flex-1 rounded-2xl bg-gradient-to-t from-surface-light/80 to-surface-light/20 border border-white/5 overflow-hidden relative">
                   <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-accent/20 to-transparent blur-xl" />
                </div>
                <div className="w-1/3 rounded-2xl bg-surface-light/50 border border-white/5 flex flex-col gap-2 p-4 justify-end">
                  <div className="w-full h-2 rounded-full bg-white/10" />
                  <div className="w-3/4 h-2 rounded-full bg-white/10" />
                  <div className="w-1/2 h-2 rounded-full bg-accent/50" />
                </div>
              </div>
              
              <div className="w-full flex-1 rounded-2xl bg-surface-light/50 border border-white/5 overflow-hidden relative">
                 {/* Fake code block */}
                 <div className="p-4 flex flex-col gap-2 opacity-50 font-mono text-[10px] text-accent/70">
                    <div><span className="text-white/50">import</span> {'{'} motion {'}'} <span className="text-white/50">from</span> {`"framer-motion";`}</div>
                    <br/>
                    <div><span className="text-white/50">const</span> Component = () =&gt; (</div>
                    <div className="pl-4">&lt;motion.div</div>
                    <div className="pl-8 text-white/70">animate={'{'}{'{'} scale: 1 {'}'}{'}'}</div>
                    <div className="pl-4">&gt;</div>
                 </div>
              </div>
            </div>
            
            {/* Floating overlapping elements */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
              className="absolute -right-12 top-24 w-40 h-40 rounded-[2rem] bg-accent/10 backdrop-blur-2xl border border-accent/20 shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center -rotate-6"
            >
              <div className="text-center font-mono">
                <div className="text-3xl font-bold text-accent mb-1">+24%</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">Conversion</div>
              </div>
            </motion.div>
            
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
