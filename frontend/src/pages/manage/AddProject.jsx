import ProjectForm from '../../components/manage/ProjectForm';

const AddProject = () => {
  return (
    <div>
      <h2 className="font-serif text-3xl text-dark mb-8">Add New Project</h2>
      <ProjectForm isEdit={false} />
    </div>
  );
};

export default AddProject;
