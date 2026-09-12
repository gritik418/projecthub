const RoleBadge = ({ role }: { role: string }) => {
  const roleName = role
    .split("_")
    .map((item) => item.charAt(0) + item.slice(1).toLowerCase())
    .join(" ");

  return (
    <span className="rounded-md bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-200">
      {roleName}
    </span>
  );
};

export default RoleBadge;
