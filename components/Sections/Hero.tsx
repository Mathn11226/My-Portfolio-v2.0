import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Content Layer */}
      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-6 inline-block"
        >
          <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-widest text-purple-200 shadow-xl">
            Welcome to the Portfolio of
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-display font-bold mb-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-4xl font-sans font-light text-purple-100 mb-8 drop-shadow-md"
        >
          {PERSONAL_INFO.role} & Process Wizard
        </motion.h2>

        <motion.p
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.7, duration: 0.8 }}
           className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed backdrop-blur-md bg-black/30 p-6 rounded-2xl border border-white/10"
        >
          Weaving data into stories and complex requirements into seamless digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-purple-200 hover:text-white transition-colors">
            <span className="text-sm font-bold uppercase tracking-widest text-shadow-sm">Begin the Journey</span>
            <ArrowDown className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};