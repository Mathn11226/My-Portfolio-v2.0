import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Sections/Hero';
import { About } from './components/Sections/About';
import { Experience } from './components/Sections/Experience';
import { Projects } from './components/Sections/Projects';
import { Contact } from './components/Sections/Contact';
import { MountainScene } from './components/Three/MountainScene';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);



  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>

      {/* Gamified Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navigation />

      {/* 3D Background - Fixed Walkthrough Tour */}
      <div className="fixed inset-0 z-0 opacity-100 transition-opacity duration-1000">
        <Canvas camera={{ position: [0, 5, 20], fov: 60 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <MountainScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 pointer-events-none"> {/* Allow clicks to pass through to canvas if needed, but text needs pointer-events-auto */}
        <main className="flex flex-col gap-0 [&>*]:pointer-events-auto"> {/* Enable pointer events for children sections */}
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm relative z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm pointer-events-auto">
          <p>© {new Date().getFullYear()} Mathankumar. Crafted with Magic & Code.</p>
        </footer>
      </div>

      <Loader
        containerStyles={{ background: '#1a103c' }}
        innerStyles={{ width: '400px', height: '10px', background: '#e5e7eb' }}
        barStyles={{ background: '#d946ef', height: '10px' }}
        dataStyles={{ color: '#d946ef', fontWeight: 'bold', fontFamily: 'Fredoka, sans-serif' }}
      />
    </div>
  );
};

export default App;