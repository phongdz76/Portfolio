export default function NavHeader({
  navItems,
  activeSection,
  ctaText,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  mobileMenuOpen,
  onToggleMenu,
  onCloseMenu,
  labels,
}) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 backdrop-blur-md dark:border-white/10"
      style={{ background: "var(--surface-gradient)" }}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="text-3xl font-bold leading-none text-zinc-900 dark:text-zinc-100"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--main-gradient)" }}
          >
            P
          </span>
          hong
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm font-semibold transition ${
                activeSection === id
                  ? "text-[var(--main-color)]"
                  : "text-[var(--font-color)] hover:text-[var(--main-color)]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="inline-flex h-10 min-w-[56px] items-center justify-center gap-1 rounded-xl px-2 text-xs font-bold tracking-[0.06em] text-zinc-700 transition hover:-translate-y-0.5 hover:bg-blue-500/10 hover:text-blue-600 dark:text-zinc-200 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
            aria-label={labels.languageSwitch}
            title={labels.languageSwitch}
          >
            <i className="bx bx-world text-xl" aria-hidden="true" />
            <span>{language.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-zinc-700 transition hover:-translate-y-0.5 hover:bg-blue-500/10 hover:text-blue-600 dark:text-zinc-200 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label={theme === "dark" ? labels.themeLight : labels.themeDark}
            title={theme === "dark" ? labels.themeLight : labels.themeDark}
          >
            <i
              className={`bx ${theme === "dark" ? "bx-moon" : "bx-sun"} text-2xl`}
              aria-hidden="true"
            />
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 sm:inline-flex"
            style={{ background: "var(--main-gradient)" }}
          >
            {ctaText}
          </a>

          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/20 text-zinc-800 transition hover:bg-zinc-100 dark:border-white/20 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden"
            aria-label={labels.menu}
          >
            <i
              className={`bx ${mobileMenuOpen ? "bx-x" : "bx-menu"} text-2xl`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-black/10 transition-all duration-300 dark:border-white/10 md:hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-3 sm:px-6">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={onCloseMenu}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeSection === id
                  ? "bg-[var(--main-color)]/15 text-[var(--main-color)]"
                  : "text-[var(--font-color)] hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
