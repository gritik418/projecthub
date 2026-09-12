interface ClientRowProps {
  name: string;
  company: string;
  email: string;
  projects: number;
}

const ClientRow = ({ name, company, email, projects }: ClientRowProps) => {
  return (
    <tr className="border-b border-slate-700 last:border-0 transition hover:bg-slate-700/30">
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-slate-100">{name}</p>
      </td>

      <td className="px-5 py-4 text-sm text-slate-300">{company}</td>

      <td className="px-5 py-4 text-sm text-slate-400">{email}</td>

      <td className="px-5 py-4 text-right">
        <span className="text-sm font-medium text-slate-200">{projects}</span>
      </td>
    </tr>
  );
};

export default ClientRow;
