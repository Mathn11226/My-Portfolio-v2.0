import React, { useState } from 'react';
import { Section } from '../UI/Section';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 2000);
  };

  return (
    <Section id="contact" title="Send a Scroll">
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden p-8 md:p-12 border-2 border-purple-100 dark:border-purple-900">
        
        {formState === 'success' ? (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2">Message Delivered!</h3>
            <p className="text-slate-500">Your carrier pigeon is on its way.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-2">Your Name</label>
              <input 
                required
                type="text" 
                id="name"
                className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-purple-400 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white"
                placeholder="Adventurer Name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-2">Email Address</label>
              <input 
                required
                type="email" 
                id="email"
                className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-purple-400 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white"
                placeholder="owl@post.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-2">Your Quest</label>
              <textarea 
                required
                id="message"
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-purple-400 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white resize-none"
                placeholder="Tell me about the dragon you need help slaying (or the project you need analysis for)..."
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg py-4 rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formState === 'loading' ? (
                <>
                  <Loader className="animate-spin" /> Casting Spell...
                </>
              ) : (
                <>
                  <Send size={20} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
        
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-400">
                Or summon me directly at <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="text-purple-500 hover:underline">{PERSONAL_INFO.contact.email}</a>
            </p>
        </div>
      </div>
    </Section>
  );
};
