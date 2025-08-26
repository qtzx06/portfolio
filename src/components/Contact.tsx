import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "0%", "-10%"]);

  return (
    <div id="contact" ref={ref} className="relative h-screen w-screen bg-white flex items-center overflow-hidden">
      <motion.div
        className="w-full px-[10vw] text-center"
        style={{ scale, y, filter }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
          Contact
        </h2>
        <p className="text-tertiary text-lg">
          This is where the contact information will go.
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;