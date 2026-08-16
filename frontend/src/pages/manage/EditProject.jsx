import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import ProjectForm from '../../components/manage/ProjectForm';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProjectData(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-dark/50">Loading project data...</div>;
  }

  if (error || !projectData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-serif text-dark mb-4">{error || 'Project not found'}</h2>
        <button 
          onClick={() => navigate('/manage/projects')}
          className="text-primary hover:underline"
        >
          Return to Projects
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-dark mb-8">Edit Project: {projectData.title}</h2>
      <ProjectForm initialData={projectData} isEdit={true} />
    </div>
  );
};

export default EditProject;
