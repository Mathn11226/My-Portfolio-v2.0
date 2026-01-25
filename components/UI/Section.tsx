import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  title?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = "", title }) => {
  return (
    <section id={id} className={`min-h-screen w-full relative py-20 px-4 md:px-12 flex flex-col justify-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        {title && (
          <h2 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-12 text-center drop-shadow-sm">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
};
