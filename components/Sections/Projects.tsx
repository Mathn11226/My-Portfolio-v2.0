import React, { useState } from 'react';
import { Section } from '../UI/Section';
import { PROJECTS } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, TrendingUp } from 'lucide-react';
import { Project } from '../../types';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects" title="Treasures Collected">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            layoutId={project.id}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="cursor-pointer group relative bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all"
          >
            {/* Pseudo-3D effect top bar */}
            <div className="h-1 bg-gradient-to-r from-teal-500 to-indigo-500 w-full" />
            
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
            
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
               <div className="bg-indigo-500/20 p-2 rounded-full text-indigo-400 border border-indigo-500/30">
                  <Maximize2 size={16} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              layoutId={selectedProject.id}
              className="bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative border border-slate-700"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="h-40 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
                 {/* Decorative background grid */}
                 <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                 
                 <h2 className="text-3xl md:text-4xl font-display font-bold text-white relative z-10 text-center px-4 drop-shadow-lg">
                    {selectedProject.title}
                 </h2>
              </div>

              <div className="p-8">
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl mb-8">
                  <h4 className="flex items-center gap-2 font-bold text-teal-400 mb-4 font-mono uppercase tracking-wider text-sm">
                    <TrendingUp size={16} /> Impact Metrics
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.metrics.map((metric, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                   {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-slate-400">
                        {tag}
                      </span>
                   ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
};