import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "0%", "-10%"]);

  return (
    <div id="about" ref={ref} className="relative h-screen w-screen bg-white flex items-center overflow-hidden">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full px-[10vw]"
        style={{ scale, y, filter }}
      >
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 font-serif">
            Hello, world!
          </h2>
          <p className="text-tertiary text-lg mb-6">
            I'm Joshua! I'm a Data Science and Mathematics/Computer Science student at UC San Diego with a deep passion for building intelligent systems and exploring the intersection of technology and creativity.
          </p>
          <p className="text-tertiary text-lg mb-6">
            My journey in tech is driven by a curiosity for artificial intelligence and machine learning. From developing algorithms for Large Language Models to building computer vision tools and agentic AI systems, I thrive on solving complex problems and bringing ideas to life through code and critical thiking. My experience as an AI Research Fellow and Full-Stack Developer has allowed me to work on cutting-edge projects, and I'm always tinkering with my self-hosted home lab to learn more.
          </p>
          <p className="text-tertiary text-lg mb-6">
            When I'm not in front of a screen, I believe in finding balance. You can often find me meticulously caring for my aquariums, enjoying the warm sound of my vinyl collection, or recharging at the beach.
          </p>
          <p className="text-tertiary text-lg">
            I'm always excited to connect with others who share my interests, whether in tech or hobbies. Feel free to reach out!
          </p>
        </div>

        {/* Right Column: Media */}
        <div className="flex items-center justify-center">
            <div className="flex gap-4 w-full max-w-md">
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