import { useEffect, useMemo, useState } from "react";
import { useGetClientsQuery } from "../../features/client/client.api";
import type { Client } from "../../features/client/client.interface";
import { Check, ChevronDown, Search, UserRound } from "lucide-react";

const SelectClientDropdown = () => {
  const { data, isFetching } = useGetClientsQuery();
  const [clients, setClients] = useState<Client[]>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const [clientSearch, setClientSearch] = useState<string>("");

  const filteredClients = useMemo(() => {
    const search = clientSearch.trim().toLowerCase();

    if (!search) {
      return clients;
    }

    return clients?.filter((client) => {
      return (
        client.name.toLowerCase().includes(search) ||
        client.email?.toLowerCase().includes(search) ||
        client.company?.toLowerCase().includes(search)
      );
    });
  }, [clientSearch, clients]);

  useEffect(() => {
    if (data?.data?.clients) {
      setClients(data.data.clients);
    }
  }, [data]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">
        Client
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setClientOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-left outline-none transition hover:border-slate-600 focus:border-indigo-500"
        >
          {selectedClient ? (
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100/70 text-sm font-semibold text-indigo-700">
                {selectedClient.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-200">
                  {selectedClient.name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {selectedClient.company || selectedClient.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-slate-500">
              <UserRound size={17} />
              <span className="text-sm">Select a client</span>
            </div>
          )}

          <ChevronDown
            size={17}
            className={`shrink-0 text-slate-500 transition-transform ${
              clientOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {clientOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
            <div className="border-b border-slate-700 p-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full rounded-lg bg-slate-800 py-2 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto p-1.5">
              {isFetching ? (
                <div className="text-white text-center py-8">Loading...</div>
              ) : (
                <>
                  {filteredClients?.length ? (
                    filteredClients.map((client) => {
                      const isSelected = selectedClient?.id === client.id;

                      return (
                        <button
                          key={client.id}
                          type="button"
                          onClick={() => {
                            setSelectedClient(client);
                            setClientOpen(false);
                            setClientSearch("");
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                            isSelected
                              ? "bg-indigo-500/10"
                              : "hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100/70 text-sm font-semibold text-indigo-700">
                            {client.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-200">
                              {client.name}
                            </p>

                            <div className="mt-0.5 flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-2">
                              {client.email && (
                                <span className="truncate text-xs text-slate-400">
                                  {client.email}
                                </span>
                              )}

                              {client.email && client.company && (
                                <span className="hidden text-slate-600 sm:inline">
                                  •
                                </span>
                              )}

                              {client.company && (
                                <span className="truncate text-xs text-slate-500">
                                  {client.company}
                                </span>
                              )}
                            </div>
                          </div>

                          {isSelected && (
                            <Check
                              size={17}
                              className="shrink-0 text-indigo-400"
                            />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-8 text-center">
                      <p className="text-sm text-slate-400">No clients found</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="mt-1.5 text-xs text-slate-500">
        Select the client this project belongs to.
      </p>
    </div>
  );
};

export default SelectClientDropdown;
