import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import { client, queries } from '../../lib/sanityClient'; // ✅ Sanity Client ইমপোর্ট
import styles from './Contact.module.scss';
import Footer from '../Footer/Footer';

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
    }
  }
};

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false); // Email sending loading
  const [status, setStatus] = useState(null);
  const [contactInfo, setContactInfo] = useState(null); // ✅ Sanity Data State

  // ✅ Sanity থেকে ডাটা ফেচ করা
  useEffect(() => {
    client.fetch(queries.about).then((data) => {
      setContactInfo(data);
    }).catch(console.error);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // 👇 আপনার EmailJS ক্রেডেনশিয়াল
    const SERVICE_ID = "service_tkvfo9a";
    const TEMPLATE_ID = "template_ugi2ubw";
    const PUBLIC_KEY = "13yoI0OPH1JZfHe2c";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setLoading(false);
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(null), 5000);
      }, (error) => {
        console.log(error.text);
        setLoading(false);
        setStatus('error');
      });
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container mx-auto px-6">

        {/* Header Animation */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2>Get In <span className="text-blue-600">Touch</span></h2>
          <p>Have a project in mind or want to say hi? Feel free to send a message.</p>
        </motion.div>

        <div className={styles.contentWrapper}>

          {/* Left Side Info (Dynamic Data) */}
          <motion.div
            className={styles.contactInfo}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Phone Card */}
            <motion.div className={styles.infoCard} variants={fadeInUp}>
              <div className={styles.iconBox}><FaPhoneAlt /></div>
              <div>
                <h4>Phone</h4>
                {/* ✅ ডাইনামিক ফোন নম্বর */}
                <p>{contactInfo?.phone || '+880 1XXX-XXXXXX'}</p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div className={styles.infoCard} variants={fadeInUp}>
              <div className={styles.iconBox}><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                {/* ✅ ডাইনামিক ইমেইল */}
                <p>{contactInfo?.email || 'loading...'}</p>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div className={styles.infoCard} variants={fadeInUp}>
              <div className={styles.iconBox}><FaMapMarkerAlt /></div>
              <div>
                <h4>Location</h4>
                {/* ✅ ডাইনামিক লোকেশন / এড্রেস */}
                <p>{contactInfo?.address || 'Dhaka, Bangladesh'}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            className={styles.formWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            <form ref={form} onSubmit={sendEmail}>
              <div className={styles.inputGroup}>
                <input type="text" name="user_name" placeholder="Your Name" required />
              </div>

              <div className={styles.inputGroup}>
                <input type="email" name="user_email" placeholder="Your Email" required />
              </div>

              <div className={styles.inputGroup}>
                <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
              </div>

              <motion.button
                type="submit"
                className={styles.sendBtn}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Sending...' : (
                  <>Send Message <FaPaperPlane /></>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 mt-3 font-semibold"
                >
                  Message sent successfully! ✅
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 mt-3 font-semibold"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </section>
  );
}

export default Contact;