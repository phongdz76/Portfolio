"use client";

import { useEffect, useMemo, useState } from "react";
import NavHeader from "../components/portfolio/NavHeader";
import SectionHeading from "../components/portfolio/SectionHeading";
import RotatingTextRing from "../components/portfolio/RotatingTextRing";
import {
  AboutTextCard,
  ContactInfoCard,
  ProjectCard,
  ServiceCard,
  SkillCategoryCard,
} from "../components/portfolio/Cards";
import {
  ABOUT_CARDS,
  CONTACT_CARDS,
  portfolioContent,
  PROJECTS,
  RING_TEXT,
  ROLES,
  SECTION_IDS,
  SERVICES,
  SKILL_GROUPS,
  SOCIALS,
} from "../lib/portfolio-content";

const FLOATING_SHAPES = [
  { size: "h-24 w-24", position: "top-[12%] left-[8%]", duration: "6.5s" },
  { size: "h-32 w-32", position: "top-[20%] right-[12%]", duration: "7.5s" },
  { size: "h-20 w-20", position: "bottom-[24%] left-[16%]", duration: "8s" },
  { size: "h-28 w-28", position: "bottom-[8%] right-[7%]", duration: "6.8s" },
];

const PARTICLES = [
  { left: "10%", delay: "0s", duration: "9s" },
  { left: "28%", delay: "1.4s", duration: "10s" },
  { left: "46%", delay: "3s", duration: "11s" },
  { left: "64%", delay: "0.8s", duration: "8.6s" },
  { left: "82%", delay: "2.1s", duration: "10.5s" },
];

