import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../data/portfolioService';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl text-primary mb-6"
          >
            Services & Offerings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-dark/70 max-w-2xl mx-auto font-light"
          >
            Tailored photographic experiences designed to capture your unique story with elegance and authenticity.
          </motion.p>
        </div>

        <div className="relative">
          <div className="flex flex-col border-t border-dark/10">
            {SERVICES.map((service, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative border-b border-dark/10 hover:border-primary/50 transition-colors duration-300"
              >
                <Link to="/contact" className="flex items-center justify-between py-10 md:py-14 w-full">
                  <div className="flex items-start md:items-center gap-8 md:gap-16">
                    <span className="text-sm font-light text-dark/40 group-hover:text-primary transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h2 className="font-serif text-3xl md:text-4xl text-dark group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="text-dark/60 font-light max-w-xl group-hover:text-dark/80 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-dark/10 group-hover:border-primary group-hover:bg-primary text-dark/40 group-hover:text-cream transition-all duration-300 transform group-hover:scale-110">
                    <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Optional Image Reveal on Hover (Desktop only) */}
                <AnimatePresence>
                  {hoveredService === service.id && service.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                      transition={{ duration: 0.4 }}
                      className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 aspect-[4/5] pointer-events-none z-10 shadow-2xl bg-cream overflow-hidden"
                    >
                      <img src={service.image} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
