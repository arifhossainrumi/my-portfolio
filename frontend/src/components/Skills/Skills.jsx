import React, { useState, useEffect } from 'react'; // ✅ Hooks ইমপোর্ট
import { motion } from 'framer-motion';
import { client, queries } from '../../lib/sanityClient'; // ✅ Sanity Client ইমপোর্ট

import {
  FaDatabase,
  FaChartPie,
  FaCode,
  FaTools,
  FaFileExcel,
  FaChartBar,
  FaPython,
  FaChartLine,
  FaDownload
} from 'react-icons/fa';
import styles from './Skills.module.scss';

const skillCategories = [
  {
    title: "Data Analysis & Programming",
    icon: <FaCode />,
    skills: ["Python (Pandas, NumPy)", "Advanced SQL", "R Language", "Statistical Analysis", "Data Cleaning", "Excel (VBA & Macros)"]
  },
  {
    title: "Data Visualization & BI",
    icon: <FaChartPie />,
    skills: ["Power BI (DAX)", "Tableau", "Google Data Studio", "Storytelling with Data", "Interactive Dashboards", "Matplotlib / Seaborn"]
  },
  {
    title: "Database & Engineering",
    icon: <FaDatabase />,
    skills: ["MySQL", "PostgreSQL", "Google BigQuery", "ETL Pipelines", "Data Warehousing", "Database Management"]
  }
];

const Skills = () => {
  // ✅ Sanity থেকে রিজিউমি আনার জন্য স্টেট
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    // About কুয়েরি থেকে রিজিউমি ফেচ করা হচ্ছে
    client.fetch(queries.about).then((data) => {
      if (data && data.resume) {
        setResumeUrl(data.resume);
      }
    }).catch(console.error);
  }, []);

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800"
          >
            My Technical <span className="text-blue-600">Proficiency</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 mt-4 max-w-2xl mx-auto"
          >
            A comprehensive toolkit that empowers me to uncover hidden patterns and drive business growth through data.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">

          {/* LEFT SIDE: Skill Categories & Resume Button */}
          <div className="lg:col-span-3 flex flex-col gap-8">

            {/* Skill Cards */}
            <div className="grid gap-8">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={styles.skillCard}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                  </div>

                  <ul className={styles.skillList}>
                    {category.skills.map((skill, idx) => (
                      <li key={idx}>
                        <FaTools className="text-yellow-500 text-xs mt-1" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* ✅ Resume Button (Sanity Connected) */}
            {resumeUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <a
                  href={resumeUrl} // ✅ ডাইনামিক ইউআরএল Sanity থেকে আসছে
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeBtn}
                >
                  <FaDownload className="mr-2" /> Download My Resume
                </a>
              </motion.div>
            )}

          </div>

          {/* RIGHT SIDE: Glassmorphism Visuals */}
          <div className="lg:col-span-2 relative flex justify-center mt-8 lg:mt-0 lg:sticky lg:top-24">

            {/* Background Blobs */}
            <div className={styles.blobBlue}></div>
            <div className={styles.blobYellow}></div>

            {/* Glass Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={styles.visualCard}
            >
              <div className={styles.glassEffect}>
                <FaChartBar className="text-9xl text-yellow-500 opacity-20 absolute top-10 right-10" />
                <FaDatabase className="text-8xl text-blue-500 opacity-20 absolute bottom-10 left-10" />

                <div className="relative z-10 text-center">
                  <h3 className="text-6xl font-bold text-gray-800">15+</h3>
                  <p className="text-gray-500 font-medium">Datasets Analyzed</p>
                </div>
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className={`${styles.floatIcon} ${styles.icon1}`}
              >
                <FaFileExcel size={28} color="#1D6F42" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className={`${styles.floatIcon} ${styles.icon2}`}
              >
                <FaChartPie size={28} color="#F2C811" />
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className={`${styles.floatIcon} ${styles.icon3}`}
              >
                <FaDatabase size={32} color="#00758F" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className={`${styles.floatIcon} ${styles.icon4}`}
              >
                <FaPython size={32} color="#306998" />
              </motion.div>

              <motion.div
                animate={{ x: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
                className={`${styles.floatIcon} ${styles.icon5}`}
              >
                <FaChartLine size={28} color="#E84393" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;