import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

const About = () => {
  const [startTyping, setStartTyping] = useState(false);

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
    <div id="about" className="relative min-h-screen w-screen bg-white flex items-start pt-20">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full px-[18vw]"
        initial="hidden"
        whileInView="visible"
        onViewportEnter={() => setStartTyping(true)}
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-start">
          <motion.div className="h-12 md:h-16 mb-8">
            {startTyping ? (
              <TypeAnimation
                sequence={[
                  'Hello, world',
                  1000,
                  'Hello, world!',
                ]}
                wrapper="h2"
                cursor={false}
                className="text-4xl md:text-5xl font-bold text-primary font-serif"
              />
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-serif text-transparent">
                Hello world!
              </h2>
            )}
          </motion.div>

          <motion.p variants={itemVariants} className="text-tertiary text-lg mb-6">
            I'm Joshua! I'm a Data Science and Mathematics/Computer Science student at UC San Diego with a deep passion for building intelligent systems and exploring the intersection of technology and creativity.
          </motion.p>

          <motion.p variants={itemVariants} className="text-tertiary text-lg mb-6">
            My journey in tech is driven by a curiosity for artificial intelligence and machine learning. From developing algorithms for Large Language Models to building computer vision tools and agentic AI systems, I thrive on solving complex problems and bringing ideas to life through code and critical thiking. My experience as an AI Research Fellow and Full-Stack Developer has allowed me to work on cutting-edge projects, and I'm always tinkering with my self-hosted home lab to learn more.
          </motion.p>

          <motion.p variants={itemVariants} className="text-tertiary text-lg mb-6">
            When I'm not in front of a screen, I believe in finding balance. You can often find me meticulously caring for my aquariums, enjoying the warm sound of my vinyl collection, or recharging at the beach.
          </motion.p>

          <motion.p variants={itemVariants} className="text-tertiary text-lg">
            I'm always excited to connect with others who share my interests, whether in tech or hobbies. Feel free to reach out!
          </motion.p>
        </div>

        {/* Right Column: Media */}
        <div className="flex items-start justify-center">
            <div className="flex gap-4 w-full max-w-md">
                {/* Vertical Video */}
                <div className="w-3/5 aspect-[9/16] rounded-lg overflow-hidden bg-gray-200">
                    <video
                        src="/media/about/roomtour.mov"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Pictures */}
                <div className="w-2/5 flex flex-col gap-4">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src="/media/about/image1.png" alt="About 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src="/media/about/image2.png" alt="About 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img src="/media/about/image3.png" alt="About 3" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;