const StatItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
          <Icon size={18} />
        </div>

        <span className="text-sm font-medium text-slate-300">{label}</span>
      </div>

      <p className="mt-4 text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  );
};

export default StatItem;
