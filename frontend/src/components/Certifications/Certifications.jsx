import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { client, queries, urlFor } from '../../lib/sanityClient'; // path ঠিক আছে কিনা দেখে নেবেন
import styles from './Certifications.module.scss';

function Certifications() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Sanity থেকে ডাটা আনা
        client.fetch(queries.certifications).then((data) => {
            setCerts(data);
            setLoading(false);
        }).catch(console.error);
    }, []);

    // পেজ লোড হলে একদম উপরে নিয়ে যাবে
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={styles.certPage}>
            <div className="container mx-auto px-6 py-20">

                {/* Back Button */}
                <div className="mb-12">
                    <Link
                        to="/#about"
                        className={styles.backBtn}
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back</span>
                    </Link>
                </div>

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        My <span className="text-blue-600">Certifications</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A showcase of my professional achievements and continuous learning journey.
                    </p>
                </motion.div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="flex justify-center h-40 items-center">Loading...</div>
                ) : (
                    /* Grid Layout */
                    <div className={styles.gridContainer}>
                        {certs.map((cert, index) => (
                            <motion.div
                                key={cert._id}
                                className={styles.certCard}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={styles.imageWrapper}>
                                    {cert.image && (
                                        <img src={urlFor(cert.image).width(400).url()} alt={cert.title} />
                                    )}
                                </div>

                                <div className={styles.content}>
                                    <h3>{cert.title}</h3>
                                    <p className={styles.provider}>{cert.provider}</p>
                                    <p className={styles.date}>{new Date(cert.issuedDate).toLocaleDateString()}</p>

                                    {cert.credentialLink && (
                                        <a href={cert.credentialLink} target="_blank" rel="noreferrer" className={styles.verifyBtn}>
                                            Verify Credential <FaExternalLinkAlt size={12} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Certifications;