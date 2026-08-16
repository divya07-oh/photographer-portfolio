import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, onDeleteClick }) => {
  return (
    <div className="bg-white/50 border border-dark/10 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse block md:table">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-dark/10 bg-dark/5 flex flex-col md:table-row">
              <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Project</th>
              <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Category</th>
              <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Year</th>
              <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Photos</th>
              <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDeleteClick={onDeleteClick}
              />
            ))}
            {projects.length === 0 && (
              <tr className="block md:table-row">
                <td colSpan="5" className="p-8 text-center text-dark/50 font-light block md:table-cell">
                  No projects match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
