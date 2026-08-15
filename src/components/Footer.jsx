import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="font-serif text-3xl tracking-wider">
              MURALI RAGAVAN
            </h2>
            <p className="text-cream/80 text-sm max-w-xs">
              Capturing authentic moments, emotions, and timeless stories worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-sans text-sm tracking-widest uppercase text-cream/60">Explore</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/project" className="hover:text-white transition-colors">Project</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-sans text-sm tracking-widest uppercase text-cream/60">Connect</h3>
            <div className="flex flex-col space-y-2 items-center md:items-start">
              <a href="mailto:themarvelousphotography@gmail.com" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail size={16} />
                <span>themarvelousphotography@gmail.com</span>
              </a>
              <a href="tel:7530048326" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone size={16} />
                <span>7530048326</span>
              </a>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href="https://www.instagram.com/the_marvelous_photography/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/20 flex flex-col md:flex-row justify-between items-center text-xs text-cream/60">
          <p>&copy; {new Date().getFullYear()} Murali Ragavan. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <Link to="/admin-login" className="hover:text-cream transition-colors flex items-center space-x-1.5 opacity-60 hover:opacity-100">
              <span>🔒</span>
              <span>Photographer Login</span>
            </Link>
            <p>Designed with Elegance.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
