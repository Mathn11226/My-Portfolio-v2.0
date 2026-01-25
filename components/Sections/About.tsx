import React from 'react';
import { Section } from '../UI/Section';
import { PERSONAL_INFO, SKILLS } from '../../constants';
import { motion } from 'framer-motion';
import { BrainCircuit, ShieldCheck, Palette } from 'lucide-react';
import AvatarCanvas from '../Three/Avatar'; // Import the 3D Avatar component

export const About: React.FC = () => {

  const getIcon = (category: string) => {
    switch (category) {
      case "Business Analysis  - 3.5 years": return <BrainCircuit size={32} />;
      case "Software Testing": return <ShieldCheck size={32} />;
      case "UI/UX Design": return <Palette size={32} />;
      default: return <BrainCircuit size={32} />;
    }
  };

  const getColorClass = (category: string) => {
    switch (category) {
      case "Business Analysis": return "text-teal-400 bg-teal-900/30 border-teal-500/30";
      case "Software Testing": return "text-indigo-400 bg-indigo-900/30 border-indigo-500/30";
      case "UI/UX Design": return "text-rose-400 bg-rose-900/30 border-rose-500/30";
      default: return "text-slate-400";
    }
  };

  return (
    <Section id="about" title="The Protagonist">
      <div className="flex flex-col gap-12">

        {/* Top Row: 3D Model & Summary */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Technologist Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl min-h-[500px] group bg-slate-900/40 backdrop-blur-sm"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-indigo-500/10 z-0" />

            {/* The Interactive Canvas */}
            <div className="relative z-10 w-full h-full min-h-[500px]">
              <AvatarCanvas />
            </div>

            <div className="absolute bottom-6 left-0 right-0 z-20 text-center pointer-events-none">
              <span className="inline-block px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-teal-300 uppercase tracking-widest">
                Interactive • Scroll or Drag to Rotate
              </span>
            </div>
          </motion.div>

          {/* Executive Summary */}
          <div className="space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-indigo-500" />
              <h3 className="text-2xl font-bold mb-4 font-display text-white">Profile Summary</h3>
              <p className="text-lg leading-relaxed text-slate-300">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Quick Stats Row - Dark Theme */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center shadow-lg hover:border-teal-500/50 transition-colors">
                <div className="text-3xl font-bold text-teal-400">3.5+</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Years Exp</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center shadow-lg hover:border-indigo-500/50 transition-colors">
                <div className="text-3xl font-bold text-indigo-400">10+</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Projects</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center shadow-lg hover:border-rose-500/50 transition-colors">
                <div className="text-3xl font-bold text-rose-400">3</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Domains</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: The Three Disciplines */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-display font-bold text-white">
              Tri-Class Specialization
            </h3>
            <p className="text-slate-400 mt-2">The distinct disciplines I bring to every project.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.category}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-gradient-to-br from-slate-900/90 to-slate-900/50 rounded-3xl p-6 shadow-xl border border-slate-700/50 hover:border-teal-500/30 hover:-translate-y-2 transition-all duration-300 flex flex-col backdrop-blur-sm group"
              >
                {/* Header */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${getColorClass(skillGroup.category)} group-hover:scale-110 transition-transform`}>
                  {getIcon(skillGroup.category)}
                </div>

                <h4 className="text-xl font-bold text-white mb-1">{skillGroup.category}</h4>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 block group-hover:text-slate-400 transition-colors">{skillGroup.title}</span>

                <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                  {skillGroup.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skillGroup.skills.map(skill => (
                    <span key={skill} className="text-[10px] font-mono font-bold px-2 py-1 bg-black/40 border border-slate-700 text-slate-300 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};