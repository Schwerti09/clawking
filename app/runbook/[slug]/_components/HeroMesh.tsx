// Static SVG mesh-gradient hero backdrop. No JS, no layout shift, no animation on reduced-motion.
// Ships ~1.5 KB inline — cheaper than an image while looking premium.
export default function HeroMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
    </div>
  )
}
