'use client'

export default function SparkBurst() {
  const sparks = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const dist = 30 + Math.random() * 20
    return {
      id: i,
      sx: `${Math.cos(angle) * dist}px`,
      sy: `${Math.sin(angle) * dist}px`,
      delay: `${Math.random() * 0.15}s`,
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: -1 }}>
      {sparks.map(s => (
        <div
          key={s.id}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: 3, height: 3,
            background: '#60A5FA',
            boxShadow: '0 0 6px #60A5FA',
            animation: `sparkBurst 0.5s ease-out ${s.delay} forwards`,
            '--sx': s.sx,
            '--sy': s.sy,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
