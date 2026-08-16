import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, PlusCircle, Globe, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../services/supabase';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'Dashboard', path: '/manage', icon: LayoutDashboard, exact: true },
    { name: 'Projects', path: '/manage/projects', icon: ImageIcon, exact: true },
    { name: 'Add Project', path: '/manage/projects/new', icon: PlusCircle, exact: false },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin-login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-dark text-cream p-4 sticky top-0 z-50">
        <div>
          <img src="/logo.png" alt="Murali Ragavan Logo" className="h-8 w-auto mb-1" />
          <p className="text-[10px] tracking-widest text-cream/70 uppercase">The Marvelous Photography</p>
        </div>
        <button onClick={toggleMenu} className="p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-dark text-cream flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 hidden md:block">
          <img src="/logo.png" alt="Murali Ragavan Logo" className="h-12 w-auto mb-2" />
          <p className="text-xs tracking-widest text-cream/70 uppercase">The Marvelous Photography</p>
        </div>

        <nav className="flex-1 px-4 py-8 md:py-0 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={closeMenu}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-md transition-colors duration-200
                  ${isActive ? 'bg-primary text-cream' : 'text-cream/70 hover:bg-cream/10 hover:text-cream'}
                `}
              >
                <Icon size={20} />
                <span className="font-light tracking-wide">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-cream/10 space-y-2">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-4 py-3 rounded-md text-cream/70 hover:bg-cream/10 hover:text-cream transition-colors duration-200"
          >
            <Globe size={20} />
            <span className="font-light tracking-wide">View Website</span>
          </a>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-md text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-light tracking-wide">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-dark/50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
