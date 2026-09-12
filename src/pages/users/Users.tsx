import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import UserRow from "../../components/Users/UserRow";
import { useGetUsersQuery } from "../../features/user/user.api";
import type { User } from "../../features/user/user.interface";

const UsersPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (data?.data?.users) {
      setUsers(data.data.users);
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
            Users
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-700">
            Manage users and their roles.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">All Users</h2>

            <p className="mt-1 text-sm text-slate-400">
              Users in your ProjectHub workspace.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
            <Users size={20} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email
                </th>

                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                  Role
                </th>

                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                  Tasks Assigned
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
