"use client";

import { motion } from "framer-motion";
import { Technique } from "../techniques";
import DidYouKnow from "./DidYouKnow";
import StreakCounter from "./StreakCounter";

type Props = {
  techniques: Technique[];
  onSelect: (technique: Technique) => void;
};

export default function TechniqueSelector({ techniques, onSelect }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-3xl font-light tracking-tight text-white">
            breathcult
          </h1>
          <StreakCounter />
        </div>
        <p className="text-xs text-white/30 tracking-wide italic">
          It&apos;s all about the breath, forget about the rest.
        </p>
        <p className="text-sm text-white/40 tracking-wide mt-3">
          Pick your breath
        </p>
      </motion.div>

      <DidYouKnow />

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {techniques.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onClick={() => onSelect(t)}
            className="relative group rounded-2xl p-4 min-h-[100px] text-left transition-all duration-200 active:scale-[0.97]"
            style={{
              background: `linear-gradient(135deg, ${t.color}14, ${t.color}08)`,
              border: `1px solid ${t.color}30`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full mb-3"
              style={{ backgroundColor: t.color }}
            />
            <p className="text-sm font-medium text-white/90">{t.name}</p>
            <p className="text-xs text-white/45 mt-1">{t.tagline}</p>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 max-w-xs"
      >
        <p className="text-[10px] text-white/15 leading-relaxed">
          Not medical advice. Consult a physician before starting any
          breathwork, especially with heart, lung, or blood pressure conditions.
        </p>
        <div className="mt-4 flex flex-col items-center gap-1">
          <a
            href="https://instagram.com/breathcultofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            @breathcult
          </a>
          <a
            href="https://instagram.com/dylonhernandez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/15 hover:text-white/30 transition-colors"
          >
            built by @dylonhernandez
          </a>
        </div>
      </motion.div>
    </div>
  );
}
