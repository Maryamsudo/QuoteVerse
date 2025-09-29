"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaDice, FaHeart } from "react-icons/fa"; // 🎲 + ❤️ icons
import Navbar from "./Navbar"; // ⬅️ make sure path matches
import { MoodBackground, useMood } from "../MoodContext";
import { useTheme } from "next-themes"; // ✅ import theme hook


const quotes = [
  { text: "Be like a tree and let the dead leaves drop.", author: "Rumi", mood: "Inspirational" },
  { text: "Try to accept the changing seasons of your heart...", author: "Shams", mood: "Mystic" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle", mood: "Philosophy" },
  { text: "The brave may not live forever, but the cautious do not live at all.", author: "Richard Branson", mood: "Epic" },
  { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss", mood: "Romantic" },
  { text: "When you see a man seeking faults in others, remind him of his own.", author: "Jalaluddin Suyuti", mood: "Motivational" },
  { text: "If you want to change the way others treat you, you should first change the way you treat yourself.", author: "Shams Tabrizi", mood: "Sad" },
  { text: "I told my wife she should embrace her mistakes. She hugged me.", author: "Unknown", mood: "Funny" },
  { text: "The most complete gift of God is a life based on knowledge.", author: "Hazrat Ali (RA)", mood: "Mystic" },
  { text: "Nations are born in the hearts of poets, they prosper and die in the hands of politicians.", author: "Allama Iqbal", mood: "Philosophy" },

  
];
const moodColors = {
  Motivational: "bg-gradient-to-r from-blue-500 to-blue-500",
  Sad: "bg-gradient-to-r from-blue-300 to-blue-300",
  Funny: "bg-gradient-to-r from-pink-400 to-yellow-400",
  Mystic: "bg-gradient-to-r from-purple-800 to-indigo-900",
  Philosophy: "bg-gradient-to-r from-[#733B76] to-[#894697]",
  Epic: "bg-gradient-to-r from-gray-900 to-indigo-900",
  Romantic: "bg-gradient-to-r from-red-600 to-red-700",
  Inspirational: "bg-gradient-to-r from-teal-400 to-cyan-600",
};
export default function QuotesHero() {
  const [current, setCurrent] = useState(0);
  const [flip, setFlip] = useState(false);
// inside your component
const { mood, setMood } = useMood();
const { text, author, mood: quoteMood } = quotes[current];
  const { theme } = useTheme(); // ✅ light / dark
  // 🎲 Shuffle / Next Quote
// 🎲 Shuffle / Next Quote
const nextQuote = () => {
  setFlip(true);
  setTimeout(() => {
    setCurrent((prev) => {
      const nextIndex = (prev + 1) % quotes.length;
      setMood(quotes[nextIndex].mood); // ✅ now updates mood properly
      return nextIndex;
    });
    setFlip(false);
  }, 600);
};

  // 🌈 Scroll-based gradient animation
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);
  const backgroundShift = useTransform(scrollY, [0, 300], ["0deg", "180deg"]);

  // 🎴 3D Tilt Effect (card follows cursor)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    tiltX.set(x);
    tiltY.set(y);
  };

  return (
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-1000">
      {/* 🔮 Navbar + MoodBackground */}
      <Navbar mood={mood} />
      <MoodBackground />
      {/* 🟣 Floating Parallax Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-overlay blur-3xl"
          style={{
            background: i % 2 === 0 ? "rgba(255,0,150,0.35)" : "rgba(0,200,255,0.35)",
            width: `${180 + Math.random() * 200}px`,
            height: `${180 + Math.random() * 200}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{ y: [0, 50, 0], x: [0, i % 2 === 0 ? 40 : -40, 0] }}
          transition={{ repeat: Infinity, duration: 12 + Math.random() * 8, ease: "easeInOut" }}
        />
      ))}

      {/* 🎀 Gradient Ribbons */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[400px] h-[80px] rounded-full blur-2xl opacity-30"
          style={{
            background: i % 2 === 0 ? "linear-gradient(90deg, #ff6ec7, #7873f5)" : "linear-gradient(90deg, #43cea2, #185a9d)",
            top: `${20 + i * 25}%`,
            left: `${10 + i * 20}%`,
            rotate: `${i * 30}deg`,
          }}
          animate={{ x: [0, 60, 0], y: [0, i % 2 === 0 ? 40 : -40, 0] }}
          transition={{ repeat: Infinity, duration: 15 + i * 5, ease: "easeInOut" }}
        />
      ))}

      {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Daily Inspiration
            </h1>
            <p className="text-lg text-white/100 max-w-md mx-auto">
              Discover powerful quotes that resonate with your mood and inspire your journey
            </p>
          </motion.div>
      {/* 🎴 Quote Card with Flip + Tilt */}
      <motion.div
        className="relative w-[500px] min-h-[220px] cursor-pointer perspective z-10"
        onClick={nextQuote}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="absolute w-full h-full rounded-2xl shadow-2xl glass-card p-8 flex flex-col justify-center items-center text-center"
          animate={{ rotateY: flip ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mood Tag */}
<div
  className={`absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full shadow ${moodColors[mood] || "bg-gray-500"}`}
>
  {mood}
</div>

          {/* Heart Icon */}
          <button className="absolute top-4 right-4 text-pink-400 hover:text-pink-600">
            <FaHeart size={20} />
          </button>

          {/* Quote Text */}
          <p className="text-xl font-medium  text-white leading-relaxed">"{text}"</p>
          <span className="mt-4 text-sm  text-white opacity-80">— {author}</span>
        </motion.div>
      </motion.div>

      {/* 🎲 Shuffle Dice Button */}
      <motion.button
        onClick={nextQuote}
        whileHover={{ scale: 1.2, boxShadow: "0px 0px 25px #ff2e63" }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-10 right-10 bg-pink-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-xl z-20"
      >
        <FaDice size={26} />
      </motion.button>

      {/* 🌟 Glass Effect */}
      <style jsx global>{`
        .glass-card {
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .perspective {
          perspective: 1200px;
        }
      `}</style>
    </section>
  );
}
