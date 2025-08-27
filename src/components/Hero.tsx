import { motion } from 'framer-motion';

const HeroWrapper = ({ startAnimations }: { startAnimations: boolean }) => {
  const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 };

  return (
    <>
      {/* Top Bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-white" 
        initial={{ height: '0%' }} 
        animate={startAnimations ? { height: '15%' } : {}} 
        transition={transition} 
      />
      {/* Bottom Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-white" 
        initial={{ height: '0%' }} 
        animate={startAnimations ? { height: '15%' } : {}} 
        transition={transition} 
      />
      {/* Left Bar (with overlap) */}
      <motion.div 
        className="absolute top-[-1px] bottom-[-1px] left-0 bg-white" 
        initial={{ width: '0%' }} 
        animate={startAnimations ? { width: '10%' } : {}} 
        transition={transition} 
      />
      {/* Right Bar (with overlap) */}
      <motion.div 
        className="absolute top-[-1px] bottom-[-1px] right-0 bg-white" 
        initial={{ width: '0%' }} 
        animate={startAnimations ? { width: '10%' } : {}} 
        transition={transition} 
      />
    </>
  );
}

export default HeroWrapper;
