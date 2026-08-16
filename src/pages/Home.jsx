import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom'; 
import { fetchFeaturedProjects, CATEGORIES } from '../data/portfolioService'; 
import { ArrowRight, Loader2 } from 'lucide-react'; 
import clsx from 'clsx';
import { testSupabaseConnection } from '../services/testSupabase';


const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testSupabaseConnection();
    
    const loadProjects = async () => {
      try {
        const data = await fetchFeaturedProjects();
        setFeaturedProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);
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
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-widest font-bold leading-tight"
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

      {/* 4. Featured Work (Dynamic Supabase) */}
      <div className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl text-dark mb-4"
              >
                FEATURED WORK
              </motion.h2>
              <p className="text-dark/60 font-light tracking-wide max-w-md">
                A curated selection of my favorite moments and editorial pieces.
              </p>
            </div>
            <Link 
              to="/portfolio"
              className="hidden md:flex items-center space-x-2 text-sm uppercase tracking-widest text-primary hover:text-dark transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 text-dark/50">
              <Loader2 className="animate-spin w-8 h-8 mr-3" />
              <span className="uppercase tracking-widest text-sm">Loading projects...</span>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-20 bg-cream/30 rounded border border-dark/5">
              <p className="text-dark/50 font-light tracking-wide">No featured projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <pre className="col-span-full overflow-auto bg-black text-green-400 p-4 text-xs">{JSON.stringify(featuredProjects, null, 2)}</pre>
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
                <div className="w-full overflow-hidden bg-cream-warm flex items-center justify-center">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
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
          )}
        </div>
      </div>

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
