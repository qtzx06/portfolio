import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Portfolio", href: "#portfolio" },
  { title: "Contact", href: "#contact" },
];

const Header = ({ startAnimations }: { startAnimations: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={startAnimations ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
    >
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <nav 
          className="relative flex items-center justify-center space-x-2 px-3 py-2 rounded-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2), inset 0px 2px 1px rgba(255, 255, 255, 1), inset 0px -2px 1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          {navLinks.map((link) => (
            <a 
              key={link.title}
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-primary transition-colors duration-300 px-4 py-2 relative z-10 rounded-full text-sm"
            >
              {link.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button
          onClick={toggleMenu}
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2), inset 0px 2px 1px rgba(255, 255, 255, 1), inset 0px -2px 1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9L12 15L6 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Pop-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:hidden absolute top-20 left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl p-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <nav className="flex flex-col items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.title}
                  href={link.href} 
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    closeMenu();
                  }}
                  className="text-primary hover:text-black transition-colors duration-300 w-full text-center py-3 rounded-lg"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;