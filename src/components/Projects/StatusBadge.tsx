const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Planning: "bg-slate-700 text-slate-300",
    "In Progress": "bg-indigo-500/15 text-indigo-300",
    Completed: "bg-emerald-500/15 text-emerald-300",
    Archived: "bg-slate-700 text-slate-400",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles] ?? "bg-slate-700 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
