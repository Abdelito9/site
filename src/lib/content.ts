import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type BudgetOption = {
  label: string;
  value: string;
};

export type SiteSettings = {
  brandMark: string;
  brandName: string;
  copyrightName: string;
  footerBackgroundWord: string;
  footerDescription: string;
  footerLegalLinks: NavLink[];
  footerNavigationTitle: string;
  footerSocialTitle: string;
  navigationCtaLabel: string;
  navigationLinks: NavLink[];
  socialLinks: SocialLink[];
};

export type HeroBlock = {
  blockType: "hero";
  badge: string;
  headingStart: string;
  scramblePhrases: Array<{ phrase: string }>;
  headingEnd: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  socialProofTitle: string;
  socialProofSubtitle: string;
};

export type ServicesBlock = {
  blockType: "services";
  badge: string;
  heading: string;
  description: string;
  items: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
};

export type PortfolioBlock = {
  blockType: "portfolio";
  heading: string;
  projects: Array<{
    title: string;
    category: string;
    image?: string;
  }>;
};

export type ProcessBlock = {
  blockType: "process";
  heading: string;
  description: string;
  steps: Array<{
    num: string;
    title: string;
    desc: string;
  }>;
};

export type TestimonialsBlock = {
  blockType: "testimonials";
  heading: string;
  items: Array<{
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }>;
};

export type ContactBlock = {
  blockType: "contact";
  headingStart: string;
  headingAccent: string;
  headingEnd: string;
  description: string;
  emailLabel: string;
  email: string;
  locationLabel: string;
  location: string;
  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  emailFieldLabel: string;
  emailPlaceholder: string;
  budgetLabel: string;
  budgetPlaceholder: string;
  budgetOptions: BudgetOption[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  loadingLabel: string;
  successTitle: string;
  successDescription: string;
  resetLabel: string;
};

export type PageBlock =
  | HeroBlock
  | ServicesBlock
  | PortfolioBlock
  | ProcessBlock
  | TestimonialsBlock
  | ContactBlock;

export type PageContent = {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  blocks: PageBlock[];
};

const contentRoot = path.join(process.cwd(), "src/content");
const pagesRoot = path.join(contentRoot, "pages");

async function readJsonFile<T>(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function getPageFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getPageFiles(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith(".json")) {
        return [fullPath];
      }

      return [];
    })
  );

  return files.flat();
}

export const getSiteSettings = cache(async () => {
  return readJsonFile<SiteSettings>(path.join(contentRoot, "site.json"));
});

export const getAllPages = cache(async () => {
  const pageFiles = await getPageFiles(pagesRoot);
  const pages = await Promise.all(pageFiles.map((filePath) => readJsonFile<PageContent>(filePath)));
  return pages.sort((left, right) => left.slug.localeCompare(right.slug));
});

export const getPageBySlug = cache(async (slug: string) => {
  const pages = await getAllPages();
  return pages.find((page) => page.slug === slug);
});

export const getAllPageSlugs = cache(async () => {
  const pages = await getAllPages();
  return pages.map((page) => page.slug);
});

export function getMediaUrl(media?: string | null) {
  if (!media) {
    return undefined;
  }

  if (media.startsWith("http://") || media.startsWith("https://") || media.startsWith("/")) {
    return media;
  }

  return `/${media.replace(/^\/+/, "")}`;
}
