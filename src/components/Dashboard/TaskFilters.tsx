import { useSearchParams } from "react-router-dom";

export default function TaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div className="flex flex-wrap gap-2">
      <select
        value={searchParams.get("status") || ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="h-9 rounded-lg border border-white/5 bg-[#0b1020] px-3 text-xs text-slate-300 outline-none"
      >
        <option value="">Status</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="IN_REVIEW">In Review</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        value={searchParams.get("priority") || ""}
        onChange={(e) => updateFilter("priority", e.target.value)}
        className="h-9 rounded-lg border border-white/5 bg-[#0b1020] px-3 text-xs text-slate-300 outline-none"
      >
        <option value="">Priority</option>
        <option value="URGENT">Urgent</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
    </div>
  );
}
