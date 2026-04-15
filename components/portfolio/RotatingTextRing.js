export default function RotatingTextRing({ text }) {
  const chars = text.split("");
  const step = 360 / chars.length;
  const radius = 230;

  return (
    <div className="relative h-[460px] w-[460px]">
      <span className="absolute inset-0 rounded-full border-2 border-zinc-400/70 dark:border-zinc-600/70" />
      <span className="absolute inset-4 rounded-full border border-zinc-300/40 blur-[1px] dark:border-zinc-700/60" />
      <div className="relative h-full w-full animate-[spin_30s_linear_infinite]">
        {chars.map((char, index) => (
          <b
            key={`${char}-${index}`}
            className="ring-text-font absolute left-1/2 top-0 text-[18px] font-semibold uppercase tracking-[0.5px] text-zinc-700 dark:text-zinc-200"
            style={{
              transform: `rotate(${index * step}deg)`,
              transformOrigin: `0 ${radius}px`,
            }}
          >
            {char}
          </b>
        ))}
      </div>
    </div>
  );
}
