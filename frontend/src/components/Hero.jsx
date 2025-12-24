import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client, queries, urlFor } from '../lib/sanityClient';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './Hero.module.scss';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.5 }
  }
};

function Hero() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socials, setSocials] = useState({}); // ✅ সোশ্যাল স্টেট

  useEffect(() => {
    // ১. About Data আনা
    client.fetch(queries.about).then((data) => {
      setAbout(data);
      setLoading(false);
    }).catch(console.error);

    // ✅ ২. Social Data আনা (এটি মিসিং ছিল)
    client.fetch(queries.socials).then((data) => {
      setSocials(data);
    }).catch(console.error);

  }, []);

  if (loading) return <div className="min-h-screen bg-[#ffffff]"></div>;
  if (!about) return null;

  return (
    <section id="home" className={styles.heroSection}>
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center h-full">

        {/* LEFT SIDE: Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="z-10 order-2 md:order-1 flex flex-col justify-center"
        >
          <motion.p variants={fadeInUp} className={styles.greeting}>
            Hi, I am
          </motion.p>

          <motion.h1 variants={fadeInUp} className={styles.name}>
            {about.name}
          </motion.h1>

          <motion.h2 variants={fadeInUp} className={styles.headline}>
            Data Analyst & Business Intelligence Enthusiast
          </motion.h2>

          <motion.p variants={fadeInUp} className={styles.description}>
            Transforming raw data into actionable business insights using SQL, Excel, and Power BI. I help businesses make data-driven decisions.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8">
            <button
              className={styles.hireBtn}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Hire me
            </button>

            {/* ✅ Social Icons */}
            <div className={styles.socialWrapper}>
              {socials?.github && (
                <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {socials?.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
              {socials?.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Image & Background */}
        <div className="relative flex justify-center items-center order-1 md:order-2 h-[450px] md:h-[600px] w-full">

          {/* BACKGROUND CIRCLE */}
          <motion.div
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            whileInView={{ scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.heroBackground}
          ></motion.div>

          {/* Main Image */}
          <motion.div
            variants={popIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className={styles.imageWrapper}
          >
            {about.heroImage ? (
              <img
                src={urlFor(about.heroImage).width(800).url()}
                alt={about.name}
                className={styles.heroImg}
                loading="eager"        // লেজি লোড বন্ধ করে দ্রুত লোড করবে
                fetchPriority="high"   // ব্রাউজারকে বলবে এটি সবচেয়ে জরুরি ছবি
                decoding="async"
              />
            ) : (
              <div className="w-[300px] h-[400px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </motion.div>

          {/* Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`${styles.floatingCard} ${styles.card1}`}
          >
            <span className="text-2xl">📊</span>
            <span className="text-sm font-semibold text-gray-800">Certified <br /> Data Analyst</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`${styles.floatingCard} ${styles.card2}`}
          >
            <span className="text-2xl">📈</span>
            <span className="text-sm font-semibold text-gray-800">Power BI Expert</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default Hero;