export default function Page() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [aboutImageIndex, setAboutImageIndex] = useState(0);

  const t = useMemo(() => portfolioContent[language], [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    if (savedLanguage === "en" || savedLanguage === "vi") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === "vi" ? "vi" : "en";
    document.documentElement.classList.toggle("lang-vi", language === "vi");
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    targets.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [AOSModule, ScrollRevealModule, gsapModule] = await Promise.all([
          import("aos"),
          import("scrollreveal"),
          import("gsap"),
        ]);

        if (!mounted) {
          return;
        }

        const AOS = AOSModule.default;
        AOS.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: true,
          offset: 45,
        });

        const ScrollReveal = ScrollRevealModule.default;
        const sr = ScrollReveal({
          distance: "40px",
          duration: 850,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          reset: false,
        });

        sr.reveal("[data-sr='up']", { origin: "bottom", interval: 100 });
        sr.reveal("[data-sr='left']", { origin: "left", interval: 120 });
        sr.reveal("[data-sr='right']", { origin: "right", interval: 120 });

        const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
        gsap.fromTo(
          "header",
          { y: -36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        );
      } catch (error) {
        console.error("Animation init failed", error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.user_name || !formData.user_email || !formData.message) {
      setStatus({ type: "error", message: t.formValidation });
      return;
    }

    setStatus({ type: "loading", message: t.sending });
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.user_name,
          user_email: formData.user_email,
          subject: formData.subject || "Portfolio Contact",
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || "Contact request failed");
      }

      setStatus({ type: "success", message: t.sent });
      setFormData({ user_name: "", user_email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email send failed", error);
      const message =
        error instanceof Error && error.message ? error.message : t.sendError;
      setStatus({ type: "error", message });
    } finally {
      setIsSending(false);
    }
  };

  const fieldClass =
    "peer w-full rounded-2xl border-2 border-[var(--main-color)]/25 bg-white/95 px-4 py-4 pr-11 text-sm text-[var(--font-color)] outline-none transition-all duration-300 placeholder-transparent focus:-translate-y-0.5 focus:border-[var(--main-color)] focus:shadow-[0_0_0_3px_rgba(220,75,35,0.12)] dark:bg-[#2d2d2df0]";
  const labelClass =
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-transparent px-1 text-sm text-[var(--font-color)]/70 transition-all duration-300 peer-focus:-top-2 peer-focus:left-3 peer-focus:translate-y-0 peer-focus:bg-[var(--bg-color)] peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[var(--main-color)] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:bg-[var(--bg-color)] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-[var(--main-color)]";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-color)] text-[var(--font-color)] transition-colors duration-500">
      <NavHeader
        navItems={t.nav}
        activeSection={activeSection}
        ctaText={t.cta}
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === "en" ? "vi" : "en"))
        }
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMobileMenuOpen(false)}
        labels={t}
      />

      <main className="pt-[90px]">
        <section
          id="home"
          className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20"
        >
          <div data-sr="left" className="text-center lg:text-left">
            <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-[var(--font-color)] sm:text-base">
              {t.welcome}
            </h3>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--font-color)] sm:text-5xl lg:text-6xl">
              {t.intro}
            </h1>

            <div className="mt-5 space-y-1.5">
              {ROLES[language].map((role, index) => (
                <p
                  key={role}
                  className="role-line text-lg font-bold tracking-[0.03em] sm:text-xl"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {role}
                </p>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[var(--font-color)]/90 sm:text-base lg:mx-0">
              {t.heroParagraph}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 xs:flex-row xs:justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ background: "var(--main-gradient)" }}
              >
                {t.hireNow}
                <i
                  className="bx bx-right-arrow-alt text-lg"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/images/PhongNguyen_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-lg border border-black/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-[0_3px_12px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.16)] dark:border-white/20 dark:bg-[#2d2d2de6] dark:text-zinc-100"
              >
                {t.downloadCv}
                <i className="bx bx-download text-base" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-[var(--main-color)] transition hover:-translate-y-1 hover:text-white dark:bg-[#2d2d2d]"
                >
                  <span
                    className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "var(--main-gradient)" }}
                  />
                  <i className={social.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div data-sr="right" className="flex justify-center lg:justify-end">
            <div className="relative flex h-[290px] w-[290px] items-center justify-center sm:h-[360px] sm:w-[360px] lg:h-[500px] lg:w-[500px]">
              <img
                src="/images/anh1.jpg"
                alt="Phong portrait"
                className="relative z-10 h-[240px] w-[240px] rounded-full object-cover sm:h-[290px] sm:w-[290px] lg:h-[390px] lg:w-[390px]"
              />

              <div className="absolute inset-0 hidden items-center justify-center sm:flex lg:flex">
                <div className="scale-[0.7] sm:scale-[0.8] md:scale-[0.92] lg:scale-100">
                  <RotatingTextRing text={RING_TEXT} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="py-16 sm:py-20"
          style={{ background: "var(--surface-gradient)" }}
        >
          <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div data-sr="left">
              <SectionHeading
                subtitle={t.aboutEyebrow}
                title={t.aboutTitle}
                align="left"
              />

              <div className="mt-8 space-y-4">
                {ABOUT_CARDS.map((card) => (
                  <AboutTextCard
                    key={card.icon}
                    icon={card.icon}
                    text={card.text[language]}
                  />
                ))}
              </div>

              <a
                href="/images/PhongNguyen_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-w-[150px] items-center justify-center gap-2 rounded-lg border border-black/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-[0_3px_12px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.16)] dark:border-white/20 dark:bg-[#2d2d2de6] dark:text-zinc-100"
              >
                {t.downloadCv}
                <i className="bx bx-download text-base" aria-hidden="true" />
              </a>
            </div>

            <div
              data-sr="right"
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative h-[340px] w-[260px] sm:h-[420px] sm:w-[320px]">
                <img
                  src="/images/IMG_2614.JPG"
                  alt="Phong - Software Engineering Student"
                  className={`absolute inset-0 h-full w-full rounded-3xl object-cover shadow-[0_20px_35px_rgba(0,0,0,0.2)] transition-opacity duration-1000 ${
                    aboutImageIndex === 0 ? "opacity-100" : "opacity-0"
                  }`}
                />
                <img
                  src="/images/z5944286235729_301d791e77cc768cc3db60e586b99da8.jpg"
                  alt="Phong - Software Engineering Student"
                  className={`absolute inset-0 h-full w-full rounded-3xl object-cover shadow-[0_20px_35px_rgba(0,0,0,0.2)] transition-opacity duration-1000 ${
                    aboutImageIndex === 1 ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full border-[3px] border-[var(--main-color)]/40" />
                <span className="pointer-events-none absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,var(--main-color)_2px,transparent_2px)] [background-size:12px_12px] opacity-40" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              subtitle={t.serviceEyebrow}
              title={t.serviceTitle}
              className="mb-10"
            />
            <div
              data-sr="up"
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {SERVICES.map((service) => (
                <ServiceCard
                  key={service.title.en}
                  icon={service.icon}
                  gradientClass={service.gradient}
                  title={service.title[language]}
                  description={service.description[language]}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="project" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              subtitle={t.projectEyebrow}
              title={t.projectTitle}
              className="mb-10"
            />
            <div
              data-sr="up"
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  image={project.image}
                  actions={project.actions}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="skill" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              subtitle={t.skillEyebrow}
              title={t.skillTitle}
              className="mb-10"
            />
            <div
              data-sr="up"
              className="rounded-3xl p-5 shadow-[0_14px_30px_rgba(0,0,0,0.14)] sm:p-7"
              style={{ background: "var(--surface-gradient)" }}
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {SKILL_GROUPS.map((group) => (
                  <SkillCategoryCard
                    key={group.title.en}
                    icon={group.icon}
                    title={group.title[language]}
                    items={group.items}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative isolate overflow-hidden scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20"
          style={{ background: "var(--surface-gradient)" }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            {FLOATING_SHAPES.map((shape, index) => (
              <span
                key={`shape-${index}`}
                className={`contact-shape absolute rounded-full bg-[var(--main-color)]/15 ${shape.size} ${shape.position}`}
                style={{ animationDuration: shape.duration }}
              />
            ))}
            {PARTICLES.map((particle, index) => (
              <span
                key={`particle-${index}`}
                className="contact-particle absolute bottom-[-20px] h-1 w-1 rounded-full bg-[var(--main-color)]/65"
                style={{
                  left: particle.left,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>

          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              subtitle={t.contactEyebrow}
              title={t.contactTitle}
              className="mx-auto mb-10 max-w-3xl"
            />
            <p className="mx-auto -mt-4 max-w-3xl text-center text-sm leading-7 text-[var(--font-color)]/90 sm:text-base">
              {t.contactSubtitle}
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
              <div data-sr="left" className="space-y-5">
                {CONTACT_CARDS.map((card) => (
                  <ContactInfoCard
                    key={card.icon}
                    icon={card.icon}
                    title={card.title[language]}
                    value={
                      typeof card.value === "string"
                        ? card.value
                        : card.value[language]
                    }
                  />
                ))}
              </div>

              <div
                data-sr="right"
                className="relative overflow-hidden rounded-[26px] border border-white/20 bg-white/20 p-5 backdrop-blur-2xl sm:p-8 dark:bg-black/25"
              >
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        autoComplete="name"
                        required
                        placeholder=" "
                        value={formData.user_name}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_name: event.target.value,
                          }))
                        }
                        className={fieldClass}
                      />
                      <label htmlFor="user_name" className={labelClass}>
                        {t.namePlaceholder}
                      </label>
                      <i className="bx bx-user pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--main-color)]/70" />
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="user_email"
                        autoComplete="email"
                        required
                        placeholder=" "
                        value={formData.user_email}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_email: event.target.value,
                          }))
                        }
                        className={fieldClass}
                      />
                      <label htmlFor="user_email" className={labelClass}>
                        {t.emailPlaceholder}
                      </label>
                      <i className="bx bx-envelope pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--main-color)]/70" />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      placeholder=" "
                      value={formData.subject}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: event.target.value,
                        }))
                      }
                      className={fieldClass}
                    />
                    <label htmlFor="subject" className={labelClass}>
                      {t.subjectPlaceholder}
                    </label>
                    <i className="bx bx-bookmark pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--main-color)]/70" />
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder=" "
                      value={formData.message}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: event.target.value,
                        }))
                      }
                      className={`${fieldClass} min-h-[130px] resize-y pr-12 pt-5`}
                    />
                    <label
                      htmlFor="message"
                      className="pointer-events-none absolute left-4 top-5 bg-transparent px-1 text-sm text-[var(--font-color)]/70 transition-all duration-300 peer-focus:-top-2 peer-focus:left-3 peer-focus:translate-y-0 peer-focus:bg-[var(--bg-color)] peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[var(--main-color)] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:bg-[var(--bg-color)] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-[var(--main-color)]"
                    >
                      {t.messagePlaceholder}
                    </label>
                    <i className="bx bx-message-dots pointer-events-none absolute right-4 top-5 text-lg text-[var(--main-color)]/70" />
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full border-2 border-transparent px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                      style={{ background: "var(--main-gradient)" }}
                    >
                      {isSending ? t.sending : t.send}
                      <i
                        className={`bx ${isSending ? "bx-loader-alt animate-spin" : "bx-send"} text-lg`}
                      />
                    </button>
                  </div>
                </form>

                {status.type !== "idle" && (
                  <div
                    className={`mt-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm text-white ${
                      status.type === "success"
                        ? "bg-emerald-600/90"
                        : status.type === "error"
                          ? "bg-rose-600/90"
                          : "bg-sky-600/90"
                    }`}
                  >
                    <i
                      className={`bx ${
                        status.type === "success"
                          ? "bx-check-circle"
                          : status.type === "error"
                            ? "bx-error-circle"
                            : "bx-loader-alt animate-spin"
                      } mt-0.5 text-xl`}
                    />
                    <p className="flex-1 leading-6">{status.message}</p>
                    <button
                      type="button"
                      onClick={() => setStatus({ type: "idle", message: "" })}
                      className="rounded-full p-1 transition hover:bg-white/20"
                      aria-label="Close status"
                    >
                      <i className="bx bx-x text-lg" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 py-6 text-center text-sm text-[var(--font-color)]/90 dark:border-white/10">
        Copyright &#169; 2026 by{" "}
        <span className="font-semibold">phongdz76</span>
      </footer>
    </div>
  );
}
