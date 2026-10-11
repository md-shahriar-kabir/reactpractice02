export default function SummaryCard({
  title,
  value,
  subtext,
  icon,
  hoverBorderClass = 'hover:border-zinc-700',
  iconBoxClass = 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
  valueTextClass = 'text-white',
}) {
  return (
    <div
      className={`bg-[#121215] border border-zinc-800/90 ${hoverBorderClass} rounded-2xl p-4 sm:p-5 transition-all shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{title}</span>
        <div className={`p-1.5 sm:p-2 rounded-xl ${iconBoxClass}`}>
          {icon}
        </div>
      </div>
      <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
        <span
          className={`text-2xl sm:text-3xl font-extrabold ${valueTextClass} tracking-tight font-mono-code`}
        >
          {value}
        </span>
        <span className="text-[11px] text-zinc-500 font-medium">{subtext}</span>
      </div>
    </div>
  );
}
