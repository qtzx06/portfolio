import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" });

  return (
    <div id="contact" ref={ref} className="relative min-h-screen w-screen bg-white py-24 px-8 md:px-[10vw]">
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 1 } },
        }}
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