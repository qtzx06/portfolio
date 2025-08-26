import { motion } from 'framer-motion';

const FramePanel = ({ initial, animate }: { initial: any; animate: any; }) => (
  <motion.div
    className="absolute"
    style={{ backgroundColor: 'white' }} // Change color to white
    initial={initial}
    animate={animate}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
  />
);

const Hero = () => {
  return (
    <>
      {/* Panels slide IN from the outside to form the frame */}
      <FramePanel initial={{ top: 0, left: 0, right: 0, height: '0%' }} animate={{ height: '15%' }} />
      <FramePanel initial={{ bottom: 0, left: 0, right: 0, height: '0%' }} animate={{ height: '15%' }} />
      <FramePanel initial={{ top: 0, bottom: 0, left: 0, width: '0%' }} animate={{ width: '10%' }} />
      <FramePanel initial={{ top: 0, bottom: 0, right: 0, width: '0%' }} animate={{ width: '10%' }} />
    </>
  );
};

export default Hero;
