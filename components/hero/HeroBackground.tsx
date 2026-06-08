'use client'

/* ── Particle data ── */

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 5) % 100}%`,
  top: `${(i * 19 + 3) % 100}%`,
  size: 1.5 + (i % 4) * 0.8,
  opacity: 0.1 + (i % 5) * 0.06,
  animClass: `particleFloat${1 + (i % 3)}` as const,
  dur: `${4 + (i % 4) * 2}s`,
  delay: `${(i * 0.6) % 6}s`,
}))

const particleKeyframes: Record<string, string> = {
  particleFloat1: 'particleFloat1',
  particleFloat2: 'particleFloat2',
  particleFloat3: 'particleFloat3',
}

/* ── Orb data ── */

const ORBS = [
  { key: 'o1', left: '12%', top: '20%', w: 380, h: 380, cls: 'animate-orb-pulse', bg: 'rgba(37,99,235,0.22)' },
  { key: 'o2', left: '85%', top: '25%', w: 300, h: 300, cls: 'animate-orb-pulse-delay', bg: 'rgba(139,92,246,0.16)' },
  { key: 'o3', left: '55%', top: '65%', w: 420, h: 320, cls: 'animate-orb-pulse-slow', bg: 'rgba(245,158,11,0.12)' },
  { key: 'o4', left: '30%', top: '75%', w: 260, h: 260, cls: 'animate-orb-pulse-delay', bg: 'rgba(37,99,235,0.10)' },
]

/* ── Floating rings ── */

const RINGS = [
  { key: 'r1', left: '8%', top: '15%', size: 180, cls: 'animate-ring', borderColor: 'rgba(59,130,246,0.15)' },
  { key: 'r2', left: '78%', top: '60%', size: 140, cls: 'animate-ring-reverse', borderColor: 'rgba(139,92,246,0.12)' },
  { key: 'r3', left: '55%', top: '10%', size: 220, cls: 'animate-ring', borderColor: 'rgba(148,163,184,0.1)' },
]

export default function HeroBackground() {
  return (
    <>
      {/* Soft radial overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(249,250,251,0.98) 0%, transparent 60%)' }}
        />
      </div>

      {/* Animated dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 dot-grid animate-grid-move" />
      </div>

      {/* Gradient orbs */}
      {ORBS.map(o => (
        <div
          key={o.key}
          className={`absolute pointer-events-none ${o.cls}`}
          style={{
            left: o.left, top: o.top,
            width: o.w, height: o.h,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${o.bg} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      ))}

      {/* Floating geometric rings */}
      {RINGS.map(r => (
        <div
          key={r.key}
          className={`absolute pointer-events-none rounded-full ${r.cls}`}
          style={{
            left: r.left, top: r.top,
            width: r.size, height: r.size,
            border: `1.5px solid ${r.borderColor}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: `rgba(148,163,184,${p.opacity * 2.5})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(148,163,184,${p.opacity * 2})`,
            animation: `${particleKeyframes[p.animClass]} ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </>
  )
}
