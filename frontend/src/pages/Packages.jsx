import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const Packages = () => {
  const [activeTab, setActiveTab] = useState('engagement');

  const engagementPackages = [
    { name: 'Traditional Photography', price: '10,000', desc: 'Classic and timeless photography.' },
    { name: 'Traditional Video', price: '12,000', desc: 'Comprehensive video coverage.' },
    { name: 'Candid Photography', price: '18,000', desc: 'Capturing natural, unposed moments.' },
    { name: 'Candid Video', price: '20,000', desc: 'Cinematic storytelling of your day.' },
  ];

  const engagementAddons = [
    { name: 'Album', price: '22,000' },
    { name: 'Photo Booth', price: '18,000' },
    { name: '360° Photography', price: '8,000' },
    { name: 'Drone Coverage', price: '15,000' },
  ];

  const eventPackages = [
    { name: 'Traditional Photography', price: '8,000', desc: 'Classic event coverage.' },
    { name: 'Traditional Video', price: '10,000', desc: 'Professional event videography.' },
    { name: 'Candid Photography', price: '14,000', desc: 'Authentic candid moments.' },
    { name: 'Candid Video', price: '16,000', desc: 'Highlight reels and cinematic cuts.' },
    { name: 'Album', price: '15,000', desc: 'Premium printed photo album.' },
  ];

  const renderPackageCard = (pkg, index) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      key={pkg.name}
      className="group relative border border-dark/10 bg-white p-8 hover:border-primary/50 transition-colors duration-300 flex flex-col"
    >
      <div className="mb-6 flex-grow">
        <h3 className="font-serif text-2xl text-dark group-hover:text-primary transition-colors duration-300 mb-2">{pkg.name}</h3>
        {pkg.desc && <p className="text-dark/60 font-light text-sm">{pkg.desc}</p>}
      </div>
      <div className="mt-auto">
        <p className="font-serif text-3xl text-primary mb-6">₹{pkg.price}</p>
        <Link to="/contact" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-dark group-hover:text-primary transition-colors">
          <span>Enquire Now</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 1. Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl text-primary mb-6"
          >
            Photography Packages
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-dark/70 max-w-2xl mx-auto font-light text-lg"
          >
            Choose the right package for your special moments.
          </motion.p>
        </div>

        {/* 2. Category Navigation */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex space-x-8 border-b border-dark/10 px-4">
            <button
              onClick={() => setActiveTab('engagement')}
              className={clsx(
                "pb-4 text-sm uppercase tracking-widest transition-colors relative",
                activeTab === 'engagement' ? "text-primary" : "text-dark/50 hover:text-dark"
              )}
            >
              Engagement
              {activeTab === 'engagement' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={clsx(
                "pb-4 text-sm uppercase tracking-widest transition-colors relative",
                activeTab === 'event' ? "text-primary" : "text-dark/50 hover:text-dark"
              )}
            >
              Event
              {activeTab === 'event' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-primary" />
              )}
            </button>
          </div>
        </div>

        {/* 3 & 4. Package Sections */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'engagement' && (
              <motion.div
                key="engagement"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl text-dark mb-4">Engagement Photography</h2>
                  <p className="text-dark/60 font-light max-w-xl mx-auto">
                    Capture every special moment with photography and cinematic coverage tailored to your celebration.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {engagementPackages.map(renderPackageCard)}
                </div>

                {/* 5. Add-ons */}
                <div className="border-t border-dark/10 pt-16">
                  <h3 className="font-serif text-3xl text-dark mb-8 text-center">Additional Services</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {engagementAddons.map((addon, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        key={addon.name}
                        className="bg-cream-warm/50 p-6 flex justify-between items-center border border-transparent hover:border-dark/10 transition-colors"
                      >
                        <span className="font-serif text-lg text-dark">{addon.name}</span>
                        <span className="text-primary font-serif">₹{addon.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'event' && (
              <motion.div
                key="event"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl text-dark mb-4">Event Photography</h2>
                  <p className="text-dark/60 font-light max-w-xl mx-auto mb-6">
                    Professional photography and video coverage for birthdays, engagements and special events.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Birthday', 'Engagement', 'Puberty Ceremony'].map(type => (
                      <span key={type} className="px-4 py-1 text-xs uppercase tracking-widest text-primary border border-primary/20 rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventPackages.map(renderPackageCard)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6. CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center bg-primary text-cream py-20 px-8 rounded-sm"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Let's Capture Your Special Moments</h2>
          <p className="text-cream/80 font-light max-w-2xl mx-auto mb-10 text-lg">
            Have something special in mind? Get in touch and let's create a package that fits your celebration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/contact"
              className="bg-cream text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors w-full sm:w-auto"
            >
              Enquire Now
            </Link>
            <Link 
              to="/contact"
              className="border border-cream/30 text-cream px-8 py-4 uppercase tracking-widest text-sm hover:bg-cream/10 transition-colors w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Packages;
