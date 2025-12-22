import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanityClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import styles from './Blog.module.scss';

const extractPlainText = (blocks = []) => {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter(block => block._type === 'block' && block.children)
    .flatMap(block => block.children.map(child => child.text))
    .join(' ')
    .slice(0, 120) + '...';
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "post"] | order(publishedAt desc)';
    client.fetch(query)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Blog List Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className={styles.blogSection}>
      <div className="container mx-auto px-6">

        {/* ✅ ১. হেডার এনিমেশন */}
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Latest <span className="text-blue-600">Insights</span></h2>
          <p>Exploring the world of technology, coding, and design.</p>
        </motion.div>

        {/* Loading State Handle */}
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts found.</div>
        ) : (

          /* ✅ ২. ব্লগ গ্রিড এনিমেশন */
          <div className={styles.gridContainer}>
            {posts.map((post, index) => {
              const excerptText = extractPlainText(post.body);
              return (
                <motion.article
                  key={post._id}
                  className={styles.blogCard}

                  // Staggered Animation Logic (Index based)
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }} // ১০% দেখা গেলেই এনিমেশন হবে
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2, // একটার পর একটা আসবে
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }} // হোভার ইফেক্ট
                >
                  <div className={styles.imageWrapper}>
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        className={styles.postImage}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                    )}

                    {/* Date Badge */}
                    <div className={styles.dateBadge}>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <h3>{post.title}</h3>
                    <p>{excerptText}</p>

                    <div className={styles.cardFooter}>
                      <Link to={`/blog/${post.slug.current}`} className={styles.readMore}>
                        Read Article <span><FaArrowRight size={14} /></span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;