export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Soft aurora mesh (three subtle blobs using theme tints) */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(60%_50%_at_20%_18%,theme(colors.primary.50)_0%,transparent_60%),radial-gradient(45%_45%_at_85%_20%,theme(colors.secondary.50)_0%,transparent_60%),radial-gradient(55%_55%_at_78%_82%,theme(colors.tertiary.50)_0%,transparent_55%)]
        "
      />

      {/* Left scrim to guarantee text readability */}
      <div
        className="
          absolute inset-y-0 left-0 w-[62%]
          bg-gradient-to-r from-white via-white/90 to-white/0
          dark:from-black dark:via-black/70 dark:to-transparent
        "
      />

      {/* Optional whisper grain (only if you add /public/noise.png) */}
      {/* <div className='absolute inset-0 bg-[url("/noise.png")] opacity-[0.04] mix-blend-soft-light' /> */}
    </div>
  );
}
