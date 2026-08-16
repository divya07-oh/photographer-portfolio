import { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import DashboardStats from '../../components/manage/DashboardStats';
import { Link } from 'react-router-dom';
import { Edit, Eye } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-dark/50">Loading dashboard...</div>;
  }

  const totalPhotos = projects.reduce((sum, p) => sum + (p.images ? p.images.length : 0), 0) + projects.filter(p => p.coverImage).length;
  const recentProjects = projects.slice(0, 3); // Get top 3

  return (
    <div>
      <h2 className="font-serif text-3xl text-dark mb-8">Dashboard</h2>
      
      <DashboardStats totalProjects={projects.length} totalPhotos={totalPhotos} />

      <div>
        <h3 className="font-sans text-sm tracking-widest text-dark/50 uppercase mb-6">Recent Projects</h3>
        
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
                {recentProjects.map(project => (
                  <tr key={project.id} className="border-b border-dark/5 hover:bg-dark/5 transition-colors flex flex-col md:table-row">
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
                        <Link to={`/portfolio/${project.id}`} target="_blank" className="flex items-center gap-2 text-dark/70 hover:text-primary transition-colors py-2 px-4 md:p-1 bg-dark/5 md:bg-transparent rounded-full md:rounded-none" title="View Public">
                          <Eye size={16} />
                          <span className="md:hidden text-sm uppercase tracking-wider">View</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {recentProjects.length === 0 && (
                  <tr className="block md:table-row">
                    <td colSpan="5" className="p-8 text-center text-dark/50 font-light block md:table-cell">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
