"use client";

import type { ReactNode } from "react";
import { Browser, DeviceMobile, RocketLaunch, MagnifyingGlass, PaintBrush, Code, Strategy, Lightning } from "@phosphor-icons/react";
import SpotlightCard from "./ui/SpotlightCard";
import ScrollReveal from "./ui/ScrollReveal";

const iconMap: Record<string, ReactNode> = {
  Browser: <Browser size={24} weight="light" />,
  DeviceMobile: <DeviceMobile size={24} weight="light" />,
  RocketLaunch: <RocketLaunch size={24} weight="light" />,
  MagnifyingGlass: <MagnifyingGlass size={24} weight="light" />,
  PaintBrush: <PaintBrush size={24} weight="light" />,
  Code: <Code size={24} weight="light" />,
  Strategy: <Strategy size={24} weight="light" />,
  Lightning: <Lightning size={24} weight="light" />
};

interface ServiceItem {
  id: number | string;
  title: string;
  desc: string;
  icon: string;
}

interface ServicesProps {
  data?: ServiceItem[];
  heading?: string;
  description?: string;
  badge?: string;
}

export default function Services({ data, heading, description, badge }: ServicesProps) {
  const content = (data && data.length > 0) ? data : [
    { id: 1, title: "Sites Vitrines Premium", desc: "Des interfaces qui capturent l'essence de votre marque. Animations fluides, design asymétrique.", icon: "Browser" },
    { id: 2, title: "Applications Web", desc: "SaaS et plateformes complexes transformés en expériences intuitives.", icon: "DeviceMobile" },
    { id: 3, title: "SEO & Performance", desc: "Architecture Next.js optimisée pour le Core Web Vitals de Google.", icon: "MagnifyingGlass" },
    { id: 4, title: "E-Commerce", desc: "Boutiques en ligne pensées pour la conversion.", icon: "RocketLaunch" },
  ];

  return (
    <section id="services" className="relative py-32 w-full bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 w-full">
        
        <ScrollReveal>
          <div className="mb-20 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-widest text-text-secondary mb-6">
              {badge || "Expertise"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground max-w-[20ch]">
              {heading || "L'ingenierie rencontre le design."}
            </h2>
            <p className="text-text-muted text-lg max-w-[65ch]">
              {description ||
                "Nous ne faisons pas de templates. Chaque ligne de code et chaque pixel sont concus sur mesure pour elever votre entreprise au-dessus de la masse."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
          {content.map((service, index) => (
            <ScrollReveal 
              key={service.id} 
              delay={index * 0.1} 
              className="col-span-1"
            >
              <SpotlightCard className="h-full min-h-[300px] flex flex-col justify-end group p-8">
                <div className="absolute top-8 right-8 text-accent/20 transition-all duration-700 group-hover:text-accent/40 group-hover:scale-110 group-hover:-rotate-12">
                  {iconMap[service.icon] || <Code size={24} weight="light" />}
                </div>
                
                <div className="relative z-10 flex flex-col gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-foreground mb-4">
                     {iconMap[service.icon] || <Code size={24} weight="light" />}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{service.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-[15px]">
                    {service.desc}
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
