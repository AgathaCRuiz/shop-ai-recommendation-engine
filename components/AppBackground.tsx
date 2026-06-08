'use client'

/**
 * Subtle, sophisticated dark background.
 * A single soft halo at the top-center with two nearly-invisible mesh blobs
 * that drift imperceptibly — no grid, no noise, no loud orbs.
 */

export default function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2 top-0 w-[900px] h-[600px] opacity-80"
        style={{
          transform: 'translate(-50%, -28%)',
          background:
            'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(247,250,252,0.95) 0%, transparent 72%)',
        }}
      />

      <div
        className="absolute w-[520px] h-[520px] rounded-full opacity-40 animate-spin"
        style={{
          left: '65%',
          top: '35%',
          background:
            'radial-gradient(circle at center, rgba(59,130,246,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDuration: '42s',
        }}
      />

      <div
        className="absolute w-[420px] h-[420px] rounded-full opacity-30 animate-spin"
        style={{
          left: '20%',
          top: '58%',
          background:
            'radial-gradient(circle at center, rgba(248,180,80,0.16) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animationDuration: '55s',
          animationDirection: 'reverse',
        }}
      />
    </div>
  )
}
