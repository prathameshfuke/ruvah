import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import BlurText from "../components/BlurText";
import Threads from "../components/Threads";
import ChromaGrid from "../components/ChromaGrid";
import CardSwap, { Card } from "../components/CardSwap";
import Folder from "../components/Folder";
import { FaCheck } from "react-icons/fa6";
import "./Home.mobile.css";

/* ─── Design tokens (updated to match deck's exact codes) ── */
const C = {
  burgundy: "#750D37",
  plum: "#210124",
  mint: "#E5FCF5",
  lavender: "#D6D3EA",
  lilac: "#C6B9CD",
  sage: "#B4DDC0",
  white: "#FEFFFE",
};

/* ─── TODO: Replace with your real Cal.com / Calendly link ── */
const BOOKING_URL = "https://cal.com/ruvah/discovery";

/* ─── Reusable scroll-reveal wrapper ─────────────────────── */
function Reveal({ children, delay = 0, y = 44, x = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated wave underline ─────────────────────────────── */
function BreathLine({ color = C.burgundy, onLoad = false, delay = 0 }) {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (onLoad) {
      const t = setTimeout(() => setDrawn(true), delay * 1000 + 700);
      return () => clearTimeout(t);
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setDrawn(true), delay * 1000); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onLoad, delay]);

  return (
    <div ref={ref} style={{ width: "100%", margin: "0 auto" }}>
      <svg viewBox="0 0 400 16" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "16px", overflow: "visible" }}>
        <path
          d="M0,8 C50,1 75,15 130,8 C185,1 210,15 270,8 C325,1 355,15 400,8"
          fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: "1",
            strokeDashoffset: drawn ? "0" : "1",
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
    </div>
  );
}

