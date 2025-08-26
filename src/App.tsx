import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FboAnimation from './components/FboAnimation';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

function App() {
  return (
    <div className="bg-secondary">
      <main className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden relative">
        {/* Layer 0: FBO Animation */}
        <div className="absolute inset-0 z-0">
          <FboAnimation />
        </div>

        {/* Layer 10: Sliding Frame */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Hero />
        </div>

        {/* Layer 20: Centered Title Block */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div>
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
            <motion.p
              className="text-2xl text-white tracking-[0.2em] uppercase font-sans mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 2.0 }}
            >
              Portfolio Website
            </motion.p>
            <motion.div
              className="mt-4 text-lg text-white flex items-center space-x-4 font-serif"
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.2 }}>Developer</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.4 }} className="text-xs">&middot;</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.6 }}>Designer</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.8 }} className="text-xs">&middot;</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 3.0 }}>Researcher</motion.span>
            </motion.div>
          </div>
        </div>
        
        {/* Layer 30: Header */}
        <Header />
      </main>
      <div className="h-screen bg-secondary p-10">
        <h2 className="text-4xl font-bold text-accent">Scrollable Content</h2>
        <p className="text-tertiary mt-4">This is where the rest of your page content will go.</p>
      </div>
    </div>
  );
}

export default App;