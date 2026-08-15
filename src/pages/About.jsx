import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554046920-90dcac053641?auto=format&fit=crop&q=80" 
                alt="Photographer Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 -z-10 hidden md:block"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6">About Me</h1>
              <p className="text-xl text-dark/70 font-light leading-relaxed">
                Hi, I'm Elara. A professional photographer based in Paris, capturing moments worldwide.
              </p>
            </div>

            <div className="space-y-6 text-dark/80 font-light leading-relaxed">
              <p>
                My journey with photography began over a decade ago. What started as a fascination with light and shadow quickly evolved into a lifelong passion for storytelling. I believe that every person, every couple, and every brand has a unique narrative that deserves to be told with authenticity and elegance.
              </p>
              <p>
                My approach blends documentary realism with editorial refinement. I seek those quiet, fleeting moments that often go unnoticed, transforming them into timeless visual heirlooms.
              </p>
              <p>
                When I'm not behind the camera, you can find me exploring vintage film archives, curating my vinyl collection, or finding inspiration in the architecture of old European cities.
              </p>
            </div>

            <div className="pt-8 border-t border-primary/20">
              <h3 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">Specializations</h3>
              <ul className="grid grid-cols-2 gap-4 text-dark/70 font-light">
                <li>Editorial Weddings</li>
                <li>Fine Art Portraiture</li>
                <li>Brand & Lifestyle</li>
                <li>Analog Film Processing</li>
              </ul>
            </div>

            <div className="pt-8">
              <Link 
                to="/contact"
                className="inline-block bg-primary text-cream px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary-dark transition-colors"
              >
                Work With Me
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
