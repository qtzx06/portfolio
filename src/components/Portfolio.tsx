import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 'pulse',
    title: 'pulse',
    subtitle: 'BigRedHacks 2025 Winner',
    description: [
      'transforms <strong>hummed melodies</strong> into music with synced <strong>WebGL visuals</strong>,',
      'reduced latency by <strong>70%</strong> with parallel processing and <strong>WebSockets</strong>,',
      'implemented an intelligent <strong>steering agent</strong> using NLP for prompt control,',
      'won <strong>People\'s Choice</strong> at Cornell\'s largest hackathon (400+ participants).',
    ],
    techStack: ['TypeScript', 'WebGL', 'Three.js', 'GLSL', 'WebSockets', 'Python'],
    githubLink: 'https://github.com/qtzx06/pulse',
    liveLink: 'https://pulse.qtzx.dev',
    gif: '/media/projects/gif/pulse.gif', 
  },
  {
    id: 'crakd',
    title: 'crakd',
    subtitle: 'B.E.L.L.E. AI Hackathon Finalist',
    description: [
      'identifies top software developers using a <strong>hybrid AI model</strong>,',
      'engineered an <strong>ensemble ML crawling pipeline</strong> with GraphQL and PCA,',
      'integrated <strong>asynchronous workflows</strong> for qualitative LLM ranking,',
      'placed <strong>Top 10</strong> of 70+ teams at B.E.L.L.E. AI Hackathon.',
    ],
    techStack: ['React', 'FastAPI', 'Python', 'GraphQL', 'Docker', 'Gemini'],
    githubLink: 'https://github.com/qtzx06/crakd',
    liveLink: 'https://crakd.co',
    gif: '/media/projects/gif/crakd.gif', 
  },
  {
    id: 'clarifai',
    title: 'clarifai',
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
    title: 'nntimer',
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
    id: 'pomosync',
    title: 'pomosync',
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
    id: 'llm-research',
    title: 'AI/ML Research at Algoverse',
    subtitle: 'Novel concept-based decoding algorithms',
    description: [
      'utilizes <strong>high-performance computing</strong> with ROCm/CUDA,',
      'leverages <strong>cloud infrastructure</strong> (Runpod) for scalable training,',
      'improves semantic alignment, coherence, and <strong>interpretability</strong>,',
      'targets top-tier NLP conferences like <strong>NeurIPS, ACL, and EMNLP</strong>.',
    ],
    techStack: ['Python', 'PyTorch', 'ROCm', 'CUDA', 'Runpod', 'LLM'],
    githubLink: 'https://github.com/qtzx06/concept-aware-llms',
    gif: '/media/projects/gif/concept.gif',
  },
  {
    id: 'dotfiles',
    title: 'Personal Development & Home Lab',
    subtitle: 'Unified configuration for local and self-hosted systems',
    description: [
      'manages a custom <strong>Arch Linux</strong> environment and a <strong>self-hosted server</strong> with a unified configuration,',
      'deploys services using <strong>Docker</strong>, <strong>Nginx</strong>, and <strong>Cloudflare</strong> for robust, secure access,',
      'automates workflows and monitors systems with tools like <strong>n8n</strong>, <strong>Grafana</strong>, and <strong>PostgreSQL</strong>,',
      'ensures consistency and reliability through version-controlled <strong>dotfiles</strong> and <strong>IaC principles</strong>.',
    ],
    techStack: ['Arch Linux', 'Docker', 'Nginx', 'PostgreSQL', 'Grafana', 'TrueNAS', 'Git'],
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
            A collection of my work building intelligent systems, from award-winning <strong>multimodal AI agents</strong> and novel <strong>decoding algorithms</strong> to the high-performance, <strong>custom-tuned environments</strong> they're developed in. These are the projects that kept me up at night—debugging edge cases at 2 am, refactoring for the third time because I found a more elegant approach, and constantly thinking "<strong>what if I tried...</strong>"
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