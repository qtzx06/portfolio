import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HeroWrapper from './components/Hero';
import FboAnimation from './components/FboAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import About from './components/About';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  const [isScrollingEnabled, setIsScrollingEnabled] = useState(false);

  useEffect(() => {
    // Ensure the page starts at the top on reload and disable scrolling initially
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Set a timer to start animations after the loading screen's exit transition
      const animationTimer = setTimeout(() => {
        setStartAnimations(true);
        // The hero animation has a 0.2s delay and 1.2s duration.
        // We'll enable scrolling after it has completed.
        const scrollTimer = setTimeout(() => {
          setIsScrollingEnabled(true);
        }, 1400); // 200ms delay + 1200ms duration
        return () => clearTimeout(scrollTimer);
      }, 500); // This duration should match the exit transition of the Loading component
      return () => clearTimeout(animationTimer);
    }, 1500); // How long the loading screen is visible

    return () => {
      clearTimeout(loadingTimer);
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, []);

  // Enable scrolling when the state is updated
  useEffect(() => {
    if (isScrollingEnabled) {
      document.body.style.overflow = 'auto';
    }
  }, [isScrollingEnabled]);

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
                className="text-6xl md:text-9xl text-white uppercase whitespace-pre-line font-serif font-bold text-center md:text-left"
                cursor={false}
              />
            ) : (
              <h1 className="text-6xl md:text-9xl text-transparent uppercase whitespace-pre-line font-serif font-bold text-center md:text-left">
                {'JOSHUA\nLIN'}
              </h1>
            )}
            <motion.p
              className="text-lg md:text-2xl text-white tracking-[0.2em] uppercase font-sans mt-4 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
              Portfolio Website
            </motion.p>
            <motion.div
              className="mt-4 text-sm md:text-lg text-white flex items-center justify-center md:justify-start space-x-4 font-serif"
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
      <About />
    </div>
  );
}

export default App;
