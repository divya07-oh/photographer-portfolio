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
            <div className="aspect-[3/4] overflow-hidden bg-cream-warm">
              <img 
                src="/about-photo.jpg" 
                alt="Photographer Portrait" 
                className="w-full h-full object-contain"
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
                I’m Murali Raghavan, a passionate photographer with 1 year of hands-on experience specializing in candid photography and candid videography. I love capturing genuine emotions, natural expressions, and the small moments that make every occasion memorable.
              </p>
            </div>

            <div className="space-y-6 text-dark/80 font-light leading-relaxed">
              <p>
                My approach is simple — I focus on real moments rather than posed shots, allowing people to be themselves while I capture their story naturally. From weddings and celebrations to personal portraits and special events, I aim to create photographs and videos that feel authentic, emotional, and timeless.
              </p>
              <p>
                With a creative eye and attention to detail, I continuously explore new perspectives, lighting techniques, and storytelling styles to make every frame unique. My goal is to turn real-life moments into memories that can be relived for years to come.
              </p>
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
