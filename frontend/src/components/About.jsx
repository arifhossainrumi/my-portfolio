import { useEffect, useState } from 'react';
import { client, queries, urlFor } from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaChartLine, FaDatabase } from 'react-icons/fa';
import styles from './About.module.scss';
import { Link } from 'react-router-dom';
import { FaCertificate } from 'react-icons/fa';

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(queries.about).then((data) => {
      setAbout(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return null;
  if (!about) return null;

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.bgPattern}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ✅ LEFT SIDE: Image (Left to Right Animation) */}
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, x: -50 }} // বাম পাশে অদৃশ্য থাকবে
            whileInView={{ opacity: 1, x: 0 }} // স্ক্রলে আসলে দৃশ্যমান হবে
            transition={{ duration: 0.8 }}
            viewport={{ once: false }} // 🔄 বারবার এনিমেশন হবে
          >
            {about.profileImage && (
              <img
                src={urlFor(about.profileImage).width(600).url()}
                alt={about.name || "Profile"}
                className={styles.profileImg}
              />
            )}

            {/* Floating Badge (Fade Up Animation) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: false }}
              className={styles.floatingBadgeWrapper} // CSS ক্লাস ব্যবহার করা ভালো
            >
              <div className={styles.floatingBadge}>
                <div className={styles.badgeIconBox}>
                  <FaChartLine className={styles.icon} />
                </div>
                <div>
                  <span>Data Analyst</span>
                  <span>Business Intelligence</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ✅ RIGHT SIDE: Content (Right to Left Animation) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} // ডান পাশে থাকবে
            whileInView={{ opacity: 1, x: 0 }} // আসল জায়গায় আসবে
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            {/* Header with Line */}
            <div className={styles.sectionHeader}>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "40px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
                className={styles.animatedLine}
              ></motion.span>

              <h4 className="text-blue-600 font-bold uppercase tracking-wide">
                Who I Am
              </h4>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              About <span className="text-blue-600">Me</span>
            </h2>

            <div className={styles.description}>
              <PortableText value={about.bio} />
            </div>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link to="/certifications" className={styles.certBtn}>
                View My Certifications <FaCertificate />
              </Link>
            </div>

            {/* ✅ Info Grid (Staggered Effect - একটার পর একটা আসবে) */}
            <div className={styles.infoGrid}>
              {[
                { icon: <FaUser />, label: "Name", value: about.name },
                { icon: <FaDatabase />, label: "Role", value: about.role },
                { icon: <FaMapMarkerAlt />, label: "Location", value: about.address || "Dhaka, BD" },
                { icon: <FaEnvelope />, label: "Email", value: about.email || "email@example.com" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.infoItem}
                  initial={{ opacity: 0, y: 20 }} // নিচে থাকবে
                  whileInView={{ opacity: 1, y: 0 }} // উপরে উঠে আসবে
                  transition={{ duration: 0.5, delay: index * 0.1 }} // একটু দেরি করে আসবে
                  viewport={{ once: false }}
                >
                  <div className={styles.iconBox}>{item.icon}</div>
                  <div>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.value}>{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;