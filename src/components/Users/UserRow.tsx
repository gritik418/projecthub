import { useSelector } from "react-redux";
import type { User } from "../../features/user/user.interface";
import RoleBadge from "./RoleBadge";
import { selectActiveUsers } from "../../features/user/user.slice";

const UserRow = ({ user }: { user: User }) => {
  const activeUsers = useSelector(selectActiveUsers);

  return (
    <tr className="border-b border-slate-700 last:border-0 transition hover:bg-slate-700/30">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex relative h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {user.name.charAt(0).toUpperCase()}
            {activeUsers.includes(user.id) ? (
              <span className="absolute bg-green-600 h-3 w-3 top-0 -right-1 rounded-full"></span>
            ) : null}
          </div>

          <p className="text-sm font-medium text-slate-100">{user.name}</p>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-400">{user.email}</td>

      <td className="px-5 py-4 text-center">
        <RoleBadge role={user.role} />
      </td>

      <td className="px-5 py-4 text-slate-300 text-right">
        {user._count.assignedTasks}
      </td>
    </tr>
  );
};

export default UserRow;
