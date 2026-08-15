import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onDeleteClick }) => {
  return (
    <tr className="border-b border-dark/5 hover:bg-dark/5 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-dark/10 rounded overflow-hidden flex-shrink-0">
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dark/30 text-xs text-center leading-tight p-1">No Img</div>
            )}
          </div>
          <span className="font-serif text-dark text-lg">{project.title}</span>
        </div>
      </td>
      <td className="p-4 text-dark/70 font-light">{project.category}</td>
      <td className="p-4 text-dark/70 font-light">{project.year}</td>
      <td className="p-4 text-dark/70 font-light">
        {project.images ? project.images.length : 0}
      </td>
      <td className="p-4 text-right">
        <div className="flex justify-end gap-3">
          <Link to={`/manage/projects/${project.id}/edit`} className="text-dark/50 hover:text-primary transition-colors p-1" title="Edit">
            <Edit size={18} />
          </Link>
          <button 
            onClick={() => onDeleteClick(project)} 
            className="text-dark/50 hover:text-red-600 transition-colors p-1" 
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectCard;
