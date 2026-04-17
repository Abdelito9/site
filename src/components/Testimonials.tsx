"use client";

import Image from "next/image";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsProps {
  data?: TestimonialItem[];
  heading?: string;
}

function MarqueeRow({ items, reverse = false }: { items: TestimonialItem[]; reverse?: boolean }) {
  const scrollItems = [...items, ...items];

  return (
    <div className="flex overflow-hidden relative w-full fade-edges py-4">
      <div className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        {scrollItems.map((item, index) => (
          <div 
            key={index} 
            className="w-[350px] md:w-[450px] shrink-0 rounded-3xl border border-white/5 bg-surface/30 p-8 pt-10 shadow-lg backdrop-blur-md relative mx-3"
          >
            <div className="absolute top-6 left-6 text-6xl text-white/5 font-serif leading-none">&ldquo;</div>
            
            <p className="text-text-secondary leading-relaxed mb-8 relative z-10 text-[15px]">
              {item.quote}
            </p>
            <div className="flex items-center gap-4">
              <Image
                src={item.avatar || `https://picsum.photos/seed/${item.author}/150/150`}
                alt={item.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover grayscale opacity-80"
                unoptimized={Boolean(item.avatar?.startsWith("http")) && !item.avatar?.includes("/uploads/")}
              />
              <div>
                <div className="font-semibold text-white tracking-tight">{item.author}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials({ data, heading }: TestimonialsProps) {
  const content = (data && data.length > 0) ? data : [
    { quote: "Prisme n'a pas juste créé notre site, ils ont redéfini notre image de marque.", author: "Elara Vance", role: "CEO, Aura FinTech" },
    { quote: "Une compréhension technique rare couplée à un œil esthétique incroyable.", author: "Julian Rossi", role: "Directeur Digital, Maison Nuance" },
    { quote: "Leur maîtrise de Next.js a permis à notre portfolio de se démarquer immédiatement.", author: "Marcus Chen", role: "Architecte Associé, Luminate" },
  ];

  return (
    <section className="py-32 bg-[#050505] overflow-hidden">
      <div className="mb-20 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
          {heading || "Ils parlent pour nous"}
        </h2>
      </div>

      <div className="flex flex-col gap-6 w-[120vw] -ml-[10vw] -rotate-2 transform-gpu">
        <MarqueeRow items={content} />
        <MarqueeRow items={content} reverse />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
}
