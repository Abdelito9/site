"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, EnvelopeSimple, MapPin, WarningCircle } from "@phosphor-icons/react";
import type { BudgetOption } from "@/lib/strapi";

type FormState = "idle" | "loading" | "success" | "error";

interface ContactProps {
  headingStart?: string;
  headingAccent?: string;
  headingEnd?: string;
  description?: string;
  emailLabel?: string;
  email?: string;
  locationLabel?: string;
  location?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  emailFieldLabel?: string;
  emailPlaceholder?: string;
  budgetLabel?: string;
  budgetPlaceholder?: string;
  budgetOptions?: BudgetOption[];
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  loadingLabel?: string;
  successTitle?: string;
  successDescription?: string;
  resetLabel?: string;
  formEndpoint?: string;
}

const budgetFallback: BudgetOption[] = [
  { label: "5kEUR - 10kEUR", value: "5k-10k" },
  { label: "10kEUR - 25kEUR", value: "10k-25k" },
  { label: "25kEUR - 50kEUR", value: "25k-50k" },
  { label: "50kEUR+", value: "50k-plus" },
];

export default function Contact({
  headingStart,
  headingAccent,
  headingEnd,
  description,
  emailLabel,
  email,
  locationLabel,
  location,
  nameLabel,
  namePlaceholder,
  companyLabel,
  companyPlaceholder,
  emailFieldLabel,
  emailPlaceholder,
  budgetLabel,
  budgetPlaceholder,
  budgetOptions,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  loadingLabel,
  successTitle,
  successDescription,
  resetLabel,
  formEndpoint,
}: ContactProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const options = budgetOptions && budgetOptions.length > 0 ? budgetOptions : budgetFallback;
  const isLoading = formState === "loading";

  const fieldClassName =
    "w-full rounded-[1.65rem] border border-white/20 bg-[#1a1a1a] px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-accent/60 focus:bg-[#1e1e1e] focus:shadow-[0_0_0_4px_rgba(52,211,153,0.1)] disabled:cursor-not-allowed disabled:opacity-70";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      email: String(formData.get("email") || ""),
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || ""),
      page: "/",
    };

    try {
      if (formEndpoint) {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Impossible d'envoyer votre message.");
        }
      } else {
        const subject = encodeURIComponent(`Nouveau projet - ${payload.name || payload.company || "Contact"}`);
        const body = encodeURIComponent(
          [
            `Nom: ${payload.name}`,
            `Entreprise: ${payload.company}`,
            `Email: ${payload.email}`,
            `Budget: ${payload.budget}`,
            `Page: ${payload.page}`,
            "",
            payload.message,
          ].join("\n")
        );

        window.location.href = `mailto:${email || ""}?subject=${subject}&body=${body}`;
      }

      setFormState("success");
      form.reset();
    } catch (error) {
      setFormState("error");
      setErrorMessage(error instanceof Error ? error.message : "Impossible d'envoyer votre message.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] py-24 scroll-mt-32 md:py-32 xl:py-40">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute left-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/[0.08] bg-[#090909] px-6 py-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] md:px-8 md:py-10 xl:px-10 xl:py-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-y-0 left-[44%] hidden w-px bg-gradient-to-b from-transparent via-white/8 to-transparent xl:block" />

          <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.12fr)] xl:gap-12">
            <div className="flex flex-col gap-10">
              <div className="max-w-[34rem]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Contact
              </div>
              <h2 className="mb-6 max-w-[10ch] text-[clamp(2.9rem,6vw,5.1rem)] font-bold tracking-tighter leading-[0.92] text-foreground">
                {headingStart || "Pret a"} <br />
                <span className="text-accent italic">{headingAccent || "redefinir"}</span>
                <br />
                {headingEnd || "votre image ?"}
              </h2>
              <p className="max-w-[34ch] text-[1.05rem] leading-relaxed text-text-muted">
                {description ||
                  "Parlez-nous de votre projet. Nous selectionnons nos collaborations avec soin pour garantir un niveau de qualite intransigeant."}
              </p>
              </div>

              <div className="flex flex-col gap-5">
              <a
                href={`mailto:${email || "hello@prisme-studio.com"}`}
                className="group flex items-center gap-4 rounded-[1.75rem] border border-white/8 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:bg-white/5">
                  <EnvelopeSimple size={20} weight="light" className="text-text-secondary transition-colors group-hover:text-accent" />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium text-text-secondary">{emailLabel || "Email direct"}</div>
                  <div className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {email || "hello@prisme-studio.com"}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-[1.75rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10">
                  <MapPin size={20} weight="light" className="text-text-secondary" />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium text-text-secondary">{locationLabel || "Localisation"}</div>
                  <div className="text-lg font-semibold text-foreground">{location || "Paris, France (Remote WWD)"}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.02] px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">Delai</div>
                  <div className="mt-2 text-2xl font-semibold text-foreground">24h</div>
                  <p className="mt-2 text-sm text-text-muted">Premier retour clair et exploitable sur ton besoin.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.02] px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">Cadre</div>
                  <div className="mt-2 text-2xl font-semibold text-foreground">Sur mesure</div>
                  <p className="mt-2 text-sm text-text-muted">Design, intégration et CMS alignés avec ton activité.</p>
                </div>
              </div>
            </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.35rem] border border-white/[0.1] bg-[#111111] p-7 md:p-10 xl:p-12">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-40 bg-accent/5 blur-3xl pointer-events-none" />

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[2.35rem] bg-surface-light px-8 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle size={34} weight="fill" className="text-accent" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{successTitle || "Message envoye"}</h3>
                  <p className="max-w-[25ch] text-center text-text-muted">
                    {successDescription || "Notre equipe analysera votre demande et reviendra vers vous sous 24h."}
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-8 rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-accent transition-colors hover:border-white/20 hover:text-white"
                  >
                    {resetLabel || "Envoyer un autre message"}
                  </button>
                </motion.div>
              ) : null}

              <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">Brief projet</div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">Parlons concretement de ton site</h3>
                </div>
                <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-text-secondary">
                  Reponse humaine, pas de robot
                </div>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5 md:gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-text-secondary">
                    {nameLabel || "Nom complet"}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isLoading}
                    className={fieldClassName}
                    placeholder={namePlaceholder || "Elodie Dubois"}
                  />
                  <p className="text-xs text-text-muted">Le nom de la personne avec qui nous allons echanger.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-sm font-medium text-text-secondary">
                    {companyLabel || "Entreprise"}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    disabled={isLoading}
                    className={fieldClassName}
                    placeholder={companyPlaceholder || "Luminate HQ"}
                  />
                  <p className="text-xs text-text-muted">Optionnel, mais utile pour cadrer plus vite la demande.</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                  {emailFieldLabel || "Email professionnel"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  className={fieldClassName}
                  placeholder={emailPlaceholder || "elodie@luminate.com"}
                />
                <p className="text-xs text-text-muted">Nous revenons vers toi sur cette adresse.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="text-sm font-medium text-text-secondary">
                  {budgetLabel || "Budget estime"}
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                    disabled={isLoading}
                    style={{ colorScheme: "dark" }}
                    className={`${fieldClassName} appearance-none pr-14`}
                  >
                    <option value="" disabled className="bg-surface text-white/20">
                      {budgetPlaceholder || "Selectionner une fourchette"}
                    </option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value} className="bg-surface text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-text-secondary">
                    <ArrowRight size={16} weight="bold" className="rotate-90" />
                  </div>
                </div>
                <p className="text-xs text-text-muted">Une fourchette suffit pour orienter la proposition.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary">
                  {messageLabel || "Details du projet"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={isLoading}
                  className={`${fieldClassName} min-h-[180px] resize-none rounded-[2rem]`}
                  placeholder={messagePlaceholder || "Decrivez brievement vos objectifs..."}
                />
                <p className="text-xs text-text-muted">Plus tu es precis, plus notre retour sera pertinent.</p>
              </div>

              {formState === "error" ? (
                <div className="flex items-start gap-3 rounded-[1.5rem] border border-red-400/15 bg-red-400/10 px-4 py-4 text-sm text-red-200">
                  <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-white px-6 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-accent hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    {loadingLabel || "Envoi en cours..."}
                  </>
                ) : (
                  <>
                    {submitLabel || "Envoyer la demande"}
                    <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-text-muted">
                  <span>En envoyant ce formulaire, tu nous autorises a te recontacter.</span>
                  <span className="rounded-full border border-white/8 px-3 py-1.5">Pas de spam</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
