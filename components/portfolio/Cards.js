export function AboutTextCard({ icon, text }) {
  return (
    <article className="group flex items-start gap-4 rounded-2xl border-l-4 border-[var(--main-color)] bg-white/70 p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] dark:bg-[#2d2d2dcc] dark:hover:bg-[#363636dd]">
      <div
        className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-white"
        style={{ background: "var(--main-gradient)" }}
      >
        <i className={icon} aria-hidden="true" />
      </div>
      <p className="text-sm leading-7 text-[var(--font-color)] sm:text-base">
        {text}
      </p>
    </article>
  );
}

export function ServiceCard({ icon, gradientClass, title, description }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/80 bg-white/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#2d2d2de6]">
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br from-white/5 to-[var(--main-color)]/20 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div
        className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl text-white shadow-lg transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 ${gradientClass}`}
      >
        <i className={icon} aria-hidden="true" />
      </div>
      <h3 className="relative pb-3 text-2xl font-bold text-[#2c3e50] dark:text-zinc-100">
        {title}
        <span
          className="absolute bottom-0 left-0 h-[3px] w-10 rounded-full"
          style={{ background: "var(--main-gradient)" }}
        />
      </h3>
      <p className="relative mt-4 flex-1 text-sm leading-7 text-[#5f5f5f] dark:text-zinc-300 sm:text-base">
        {description}
      </p>
    </article>
  );
}

export function ProjectCard({ title, image, actions = [], link, label }) {
  const normalizedActions =
    Array.isArray(actions) && actions.length > 0
      ? actions
      : link && label
        ? [{ label, link }]
        : [];

  const validActions = normalizedActions.filter(
    (action) => action?.label && action?.link,
  );

  return (
    <article className="rounded-3xl border border-black/10 bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-[#2d2d2d]">
      <div className="overflow-hidden rounded-2xl">
        <img src={image} alt={title} className="h-52 w-full object-cover" />
      </div>
      <h3 className="mt-4 text-center text-xl font-bold text-[#333] dark:text-zinc-100">
        {title}
      </h3>
      {validActions.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {validActions.map((action) => (
            <a
              key={`${title}-${action.label}-${action.link}`}
              href={action.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#333] px-5 py-2 text-sm font-semibold text-[#333] transition hover:bg-[#333] hover:text-white dark:border-[var(--main-color)] dark:text-zinc-100 dark:hover:bg-[var(--main-color)]"
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function SkillCategoryCard({ icon, title, items }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border-2 border-[var(--main-color)]/10 bg-white/95 p-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--main-color)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)] dark:bg-[#2d2d2de0]">
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[var(--main-color)]/10 to-transparent transition-transform duration-500 group-hover:translate-x-[220%]" />
      <div className="mb-4 flex items-center gap-3">
        <i
          className={`${icon} text-3xl text-[var(--main-color)] transition-transform duration-300 group-hover:scale-110`}
          aria-hidden="true"
        />
        <h3 className="text-2xl font-bold text-[var(--font-color)] transition-colors duration-300 group-hover:text-[var(--main-color)]">
          {title}
        </h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <span
            key={item}
            className="block rounded-xl border-l-[3px] border-transparent bg-[var(--main-color)]/5 px-4 py-2 text-sm font-medium text-[var(--font-color)] transition-all duration-300 hover:translate-x-1 hover:border-[var(--main-color)] hover:bg-[var(--main-color)]/10 hover:text-[var(--main-color)]"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export function ContactInfoCard({ icon, title, value }) {
  return (
    <article className="group relative flex items-start gap-4 overflow-hidden rounded-3xl border border-[var(--main-color)]/15 bg-white/85 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[var(--main-color)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] sm:items-center dark:bg-[#2d2d2dcc]">
      <span className="pointer-events-none absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-[var(--main-color)]/15 to-transparent transition-all duration-500 group-hover:left-full" />
      <div
        className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: "var(--main-gradient)" }}
      >
        <i className={icon} aria-hidden="true" />
      </div>
      <div className="relative min-w-0 flex-1">
        <h4 className="text-lg font-semibold text-[var(--font-color)] transition-colors duration-300 group-hover:text-[var(--main-color)]">
          {title}
        </h4>
        <p className="mt-1 text-sm font-medium leading-6 text-[var(--main-color)] break-words [overflow-wrap:anywhere] sm:text-base">
          {value}
        </p>
      </div>
    </article>
  );
}
