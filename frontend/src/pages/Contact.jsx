import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import clsx from 'clsx';

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS credentials
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setSubmitStatus('success');
          formRef.current.reset();
      }, (error) => {
          console.log(error.text);
          setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-12"
          >
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6">Let's Create Something Timeless.</h1>
              <p className="text-xl text-dark/70 font-light leading-relaxed">
                I would love to hear about your vision. Whether it's a wedding, an editorial project, or a portrait session, let's craft a visual story that resonates.
              </p>
            </div>

            <div className="space-y-6 text-dark/80 font-light">
              <a href="mailto:themarvelousphotography@gmail.com" className="flex items-center space-x-4 hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Mail size={20} className="text-primary" />
                </div>
                <span className="text-lg">themarvelousphotography@gmail.com</span>
              </a>
              <a href="tel:7530048326" className="flex items-center space-x-4 hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone size={20} className="text-primary" />
                </div>
                <span className="text-lg">7530048326</span>
              </a>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <span className="text-lg">Thiruttani, Tamil Nadu</span>
              </div>
              <a href="https://www.instagram.com/the_marvelous_photography/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <span className="text-lg">@the_marvelous_photography</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 md:p-12 shadow-sm border border-cream-warm"
          >
            <h3 className="font-serif text-3xl text-primary mb-8">Send an Inquiry</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-sm font-medium text-dark/70 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    id="user_name"
                    name="user_name" 
                    required
                    className="w-full bg-cream-warm/30 border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-sm font-medium text-dark/70 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    id="user_email"
                    name="user_email" 
                    required
                    className="w-full bg-cream-warm/30 border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="user_phone" className="text-sm font-medium text-dark/70 uppercase tracking-widest">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    id="user_phone"
                    name="user_phone" 
                    className="w-full bg-cream-warm/30 border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="inquiry_type" className="text-sm font-medium text-dark/70 uppercase tracking-widest">Inquiry Type</label>
                  <select 
                    id="inquiry_type"
                    name="inquiry_type"
                    required
                    className="w-full bg-cream-warm/30 border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="" disabled selected>Select a category</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Event">Event</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-dark/70 uppercase tracking-widest">Message Details</label>
                <textarea 
                  id="message"
                  name="message" 
                  rows="5"
                  required
                  placeholder="Tell me about your vision, location, dates, and any specific requirements..."
                  className="w-full bg-cream-warm/30 border border-primary/20 px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={clsx(
                  "w-full bg-primary text-cream py-4 uppercase tracking-widest text-sm transition-all duration-300",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark"
                )}
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-800 text-sm border border-green-200">
                  Thank you for your inquiry. I will get back to you within 48 hours.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-800 text-sm border border-red-200">
                  There was an error sending your message. Please try again or email directly.
                </div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
