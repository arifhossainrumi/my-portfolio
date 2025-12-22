import { useEffect, useState } from 'react';
import { client, queries } from '../../lib/sanityClient'; // ✅ Sanity Client Import
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.scss';

function Footer() {
  const [socials, setSocials] = useState(null);

  // ✅ Sanity থেকে সোশ্যাল ডাটা ফেচ করা
  useEffect(() => {
    client.fetch(queries.socials)
      .then((data) => {
        setSocials(data);
      })
      .catch((err) => console.error("Footer Error:", err));
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container mx-auto px-6">
        <div className={styles.content}>

          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h3 className={styles.logoname}>
              Arif<span className="text-blue-600">.</span>
            </h3>
          </div>

          {/* Copyright Text */}
          <p className={styles.copyright}>
            © {currentYear} Md. Arif Hossain Rumi. All rights reserved.
          </p>

          {/* ✅ Dynamic Social Icons */}
          <div className={styles.socials}>
            {socials?.github && (
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="Github">
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
            {socials?.facebook && (
              <a href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
            )}
            {socials?.twitter && (
              <a href={socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;