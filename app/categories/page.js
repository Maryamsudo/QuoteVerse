'use client';
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Inter, Roboto } from "next/font/google";
import { MoodBackground, useMood } from "../MoodContext";

// 🎨 Import Google Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });
const moodGradients = {
  Motivational: "linear-gradient(135deg, #1e3c72, #2a5298, #000428)",
  Sad: "linear-gradient(135deg, #29636D, #4DA4B3, #29636D)",
  Funny: "linear-gradient(135deg, #62296D, #AA71BD, #50345B)",
  Mystic: "linear-gradient(135deg, #2c003e, #240046, #5a189a)",
  Philosophy: "linear-gradient(135deg, #733B76, #8D6BA1, #894697)",
  Epic: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  Romantic: "linear-gradient(135deg, #EE2727, #831A1A, #E54242)",
  Inspirational: "linear-gradient(135deg, #25A5A9, #216D72, #4B8E93)",
};
// 🧠 Simple keyword-based category detection
function categorizeQuote(text) {
  const lower = text.toLowerCase();
  if (lower.includes("love") || lower.includes("heart") || lower.includes("kiss")) {
    return { category: "Love", type: "romantic" };
  }
  if (lower.includes("life") || lower.includes("living") || lower.includes("death")) {
    return { category: "Life", type: "life" };
  }
  if (lower.includes("funny") || lower.includes("laugh") || lower.includes("joke")) {
    return { category: "Funny", type: "funny" };
  }
  if (lower.includes("dark") || lower.includes("pain") || lower.includes("fear")) {
    return { category: "Dark", type: "dark" };
  }
  return { category: "Inspirational", type: "inspirational" };
}

export default function CategoriesPage() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
const { mood } = useMood();
  // ✍️ Manually added quotes
  const manualQuotes = [
    {
      id: "m1",
      category: "Inspirational",
      type: "inspirational",
      quote: "Do not be satisfied with the stories that come before you. Unfold your own myth.",
      author: "Rumi",
    },
    {
      id: "m2",
      category: "Life",
      type: "life",
      quote: "Life is really simple, but we insist on making it complicated.",
      author: "Confucius",
    },
  ];

  // 🚀 Fetch quotes from API + merge with manual quotes
  useEffect(() => {
    async function fetchQuotes() {
      setLoading(true);
      try {
        const res = await fetch("/api/quotes", { cache: "no-store" });
        const data = await res.json();

        const apiQuotes = data.map((q, i) => {
          const { category, type } = categorizeQuote(q.q);
          return {
            id: `api-${i}`,
            category,
            type,
            quote: q.q,
            author: q.a,
          };
        });

        setAllQuotes([...manualQuotes, ...apiQuotes]);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setAllQuotes(manualQuotes);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();

    // Load favorites from localStorage
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // 🧡 Toggle favorite
  const toggleFavorite = (quote) => {
    let updated;
    if (favorites.find((f) => f.id === quote.id)) {
      updated = favorites.filter((f) => f.id !== quote.id);
    } else {
      updated = [...favorites, quote];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // 🔥 Dynamic counts
  const filters = useMemo(() => {
    const groups = allQuotes.reduce((acc, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {});
    return [
      { key: "all", label: "All", count: allQuotes.length },
      { key: "inspirational", label: "Inspirational", count: groups["inspirational"] || 0 },
      { key: "romantic", label: "Love", count: groups["romantic"] || 0 },
      { key: "life", label: "Life", count: groups["life"] || 0 },
      { key: "funny", label: "Funny", count: groups["funny"] || 0 },
      { key: "dark", label: "Dark", count: groups["dark"] || 0 },
    ];
  }, [allQuotes]);

  // 🔎 Filter + Search
  const filtered = allQuotes.filter((q) => {
    const matchesCategory = activeFilter === "all" || q.type === activeFilter;
    const matchesSearch =
      searchTerm === "" ||
      q.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.quote.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 🎨 Navbar background by filter
  const navbarColors = {
    all: "from-orange-500 to-pink-600",
    inspirational: "from-blue-500 to-indigo-600",
    romantic: "from-pink-500 to-rose-600",
    life: "from-green-500 to-emerald-600",
    funny: "from-yellow-400 to-orange-500",
    dark: "from-gray-800 to-black",
  };

  return (
    <>
      <Navbar mood={mood} />

      <main className="relative min-h-screen text-white px-6 pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full"></div>
        {/* 🌌 Shared Mood Background */}
        <MoodBackground />

        {/* Title */}
    <div className="text-center mb-12">
  <h1
    className={`${inter.className} text-5xl font-semibold mb-3 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg`}
  >
    Quote Categories
  </h1>
  <p
    className={`${inter.className} text-lg text-white/90 max-w-md mx-auto`}
  >
    Explore quotes by category or search by author
  </p>
</div>

        {/* Search + Filters */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-white/50" />
            <input
              type="text"
              placeholder="Search by author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 
                  ${activeFilter === f.key ? "bg-white/20 scale-105 shadow-lg" : "bg-white/10 hover:bg-white/20"}
                `}
              >
                {f.label}
                <span className="text-xs opacity-80">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Grid */}
        {loading ? (
          <p className="text-center text-lg opacity-70">Loading quotes...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-lg opacity-70">No quotes found</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((q, i) => (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className={`${inter.className} px-3 py-1 text-xs font-semibold bg-white/20 rounded-full`}>
                      {q.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(q)}
                      className={`transition-colors ${favorites.find((f) => f.id === q.id) ? "text-pink-500" : "text-white/70 hover:text-pink-400"}`}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <p className={`${roboto.className} text-lg italic mb-3 leading-relaxed`}>
                    "{q.quote}"
                  </p>
                  <p className={`${inter.className} text-sm opacity-70`}>
                    — {q.author}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <style jsx global>{`
        @keyframes vintageGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-vintage {
          background-size: 300% 300%;
          animation: vintageGradient 20s ease infinite;
        }
        .bg-noise {
          background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
        }
      `}</style>
    </>
  );
}
