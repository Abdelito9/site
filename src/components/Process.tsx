"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProcessStep } from "@/lib/strapi";

interface ProcessProps {
  heading?: string;
  description?: string;
  steps?: ProcessStep[];
}

const stepsFallback: ProcessStep[] = [
  {
    num: "01",
    title: "Strategie & Decouverte",
    desc: "Nous analysons votre marche, vos objectifs et votre audience. C'est ici que l'architecture de l'information et la direction artistique sont definies.",
  },
  {
    num: "02",
    title: "Design UX/UI",
    desc: "Creation de maquettes haute-fidelite. Nous utilisons des typographies premium, des grilles asymetriques et definissons les micro-interactions.",
  },
  {
    num: "03",
    title: "Developpement Creatif",
    desc: "Integration pixel-perfect avec React et Next.js. Animations fluides via Framer Motion pour une performance irreprochable.",
  },
  {
    num: "04",
    title: "Lancement & Evolution",
    desc: "Deploiement, optimisation SEO technique et formation sur votre nouveau CMS. Votre plateforme est prete a convertir.",
  },
];

export default function Process({ heading, description, steps }: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const content = steps && steps.length > 0 ? steps : stepsFallback;

  return (
    <section id="processus" className="relative py-32 bg-[#050505]" ref={containerRef}>
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            {heading || "Notre Processus"}
          </h2>
          <p className="text-text-muted text-lg">
            {description || "Une methodologie rigoureuse pour des resultats d'exception."}
          </p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-accent origin-top shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
            />
          </div>

          <div className="flex flex-col gap-24">
            {content.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.num} className="relative flex flex-col md:flex-row items-start md:justify-between group">
                  
                  {/* Visual Node */}
                  <div className="absolute left-[16px] md:left-1/2 top-0 w-6 h-6 rounded-full border-2 border-[#050505] bg-surface z-10 md:-translate-x-1/2 shadow-[0_0_0_4px_rgba(255,255,255,0.05)] transition-colors duration-500 group-hover:bg-accent group-hover:shadow-[0_0_0_4px_rgba(52,211,153,0.2)]" />

                  {/* Content Left (Empty for odd on desktop) */}
                  <div className={`hidden md:block w-[42%] pt-8 ${isEven ? "text-right pr-12" : "opacity-0"}`}>
                    {isEven && (
                      <>
                        <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                      </>
                    )}
                  </div>

                  {/* Number - Mobile sits next to node, Desktop sits near center */}
                  <div className="pl-16 md:pl-0 w-full md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-mt-8 md:text-center pointer-events-none">
                     <span className="font-mono text-5xl md:text-8xl font-black text-transparent opacity-30 md:opacity-10 group-hover:opacity-20 md:group-hover:opacity-5 transition-opacity" style={{ WebkitTextStroke: '1px var(--color-foreground)' }}>
                        {step.num}
                     </span>
                  </div>

                  {/* Content Desktop Right / Mobile Content */}
                  <div className={`w-full pl-16 md:pl-0 md:w-[42%] pt-2 md:pt-8 ${isEven ? "md:opacity-0" : "md:text-left md:pl-12"}`}>
                    {(!isEven || true) && (
                      <div className={isEven ? "md:hidden" : ""}>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                        <p className="text-text-secondary leading-relaxed text-sm md:text-base">{step.desc}</p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
