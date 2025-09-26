import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaReddit, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const ref = useRef(null);
  const [startTyping, setStartTyping] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) {
      setStartTyping(true);
    }
  }, [inView]);

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div id="contact" ref={ref} className="relative min-h-screen w-screen bg-white flex items-center justify-center py-24 px-8 md:px-[10vw] scroll-mt-24">
      <motion.div
        className="w-full max-w-4xl flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 1 } },
        }}
      >
        <div className="h-12 md:h-16 mb-8">
          {startTyping ? (
            <TypeAnimation
              sequence={['Get in Touch']}
              wrapper="h2"
              cursor={true}
              className="text-4xl md:text-5xl font-bold text-primary font-serif"
            />
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-serif text-transparent">
              Get in Touch
            </h2>
          )}
        </div>
        <p className="text-tertiary text-lg mb-12 max-w-2xl">
          I love connecting with fellow builders, researchers, and <strong>curious minds</strong>!
        </p>
        <motion.div 
          className="flex items-center justify-center flex-wrap gap-x-8 gap-y-6"
          variants={containerVariants}
        >
          <motion.a href="mailto:joshualin3806@gmail.com" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaEnvelope size={32} />
          </motion.a>
          <motion.a href="https://www.linkedin.com/in/qtzx06/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaLinkedin size={32} />
          </motion.a>
          <motion.a href="https://github.com/qtzx06" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaGithub size={32} />
          </motion.a>
          <motion.a href="https://www.instagram.com/joshualin06/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaInstagram size={32} />
          </motion.a>
          <motion.a href="https://x.com/qtzx06" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaTwitter size={32} />
          </motion.a>
          <motion.a href="https://www.reddit.com/user/qtzx06/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaReddit size={32} />
          </motion.a>
          <motion.a href="https://www.youtube.com/@qtzx06/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-tertiary transition-colors duration-300" variants={iconVariants}>
            <FaYoutube size={32} />
          </motion.a>
        </motion.div>
        <motion.img 
          src="/media/about/warrior.png" 
          alt="Warrior" 
          className="mt-16 w-full max-w-lg mx-auto rounded-lg"
          variants={iconVariants}
        />
      </motion.div>
    </div>
  );
};

export default Contact;