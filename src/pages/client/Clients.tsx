import { Plus, Users } from "lucide-react";
import ClientRow from "../../components/Clients/ClientRow";
import { useGetClientsQuery } from "../../features/client/client.api";
import { useEffect, useState } from "react";
import type { Client } from "../../features/client/client.interface";

const Clients = () => {
  const { data, isLoading } = useGetClientsQuery();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (data?.data?.clients) {
      setClients(data.data.clients);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <p className="py-40 text-center text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Clients
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-700">
            Manage your project clients.
          </p>
        </div>

        <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              All Clients
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Clients associated with your projects.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
            <Users size={20} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-700 bg-slate-900/40">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Client
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Company
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email
                </th>

                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                  Projects
                </th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <ClientRow
                  key={client.id}
                  name={client.name}
                  company={client.company?.trim() ? client.company : "N/A"}
                  email={client.email?.trim() ? client.email : "N/A"}
                  projects={client._count.projects}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
