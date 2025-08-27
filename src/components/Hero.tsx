import { motion, MotionValue } from 'framer-motion';

interface HeroWrapperProps {
  height: MotionValue<string>;
  width: MotionValue<string>;
}

const HeroWrapper = ({ height, width }: HeroWrapperProps) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Top & Bottom Bars */}
      <motion.div className="absolute top-0 left-0 right-0 bg-white" style={{ height }} />
      <motion.div className="absolute bottom-0 left-0 right-0 bg-white" style={{ height }} />
      {/* Left & Right Bars */}
      <motion.div className="absolute top-0 bottom-0 left-0 bg-white" style={{ width }} />
      <motion.div className="absolute top-0 bottom-0 right-0 bg-white" style={{ width }} />
    </div>
  );
};

export default HeroWrapper;
