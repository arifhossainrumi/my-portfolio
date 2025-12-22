import { useEffect, useState, useRef } from 'react'; // useRef import করা হয়েছে
import { client, urlFor } from '../../lib/sanityClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // আইকন ইম্পোর্ট
import styles from './Blog.module.scss';

const extractPlainText = (blocks = []) => {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter(block => block._type === 'block' && block.children)
    .flatMap(block => block.children.map(child => child.text))
    .join(' ')
    .slice(0, 120) + '...';
};

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ১. স্ক্রল কন্টেইনারকে ধরার জন্য রেফারেন্স
  const sliderRef = useRef(null);

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

  // ✅ ২. বাটন দিয়ে স্ক্রল করার ফাংশন
  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      // ডানে বা বামে ৩২০ পিক্সেল করে সরবে (কার্ডের সাইজ অনুযায়ী)
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className={styles.blogSection}>
      <div className="container mx-auto px-6 relative"> {/* relative ক্লাস দেওয়া হলো বাটনের পজিশনের জন্য */}

        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Latest <span className="text-blue-600">Insights</span></h2>
          <p>Exploring SQL, data analysis techniques, and BI tools for data-driven decisions.</p>

          {/* ✅ ৩. নেভিগেশন বাটন (হেডারের নিচে বা পাশে রাখা যেতে পারে) */}
          {!loading && posts.length > 0 && (
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

        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts found.</div>
        ) : (

          /* ✅ ৪. হরিজন্টাল স্লাইডার কন্টেইনার */
          <div className={styles.sliderContainer} ref={sliderRef}>
            {posts.map((post, index) => {
              const excerptText = extractPlainText(post.body);
              return (
                <motion.article
                  key={post._id}
                  className={styles.blogCard}
                  // এনিমেশন সিম্পল রাখা হলো যাতে স্ক্রল করলে সমস্যা না হয়
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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