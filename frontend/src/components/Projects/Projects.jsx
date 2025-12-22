import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChartBar } from 'react-icons/fa';
import { client, urlFor } from '../../lib/sanityClient';
import styles from './Projects.module.scss';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার স্কিমা অনুযায়ী ডেটা আনা হচ্ছে
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

  if (loading) return null;

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container mx-auto px-6 md:px-12">

        {/* ✅ ১. হেডার এনিমেশন (আলাদাভাবে) */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }} // স্ক্রল করলে বারবার দেখাবে
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Check out some of the top projects I've worked on.
          </p>
        </motion.div>

        {/* ✅ ২. গ্রিড কন্টেইনার (সিম্পল রাখা হয়েছে) */}
        <div className={styles.gridContainer}>
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              className={styles.projectCard}

              // ✅ প্রতিটি কার্ডের নিজস্ব এনিমেশন (Index দিয়ে ডিলে করা হয়েছে)
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }} // ১০% দেখা গেলেই এনিমেশন হবে
              transition={{
                duration: 0.5,
                delay: index * 0.2, // একটার পর একটা আসবে (Stagger Effect)
                ease: "easeOut"
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
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