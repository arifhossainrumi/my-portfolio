import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaUserEdit } from 'react-icons/fa';
import styles from './BlogPost.module.scss';

// বডির ভেতরের ইমেজ রেন্ডার করার জন্য
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          src={urlFor(value).width(800).fit('max').url()}
          alt={value.alt || 'Content Image'}
          className={styles.bodyImage}
        />
      );
    }
  }
};

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // পোস্ট ফেচ করা হচ্ছে
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      body,
      "authorName": author->name
    }`;

    client.fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-gray-500">Loading Article...</div>;
  
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h2>
      <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
    </div>
  );

  return (
    <motion.article 
      className={styles.postPage}
      initial={{ opacity: 0, y: 20 }} // নিচ থেকে স্মুথলি ভেসে উঠবে
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.container}>
        
        {/* Back Button */}
        <Link to="/#blog" replace className={styles.backBtn}>
          <FaArrowLeft /> Back
        </Link>

        {/* 1. TITLE */}
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {post.title}
        </motion.h1>

        {/* 2. MAIN IMAGE */}
        {post.mainImage && (
          <motion.div 
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img 
              src={urlFor(post.mainImage).width(1200).height(650).url()} 
              alt={post.title} 
            />
          </motion.div>
        )}

        {/* 3. PUBLISH DATE & AUTHOR */}
        <motion.div 
          className={styles.metaInfo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Date */}
          <div title="Published Date">
            <FaCalendarAlt className={styles.icon} />
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>

          {/* Author (Optional) */}
          {post.authorName && (
            <div title="Author">
              <span className="text-gray-300">|</span> {/* Divider */}
              <FaUserEdit className={styles.icon} />
              <span>{post.authorName}</span>
            </div>
          )}
        </motion.div>

        {/* 4. BODY CONTENT */}
        <motion.div 
          className={styles.contentBody}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <PortableText value={post.body} components={ptComponents} />
        </motion.div>

      </div>
    </motion.article>
  );
}

export default BlogPost;