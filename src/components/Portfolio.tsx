import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 'clarifai',
    title: 'ClarifAI',
    subtitle: 'NVIDIA AI Agent Hackathon',
    description: [
      'deconstructs <strong>research papers</strong> into digestible concepts,',
      'automatically generates <strong>3blue1brown-style</strong> video explanations,',
      'features <strong>self-correcting code generation</strong> for animations,',
      'streams agent processes in real-time via <strong>WebSockets</strong>.',
    ],
    techStack: ['Next.js', 'FastAPI', 'Python', 'LangChain', 'Manim', 'Gemini', 'WebSockets'],
    githubLink: 'https://github.com/qtzx06/clarifai',
    liveLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7365627336987250688/',
    gif: '/media/projects/gif/clarifai.gif',
  },
  {
    id: 'nntimer',
    title: 'Computer Vision Speedcube Timer',
    subtitle: 'A smart, hands-free speedcube timer',
    description: [
      'starts/stops timer automatically by analyzing <strong>hand and cube state</strong>,',
      'uses a two-stage <strong>deep learning pipeline</strong> (YOLOv8 & ResNet18),',
      'employs <strong>MediaPipe</strong> for robust hand tracking,',
      'features a sleek web interface with <strong>live video and statistics</strong>.',
    ],
    techStack: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'YOLOv8', 'MediaPipe'],
    githubLink: 'https://github.com/qtzx06/nntimer',
    liveLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7362925005870915584/',
    gif: '/media/projects/gif/nntimer.gif',
  },
  {
    id: 'cassandra',
    title: 'Cassandra Edu Landing Page',
    subtitle: 'Animated and responsive college coaching website',
    description: [
      'modern, <strong>animated design</strong> built with Vite, React, and Tailwind,',
      'integrated with <strong>Notion CMS</strong> for dynamic content management,',
      'features <strong>domain-authenticated email servers</strong> for secure communication,',
      'optimized for a seamless experience across <strong>all devices</strong>.',
    ],
    techStack: ['Vite', 'React', 'Tailwind CSS', 'Notion CMS'],
    githubLink: 'https://github.com/qtzx06/cassandra-college-coaching',
    liveLink: 'https://cassandra-college-coaching.qtzx.dev/',
    gif: '/media/projects/gif/cassandra.gif',
  },
  {
    id: 'pomosync',
    title: 'Universal Pomodoro Timer',
    subtitle: 'A terminal-based universal pomodoro timer in Rust',
    description: [
      'built with <strong>Rust</strong> for high performance and reliability,',
      'synchronizes <strong>2-hour cycles</strong> universally, starting on even hours,',
      'clean and intuitive <strong>terminal user interface</strong>,',
      'lightweight, <strong>cross-platform</strong>, and installed with a simple script.',
    ],
    techStack: ['Rust', 'React/Next.js', 'Three.js', 'ratatui', 'crossterm'],
    githubLink: 'https://github.com/qtzx06/pomosync',
    gif: '/media/projects/gif/pomosync.gif',
  },
  {
    id: 'mixplusmatcha',
    title: 'Mix+Matcha E-Commerce Platform',
    subtitle: 'Full-stack e-commerce solution',
    description: [
        'developing an <strong>e-commerce</strong> platform for @mixplusmatcha,',
        'built with <strong>Next.js</strong> for a modern, server-rendered frontend,',
        'integrating the <strong>Stripe API</strong> for secure payment processing,',
        'designed for managing <strong>postings and orders</strong> efficiently.',
    ],
    techStack: ['Next.js', 'Stripe API', 'React', 'Node.js'],
    githubLink: '', // No link provided in resume
    liveLink: '', // No link provided
    gif: '/media/projects/gif/concept.gif', // Placeholder
  },
  {
    id: 'uweb',
    title: 'UWE Website Redesign',
    subtitle: 'Redesign for UC Berkeley organization',
    description: [
        'developing a website redesign for <strong>UC Berkeley\'s</strong> UWE,',
        'utilizing <strong>React</strong> for a dynamic and responsive user interface,',
        'focusing on a clean, modern aesthetic to improve user engagement,',
        'collaborating with stakeholders to meet organizational needs.',
    ],
    techStack: ['React', 'JavaScript', 'HTML/CSS'],
    githubLink: '', // No link provided
    liveLink: '', // No link provided
    gif: '/media/projects/gif/dotfiles.gif', // Placeholder
  },
  {
    id: 'llm-research',
    title: 'Advanced LLM Research',
    subtitle: 'Extending concept-aware language model architectures',
    description: [
      'utilizes <strong>high-performance computing</strong> with ROCm/CUDA,',
      'leverages <strong>cloud infrastructure</strong> (Runpod) for scalable training,',
      'develops novel <strong>concept-based decoding algorithms</strong>,',
      'targets top-tier NLP conferences like <strong>NeurIPS, ACL, and EMNLP</strong>.',
    ],
    techStack: ['Python', 'PyTorch', 'ROCm', 'CUDA', 'Runpod', 'LLM'],
    githubLink: 'https://github.com/qtzx06/concept-aware-llms',
    gif: '/media/projects/gif/concept.gif',
  },
  {
    id: 'dotfiles',
    title: 'Personal Development Environment',
    subtitle: 'Hyprland configuration and system customization',
    description: [
      'custom <strong>Arch Linux</strong> and <strong>Hyprland</strong> setup for a productive workflow,',
      'managed with <strong>dotfiles</strong> for consistency across systems,',
      '<strong>version controlled</strong> for easy replication and recovery,',
      'minimalist approach prioritizing <strong>functionality and performance</strong>.',
    ],
    techStack: ['Arch Linux', 'Hyprland', 'Shell Scripting', 'Git'],
    githubLink: 'https://github.com/qtzx06/dotfiles',
    gif: '/media/projects/gif/dotfiles.gif',
  },
];


const Portfolio = () => {
  const ref = useRef(null);
  const [startTyping, setStartTyping] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) {
      setStartTyping(true);
    }
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const ease: Easing = 'easeOut';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <div id="portfolio" ref={ref} className="relative min-h-screen w-screen bg-white pt-48 pb-24 md:py-24 px-8 md:px-[10vw] scroll-mt-0 md:scroll-mt-24">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          <div className="h-12 md:h-16 mb-4">
            {startTyping ? (
              <TypeAnimation
                sequence={['My Portfolio']}
                wrapper="h2"
                cursor={true}
                className="text-4xl md:text-5xl font-bold text-primary font-serif"
              />
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-serif text-transparent">
                My Portfolio
              </h2>
            )}
          </div>
          <motion.p variants={itemVariants} className="text-tertiary text-lg mb-8 max-w-3xl mx-auto">
            A collection of my favorite projects, from <strong>hackathon-winning AI agents</strong> to finely-tuned <strong>custom development environments</strong>. These are the projects that kept me up at night—debugging edge cases at 2 am, refactoring for the third time because I found a more elegant approach, and constantly thinking "<strong>what if I tried...</strong>"
          </motion.p>
          <motion.a 
            href="/media/resume/JoshuaLinResume.pdf"
            download="JoshuaLinResume.pdf"
            variants={itemVariants}
            className="inline-block text-primary font-semibold px-6 py-3 rounded-full text-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 1), inset 0px -1px 1px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.02)'
            }}
            whileHover={{ y: -2, boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;