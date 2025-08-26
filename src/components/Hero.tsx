import { motion } from 'framer-motion';

const FramePanel = ({ variants, startAnimations }: { variants: any; startAnimations: boolean; }) => (
  <motion.div
    className="absolute"
    style={{ backgroundColor: 'white' }}
    initial="hidden"
    animate={startAnimations ? "visible" : "hidden"}
    variants={variants}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
  />
);

const Hero = ({ startAnimations }: { startAnimations: boolean }) => {
  const topPanel = { hidden: { height: '0%' }, visible: { height: '15%' } };
  const bottomPanel = { hidden: { height: '0%' }, visible: { height: '15%' } };
  const leftPanel = { hidden: { width: '0%' }, visible: { width: '10%' } };
  const rightPanel = { hidden: { width: '0%' }, visible: { width: '10%' } };

  return (
    <>
      {/* Panels slide IN from the outside to form the frame */}
      <FramePanel startAnimations={startAnimations} variants={topPanel} />
      <FramePanel startAnimations={startAnimations} variants={bottomPanel} />
      <FramePanel startAnimations={startAnimations} variants={leftPanel} />
      <FramePanel startAnimations={startAnimations} variants={rightPanel} />
    </>
  );
};

// This is a bit repetitive, but we need to apply the correct initial styles
// for each panel since they are positioned differently.
const HeroWrapper = ({ startAnimations }: { startAnimations: boolean }) => {
  const topPanel = { hidden: { height: '0%' }, visible: { height: '15%' } };
  const bottomPanel = { hidden: { height: '0%' }, visible: { height: '15%' } };
  const leftPanel = { hidden: { width: '0%' }, visible: { width: '10%' } };
  const rightPanel = { hidden: { width: '0%' }, visible: { width: '10%' } };

  return (
    <>
      <motion.div className="absolute top-0 left-0 right-0" initial={{height: '0%'}} animate={startAnimations ? {height: '15%'} : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} style={{backgroundColor: 'white'}} />
      <motion.div className="absolute bottom-0 left-0 right-0" initial={{height: '0%'}} animate={startAnimations ? {height: '15%'} : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} style={{backgroundColor: 'white'}} />
      <motion.div className="absolute top-0 bottom-0 left-0" initial={{width: '0%'}} animate={startAnimations ? {width: '10%'} : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} style={{backgroundColor: 'white'}} />
      <motion.div className="absolute top-0 bottom-0 right-0" initial={{width: '0%'}} animate={startAnimations ? {width: '10%'} : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} style={{backgroundColor: 'white'}} />
    </>
  );
}


export default HeroWrapper;
