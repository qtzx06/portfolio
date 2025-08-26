import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="w-1/4 h-0.5 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default Loading;