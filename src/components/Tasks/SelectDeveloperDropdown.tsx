import { useMemo, useState } from "react";
import { Check, ChevronDown, Search, UserRound } from "lucide-react";
import type { UseFormSetValue } from "react-hook-form";

import type { CreateTaskDto } from "../../schemas/task/create-task.schema";
import type { Developer } from "../../features/user/user.interface";

interface SelectDeveloperDropdownProps {
  developers: Developer[];
  setValue: UseFormSetValue<CreateTaskDto>;
}

const SelectDeveloperDropdown = ({
  developers,
  setValue,
}: SelectDeveloperDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer>();

  const filteredDevelopers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return developers;
    }

    return developers.filter(
      (developer) =>
        developer.name.toLowerCase().includes(value) ||
        developer.email.toLowerCase().includes(value),
    );
  }, [developers, search]);

  const handleSelect = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setValue("assignedDeveloperId", developer.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-200">
        Assign Developer
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-left transition hover:border-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {selectedDeveloper ? (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100/70 text-sm font-semibold text-indigo-700">
              {selectedDeveloper.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-100">
                {selectedDeveloper.name}
              </p>

              <p className="truncate text-xs text-slate-400">
                {selectedDeveloper.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400">
              <UserRound size={17} />
            </div>

            <span className="text-sm text-slate-500">Select a developer</span>
          </div>
        )}

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-2xl">
          <div className="border-b border-slate-700 p-3">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                placeholder="Search developers..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            {filteredDevelopers.length > 0 ? (
              filteredDevelopers.map((developer) => {
                const isSelected = developer.id === selectedDeveloper?.id;

                return (
                  <button
                    key={developer.id}
                    type="button"
                    onClick={() => handleSelect(developer)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                      isSelected ? "bg-indigo-500/10" : "hover:bg-slate-700"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100/70 text-sm font-semibold text-indigo-700">
                      {developer.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-100">
                        {developer.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {developer.email}
                      </p>
                    </div>

                    {isSelected && (
                      <Check size={18} className="shrink-0 text-indigo-400" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-8 text-center">
                <UserRound size={22} className="mx-auto text-slate-500" />

                <p className="mt-2 text-sm font-medium text-slate-300">
                  No developers found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try searching by name or email.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDeveloperDropdown;
