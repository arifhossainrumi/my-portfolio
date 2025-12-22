import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import clsx from 'clsx';
import styles from './Navbar.module.scss';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // ✅ ১. একটিভ লিংক ট্র্যাক করার জন্য স্টেট (এটাই ফিক্স)
  const [activeLink, setActiveLink] = useState('/');

  const location = useLocation();
  const navigate = useNavigate();

  // পেজ লোড হলে URL দেখে একটিভ লিংক সেট করা
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  // পেজ রিফ্রেশ বা ডাইরেক্ট লিংকে হ্যান্ডেল করার লজিক
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const pathId = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
    setTimeout(() => {
      const element = document.getElementById(pathId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // যদি এলিমেন্ট না পায় (যেমন হোম পেজে), তবে টপে স্ক্রল করবে
        window.scrollTo(0, 0);
      }
    }, 100);
  }, []);

  // ✅ ২. আপডেটেড নেভিগেশন হ্যান্ডলার
  const handleNavigation = (id) => {
    setIsOpen(false);

    // টার্গেট পাথ বানানো
    const newPath = id === 'home' ? '/' : `/${id}`;

    // A. সাথে সাথে স্টেট আপডেট (যাতে কালার চেঞ্জ হয়)
    setActiveLink(newPath);

    // B. URL আপডেট (যাতে ব্রাউজারে দেখা যায়)
    window.history.pushState(null, '', newPath);

    // C. স্ক্রল লজিক
    const elementId = id === 'home' ? 'home' : id;
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // যদি এলিমেন্ট না পায় (যেমন অন্য পেজে থাকলে), তখন navigate করবে
      navigate(newPath);
    }
  };

  return (
    <>
      <nav className={clsx(styles.navbar, scrolled && styles.scrolled)}>
        <div className={styles.container}>

          <a
            href="/"
            className={styles.logo}
            aria-label="Reload and go to home"
            style={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            Arif<span className={styles.dot}>.</span>
          </a>

          <div className={styles.desktopMenu}>
            <ul className={styles.navLinks}>
              {navItems.map((item) => {
                const itemPath = item.id === 'home' ? '/' : `/${item.id}`;
                return (
                  <li key={item.label}>
                    <span
                      onClick={() => handleNavigation(item.id)}
                      className={
                        // ✅ ৩. এখন আমরা স্টেট চেক করছি (location.pathname এর বদলে)
                        activeLink === itemPath
                          ? styles.active
                          : styles.navItem
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <button
              className={styles.ctaBtn}
              onClick={() => handleNavigation('contact')}
            >
              Let's Talk
            </button>
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsOpen(true)}
          >
            <HiMenuAlt3 size={28} />
          </button>
        </div>
      </nav>

      <div
        className={clsx(styles.backdrop, isOpen && styles.open)}
        onClick={() => setIsOpen(false)}
      />

      <div className={clsx(styles.drawer, isOpen && styles.open)}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerLogo}>Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <HiX size={28} />
          </button>
        </div>

        <div className={styles.drawerLinks}>
          {navItems.map((item) => {
            const itemPath = item.id === 'home' ? '/' : `/${item.id}`;
            return (
              <span
                key={item.label}
                onClick={() => handleNavigation(item.id)}
                className={activeLink === itemPath ? styles.active : ''}
                style={{ display: 'block', padding: '10px 0', cursor: 'pointer' }}
              >
                {item.label}
              </span>
            );
          })}
          <button
            className={styles.mobileCtaBtn}
            onClick={() => handleNavigation('contact')}
          >
            Let's Talk
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;