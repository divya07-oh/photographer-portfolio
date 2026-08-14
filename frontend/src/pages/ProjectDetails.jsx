import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectById, PROJECTS } from '../data/portfolioService';
import clsx from 'clsx';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const data = getProjectById(projectId);
    if (data) {
      setProject(data);
    } else {
      navigate('/portfolio');
    }
  }, [projectId, navigate]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  if (!project) return null;

  const allImages = [project.coverImage, ...project.gallery];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Find next/prev project for footer navigation
  const currentIndex = PROJECTS.findIndex(p => p.id === projectId);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Link */}
        <Link to="/portfolio" className="inline-flex items-center space-x-2 text-dark/60 hover:text-primary transition-colors mb-12 uppercase tracking-widest text-xs">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-6xl text-primary mb-6"
            >
              {project.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex space-x-6 text-sm uppercase tracking-widest text-dark/60 mb-8"
            >
              <span>{project.category}</span>
              <span>{project.year}</span>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <p className="text-dark/80 font-light leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 cursor-pointer overflow-hidden aspect-[16/9] bg-cream-warm"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Editorial Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {project.gallery.map((img, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={idx}
              className={clsx(
                "cursor-pointer overflow-hidden bg-cream-warm",
                idx % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
              )}
              onClick={() => openLightbox(idx + 1)}
            >
              <img 
                src={img} 
                alt={`${project.title} - ${idx + 1}`} 
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* Next/Prev Project Navigation */}
        <div className="border-t border-primary/20 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          {prevProject ? (
            <Link to={`/portfolio/${prevProject.id}`} className="group flex flex-col items-center md:items-start">
              <span className="text-xs uppercase tracking-widest text-dark/50 mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                <ArrowLeft size={14} /> Previous Project
              </span>
              <span className="font-serif text-2xl text-primary group-hover:text-primary-dark transition-colors">{prevProject.title}</span>
            </Link>
          ) : <div></div>}
          
          {nextProject ? (
            <Link to={`/portfolio/${nextProject.id}`} className="group flex flex-col items-center md:items-end text-right">
              <span className="text-xs uppercase tracking-widest text-dark/50 mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                Next Project <ArrowRight size={14} />
              </span>
              <span className="font-serif text-2xl text-primary group-hover:text-primary-dark transition-colors">{nextProject.title}</span>
            </Link>
          ) : <div></div>}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center backdrop-blur-sm"
          >
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-cream/70 hover:text-white z-50 p-2"
            >
              <X size={32} />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/50 hover:text-white z-50 p-4 transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-cream/50 hover:text-white z-50 p-4 transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <div className="w-full h-full p-4 md:p-16 flex items-center justify-center">
              <img 
                src={allImages[currentImageIndex]} 
                alt="Fullscreen view" 
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70 text-sm tracking-widest">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
