import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onDeleteClick }) => {
  return (
    <tr className="border-b border-dark/5 hover:bg-dark/5 transition-colors flex flex-col md:table-row">
      <td className="p-4 block md:table-cell">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 md:w-12 md:h-12 bg-dark/10 rounded overflow-hidden flex-shrink-0">
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dark/30 text-xs text-center leading-tight p-1">No Img</div>
            )}
          </div>
          <span className="font-serif text-dark text-xl md:text-lg">{project.title}</span>
        </div>
      </td>
      <td className="p-2 px-4 md:p-4 text-dark/70 font-light block md:table-cell">
        <span className="md:hidden font-medium mr-2">Category:</span>
        {project.category}
      </td>
      <td className="p-2 px-4 md:p-4 text-dark/70 font-light block md:table-cell">
        <span className="md:hidden font-medium mr-2">Year:</span>
        {project.year}
      </td>
      <td className="p-2 px-4 md:p-4 text-dark/70 font-light block md:table-cell">
        <span className="md:hidden font-medium mr-2">Photos:</span>
        {project.images ? project.images.length : 0}
      </td>
      <td className="p-4 text-left md:text-right block md:table-cell border-t border-dark/5 md:border-0 mt-2 md:mt-0">
        <div className="flex justify-start md:justify-end gap-4 md:gap-3">
          <Link to={`/manage/projects/${project.id}/edit`} className="flex items-center gap-2 text-dark/70 hover:text-primary transition-colors py-2 px-4 md:p-1 bg-dark/5 md:bg-transparent rounded-full md:rounded-none" title="Edit">
            <Edit size={16} />
            <span className="md:hidden text-sm uppercase tracking-wider">Edit</span>
          </Link>
          <button 
            onClick={() => onDeleteClick(project)} 
            className="flex items-center gap-2 text-red-600/70 hover:text-red-600 transition-colors py-2 px-4 md:p-1 bg-red-50 md:bg-transparent rounded-full md:rounded-none" 
            title="Delete"
          >
            <Trash2 size={16} />
            <span className="md:hidden text-sm uppercase tracking-wider">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectCard;
