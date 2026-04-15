export default function SectionHeading({
  subtitle,
  title,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center" : "text-left"} ${className}`}>
      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--main-color)] sm:text-sm">
        {subtitle}
      </span>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[var(--font-color)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-[3px] w-16 rounded-full ${isCenter ? "mx-auto" : ""}`}
        style={{ background: "var(--main-gradient)" }}
      />
    </div>
  );
}
