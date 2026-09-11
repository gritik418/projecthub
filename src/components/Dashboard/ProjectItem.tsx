const ProjectItem = ({ name, tasks }: { name: string; tasks: string }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3">
      <span className="text-sm font-medium text-slate-200"> {name} </span>
      <span className="text-xs font-medium text-slate-400"> {tasks} </span>
    </div>
  );
};

export default ProjectItem;
