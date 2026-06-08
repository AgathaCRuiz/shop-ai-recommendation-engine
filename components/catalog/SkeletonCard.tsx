export default function SkeletonCard({ delay = 0 }: { delay?: number }) {
  const delayClass = delay > 0 && delay <= 8 ? `skeleton-delay-${delay}` : ''

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-slate-200/70">
      {/* Image area */}
      <div className="relative aspect-square skeleton-image">
        <div
          className={`absolute inset-0 skeleton-shimmer ${delayClass}`}
          style={{ opacity: 0.4 }}
        />

        {/* Badge placeholder */}
        <div className="absolute top-2 left-2">
          <div className="px-2 py-0.5 rounded-md skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)', width: 60, height: 16 }} />
        </div>

        {/* Discount placeholder */}
        <div className="absolute top-2 right-2">
          <div className="px-1.5 py-0.5 rounded-md skeleton-pulse" style={{ background: 'rgba(0,0,0,0.06)', width: 32, height: 16 }} />
        </div>
      </div>

      {/* Info section */}
      <div className="p-3 space-y-2">
        {/* Category */}
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded skeleton-shimmer" />
          <div className="h-2.5 w-14 rounded-full skeleton-shimmer" />
        </div>

        {/* Title — two lines */}
        <div className="space-y-1">
          <div className="h-3 w-full rounded-full skeleton-shimmer" />
          <div className="h-3 w-3/4 rounded-full skeleton-shimmer" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-px">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="w-2.5 h-2.5 rounded-full skeleton-shimmer" />
            ))}
          </div>
          <div className="h-2 w-6 rounded-full skeleton-shimmer" />
        </div>

        {/* Price + button */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <div className="h-5 w-14 rounded-full skeleton-shimmer" />
            <div className="h-3 w-10 rounded-full skeleton-shimmer" />
          </div>
          <div className="w-20 h-7 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}
