import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORIES, fetchProjectsByCategory } from '../data/portfolioService';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectsByCategory(activeCategory);
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [activeCategory]);

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl text-primary mb-6 uppercase"
          >
            Project
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-dark/70 max-w-2xl mx-auto font-light"
          >
            A curated selection of my favorite moments, stories, and editorial pieces.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                'text-sm tracking-widest uppercase transition-all duration-300 pb-1 border-b border-transparent',
                activeCategory === category 
                  ? 'text-primary border-primary' 
                  : 'text-dark/50 hover:text-primary'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-32 text-dark/50">
            <Loader2 className="animate-spin w-12 h-12 mr-4" />
            <span className="uppercase tracking-widest">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32 bg-cream-warm/50 rounded-lg">
            <p className="text-dark/50 font-light tracking-wide text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative cursor-pointer"
                >
                  <Link to={`/portfolio/${project.id}`} className="block">
                    <div className="aspect-[4/5] overflow-hidden bg-cream-warm">
                      <img 
                        src={project.coverImage} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent">
                      <span className="text-cream/80 text-xs tracking-widest uppercase mb-1">{project.category} • {project.year}</span>
                      <h3 className="text-cream font-serif text-2xl">{project.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
