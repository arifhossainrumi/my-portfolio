import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChartBar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { client, urlFor } from '../../lib/sanityClient';
import styles from './Projects.module.scss';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ১. স্লাইডার কন্ট্রোল করার জন্য Ref
  const sliderRef = useRef(null);

  useEffect(() => {
    const query = '*[_type == "project"] | order(_createdAt desc) { _id, title, mainImage, description, projectLink, githubLink, dashboardLink, tags, toolsUsed }';

    client.fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ ২. বাটন দিয়ে স্ক্রল করার ফাংশন
  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      // কার্ডের সাইজ অনুযায়ী ডানে বা বামে সরবে
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container mx-auto px-6 md:px-12 relative">

        {/* ✅ ৩. হেডার + নেভিগেশন বাটন */}
        <motion.div
          className="text-center mb-10 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Check out some of the top projects I've worked on.
          </p>

          {/* নেভিগেশন বাটন (ব্লগের মতো) */}
          {projects.length > 0 && (
            <div className={styles.navButtons}>
              <button onClick={() => scroll('left')} aria-label="Scroll Left">
                <FaChevronLeft />
              </button>
              <button onClick={() => scroll('right')} aria-label="Scroll Right">
                <FaChevronRight />
              </button>
            </div>
          )}
        </motion.div>

        {/* ✅ ৪. হরিজন্টাল স্লাইডার কন্টেইনার */}
        <div className={styles.sliderContainer} ref={sliderRef}>
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              className={styles.projectCard}

              // এনিমেশন সিম্পল রাখা হলো স্ক্রলিং ইস্যু এড়াতে
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              {/* Image Area */}
              <div className={styles.imageWrapper}>
                {project.mainImage ? (
                  <img
                    src={urlFor(project.mainImage).width(600).height(350).url()}
                    alt={project.title}
                  />
                ) : (
                  <div className={styles.placeholderImg}>No Image</div>
                )}

                {/* Overlay Links */}
                <div className={styles.overlay}>
                  <div className={styles.links}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" title="GitHub Repo">
                        <FaGithub />
                      </a>
                    )}
                    {project.projectLink && (
                      <a href={project.projectLink} target="_blank" rel="noreferrer" title="Live Demo">
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    {project.dashboardLink && (
                      <a href={project.dashboardLink} target="_blank" rel="noreferrer" title="Analytics Dashboard">
                        <FaChartBar />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className={styles.techStack}>
                  {project.toolsUsed?.map((tool, i) => (
                    <span key={`tool-${i}`} className={styles.tagBadge}>{tool}</span>
                  ))}
                  {project.tags?.map((tag, i) => (
                    <span key={`tag-${i}`} className={`${styles.tagBadge} ${styles.secondaryTag}`}>{tag}</span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;