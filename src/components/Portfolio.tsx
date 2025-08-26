import { motion } from 'framer-motion';

const Portfolio = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div id="portfolio" className="relative min-h-screen w-screen bg-white flex items-center justify-center py-20">
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
          Portfolio
        </motion.h2>
        <motion.p variants={itemVariants} className="text-tertiary text-lg">
          This is where the portfolio content will go.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Portfolio;
