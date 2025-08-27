import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import HeroWrapper from './components/Hero';
import FboAnimation from './components/FboAnimation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import About from './components/About';
import Loading from './components/Loading';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);
  const [isScrollingEnabled, setIsScrollingEnabled] = useState(false);

  const heroRef = useRef(null);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const coverOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
    return () => {
      window.removeEventListener('beforeunload', () => window.scrollTo(0, 0));
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      const animationTimer = setTimeout(() => {
        setStartAnimations(true);
        const scrollTimer = setTimeout(() => {
          setIsScrollingEnabled(true);
        }, 1400);
        return () => clearTimeout(scrollTimer);
      }, 500);
      return () => clearTimeout(animationTimer);
    }, 1500);

    return () => {
      clearTimeout(loadingTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isScrollingEnabled) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isScrollingEnabled]);

  return (
    <div className="bg-white">
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      <Header startAnimations={startAnimations} />

      <div className="scroll-container" ref={scrollRef}>
        <main
          id="home"
          ref={heroRef}
          className="w-screen h-screen relative z-10 overflow-hidden bg-white"
        >
          {/* Container for scaling elements */}
          <motion.div className="w-full h-full" style={{ scale, y, opacity: heroOpacity }}>
            {/* Layer 10: Sliding Frame (Does not blur) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <HeroWrapper startAnimations={startAnimations} />
            </div>

            {/* Container for blurring elements */}
            <motion.div className="w-full h-full" style={{ filter }}>
              {/* Layer 0: FBO Animation (Now scales and blurs) */}
              <div className="absolute inset-0 z-0">
                <FboAnimation />
              </div>

              {/* Layer 20: Centered Title Block (Now blurs via parent) */}
              <div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              >
                <div>
                  {startAnimations ? (
                    <TypeAnimation
                      sequence={['JOSHUA', 12, 'JOSHUA\nLIN']}
                      wrapper="h1"
                      speed={32}
                      className="text-5xl md:text-9xl text-white uppercase whitespace-pre-line font-serif font-bold text-left"
                      cursor={false}
                    />
                  ) : (
                    <h1 className="text-5xl md:text-9xl text-transparent uppercase whitespace-pre-line font-serif font-bold text-left">
                      {'JOSHUA\nLIN'}
                    </h1>
                  )}
                  <motion.p
                    className="text-lg md:text-2xl text-white tracking-[0.2em] uppercase font-sans mt-4 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimations ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
                  >
                    Portfolio Website
                  </motion.p>
                  <motion.div className="mt-4 text-sm md:text-lg text-white flex items-center justify-start space-x-4 font-serif">
                    <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.9 }}>Developer</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.1 }} className="text-xs">&middot;</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.3 }}>Designer</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.5 }} className="text-xs">&middot;</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={startAnimations ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.7 }}>Researcher</motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Static Cover Frame */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: coverOpacity,
              scale,
              y,
              border: '15vh solid white',
              borderLeftWidth: '10vw',
              borderRightWidth: '10vw',
            }}
          />
        </main>
        <About />
        <Portfolio />
        <Contact />
      </div>
    </div>
  );
}

export default App;

