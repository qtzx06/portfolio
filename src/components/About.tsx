import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  const ref = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) {
      setStartTyping(true);
    }
  }, [inView]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "0%", "-10%"]);

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const ease: Easing = 'easeOut';

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  const mediaContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const videoVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <div id="about" ref={ref} className="relative min-h-screen w-screen bg-white flex items-center py-20 md:py-0 overflow-hidden">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full px-8 md:px-[10vw]"
        style={{ scale, y, filter }}
      >
        {/* Left Column: Text Content */}
        <motion.div 
          className="flex flex-col justify-center"
          variants={textContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="h-12 md:h-16 mb-8">
            {startTyping ? (
              <TypeAnimation
                sequence={['Hello, world...']}
                wrapper="h2"
                cursor={true}
                className="text-4xl md:text-5xl font-bold text-primary font-serif"
              />
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-serif text-transparent">
                Hello, world...
              </h2>
            )}
          </div>
          <motion.p variants={textItemVariants} className="text-tertiary text-lg mb-6">
            I'm Joshua, a <strong>Data Science</strong> and  
            <strong> Mathematics/Computer Science </strong> 
            student at <strong>UC San Diego</strong> with a 
            deep passion for building <strong>intelligent systems</strong>, 
            crafting <strong>data-driven solutions</strong>,
            and exploring the intersection of <strong>technology and creativity.</strong>
          </motion.p>
          <motion.p variants={textItemVariants} className="text-tertiary text-lg mb-6">
            My journey in tech is driven by a curiosity for <strong>artificial intelligence</strong> and <strong>machine learning</strong>. 
            From developing algorithms for <strong>Large Language Models</strong> to building <strong>computer vision tools</strong> and <strong>agentic AI systems</strong>, 
            I thrive on solving complex problems and bringing ideas to life through code and critical thiking. 
            My experience as an <strong>AI Research Fellow</strong> and <strong>Full-Stack Developer</strong> has allowed me to work on cutting-edge projects, 
            and I'm always tinkering with my self-hosted <strong>home lab</strong> to learn more.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-tertiary text-lg mb-6">
            When I'm not in front of a screen, I believe in finding <strong>balance</strong>. 
            You can often find me meticulously caring for my <strong>aquariums</strong>, 
            enjoying the warm sound of my <strong>vinyl collection</strong>, or recharging at the <strong>beach</strong>. 
            I’m also passionate about staying active and challenging myself—whether that’s 
            experimenting in the <strong>kitchen</strong>, lifting at the <strong>gym</strong>, or learning something completely 
            outside of tech to keep my perspective fresh.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-tertiary text-lg">
            I'm always excited to <strong>connect with others</strong> who share my interests, whether in tech or hobbies. 
            Feel free to <strong>reach out!</strong>
          </motion.p>
        </motion.div>

        {/* Right Column: Media */}
        <motion.div 
          className="flex items-center justify-center"
          variants={mediaContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
            <div className="flex gap-4 w-full">
                <motion.div variants={videoVariant} className="w-7/12 aspect-[9/16] rounded-lg overflow-hidden bg-gray-200">
                    <video
                        src="/media/about/roomtour.mov"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="w-5/12 flex flex-col gap-4">
                    <motion.div variants={imageVariant} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src="/media/about/image1.png" alt="About 1" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div variants={imageVariant} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src="/media/about/image2.png" alt="About 2" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div variants={imageVariant} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src="/media/about/image3.png" alt="About 3" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;