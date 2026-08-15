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
              <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
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
              <a href="#" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/20 flex flex-col md:flex-row justify-between items-center text-xs text-cream/60">
          <p>&copy; {new Date().getFullYear()} Murali Ragavan. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with Elegance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
