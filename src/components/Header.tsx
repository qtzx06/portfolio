import { motion } from 'framer-motion';

const navLinks = ["Home", "About", "Portfolio", "Contact"];

const Header = ({ startAnimations }: { startAnimations: boolean }) => {
  return (
    <motion.header
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={startAnimations ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
    >
      <motion.div 
        className="relative group"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {/* Glimmer Effect */}
        <motion.div
          className="absolute -inset-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{ borderRadius: '9999px' }}
          animate={{ backgroundPositionX: ['-100%', '200%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 3,
            ease: 'linear',
          }}
        />
        <nav 
          className="relative flex items-center justify-center space-x-6 px-6 py-2 rounded-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2), inset 0px 2px 1px rgba(255, 255, 255, 1), inset 0px -2px 1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          {navLinks.map((link) => (
            <a 
              key={link}
              href="#" 
              className="text-primary hover:text-black transition-colors duration-300 px-6 py-2 relative z-10 rounded-full"
            >
              {link}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
