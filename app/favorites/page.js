'use client';

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Inter, Roboto } from "next/font/google";
import { MoodBackground, useMood } from "../MoodContext";

// 🎨 Import Google Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { mood } = useMood();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  return (
    <>
      <Navbar mood={mood} />

      <main className="relative min-h-screen text-white px-6 pt-28 pb-32 overflow-hidden">
        {/* 🌌 Shared Mood Background */}
        <MoodBackground />

        {/* 🌈 Gradient Heading (like Home Hero) */}
        <div className="text-center mb-12">
          <h1
            className={`${inter.className} text-5xl font-bold mb-3 drop-shadow-lg bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}
          >
            Your Favorites
          </h1>
          {/* ✨ Small subtitle under heading */}
          <p className={`${inter.className} text-lg opacity-90`}>
            A collection of quotes you’ve saved to inspire and guide you
          </p>
        </div>

        {favorites.length === 0 ? (
          <p className="text-center text-lg opacity-80">
            You haven&apos;t added any favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/10"
              >
                <span className="px-3 py-1 text-xs font-semibold bg-white/20 rounded-full">
                  {q.category}
                </span>

                {/* 📝 Quote text in Inter font */}
                <p
                  className={`${inter.className} text-lg italic mb-3 leading-relaxed mt-3`}
                >
                  &quot;{q.quote}&quot;
                </p>
                <p className="text-sm opacity-70">— {q.author}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🌍 Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10 text-white py-6 px-6 text-center">
        <p className="text-sm opacity-80 mb-2">
          © {new Date().getFullYear()} QuoteVerse — All Rights Reserved
        </p>
        <p className="text-sm opacity-70">
          Contact us:{" "}
          <a
            href="mailto:maryamjaved460@gmail.com"
            className="text-purple-300 hover:underline"
          >
            maryamjaved460@gmail.com
          </a>
        </p>
      </footer>
    </>
  );
}
