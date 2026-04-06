"use client";

import { motion } from "framer-motion";

// --- Deterministic pseudo-random helpers (no Math.random = no hydration mismatch) ---
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

interface Star {
  id: number;
  x: number;   // % across screen
  y: number;   // % down page
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "255,255,255",   // pure white
  "200,210,255",   // cool blue-white
  "255,240,210",   // warm yellow-white
  "180,200,255",   // blue
  "255,200,220",   // faint pink
  "200,255,240",   // faint teal
];

function generateStars(count: number): Star[] {
  const rand = mulberry32(42);
  return Array.from({ length: count }, (_, i) => {
    const r = rand();
    const size = r < 0.6 ? rand() * 1.2 + 0.4   // tiny (60%)
               : r < 0.9 ? rand() * 1.5 + 1.5   // medium (30%)
               :            rand() * 2   + 3;    // bright (10%)

    return {
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size,
      opacity: 0.15 + rand() * 0.7,
      duration: 2.5 + rand() * 5,
      delay: rand() * 6,
      color: COLORS[Math.floor(rand() * COLORS.length)],
    };
  });
}

// Cluster stars slightly around the "galactic band" — a diagonal streak
function generateClusterStars(count: number): Star[] {
  const rand = mulberry32(99);
  return Array.from({ length: count }, (_, i) => {
    // Gaussian-like cluster along a diagonal band (top-right → bottom-left)
    const t = rand();
    const band = t * 120 - 10;                   // -10 → 110, diagonal %
    const spread = (rand() - 0.5) * 35;
    const x = band + spread * 0.6;
    const y = (100 - band) * 0.6 + spread * 0.8;

    return {
      id: i + 300,
      x: Math.min(Math.max(x, 0), 100),
      y: Math.min(Math.max(y, 0), 100),
      size: rand() * 1.4 + 0.3,
      opacity: 0.1 + rand() * 0.5,
      duration: 3 + rand() * 6,
      delay: rand() * 8,
      color: COLORS[Math.floor(rand() * COLORS.length)],
    };
  });
}

const baseStars   = generateStars(220);
const clusterStars = generateClusterStars(130);
const allStars    = [...baseStars, ...clusterStars];

// A handful of "shooting star" streaks
interface Streak {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  duration: number;
  delay: number;
}

function generateStreaks(count: number): Streak[] {
  const rand = mulberry32(7);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 80 + 10,
    y: rand() * 40 + 5,
    angle: 20 + rand() * 30,
    length: 40 + rand() * 80,
    duration: 1.2 + rand() * 1.5,
    delay: 4 + rand() * 20,
  }));
}

const streaks = generateStreaks(6);

export default function Starfield() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Milky Way glow band — subtle diagonal nebula */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          background:
            "linear-gradient(135deg, transparent 20%, rgba(100,120,255,0.6) 40%, rgba(160,100,255,0.5) 55%, rgba(80,180,255,0.4) 70%, transparent 85%)",
          filter: "blur(60px)",
        }}
      />
      {/* Second softer layer for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 65% 40%, rgba(120,80,255,0.8) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {allStars.map((star) => (
          <motion.circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size / 2}
            fill={`rgba(${star.color},${star.opacity})`}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.4, star.opacity * 0.9, star.opacity * 0.3],
              r: [star.size / 2, star.size / 2 + 0.3, star.size / 2],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Shooting star streaks */}
      {streaks.map((streak) => (
        <motion.div
          key={streak.id}
          className="absolute"
          style={{
            left: `${streak.x}%`,
            top:  `${streak.y}%`,
            width: streak.length,
            height: 1,
            transformOrigin: "left center",
            rotate: streak.angle,
            background: "linear-gradient(to right, transparent, rgba(200,220,255,0.8), transparent)",
            borderRadius: 1,
          }}
          initial={{ scaleX: 0, opacity: 0, x: 0 }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.9, 0],
            x:      [0, streak.length * 0.6],
          }}
          transition={{
            duration: streak.duration,
            delay: streak.delay,
            repeat: Infinity,
            repeatDelay: 12 + streak.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