/* ─── Magnetic button ─────────────────────────────────────── */
function Btn({ children, href = "#", variant = "primary", style = {} }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 26 });
  const sy = useSpring(y, { stiffness: 300, damping: 26 });
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const variants = {
    primary: { background: C.burgundy, color: C.mint, border: "none" },
    outline: { background: "transparent", color: C.burgundy, border: `1.5px solid ${C.burgundy}` },
    "outline-light": { background: "transparent", color: C.mint, border: `1.5px solid rgba(229,252,245,0.35)` },
    ghost: { background: "rgba(229,252,245,0.06)", color: C.mint, border: "1.5px solid rgba(229,252,245,0.18)" },
  };

  const isExternal = href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noreferrer" : undefined}
      style={{ x: sx, y: sy, display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "12px 26px", borderRadius: "100px", fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.01em",
        cursor: "pointer", textDecoration: "none",
        ...(variants[variant] || variants.primary), ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05, boxShadow: variant === "primary" ? "0 14px 32px rgba(117,13,55,0.3)" : "none" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Eyebrow label ───────────────────────────────────────── */
function Eyebrow({ children, color = C.burgundy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: "16px" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      let isDark = false;
      ["problem", "process", "contact"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 80 && r.bottom >= 80) isDark = true; }
      });
      ["about", "services", "founders", "hero-section", "vision", "work-models", "industries", "case-study"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 80 && r.bottom >= 80) isDark = false; }
      });
      setDark(isDark);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on link click
  const handleNavClick = () => setMobileOpen(false);

  return (
    <motion.nav
      className="home-nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? (dark ? "rgba(33,1,36,0.92)" : `rgba(229,252,245,0.92)`) : (mobileOpen ? (dark ? "rgba(33,1,36,0.97)" : `rgba(229,252,245,0.97)`) : "transparent"),
        backdropFilter: (scrolled || mobileOpen) ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(117,13,55,${dark ? "0.18" : "0.07"})` : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <img
        src="/assets/ruvah_without_bg.png"
        alt="Ruvah"
        style={{
          height: "32px",
          objectFit: "contain",
          transition: "opacity 0.4s ease",
          zIndex: 101,
        }}
      />

      {/* Desktop nav links */}
      <div className="home-nav__links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["About", "Services", "Process", "Founders", "Contact"].map((l) => (
          <motion.a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
              color: dark ? "rgba(229,252,245,0.72)" : "rgba(33,1,36,0.58)", textDecoration: "none" }}
            whileHover={{ color: dark ? C.white : C.plum }}
            transition={{ duration: 0.18 }}
          >
            {l}
          </motion.a>
        ))}
        <Btn href={BOOKING_URL}>Book a Call</Btn>
      </div>

      {/* Hamburger button — mobile only */}
      <button
        className="home-nav__hamburger"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          zIndex: 101,
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <span style={{ display: "block", width: "22px", height: "2px",
          background: dark ? C.mint : C.plum,
          transition: "transform 0.3s ease, opacity 0.3s ease",
          transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
        <span style={{ display: "block", width: "22px", height: "2px",
          background: dark ? C.mint : C.plum,
          transition: "opacity 0.3s ease",
          opacity: mobileOpen ? 0 : 1 }} />
        <span style={{ display: "block", width: "22px", height: "2px",
          background: dark ? C.mint : C.plum,
          transition: "transform 0.3s ease, opacity 0.3s ease",
          transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
      </button>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="home-nav__mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: dark ? "rgba(33,1,36,0.97)" : `rgba(229,252,245,0.97)`,
              backdropFilter: "blur(24px)",
              borderBottom: `1px solid rgba(117,13,55,0.12)`,
              padding: "16px 24px 24px",
              display: "flex", flexDirection: "column", gap: "0",
            }}
          >
            {["About", "Services", "Process", "Founders", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={handleNavClick}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 500,
                  color: dark ? "rgba(229,252,245,0.82)" : "rgba(33,1,36,0.72)",
                  textDecoration: "none", padding: "14px 0",
                  borderBottom: `1px solid rgba(117,13,55,0.08)` }}
              >
                {l}
              </a>
            ))}
            <div style={{ marginTop: "20px" }}>
              <Btn href={BOOKING_URL} style={{ width: "100%", justifyContent: "center" }}>Book a Call</Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */

/* Service cards shown in the CardSwap */
const SERVICE_CARDS = [
  {
    eyebrow: "01 — Brand",
    title: "Identity that earns trust at first glance.",
    tags: ["Logo", "Visual System", "Packaging", "Publication"],
    accent: C.burgundy,
  },
  {
    eyebrow: "02 — Digital",
    title: "A website that does the selling for you.",
    tags: ["Website", "UI/UX", "SEO", "Social Media"],
    accent: C.sage,
  },
  {
    eyebrow: "03 — Tech",
    title: "Systems that work while you sleep.",
    tags: ["AI Tools", "Automation", "Full-Stack", "Booking"],
    accent: C.lavender,
  },
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const threadsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero-section"
      className="home-hero-section"
      ref={ref}
      style={{ minHeight: "100vh", background: C.mint, position: "relative", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center",
        padding: "0 56px 0 72px", paddingTop: "92px", gap: "40px" }}
    >
      {/* Threads WebGL background */}
      <motion.div
        style={{ opacity: threadsOpacity, position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <Threads
          color={[0.459, 0.051, 0.216]}
          amplitude={0.55}
          distance={0.12}
          enableMouseInteraction
        />
      </motion.div>

      {/* Left: text content */}
      <motion.div className="home-hero__text" style={{ y: contentY, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Eyebrow color={C.burgundy}>Creative × Tech Studio — Pune</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(48px, 6.5vw, 92px)", fontWeight: 800, color: C.plum,
            lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 0" }}
        >
          <BlurText text="We build brands" delay={90} animateBy="words" direction="top" />
          <br />
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: C.burgundy, display: "inline-block" }}
          >
            that think.
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6, transformOrigin: "left" }}
          style={{ margin: "24px 0", maxWidth: "340px" }}
        >
          <BreathLine color={C.burgundy} onLoad delay={0.1} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 300,
            color: C.plum, opacity: 0.7, maxWidth: "380px", lineHeight: 1.75, margin: "0 0 40px" }}
        >
          One studio where world-class design and intelligent technology are built together — from day one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          className="home-hero__cta-row"
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          <Btn href={BOOKING_URL}>Book a Discovery Call</Btn>
          <Btn variant="outline" href="#services">See What We Do</Btn>
        </motion.div>
      </motion.div>

      {/* Right: CardSwap service deck */}
      <div className="home-hero__card-wrap" style={{ position: "relative", height: "460px", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <CardSwap
            width={400}
            height={280}
            cardDistance={48}
            verticalDistance={54}
            delay={4200}
            pauseOnHover
            easing="elastic"
          >
            {SERVICE_CARDS.map((sc, i) => (
              <Card key={i} style={{ padding: "32px 30px 28px" }}>
                {/* Accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: sc.accent, borderRadius: "18px 18px 0 0" }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.16em", color: "rgba(229,252,245,0.9)", marginBottom: "14px", textTransform: "uppercase" }}>
                  {sc.eyebrow}
                </div>
                <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(20px,2.2vw,26px)",
                  fontWeight: 700, color: C.white, lineHeight: 1.2, letterSpacing: "-0.02em",
                  margin: "0 0 22px", flex: 1 }}>
                  {sc.title}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {sc.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                      fontWeight: 500, color: "rgba(229,252,245,0.9)", padding: "4px 12px",
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", 
                      borderRadius: "100px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </CardSwap>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2 }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.22em",
          textTransform: "uppercase", color: C.plum }}>scroll</span>
        <div className="scroll-pulse-line" />
      </motion.div>
    </section>
  );
}

/* ─── Problem ─────────────────────────────────────────────── */
function Problem() {
  const pts = [
    "The brand looks good but the website feels like a different company.",
    "The tech works but nobody finds it, trusts it, or wants to use it.",
    "Two agencies, two briefs, two invoices — and still no cohesion.",
  ];

  return (
    <section id="problem" className="home-section" style={{ background: C.plum, padding: "140px 56px" }}>
      <div style={{ maxWidth: "880px", margin: "0 auto" }}>
        <Eyebrow color={C.sage}>The Problem</Eyebrow>

        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(28px,4.5vw,58px)", fontWeight: 700, color: C.white,
          lineHeight: 1.22, letterSpacing: "-0.02em", margin: "0 0 72px", maxWidth: "680px" }}>
          <BlurText
            text='"Most businesses hire a designer and a developer separately — and the two never talk to each other."'
            delay={80}
            animateBy="words"
            direction="top"
          />
        </h2>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pts.map((p, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              style={{ display: "flex", alignItems: "flex-start", gap: "28px",
                padding: "28px 0", borderTop: "1px solid rgba(229,252,245,0.08)" }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600,
                color: C.burgundy, letterSpacing: "0.1em", paddingTop: "4px", minWidth: "20px", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 300,
                color: C.white, opacity: 0.82, lineHeight: 1.65, margin: 0 }}>
                {p}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="home-section" style={{ background: C.mint, padding: "140px 56px" }}>
      <div className="home-about__grid" style={{ maxWidth: "1080px", margin: "0 auto", display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(38px,5vw,68px)", fontWeight: 800, color: C.plum,
            lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
            <BlurText text="One studio." delay={90} animateBy="words" direction="top" />
            <br />
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ color: C.burgundy, display: "inline-block" }}
            >
              Design + Tech.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              style={{ display: "inline-block" }}
            >
              Built together.
            </motion.span>
          </h2>
          <Reveal delay={0.2}><BreathLine color={C.burgundy} /></Reveal>
        </div>

        <div>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", fontWeight: 300,
              color: C.plum, opacity: 0.72, lineHeight: 1.8, margin: "0 0 32px" }}>
              RUVAH is a B2B creative-tech studio based in Pune. We combine world-class design with intelligent technology — so your brand and systems speak the same language from day one.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(33,1,36,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ background: C.sage, padding: "28px 30px", borderRadius: "14px" }}
            >
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase", color: C.plum, opacity: 0.45, marginBottom: "10px" }}>
                The Name
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 400,
                color: C.plum, lineHeight: 1.7, margin: 0 }}>
                Ruvah — from Hebrew, meaning <em>breath, spirit, invisible force</em>. The force that moves things forward. That's what we are for your brand.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Vision, Mission & Values (NEW — from deck slide 8) ── */
function VisionMissionValues() {
  const cards = [
    {
      title: "Vision",
      body: "To become the most trusted creative-tech studio for growth-stage businesses in India, where every brand we touch becomes impossible to ignore.",
    },
    {
      title: "Mission",
      body: "We help ambitious businesses grow by combining purposeful design with intelligent technology — delivering brand identity, digital presence, and smart systems under one roof.",
    },
    {
      title: "Values",
      bullets: [
        "Craft over quantity — we say no to average work.",
        "Intelligence by design — tech and aesthetics are inseparable.",
        "Partnership mindset — we grow when clients grow.",
      ],
    },
  ];

  return (
    <section id="vision" className="home-section" style={{ background: C.mint, padding: "120px 56px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <Eyebrow>Our Foundation</Eyebrow>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 700, color: C.plum,
          letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 64px" }}>
          <BlurText text="Vision, Mission & Values." delay={80} animateBy="words" direction="top" />
        </h2>

        <div className="home-vmv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 44px rgba(33,1,36,0.1)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: C.lavender, borderRadius: "16px", padding: "36px 30px", minHeight: "200px" }}
              >
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "22px",
                  fontWeight: 700, color: C.burgundy, marginBottom: "16px" }}>{c.title}</h3>
                {c.body && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 400,
                    color: C.plum, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{c.body}</p>
                )}
                {c.bullets && (
                  <ul style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 400,
                    color: C.plum, opacity: 0.75, lineHeight: 1.8, margin: 0, paddingLeft: "18px" }}>
                    {c.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────────── */
const SVCS = [
  { n: "Brand", tag: "Everything visual, built with purpose.",
    desc: "Identity, logo, visual system, packaging, print, publication, social templates.",
    chips: ["Brand Identity", "Logo", "Packaging", "Publication", "Social Design"] },
  { n: "Digital", tag: "Your digital presence, done completely.",
    desc: "Website design & development, UI/UX, digital presence, social media design.",
    chips: ["Website", "UI/UX", "SEO", "Social Media", "Digital Presence"] },
  { n: "Tech Systems", tag: "Everything intelligent, built to scale.",
    desc: "AI tools, automation, full-stack development, booking systems, ML integration.",
    chips: ["AI Tools", "Automation", "Full-Stack", "Booking Systems", "ML Integration"] },
];

function SvcCard({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
      whileHover={{ y: -10, background: C.lavender, borderColor: "transparent",
        transition: { duration: 0.35, ease: "easeOut" } }}
      style={{ padding: "44px 36px 40px", background: "transparent",
        border: `1px solid rgba(33,1,36,0.1)`, borderRadius: "16px", cursor: "default" }}
    >
      <motion.h3
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(32px,3.5vw,46px)", fontWeight: 800, color: C.plum,
          lineHeight: 1, marginBottom: "8px", letterSpacing: "-0.02em" }}>
        {s.n}
      </motion.h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.burgundy,
        fontStyle: "italic", marginBottom: "18px" }}>{s.tag}</p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300,
        color: C.plum, opacity: 0.62, lineHeight: 1.65, margin: "0 0 24px" }}>{s.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {s.chips.map((c) => (
          <span key={c} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500,
            color: C.burgundy, padding: "4px 12px", border: `1px solid ${C.burgundy}`,
            borderRadius: "100px", opacity: 0.72 }}>{c}</span>
        ))}
      </div>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="home-section" style={{ background: C.mint, padding: "140px 56px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Eyebrow>What We Do</Eyebrow>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 700, color: C.plum,
            letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 auto 64px", maxWidth: "480px" }}>
            <BlurText text="Three ways we grow your business." delay={80} animateBy="words" direction="top" />
          </h2>
        </div>

        {/* ── Three clickable folders — one per service pillar ── */}
        <Reveal delay={0.1}>
          <div className="home-folders-row" style={{ display: "flex", gap: "90px", justifyContent: "center",
            alignItems: "flex-end", margin: "100px 0 80px", flexWrap: "wrap" }}>
            <Folder
              color={C.burgundy}
              size={1.5}
              label="Brand"
              sublabel="Visual identity"
              items={[
                <span key="brand-1" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  Logo · System
                </span>,
                <span key="brand-2" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  Print · Pkg
                </span>,
                <span key="brand-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  Brand Book
                </span>
              ]}
            />
            <Folder
              color="#8B6B9E"
              size={1.5}
              label="Digital"
              sublabel="Web presence"
              items={[
                <span key="dig-1" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  Web · UI
                </span>,
                <span key="dig-2" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  SEO · Data
                </span>,
                <span key="dig-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  Social
                </span>
              ]}
            />
            <Folder
              color="#3D7A5C"
              size={1.5}
              label="Tech Systems"
              sublabel="AI & automation"
              items={[
                <span key="tech-1" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  AI · Dev
                </span>,
                <span key="tech-2" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  CRM · Ops
                </span>,
                <span key="tech-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px",
                  color: C.plum, fontWeight: 600, textAlign: "center", padding: "4px", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                  Booking
                </span>
              ]}
            />
          </div>
        </Reveal>

        <div className="home-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
          {SVCS.map((s, i) => <SvcCard key={i} s={s} i={i} />)}
        </div>

        <Reveal delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="home-services-cta"
            style={{ marginTop: "72px", padding: "48px 52px", background: C.plum,
              borderRadius: "16px", display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: "36px", flexWrap: "wrap" }}
          >
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(20px,2.8vw,34px)", fontWeight: 700, color: C.white,
              lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0, maxWidth: "520px" }}>
              "The only studio where your brand and your tech stack are built in the same room."
            </p>
            <Btn href={BOOKING_URL}>Let's Talk →</Btn>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Three Ways to Work With You (NEW — from deck slide 10) */
const WORK_MODELS = [
  {
    title: "Full Studio",
    subtitle: "Brand + Digital + Tech",
    tag: "Our Best Work",
    emphasis: true,
    desc: "Everything built together — identity, website, and intelligent systems that all speak the same language. This is where RUVAH shines.",
    chips: ["Brand Identity", "UI/UX", "AI Automation", "Social Design", "Booking Systems", "Website Dev"],
  },
  {
    title: "Design Only",
    subtitle: "Just the Creative Side",
    desc: "You need brand, design, and digital communication — without the tech systems. We handle everything visual, beautifully and completely.",
    chips: ["Brand Identity", "Logo", "Packaging", "UI/UX", "Social Media", "Publication"],
  },
  {
    title: "Tech Only",
    subtitle: "Just the Intelligent Side",
    desc: "You already have a brand. You need tech — AI tools, automation, a website, or a system built for scale. We build it precisely.",
    chips: ["CRM & Booking", "AI Integration", "Automation", "ML Solutions", "Full-Stack Dev"],
  },
];

function WorkModels() {
  return (
    <section id="work-models" className="home-section" style={{ background: C.mint, padding: "120px 56px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <Eyebrow>How We Work With You</Eyebrow>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color: C.plum,
          letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 16px" }}>
          <BlurText text="You choose what you need. We deliver it completely." delay={80} animateBy="words" direction="top" />
        </h2>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 300,
            color: C.plum, opacity: 0.65, lineHeight: 1.75, margin: "0 0 56px", maxWidth: "640px" }}>
            Our strength is Design + Tech working as one — but we understand not every business needs both. We're built to serve you either way.
          </p>
        </Reveal>

        <div className="home-work-models-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {WORK_MODELS.map((m, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 44px rgba(33,1,36,0.1)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{
                  position: "relative",
                  background: m.emphasis ? C.white : C.lavender,
                  border: m.emphasis ? `2px solid ${C.burgundy}` : "2px solid transparent",
                  borderRadius: "16px",
                  padding: "36px 28px 32px",
                }}
              >
                {m.tag && (
                  <span style={{
                    position: "absolute", top: "-12px", left: "18px",
                    background: C.burgundy, color: C.mint, borderRadius: "999px",
                    padding: "3px 12px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em",
                  }}>{m.tag}</span>
                )}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600,
                  color: C.plum, opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>
                  {m.title}
                </p>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px",
                  fontWeight: 700, color: C.plum, margin: "0 0 14px" }}>{m.subtitle}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 400,
                  color: C.plum, opacity: 0.65, lineHeight: 1.65, margin: "0 0 20px" }}>{m.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {m.chips.map((c) => (
                    <span key={c} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500,
                      color: C.burgundy, padding: "3px 10px", border: `1px solid ${C.burgundy}`,
                      borderRadius: "100px", opacity: 0.72 }}>{c}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 700,
            color: C.burgundy, textAlign: "center", margin: "48px 0 0" }}>
            Whether it's brand alone, tech alone, or both — RUVAH delivers with the same depth, the same standard, and the same partnership mindset. No half-measures.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Who We Work With + "You're a Fit If" (NEW — deck slide 12) */
const INDUSTRIES = [
  "Cafes & restaurants", "Hotels & hostels", "Gyms & fitness",
  "Local fashion brands", "Student startups", "Real estate agencies",
  "Cloud kitchens", "B2C brands",
];

function WhoWeWorkWith() {
  return (
    <section id="industries" className="home-section" style={{ background: C.mint, padding: "120px 56px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <Eyebrow>Who We Work With</Eyebrow>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color: C.plum,
          letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 16px" }}>
          <BlurText text="Built for businesses that want to grow — not just look good." delay={80} animateBy="words" direction="top" />
        </h2>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 300,
            color: C.plum, opacity: 0.65, lineHeight: 1.75, margin: "0 0 56px", maxWidth: "680px" }}>
            We work best with hospitality brands, lifestyle businesses, and growth-stage startups who are serious about their identity and their systems.
          </p>
        </Reveal>

        <div className="home-who-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 18px 40px rgba(33,1,36,0.1)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ background: C.lavender, borderRadius: "16px", padding: "36px 30px" }}
            >
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px",
                fontWeight: 700, color: C.plum, margin: "0 0 18px" }}>Industries We Serve</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {INDUSTRIES.map((ind) => (
                  <span key={ind} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500,
                    color: C.plum, padding: "5px 14px", background: "rgba(33,1,36,0.06)",
                    borderRadius: "100px" }}>{ind}</span>
                ))}
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 18px 40px rgba(33,1,36,0.1)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ background: C.sage, borderRadius: "16px", padding: "36px 30px" }}
            >
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px",
                fontWeight: 700, color: C.burgundy, margin: "0 0 18px" }}>You're a Fit If</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 400,
                color: C.plum, lineHeight: 1.7, margin: 0 }}>
                You're tired of looking smaller than you are. You want brand, website, and tech — but you don't want to manage three different vendors. You're ready to invest in building something that lasts.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Restaurant Case Study (NEW — from deck slide 14) ───── */
const CASE_DELIVERABLES = [
  "Complete brand identity — logo, colors, typography, brand guidelines",
  "Menu design — print + digital QR version",
  "Website — designed, built, and live with SEO basics",
  "Instagram profile setup with 12 content templates",
  "Online reservation system integrated into the website",
  "WhatsApp automation for booking confirmations and review requests",
];

function CaseStudySection() {
  return (
    <section id="case-study" className="home-section" style={{ background: C.mint, padding: "120px 56px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <Eyebrow>Sample Project</Eyebrow>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color: C.plum,
          letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 16px" }}>
          <BlurText text="What a full Ruvah project looks like." delay={80} animateBy="words" direction="top" />
        </h2>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 300,
            color: C.plum, opacity: 0.65, lineHeight: 1.75, margin: "0 0 48px", maxWidth: "640px" }}>
            Example: a restaurant in Pune comes to us wanting to grow their dine-in and online orders.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(33,1,36,0.08)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            style={{ background: C.sage, borderRadius: "16px", padding: "40px 36px" }}
          >
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "22px",
              fontWeight: 700, color: C.plum, margin: "0 0 24px" }}>What We Deliver</h3>
            <div style={{ display: "grid", gap: "14px" }}>
              {CASE_DELIVERABLES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
                >
                  <FaCheck style={{ color: C.burgundy, marginTop: "4px", flexShrink: 0, fontSize: "14px" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 400,
                    color: C.plum, lineHeight: 1.6 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Btn href={BOOKING_URL}>Want This for Your Business? →</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Process ─────────────────────────────────────────────── */
const STEPS = [
  { l: "Discover", d: "We understand your business, your audience, your ambition. One deep conversation — no forms, no briefs." },
  { l: "Define", d: "We map what you need — brand, digital, tech, or all three. A clear scope, clear timeline, clear cost." },
  { l: "Build", d: "Design and tech work simultaneously — not one after the other. You see progress every week." },
  { l: "Launch + Support", d: "We hand over a complete, working system — and stay available for what comes next." },
];

function StepItem({ step, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.14 }}
      style={{ display: "flex", gap: "28px", alignItems: "flex-start", paddingBottom: "52px" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.14 + 0.18 }}
        style={{ flexShrink: 0, width: "34px", height: "34px", borderRadius: "50%",
          border: `2px solid ${C.burgundy}`, background: "rgba(117,13,55,0.16)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}
      >
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.burgundy }} />
      </motion.div>
      <div style={{ paddingTop: "4px" }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "25px",
          fontWeight: 700, color: C.white, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
          {step.l}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 300,
          color: C.white, opacity: 0.62, lineHeight: 1.65, margin: 0 }}>{step.d}</p>
      </div>
    </motion.div>
  );
}

function Process() {
  return (
    <section id="process" className="home-section" style={{ background: C.plum, padding: "140px 56px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
        <Eyebrow color={C.sage}>How It Works</Eyebrow>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color: C.white,
          letterSpacing: "-0.025em", lineHeight: 1.12, margin: "0 0 80px" }}>
          <BlurText text="From first call to fully running — in four steps." delay={80} animateBy="words" direction="top" />
        </h2>
        <div style={{ position: "absolute", left: "16px", top: "240px", bottom: "80px",
          width: "1px", background: "linear-gradient(to bottom, rgba(117,13,55,0.7), transparent)" }} />
        {STEPS.map((s, i) => <StepItem key={i} step={s} i={i} />)}
      </div>
    </section>
  );
}

/* ─── Founders ────────────────────────────────────────────── */
const FOUNDER_ITEMS = [
  {
    image: "/assets/kashish.png",
    title: "Kashish",
    subtitle: "Design Partner",
    handle: "@kashishoswal",
    borderColor: C.burgundy,
    gradient: `linear-gradient(160deg, rgba(117,13,55,0.85) 0%, ${C.plum} 100%)`,
    url: "https://kashishoswal.netlify.app/",
    description: "Brand identity, packaging, UI/UX, publication, social media, digital communication, menus, brochures, website design. Everything visual, built with purpose.",
  },
  {
    image: "/assets/prathamesh.png",
    title: "Prathamesh",
    subtitle: "Tech Partner",
    handle: "@prathameshfuke",
    borderColor: C.sage,
    gradient: `linear-gradient(160deg, rgba(33,1,36,0.9) 0%, rgba(33,1,36,0.98) 100%)`,
    url: "https://prathameshfukeresume.netlify.app/",
    description: "AI engineering, machine learning, full-stack development, software architecture, automation systems, booking & CRM integrations. Everything intelligent, built to scale.",
  },
];

function Founders() {
  return (
    <section id="founders" className="home-section" style={{ background: C.mint, padding: "140px 56px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <Eyebrow>The Two Founders</Eyebrow>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(40px,5.5vw,78px)", fontWeight: 800, color: C.plum,
          letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 20px" }}>
          <BlurText text="Two people. Two disciplines. One output." delay={70} animateBy="words" direction="top" />
        </h2>
        <Reveal delay={0.2}>
          <div style={{ margin: "24px 0 56px" }}><BreathLine color={C.burgundy} /></div>
        </Reveal>

        {/* ChromaGrid */}
        <Reveal delay={0.1}>
          <div className="home-founders-chroma" style={{ minHeight: "560px", height: "auto", position: "relative" }}>
            <ChromaGrid
              items={FOUNDER_ITEMS}
              columns={2}
              rows={1}
              radius={340}
              damping={0.42}
              fadeOut={0.55}
            />
          </div>
        </Reveal>

        {/* Founder descriptions — added per deck content */}
        <Reveal delay={0.2}>
          <div className="home-founders-desc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "40px" }}>
            {FOUNDER_ITEMS.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(33,1,36,0.08)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: C.lilac, borderRadius: "14px", padding: "28px 24px" }}
              >
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700,
                  color: C.burgundy, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>
                  {f.subtitle}
                </p>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px",
                  fontWeight: 700, color: C.plum, margin: "0 0 12px" }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 400,
                  color: C.plum, opacity: 0.72, lineHeight: 1.7, margin: 0 }}>
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: C.plum,
            opacity: 0.38, textAlign: "center", margin: "32px 0 0", fontStyle: "italic" }}>
            Two disciplines. One studio. Built to think.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────── */
function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.1, 1.4]);

  return (
    <section id="contact" ref={ref}
      className="home-section home-contact-section"
      style={{ background: C.plum, padding: "160px 56px", textAlign: "center",
        position: "relative", overflow: "hidden" }}>
      {/* Parallax glow */}
      <motion.div
        style={{ scale: glowScale, position: "absolute", width: "600px", height: "600px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(117,13,55,0.28) 0%, transparent 65%)",
          top: "50%", left: "50%", x: "-50%", y: "-50%", pointerEvents: "none" }}
      />

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative" }}>
        <Eyebrow color={C.sage}>Get In Touch</Eyebrow>

        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(44px,7vw,88px)", fontWeight: 800, color: C.white,
          letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 24px" }}>
          <BlurText text="Let's build something" delay={80} animateBy="words" direction="top" />
          <br />
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ color: C.sage, display: "inline-block" }}
          >
            that thinks.
          </motion.span>
        </h2>

        <Reveal delay={0.24}>
          <div style={{ margin: "0 auto 32px", maxWidth: "260px" }}>
            <BreathLine color={C.sage} />
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 300,
            color: C.white, opacity: 0.6, lineHeight: 1.75, margin: "0 auto 48px", maxWidth: "380px" }}>
            No commitment, no brief needed — just a conversation about your business and what you want to build.
          </p>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="home-contact__cta-row" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
            <Btn href={BOOKING_URL}>Book a Discovery Call</Btn>
            <Btn variant="ghost" href="mailto:ruvah.work@outlook.com">ruvah.work@outlook.com</Btn>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: C.white,
            opacity: 0.32, letterSpacing: "0.08em" }}>
            Based in Pune, India. Working with clients everywhere.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────── */
function SiteFooter() {
  return (
    <footer className="home-footer" style={{ background: C.plum, borderTop: "1px solid rgba(229,252,245,0.05)",
      padding: "28px 56px", display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
      <img src="/assets/ruvah_without_bg.png" alt="Ruvah"
        style={{ height: "26px", objectFit: "contain", opacity: 0.28 }} />
      <div className="home-footer__links" style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {["About", "Services", "Process", "Founders", "Contact"].map((l) => (
          <motion.a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              color: "rgba(229,252,245,0.38)", textDecoration: "none" }}
            whileHover={{ color: "rgba(229,252,245,0.72)" }}
            transition={{ duration: 0.2 }}
          >
            {l}
          </motion.a>
        ))}
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(229,252,245,0.22)" }}>
        © {new Date().getFullYear()} Ruvah. Brands that think.
      </span>
    </footer>
  );
}

/* ─── Root export ─────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <About />
      <VisionMissionValues />
      <Services />
      <WorkModels />
      <WhoWeWorkWith />
      <CaseStudySection />
      <Process />
      <Founders />
      <Contact />
      <SiteFooter />
    </>
  );
}
