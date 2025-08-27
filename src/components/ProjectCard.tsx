import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  techStack: string[];
  githubLink: string;
  liveLink?: string;
  media: string;
  gif: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const ease: Easing = 'easeOut';
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  const openVideo = () => {
    const videoUrl = `/video-viewer.html?src=${encodeURIComponent(project.media)}`;
    window.open(videoUrl, '_blank');
  };

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div 
        className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4 cursor-pointer"
        onClick={openVideo}
      >
        <img src={project.gif} alt={`${project.title} GIF preview`} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="md:w-2/3 p-6 flex flex-col">
        <h3 className="text-2xl font-bold text-primary font-serif">{project.title}</h3>
        <p className="text-md text-tertiary mb-4">{project.subtitle}</p>
        
        <ul className="list-disc list-inside text-tertiary text-sm space-y-2 flex-grow">
          {project.description.map((point, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 my-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="bg-accent text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-200">
          {project.githubLink && (
            <motion.a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 1), inset 0px -1px 1px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.02)'
              }}
              whileHover={{ y: -2, boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              View Code
            </motion.a>
          )}
          {project.liveLink && (
            <motion.a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 1), inset 0px -1px 1px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.02)'
              }}
              whileHover={{ y: -2, boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;