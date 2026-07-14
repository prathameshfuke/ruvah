import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Process from './pages/Process'
import Industries from './pages/Industries'
import CaseStudy from './pages/CaseStudy'
import WhyRuvah from './pages/WhyRuvah'
import Contact from './pages/Contact'
import Founders from './pages/Founders'
import Portfolio from './pages/Portfolio'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import VideoIntro from './components/VideoIntro'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function AppShell() {
  const location = useLocation()
  const { pathname } = location
  const isHome = pathname === '/'
  const darkNavbar = pathname === '/process' || pathname === '/why-ruvah'

  return (
    <>
      <ScrollToTop />
      {!isHome && <Navbar dark={darkNavbar} />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/process" element={<PageTransition><Process /></PageTransition>} />
            <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
            <Route path="/case-study" element={<PageTransition><CaseStudy /></PageTransition>} />
            <Route path="/why-ruvah" element={<PageTransition><WhyRuvah /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/founders" element={<PageTransition><Founders /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </>
  )
}

function App() {
  const [introFinished, setIntroFinished] = useState(false)

  // Lock scroll while intro is playing so the hidden page
  // content cannot be scrolled (which would cause a jump when
  // the intro fades out and the page becomes visible).
  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = 'hidden'
    } else {
      // Snap to top BEFORE the fade-in starts so the user
      // always sees the hero, never the bottom of the page.
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [introFinished])

  return (
    <Router>
      {/* Cinema intro overlay */}
      <VideoIntro onFinished={() => setIntroFinished(true)} />

      {/*
        Main content sits beneath the intro.
        It starts invisible and fades in exactly as the intro's
        black overlay fades out — creating a smooth crossfade.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introFinished ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'opacity' }}
      >
        <AppShell />
      </motion.div>
    </Router>
  )
}

export default App
