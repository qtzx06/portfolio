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
    liveLink: 'https://www.linkedin.com/posts/joshua-lin-86b8a324a_i-tried-to-challenge-myself-with-research-activity-7365627336987250688-gGWW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD22QxMBpH3pedvYR85ZtrKLnTwn1ZVij-s',
    media: '/media/projects/hd/clarifai.mp4',
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
    liveLink: 'https://www.linkedin.com/posts/joshua-lin-86b8a324a_last-night-i-missed-my-personal-best-because-activity-7362925005870915584-GBzK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD22QxMBpH3pedvYR85ZtrKLnTwn1ZVij-s',
    media: '/media/projects/hd/nntimer.mp4',
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
    media: '/media/projects/hd/cassandra.mp4',
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
    media: '/media/projects/hd/pomosync.mp4',
    gif: '/media/projects/gif/pomosync.gif',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    subtitle: 'This website showcasing projects and experience',
    description: [
      'built with modern web tech including <strong>Three.js</strong> for visualizations,',
      '<strong>responsive design</strong> optimized for all screen sizes,',
      'features a clean layout balancing <strong>technical depth</strong> and <strong>visual appeal</strong>,',
      'optimized for performance with <strong>fast loading</strong> and <strong>smooth animations</strong>.',
    ],
    techStack: ['React', 'Vite', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    githubLink: '',
    liveLink: 'https://qtzx.dev/',
    media: '/media/projects/hd/portfolio.mp4',
    gif: '/media/projects/gif/portfolio.gif',
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
    media: '/media/projects/hd/concept.mov',
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
    media: '/media/projects/hd/dotfiles.mov',
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
    <div id="portfolio" ref={ref} className="relative min-h-screen w-screen bg-white py-24 px-8 md:px-[10vw]">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="text-center mb-16">
          <div className="h-12 md:h-16 mb-4">
            {startTyping ? (
              <TypeAnimation
                sequence={['Portfolio...']}
                wrapper="h2"
                cursor={true}
                className="text-4xl md:text-5xl font-bold text-primary font-serif"
              />
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-serif text-transparent">
                Portfolio...
              </h2>
            )}
          </div>
          <motion.p variants={itemVariants} className="text-tertiary text-lg mb-8 max-w-3xl mx-auto">
            A collection of my favorite projects, from <strong>hackathon-winning AI agents</strong> to finely-tuned <strong>custom development environments</strong>. Each one represents a challenge I was excited to tackle.
          </motion.p>
          <motion.a 
            href="/media/resume/JoshuaLinResumeMain.pdf"
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
        </div>
        
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