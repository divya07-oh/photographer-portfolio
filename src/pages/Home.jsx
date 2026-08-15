import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedProjects, CATEGORIES } from '../data/portfolioService';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const Home = () => {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="bg-cream">
      {/* 1. Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105 transform transition-transform duration-[20s] ease-out hover:scale-100"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-widest font-bold leading-tight"
            style={{ textShadow: "0 0 25px rgba(90, 31, 43, 0.7), 0 0 10px rgba(230, 210, 181, 0.3)" }}
          >
            THE MARVELOUS PHOTOGRAPHY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-cream/90 font-light mb-10 max-w-2xl"
          >
            Capturing authentic moments, emotions and timeless stories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center space-x-2 border-b border-cream pb-1 text-cream hover:text-white hover:border-white transition-colors group tracking-widest uppercase text-sm"
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-cream"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-cream/30 overflow-hidden relative">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-cream"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. Introduction */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8 leading-tight">
            "Every Frame Tells a Story."
          </h2>
          <p className="text-dark/80 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
            I am dedicated to preserving your most precious memories through an editorial and cinematic lens. 
            My approach blends documentary authenticity with timeless elegance, ensuring that every image reflects the true essence of your narrative.
          </p>
        </div>
      </section>

      {/* 3. Featured Work */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-serif text-4xl text-primary">Selected Works</h2>
          <Link to="/portfolio" className="text-sm uppercase tracking-widest border-b border-primary text-primary hover:text-primary-dark transition-colors hidden md:block">
            View All Projects
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {featuredProjects.map((project, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              key={project.id} 
              className={clsx("group relative overflow-hidden", index % 2 !== 0 && "md:mt-24")}
            >
              <Link to={`/portfolio/${project.id}`} className="block overflow-hidden relative">
                <div className="aspect-[4/5] overflow-hidden bg-cream-warm">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-dark/80 to-transparent text-cream">
                  <span className="text-xs uppercase tracking-widest mb-2 block">{project.category}</span>
                  <h3 className="font-serif text-3xl">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center md:hidden">
           <Link to="/portfolio" className="text-sm uppercase tracking-widest border-b border-primary text-primary">
            View All Projects
          </Link>
        </div>
      </section>

      {/* 4. Contact CTA */}
      <section className="bg-primary text-cream py-32 px-4 text-center">
        <h2 className="font-serif text-5xl md:text-6xl mb-8">Let's Create Something Timeless.</h2>
        <Link 
          to="/contact"
          className="inline-block bg-cream text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors"
        >
          Get In Touch
        </Link>
      </section>
    </div>
  );
};

export default Home;
