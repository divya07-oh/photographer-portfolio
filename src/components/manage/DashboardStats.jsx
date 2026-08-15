const DashboardStats = ({ totalProjects, totalPhotos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
        <h3 className="text-sm font-sans tracking-widest text-dark/50 uppercase mb-2">Total Projects</h3>
        <p className="text-4xl font-serif text-primary">{totalProjects}</p>
      </div>
      
      <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
        <h3 className="text-sm font-sans tracking-widest text-dark/50 uppercase mb-2">Total Photos</h3>
        <p className="text-4xl font-serif text-primary">{totalPhotos}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
