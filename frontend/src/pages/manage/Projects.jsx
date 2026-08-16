import { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import ProjectList from '../../components/manage/ProjectList';
import DeleteModal from '../../components/manage/DeleteModal';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      await projectService.deleteProject(projectToDelete.id);
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      await fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="font-serif text-3xl text-dark">Projects</h2>
        <Link 
          to="/manage/projects/new"
          className="flex items-center justify-center gap-2 bg-primary text-cream px-6 py-3 rounded hover:bg-dark transition-colors tracking-widest text-xs uppercase font-sans"
        >
          <Plus size={16} />
          Add Project
        </Link>
      </div>

      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search projects by title or category..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-dark/20 rounded bg-white/50 focus:outline-none focus:border-primary font-light"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-dark/50">Loading projects...</div>
      ) : (
        <ProjectList projects={filteredProjects} onDeleteClick={handleDeleteClick} />
      )}

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={projectToDelete?.title}
      />
    </div>
  );
};

export default Projects;
