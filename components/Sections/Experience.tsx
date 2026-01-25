import React from 'react';
import { Section } from '../UI/Section';
import { EXPERIENCE } from '../../constants';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Quest Log">
      <div className="relative max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/0 via-teal-500/50 to-teal-500/0" />

        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Node */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-[14px] md:-translate-x-1/2 w-8 h-8 bg-slate-900 border-2 border-teal-500 rounded-full z-10 shadow-[0_0_20px_rgba(20,184,166,0.5)] flex items-center justify-center">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            </div>

            {/* Content Card */}
            <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
              <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-700/50 hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
                        <Calendar size={14} />
                        {exp.period}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                    {exp.role}
                    </h3>
                    <h4 className="text-lg font-medium text-slate-400 mb-4 flex items-center gap-2">
                        <Briefcase size={16} />
                        {exp.company}
                    </h4>
                    <ul className="space-y-3">
                    {exp.description.map((point, i) => (
                        <li key={i} className="text-sm text-slate-300 pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-teal-500/50 before:font-mono">
                        {point}
                        </li>
                    ))}
                    </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};