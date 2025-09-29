"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "next-themes"; // ✅ Add this

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [mood, setMood] = useState("Inspirational"); // default mood
  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}

// 🎨 Shared Animated Background Component
export function MoodBackground() {
  const { mood } = useMood();
  const { theme } = useTheme(); // ✅ light / dark

  // 🌈 Scroll-based gradient shift
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const backgroundShift = useTransform(scrollY, [0, 300], ["0deg", "180deg"]);

  // 🎨 Mood gradients with theme variants
  const gradients = {
    Motivational: {
      light: "linear-gradient(135deg, #1e3c72, #2a5298, #000428)",
      dark: "linear-gradient(135deg, #0a192f, #112240, #000428)",
    },
    Sad: {
      light: "linear-gradient(135deg, #29636D, #4DA4B3, #29636D)",
      dark: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    },
    Funny: {
      light: "linear-gradient(135deg, #62296D, #AA71BD, #50345B)",
      dark: "linear-gradient(135deg, #2b1331, #502f5f, #1a0d1f)",
    },
    Mystic: {
      light: "linear-gradient(135deg, #2c003e, #240046, #5a189a)",
      dark: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    },
    Philosophy: {
      light: "linear-gradient(135deg, #733B76, #8D6BA1, #894697)",
      dark: "linear-gradient(135deg, #2c003e, #240046, #5a189a)",
    },
    Epic: {
      light: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      dark: "linear-gradient(135deg, #1f1c2c, #928dab, #000000)",
    },
    Romantic: {
      light: "linear-gradient(135deg, #EE2727, #831A1A, #E54242)",
      dark: "linear-gradient(135deg, #3a0d0d, #8a1f1f, #e63946)",
    },
    Inspirational: {
      light: "linear-gradient(135deg, #25A5A9, #216D72, #4B8E93)",
      dark: "linear-gradient(135deg, #0d3b3b, #1c6060, #2d7373)",
    },
    default: {
      light: "linear-gradient(135deg, #270031, #3d0153, #4e0273)",
      dark: "linear-gradient(135deg, #0d0d0d, #1a1a1a, #262626)",
    },
  };

  const activeGradient =
    gradients[mood]?.[theme] || gradients.default[theme || "light"];

  return (
    <div className="fixed inset-0 -z-20 w-full min-h-screen">
      {/* 🌌 Gradient Background */}
      <motion.div
        className="absolute inset-0 w-full min-h-screen"
        style={{
         backgroundImage: activeGradient, 
          backgroundSize: "400% 400%",
          backgroundPosition: "center",
          rotate: backgroundShift,
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      {/* 🟣 Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-overlay blur-3xl"
          style={{
            background:
              i % 2 === 0
                ? "rgba(255,0,150,0.35)"
                : "rgba(0,200,255,0.35)",
            width: `${180 + Math.random() * 200}px`,
            height: `${180 + Math.random() * 200}px`,
            top: `${Math.random() * 200 + 50}px`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, i % 2 === 0 ? 40 : -40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12 + Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🎀 Gradient Ribbons */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[400px] h-[80px] rounded-full blur-2xl opacity-30"
          style={{
            background:
              i % 2 === 0
                ? "linear-gradient(90deg, #ff6ec7, #7873f5)"
                : "linear-gradient(90deg, #43cea2, #185a9d)",
            top: `${100 + i * 300}px`,
            left: `${10 + i * 20}%`,
            rotate: `${i * 30}deg`,
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, i % 2 === 0 ? 40 : -40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15 + i * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
