'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { MoodBackground, useMood } from "../MoodContext";

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

// 📝 Example quotes
const quotes = [
  { id: 1, quote: "Do not be satisfied with the stories that come before you. Unfold your own myth.", author: "Rumi" },
  { id: 2, quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { id: 3, quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: 4, quote: "I told my wife she was drawing her eyebrows too high. She looked surprised.", author: "Unknown" },
  { id: 5, quote: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
  { id: 6, quote: "He who has a thousand friends has not a friend to spare, and he who has one enemy will meet him everywhere.", author: "Hazrat Ali (RA)" },
  { id: 7, quote: "Don&apos;t get lost in your pain, know that one day your pain will become your cure.", author: "Rumi" },
  { id: 8, quote: "Out of suffering have emerged the strongest souls.", author: "Khalil Gibran" },
  { id: 9, quote: "Your pain is the breaking of the shell that encloses your understanding.", author: "Khalil Gibran" },
  { id: 10, quote: "You can cut all the flowers but you cannot keep spring from coming.", author: "Pablo Neruda" },
  { id: 11, quote: "We know what we are, but know not what we may be.", author: "William Shakespeare" },
  { id: 12, quote: "Knowledge enlivens the soul.", author: "Hazrat Ali (RA)" },
  { id: 13, quote: "Patience is of two kinds: patience over what pains you, and patience against what you covet.", author: "Hazrat Ali (RA)" },
];

export default function RandomPage() {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const { mood } = useMood();

  // 🎈 Floating animation
  const floatingAnimation = {
    y: [0, -20, 0, 20, 0],
    x: [0, 15, 0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <>
      <Navbar mood={mood} />

      <main className="relative min-h-screen text-white px-6 pt-28 pb-16 overflow-hidden">
        {/* 🌌 Shared Mood Background */}
        <MoodBackground />

        {/* 🎲 Random bubbles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {quotes.map((q, i) => (
            <motion.div
              key={q.id}
              className="cursor-pointer rounded-full p-6 bg-white/20 backdrop-blur-md shadow-xl text-center text-white font-semibold hover:scale-110 transition-transform"
              animate={floatingAnimation}
              transition={{ delay: i * 0.3 }}
              onClick={() => setSelectedQuote(q)}
            >
              <p className="text-sm line-clamp-2">&quot;{q.quote}&quot;</p>
              <p className="text-xs opacity-70 mt-2">— {q.author}</p>
            </motion.div>
          ))}
        </div>

        {/* 🔥 Modal for full quote */}
        <AnimatePresence>
          {selectedQuote && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuote(null)}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-lg text-center text-white shadow-2xl relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xl italic mb-4">&quot;{selectedQuote.quote}&quot;</p>
                <p className="opacity-80">— {selectedQuote.author}</p>
                <button
                  className="mt-6 px-5 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold"
                  onClick={() => setSelectedQuote(null)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
