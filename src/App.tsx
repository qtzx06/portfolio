import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HeroWrapper from './components/Hero';
import FboAnimation from './components/FboAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Set a timer to start animations after the loading screen's exit transition
      const animationTimer = setTimeout(() => {
        setStartAnimations(true);
      }, 500); // This duration should match the exit transition of the Loading component
      return () => clearTimeout(animationTimer);
    }, 2500); // How long the loading screen is visible

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="bg-secondary">
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      <main className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden relative">
        {/* Layer 0: FBO Animation */}
        <div className="absolute inset-0 z-0">
          <FboAnimation />
        </div>

        {/* Layer 10: Sliding Frame */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <HeroWrapper startAnimations={startAnimations} />
        </div>

        {/* Layer 20: Centered Title Block */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div>
            {startAnimations ? (
              <TypeAnimation
                sequence={[
                  'JOSHUA',
                  100,
                  'JOSHUA\nLIN',
                ]}
                wrapper="h1"
                speed={10}
                className="text-9xl text-white uppercase whitespace-pre-line font-serif font-bold"
                cursor={false}
              />
            ) : (
              <h1 className="text-9xl text-transparent uppercase whitespace-pre-line font-serif font-bold">
                {'JOSHUA\nLIN'}
              </h1>
            )}
            <motion.p
              className="text-2xl text-white tracking-[0.2em] uppercase font-sans mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
              Portfolio Website
            </motion.p>
            <motion.div
              className="mt-4 text-lg text-white flex items-center space-x-4 font-serif"
            >
              <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.7 }}>Developer</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.9 }} className="text-xs">&middot;</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.1 }}>Designer</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.3 }} className="text-xs">&middot;</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.5 }}>Researcher</motion.span>
            </motion.div>
          </div>
        </div>
        
        {/* Layer 30: Header */}
        <Header startAnimations={startAnimations} />
      </main>
      <div className="h-screen bg-secondary p-10">
        <h2 className="text-4xl font-bold text-accent">Scrollable Content</h2>
        <p className="text-tertiary mt-4">This is where the rest of your page content will go.</p>
      </div>
    </div>
  );
}

export default App;
