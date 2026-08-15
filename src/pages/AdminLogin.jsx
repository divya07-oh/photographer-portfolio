import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Reset success state after a bit and navigate
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ email: '', password: '' });
        navigate('/manage');
      }, 1000);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-cream overflow-hidden selection:bg-primary/20">
      
      {/* Left side: Cinematic Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-dark">
        {/* We reuse the hero image from public assets */}
        <img 
          src="/hero-bg.png" 
          alt="Cinematic Photography" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Dark Burgundy Overlay */}
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/20"></div>
        
        {/* Branding */}
        <div className="relative z-10 flex flex-col justify-end p-16 h-full text-cream">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-sm tracking-[0.3em] font-sans text-cream/70 uppercase mb-4">
              Murali Ragavan
            </p>
            <h1 className="font-serif text-5xl xl:text-6xl tracking-widest font-bold leading-tight">
              THE MARVELOUS<br />PHOTOGRAPHY
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-16 xl:p-24 bg-cream relative">
        
        {/* Back link */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-dark/50 hover:text-primary transition-colors font-sans text-sm tracking-widest uppercase"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-dark tracking-wide mb-4">PHOTOGRAPHER LOGIN</h2>
            <p className="font-light text-dark/60">
              Sign in to manage your photography projects and portfolio.
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded text-sm font-sans">
              {errors.submit}
            </div>
          )}

          {isSuccess ? (
            <div className="bg-primary/10 border border-primary/20 text-primary p-6 rounded text-center animate-in fade-in duration-500">
              <p className="font-sans text-sm tracking-widest uppercase">Login Successful!</p>
              <p className="text-dark/60 font-light mt-2 text-sm">Authentication connected state goes here.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-2">
                <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase">
                  Email
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 bg-transparent border-b ${errors.email ? 'border-red-500 text-red-700' : 'border-dark/20 focus:border-primary'} transition-colors outline-none font-light placeholder:text-dark/30`}
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-red-500 text-xs mt-2 font-light"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-4 bg-transparent border-b pr-12 ${errors.password ? 'border-red-500 text-red-700' : 'border-dark/20 focus:border-primary'} transition-colors outline-none font-light placeholder:text-dark/30`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-dark/40 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-red-500 text-xs mt-2 font-light"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-dark text-cream hover:bg-primary transition-colors uppercase tracking-widest text-sm font-sans flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </div>

            </form>
          )}

        </motion.div>

      </div>
    </div>
  );
};

export default AdminLogin;
