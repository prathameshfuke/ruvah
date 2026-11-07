import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidEther from "./LiquidEther";

const VIDEO_PATH = "/assets/WhatsApp Video 2026-07-08 at 1.13.42 PM.mp4";
const AUTO_SKIP_MS = 5000; // Reduced from 14s to 5s for faster load
const MOBILE_BREAKPOINT = 768;

export default function VideoIntro({ onFinished }) {
  // Skip intro entirely on mobile — target clients find Ruvah via Instagram
  // on their phones, so content must appear immediately without waiting.
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT;

  const [visible, setVisible] = useState(() => !isMobile);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const dismiss = () => {
    if (fadeOut) return;
    setFadeOut(true);
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (isMobile) {
      onFinished?.();
      return;
    }
    timerRef.current = setTimeout(dismiss, AUTO_SKIP_MS);
    return () => clearTimeout(timerRef.current);
  }, [isMobile]);

  if (isMobile || !visible) return null;

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="intro-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          {/* LiquidEther Background */}
          <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
            <LiquidEther
              colors={['#750D37', '#B4DDC0', '#210124', '#D6D3EA']}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div>
          {/* Theater window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "min(720px, 80vw)",
              aspectRatio: "16/9",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <video
              ref={videoRef}
              src={VIDEO_PATH}
              autoPlay
              muted
              playsInline
              onEnded={dismiss}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Subtle vignette */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
            }} />
          </motion.div>

          {/* Skip — shows immediately (delay: 0) instead of waiting 1.4s */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.4 }}
            onClick={dismiss}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "100px",
              padding: "9px 22px",
              color: "rgba(255,255,255,0.55)",
              fontSize: "12px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.08em",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
          >
            Skip intro ↗
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="intro-fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => { setVisible(false); onFinished?.(); }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", pointerEvents: "none" }}
        />
      )}
    </AnimatePresence>
  );
}
