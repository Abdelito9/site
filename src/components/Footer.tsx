import { ArrowUpRight, GithubLogo, GlobeHemisphereWest, InstagramLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react/dist/ssr";
import type { NavLink, SocialLink } from "@/lib/strapi";

interface FooterProps {
  brandName?: string;
  brandMark?: string;
  description?: string;
  navigationTitle?: string;
  navigationLinks?: NavLink[];
  socialTitle?: string;
  socialLinks?: SocialLink[];
  legalLinks?: NavLink[];
  backgroundWord?: string;
  copyrightName?: string;
}

const socialIconMap = {
  twitter: <TwitterLogo size={18} />,
  x: <TwitterLogo size={18} />,
  linkedin: <LinkedinLogo size={18} />,
  github: <GithubLogo size={18} />,
  instagram: <InstagramLogo size={18} />,
} as const;

function getSocialIcon(icon: string, label: string) {
  const key = (icon || label).toLowerCase().replace("logo", "").trim();
  return socialIconMap[key as keyof typeof socialIconMap] || <GlobeHemisphereWest size={18} />;
}

export default function Footer({
  brandName,
  brandMark,
  description,
  navigationTitle,
  navigationLinks,
  socialTitle,
  socialLinks,
  legalLinks,
  backgroundWord,
  copyrightName,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const links = navigationLinks && navigationLinks.length > 0 ? navigationLinks : [
    { label: "Expertise", href: "#services" },
    { label: "Travaux", href: "#portfolio" },
    { label: "Methode", href: "#processus" },
    { label: "Contact", href: "#contact" },
  ];
  const socials = socialLinks && socialLinks.length > 0 ? socialLinks : [
    { label: "Twitter", href: "#", icon: "TwitterLogo" },
    { label: "LinkedIn", href: "#", icon: "LinkedinLogo" },
    { label: "GitHub", href: "#", icon: "GithubLogo" },
  ];
  const legal = legalLinks && legalLinks.length > 0 ? legalLinks : [
    { label: "Mentions legales", href: "#" },
    { label: "Politique de confidentialite", href: "#" },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.04] pt-20 pb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col items-start gap-6">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-[#050505] font-bold text-sm">{brandMark || "P"}</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">{brandName || "Prisme"}</span>
            </a>
            <p className="text-text-muted leading-relaxed max-w-[40ch]">
              {description ||
                "Studio creatif independant. Nous construisons des presences digitales qui transcendent les standards de l'industrie pour les entreprises audacieuses."}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white mb-2">{navigationTitle || "Studio"}</h4>
            {links.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href} className="text-text-secondary hover:text-white transition-colors w-max">
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white mb-2">{socialTitle || "Reseaux"}</h4>
            {socials.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href} className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors group w-max">
                {getSocialIcon(link.icon, link.label)}
                <span>{link.label}</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} {copyrightName || "Prisme Studio"}. Tous droits reserves.
          </p>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            {legal.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Massive subtle typography in background */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[15vw] font-bold tracking-tighter text-white/[0.02] pointer-events-none select-none whitespace-nowrap">
        {backgroundWord || "PRISME"}
      </div>
    </footer>
  );
}
