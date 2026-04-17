import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import {
  getAllPageSlugs,
  getMediaUrl,
  getPageBySlug,
  getSiteSettings,
  type PageBlock,
} from "@/lib/content";

export const dynamicParams = false;

function resolveSlug(segments?: string[]) {
  if (!segments || segments.length === 0) {
    return "home";
  }

  return segments.join("/");
}

function renderBlock(block: PageBlock) {
  if (block.blockType === "hero") {
    return (
      <Hero
        key="hero"
        data={{
          badge: block.badge,
          description: block.description,
          heading_end: block.headingEnd,
          heading_start: block.headingStart,
          scramble_phrases: block.scramblePhrases.map((item) => item.phrase).filter(Boolean),
        }}
        siteSettings={{
          hero_primary_cta_label: block.primaryCtaLabel,
          hero_secondary_cta_label: block.secondaryCtaLabel,
          hero_social_proof_subtitle: block.socialProofSubtitle,
          hero_social_proof_title: block.socialProofTitle,
        }}
      />
    );
  }

  if (block.blockType === "services") {
    return (
      <Services
        key="services"
        badge={block.badge}
        description={block.description}
        heading={block.heading}
        data={block.items.map((item, index) => ({
          desc: item.desc,
          icon: item.icon || "Code",
          id: String(index),
          title: item.title,
        }))}
      />
    );
  }

  if (block.blockType === "portfolio") {
    return (
      <Portfolio
        key="portfolio"
        heading={block.heading}
        data={block.projects.map((project, index) => ({
          category: project.category,
          id: String(index),
          image: getMediaUrl(project.image) || `https://picsum.photos/seed/project-${index}/1200/800`,
          title: project.title,
        }))}
      />
    );
  }

  if (block.blockType === "process") {
    return (
      <Process
        key="process"
        description={block.description}
        heading={block.heading}
        steps={block.steps.map((step, index) => ({
          desc: step.desc,
          num: step.num || String(index + 1).padStart(2, "0"),
          title: step.title,
        }))}
      />
    );
  }

  if (block.blockType === "testimonials") {
    return (
      <Testimonials
        key="testimonials"
        heading={block.heading}
        data={block.items.map((testimonial) => ({
          author: testimonial.author,
          avatar: getMediaUrl(testimonial.avatar),
          quote: testimonial.quote,
          role: testimonial.role,
        }))}
      />
    );
  }

  if (block.blockType === "contact") {
    return (
      <Contact
        key="contact"
        budgetLabel={block.budgetLabel}
        budgetOptions={block.budgetOptions}
        budgetPlaceholder={block.budgetPlaceholder}
        companyLabel={block.companyLabel}
        companyPlaceholder={block.companyPlaceholder}
        description={block.description}
        email={block.email}
        emailFieldLabel={block.emailFieldLabel}
        emailLabel={block.emailLabel}
        emailPlaceholder={block.emailPlaceholder}
        formEndpoint={process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT}
        headingAccent={block.headingAccent}
        headingEnd={block.headingEnd}
        headingStart={block.headingStart}
        loadingLabel={block.loadingLabel}
        location={block.location}
        locationLabel={block.locationLabel}
        messageLabel={block.messageLabel}
        messagePlaceholder={block.messagePlaceholder}
        nameLabel={block.nameLabel}
        namePlaceholder={block.namePlaceholder}
        resetLabel={block.resetLabel}
        submitLabel={block.submitLabel}
        successDescription={block.successDescription}
        successTitle={block.successTitle}
      />
    );
  }

  return null;
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();

  return slugs.map((slug) => ({
    slug: slug === "home" ? [] : slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(resolveSlug(slug));

  if (!page) {
    return {};
  }

  const metaTitle = page.metaTitle || page.title || "Prisme";
  const metaDescription =
    page.metaDescription || "Prisme concoit des experiences digitales sur mesure pour les entreprises ambitieuses.";

  return {
    description: metaDescription,
    title: metaTitle,
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(resolveSlug(slug));
  const settings = await getSiteSettings();

  if (!page) {
    notFound();
  }

  return (
    <main className="flex flex-col relative">
      <Navigation
        brandMark={settings.brandMark || "P"}
        brandName={settings.brandName || "Prisme"}
        ctaLabel={settings.navigationCtaLabel || "Lancer un projet"}
        links={settings.navigationLinks}
      />

      {page.blocks.map((block, index) => (
        <div key={`${block.blockType}-${index}`}>{renderBlock(block)}</div>
      ))}

      <Footer
        backgroundWord={settings.footerBackgroundWord || "PRISME"}
        brandMark={settings.brandMark || "P"}
        brandName={settings.brandName || "Prisme"}
        copyrightName={settings.copyrightName || "Prisme Studio"}
        description={settings.footerDescription}
        legalLinks={settings.footerLegalLinks}
        navigationLinks={settings.navigationLinks}
        navigationTitle={settings.footerNavigationTitle || "Studio"}
        socialLinks={settings.socialLinks}
        socialTitle={settings.footerSocialTitle || "Reseaux"}
      />
    </main>
  );
}
