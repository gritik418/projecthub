import { type SetURLSearchParams } from "react-router-dom";

interface TaskFiltersParams {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export default function TaskFilters({
  searchParams,
  setSearchParams,
}: TaskFiltersParams) {
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-400">Status</label>
        <select
          value={searchParams.get("status") || ""}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="h-9 rounded-lg border border-white/5 bg-[#0b1020] px-3 text-xs text-slate-300 outline-none"
        >
          <option value="">All Statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="IN_REVIEW">In Review</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-400">Priority</label>
        <select
          value={searchParams.get("priority") || ""}
          onChange={(e) => updateFilter("priority", e.target.value)}
          className="h-9 rounded-lg border border-white/5 bg-[#0b1020] px-3 text-xs text-slate-300 outline-none"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-400">Due From</label>
        <input
          type="date"
          value={searchParams.get("dueFrom") || ""}
          onChange={(e) => updateFilter("dueFrom", e.target.value)}
          className="h-9 rounded-lg border border-white/5 bg-[#0b1020] px-3 text-xs text-slate-300 outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-400">Due To</label>
        <input
          type="date"
          value={searchParams.get("dueTo") || ""}
          onChange={(e) => updateFilter("dueTo", e.target.value)}
          className="h-9 rounded-lg border border-white/5 bg-[#0b1020] px-3 text-xs text-slate-300 outline-none"
        />
      </div>
    </div>
  );
}
