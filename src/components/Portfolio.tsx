import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Portfolio = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const filter = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const zIndex = useTransform(scrollYProgress, (value) => (value > 0.1 && value < 0.9 ? 20 : 0));

  return (
    <div id="portfolio" ref={ref} className="relative min-h-screen md:h-screen w-screen bg-white">
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center px-[10vw] text-center py-24 md:py-0"
        style={{ scale, y, filter, zIndex }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
          Portfolio
        </h2>
        <p className="text-tertiary text-lg">
          This is where the portfolio content will go.
        </p>
      </motion.div>
    </div>
  );
};

export default Portfolio;