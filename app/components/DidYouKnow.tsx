"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  "You take about 20,000 breaths a day. Most of them on autopilot.",
  "The average person uses only about 30% of their lung capacity.",
  "Mouth breathing raises cortisol and disrupts sleep quality.",
  "Exhaling longer than you inhale activates your vagus nerve instantly.",
  "Navy SEALs use box breathing before every high-pressure mission.",
  "One physiological sigh can shift your nervous system in a single breath.",
  "5 minutes of cyclic sighing improved mood more than meditation in a Stanford trial.",
  "Your breathing rate directly controls your heart rate variability.",
  "Nose breathing filters, warms, and humidifies air. Your mouth doesn't.",
  "Slowing to 5.5 breaths per minute synchronizes your heart, lungs, and blood pressure.",
  "Breathing is the only autonomic function you can consciously override.",
  "Chronic shallow breathing keeps your body stuck in low-grade fight-or-flight.",
];

export default function DidYouKnow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * facts.length));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto mt-1 mb-6 px-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="text-[11px] text-white/30 text-center leading-relaxed"
        >
          {facts[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
