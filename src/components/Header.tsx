import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut', delay: 1.8 }}
    >
      <div className="text-accent font-bold text-2xl">
        QTZX
      </div>
      <nav className="flex space-x-8">
        <a href="#" className="text-accent hover:text-white transition-colors">Home</a>
        <a href="#" className="text-accent hover:text-white transition-colors">About</a>
        <a href="#" className="text-accent hover:text-white transition-colors">Contact</a>
      </nav>
    </motion.header>
  );
};

export default Header;
