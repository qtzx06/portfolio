import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* You can add a spinner or logo here if you want */}
    </motion.div>
  );
};

export default Loading;
