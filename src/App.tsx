import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import HeroWrapper from './components/Hero';
import FboAnimation from './components/FboAnimation';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Animations for the text block
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Animations for the frame, managed manually
  const frameHeight = useMotionValue('0%');
  const frameWidth = useMotionValue('0%');

  // Phase 1: Initial "slide in" animation
  useEffect(() => {
    if (startAnimations) {
      animate(frameHeight, '15%', { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 });
      animate(frameWidth, '10%', { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 });
    }
  }, [startAnimations, frameHeight, frameWidth]);

  // Phase 2: Scroll-driven "growing border" animation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (startAnimations) {
      const newHeight = 15 + latest * 35; // 15% -> 50%
      const newWidth = 10 + latest * 40;  // 10% -> 50%
      frameHeight.set(`${newHeight}%`);
      frameWidth.set(`${newWidth}%`);
    }
  });

  // Animations for the header
  const headerScale = useTransform(scrollYProgress, [0, 2], [1, 0.95]);

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
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      const animationTimer = setTimeout(() => {
        setStartAnimations(true);
        const scrollTimer = setTimeout(() => {
          setIsScrollingEnabled(true);
        }, 2400);
        return () => clearTimeout(scrollTimer);
      }, 500);
      return () => clearTimeout(animationTimer);
    }, 1500);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (isScrollingEnabled) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isScrollingEnabled]);

  // Keyboard navigation & JS-based Smooth Snap
  useEffect(() => {
    if (!isScrollingEnabled || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const scrollDirection = { current: 0 }; // For arrow keys
    let animationFrameId: number | null = null;
    let scrollTimeout: number | null = null;

    // Smooth scrolling loop for arrow keys
    const smoothScroll = () => {
      if (scrollDirection.current !== 0) {
        scrollContainer.scrollTop += 10 * scrollDirection.current;
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    // Debounced snap-to-section logic
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Don't snap while actively scrolling with arrow keys
      if (scrollDirection.current !== 0) return;

      scrollTimeout = window.setTimeout(() => {
        const sectionIds = ['home', 'about', 'portfolio', 'contact'];
        const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el) as HTMLElement[];
        const currentScrollTop = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.clientHeight;

        // Find the section whose top is closest to the center of the viewport
        let closestSection: HTMLElement | null = null;
        let minDistance = Infinity;

        sections.forEach(section => {
          const scrollMarginTop = parseFloat(getComputedStyle(section).scrollMarginTop);
          const sectionTop = section.offsetTop - scrollMarginTop;
          const distance = Math.abs(currentScrollTop - sectionTop);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });

        // Only snap if the closest section is within a certain threshold (e.g., 30% of the viewport height)
        const snapThreshold = containerHeight * 0.3;

        if (closestSection && minDistance < snapThreshold) {
          const scrollMarginTop = parseFloat(getComputedStyle(closestSection as HTMLElement).scrollMarginTop);
          scrollContainer.scrollTo({
            top: (closestSection as HTMLElement).offsetTop - scrollMarginTop,
            behavior: 'smooth',
          });
        }
      }, 150); // Debounce delay in ms
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        event.preventDefault();
        const newDirection = event.code === 'ArrowUp' ? -1 : 1;
        if (scrollDirection.current === 0) {
          scrollDirection.current = newDirection;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(smoothScroll);
        }
      } else if (event.code === 'Space') {
        event.preventDefault();
        const sectionIds = ['home', 'about', 'portfolio', 'contact'];
        const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el) as HTMLElement[];
        const currentScrollTop = scrollContainer.scrollTop;
        const nextSectionIndex = sections.findIndex(section => {
          const scrollMarginTop = parseFloat(getComputedStyle(section).scrollMarginTop);
          return section.offsetTop - scrollMarginTop > currentScrollTop + 1;
        });

        if (nextSectionIndex !== -1) {
          const nextSection = sections[nextSectionIndex];
          const scrollMarginTop = parseFloat(getComputedStyle(nextSection).scrollMarginTop);
          scrollContainer.scrollTo({
            top: nextSection.offsetTop - scrollMarginTop,
            behavior: 'smooth',
          });
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        event.preventDefault();
        scrollDirection.current = 0;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        // Trigger the snap check after stopping
        handleScroll();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isScrollingEnabled]);

  return (
    <div className="bg-white">
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      <Header startAnimations={startAnimations} scrollYProgress={scrollYProgress} scale={headerScale} />

      <div className="scroll-container" ref={scrollRef}>
        <main
          id="home"
          ref={heroRef}
          className="w-screen h-screen relative z-10"
        >
          {/* Layer 0: FBO Animation (Static) */}
          <div className="absolute inset-0 z-0">
            <FboAnimation />
          </div>

          {/* Layer 10: Scaling and Blurring Text Block */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ scale, y, filter }}
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
          </motion.div>

          {/* Layer 20: Self-Contained Animated Frame */}
          <HeroWrapper 
            height={frameHeight} 
            width={frameWidth} 
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





