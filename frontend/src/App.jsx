import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
// ✅ ১. Vercel Analytics ইম্পোর্ট করা হলো
import { Analytics } from '@vercel/analytics/react';

// Components
import Navbar from './components/Navbar/Navbar';
import Hero from "./components/Hero";
import About from './components/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import Contact from './components/Contact/Contact';
import Preloader from './components/Preloader/Preloader';
import Certifications from './components/Certifications/Certifications';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
};

// Smart Scroll Handler: Manages smooth scrolling and back-button navigation
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Helper function to scroll to specific element ID
    const smoothScrollTo = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Logic 1: Handle Hash Navigation (Navbar Clicks / Browser Back Button)
    if (hash) {
      const id = hash.replace('#', '');

      // A. Instantly clean the URL (Remove hash for cleaner look)
      window.history.replaceState(null, '', `/${id}`);

      // B. Staggered Scroll Approach: Triggers scroll multiple times to handle layout shifts

      // Attempt 1: Immediate scroll for fast response
      smoothScrollTo(id);

      // Attempt 2: 500ms delay to account for minor rendering delays
      setTimeout(() => smoothScrollTo(id), 500);

      // Attempt 3: 1.2s delay (Crucial for correct positioning after images/content fully load)
      setTimeout(() => smoothScrollTo(id), 1200);
    }

    // Logic 2: Handle Direct URL Access (e.g., user types /blog directly)
    else if (pathname !== '/' && !hash) {
      const id = pathname.replace('/', '');

      // Skip scrolling for standalone pages like Certifications or Blog Details
      if (id !== 'certifications' && !id.startsWith('blog/')) {
        setTimeout(() => smoothScrollTo(id), 500);
        setTimeout(() => smoothScrollTo(id), 1200); // Backup scroll
      }
    }

    // Logic 3: Handle Root Path
    else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure page starts at the top on reload
    if (window.location.hash === '') {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollToAnchor />
          <Navbar />

          <main>
            <Routes>
              {/* Main Home Layout */}
              <Route path="/" element={<Home />} />

              {/* Virtual Routes for Clean URL Navigation (Simulating Anchors) */}
              <Route path="/about" element={<Home />} />
              <Route path="/skills" element={<Home />} />
              <Route path="/projects" element={<Home />} />
              <Route path="/blog" element={<Home />} />
              <Route path="/contact" element={<Home />} />

              {/* Standalone Pages */}
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </main>

          {/* ✅ ২. Analytics কম্পোনেন্ট এখানে যুক্ত করা হলো */}
          <Analytics />
        </>
      )}
    </>
  );
}

export default App;