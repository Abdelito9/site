"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";

interface ProjectItem {
  id: number | string;
  title: string;
  category: string;
  image: string;
}

interface PortfolioProps {
  data?: ProjectItem[];
  heading?: string;
}

function TiltCard({ project }: { project: ProjectItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] shrink-0 rounded-3xl overflow-hidden group border border-white/10"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent" />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-tr from-accent via-transparent to-white pointer-events-none mix-blend-overlay" />

      <motion.div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute bottom-10 left-10 right-10"
      >
        <div className="mb-2">
          <p className="text-accent text-sm font-medium tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            {project.category}
          </p>
        </div>
        <div>
          <h3 className="text-3xl md:text-5xl font-bold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            {project.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio({ data, heading }: PortfolioProps) {
  const content = (data && data.length > 0) ? data : [
    { id: 1, title: "Aura FinTech", category: "Web App & Dashboard", image: "https://picsum.photos/seed/prisme1/1200/800" },
    { id: 2, title: "Maison Nuance", category: "E-Commerce Luxe", image: "https://picsum.photos/seed/prisme2/1200/800" },
    { id: 3, title: "Oxygene AI", category: "SaaS Landing Page", image: "https://picsum.photos/seed/prisme3/1200/800" },
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal scroll reach based on content count
  const xTranslate = `-${(content.length - 1) * 50}%`;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", xTranslate]);

  return (
    <section id="portfolio" ref={targetRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="max-w-[1400px] mx-auto px-6 w-full mb-12">
          <ScrollReveal>
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
               {heading || "Travaux Recents"}
             </h2>
          </ScrollReveal>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-[calc((100vw-1400px)/2+1.5rem)]">
          {content.map((project) => (
            <TiltCard key={project.id} project={project} />
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
