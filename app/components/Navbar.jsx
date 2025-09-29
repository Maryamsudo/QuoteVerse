"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaVolumeUp, FaVolumeMute, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useMood } from "../MoodContext";

export default function Navbar({ mood = "default" }) {
  const { theme, setTheme } = useTheme(); // dark / light
  const { mood: currentMood } = useMood(); // sync with MoodContext

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => setIsSoundOn(!isSoundOn);

  // 🎨 Mood gradients (light + dark variants)
  const moodGradients = {
    Motivational: {
      light: "from-[#1e3c72] via-[#2a5298] to-[#000428]",
      dark: "from-[#0a192f] via-[#112240] to-[#000428]",
    },
    Sad: {
      light: "from-[#29636D] via-[#4DA4B3] to-[#29636D]",
      dark: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
    },
    Funny: {
      light: "from-[#62296D] via-[#AA71BD] to-[#50345B]",
      dark: "from-[#2b1331] via-[#502f5f] to-[#1a0d1f]",
    },
    Mystic: {
      light: "from-purple-900 via-indigo-900 to-black",
      dark: "from-[#0f0c29] via-[#302b63] to-[#24243e]",
    },
    Philosophy: {
      light: "from-[#733B76] via-[#8D6BA1] to-[#894697]",
      dark: "from-[#2c003e] via-[#240046] to-[#5a189a]",
    },
    Epic: {
      light: "from-gray-900 via-indigo-900 to-purple-800",
      dark: "from-[#1f1c2c] via-[#928dab] to-[#000000]",
    },
    Romantic: {
      light: "from-[#EE2727] via-[#831A1A] to-[#E54242]",
      dark: "from-[#3a0d0d] via-[#8a1f1f] to-[#e63946]",
    },
    Inspirational: {
      light: "from-[#25A5A9] via-[#216D72] to-[#4B8E93]",
      dark: "from-[#0d3b3b] via-[#1c6060] to-[#2d7373]",
    },
    default: {
      light: "from-[#270031]/80 via-[#3d0153]/80 to-[#4e0273]/80",
      dark: "from-[#0d0d0d] via-[#1a1a1a] to-[#262626]",
    },
  };

  const gradient =
    moodGradients[currentMood]?.[theme] || moodGradients.default[theme];

  return (
    <header
      className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-500 ${
        isScrolled ? "py-2 backdrop-blur-xl shadow-lg" : "py-4"
      }`}
    >
      <nav
        className={`px-6 py-3 rounded-full flex justify-between items-center gap-10 max-w-7xl w-full text-white border border-purple-700/30 backdrop-blur-md shadow-xl bg-gradient-to-r ${gradient} transition-all duration-700`} >
        {/* 🔥 Logo */}
        <div className="flex items-center font-extrabold text-2xl">
          <div className="bg-gradient-to-br from-pink-500 to-purple-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-2 shadow-lg shadow-pink-500/40">
            Q
          </div>
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            QuoteVerse
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-lg font-light">
          {[
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
            { name: "Random", href: "/random" },
            { name: "Favorites", href: "/favorites" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="group relative px-2 py-1 rounded-md cursor-pointer transition-all duration-300"
              >
                <span className="group-hover:text-pink-300 transition duration-200">
                  {item.name}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            className="hidden md:flex bg-pink-500 hover:bg-pink-400 text-white p-2 rounded-full shadow-md transition cursor-pointer"
          >
            {isSoundOn ? <FaVolumeUp size={18} /> : <FaVolumeMute size={18} />}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex bg-purple-500 hover:bg-purple-400 text-white p-2 rounded-full shadow-md transition cursor-pointer"
          >
            {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {/* 📱 Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-purple-600 p-2 rounded-full"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-black/80 backdrop-blur-md py-6 flex flex-col items-center gap-6 text-white shadow-lg md:hidden">
          {[
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
            { name: "Random", href: "/random" },
            { name: "Favorites", href: "/favorites" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg cursor-pointer hover:text-pink-400"
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Controls */}
          <div className="flex gap-6 mt-4">
            <button onClick={toggleSound} className="bg-pink-500 p-2 rounded-full">
              {isSoundOn ? <FaVolumeUp size={18} /> : <FaVolumeMute size={18} />}
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-purple-500 p-2 rounded-full"
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
