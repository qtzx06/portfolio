import { motion } from 'framer-motion';

const HeroWrapper = ({ startAnimations }: { startAnimations: boolean }) => {
  return (
    <>
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-white" 
        initial={{ height: '0%' }} 
        animate={startAnimations ? { height: '15%' } : {}} 
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} 
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-white" 
        initial={{ height: '0%' }} 
        animate={startAnimations ? { height: '15%' } : {}} 
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} 
      />
      <motion.div 
        className="absolute top-0 bottom-0 left-0 bg-white" 
        initial={{ width: '0%' }} 
        animate={startAnimations ? { width: '10%' } : {}} 
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} 
      />
      <motion.div 
        className="absolute top-0 bottom-0 right-0 bg-white" 
        initial={{ width: '0%' }} 
        animate={startAnimations ? { width: '10%' } : {}} 
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} 
      />
    </>
  );
}

export default HeroWrapper;