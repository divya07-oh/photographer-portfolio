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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark/10 bg-dark/5">
                  <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Project</th>
                  <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Category</th>
                  <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Year</th>
                  <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal">Photos</th>
                  <th className="p-4 font-sans text-xs uppercase tracking-wider text-dark/50 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map(project => (
                  <tr key={project.id} className="border-b border-dark/5 hover:bg-dark/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-dark/10 rounded overflow-hidden flex-shrink-0">
                          {project.coverImage ? (
                            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-dark/30 text-xs">No Img</div>
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
                        <Link to={`/portfolio/${project.id}`} target="_blank" className="text-dark/50 hover:text-primary transition-colors p-1" title="View Public">
                          <Eye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {recentProjects.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-dark/50 font-light">
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
