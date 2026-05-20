export default function ShimmerLoader() {
  return (
    <div className="w-full space-y-4 p-6">
      <div className="h-6 w-1/4 animate-pulse rounded bg-slate-800"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-[#161b2e] border border-slate-800"></div>
        ))}
      </div>
    </div>
  );
}
