"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SessionState = "gated" | "selecting" | "warning" | "countdown" | "active" | "done";

type Props = {
  state: SessionState;
  techniqueId: string | null;
  round: number;
  totalRounds: number;
};

const tips: Record<string, string[]> = {
  box: [
    "Breathe from your belly, not your chest.",
    "The hold after exhale is the most important phase.",
    "Keep your shoulders relaxed and down.",
    "If you feel dizzy, slow down. Don't force it.",
  ],
  "478": [
    "Inhale through your nose, exhale through your mouth.",
    "If the 7-second hold is hard, scale the ratio down.",
    "Place your tongue behind your upper front teeth.",
    "Dr. Weil says: don't exceed 4 cycles in the first month.",
  ],
  sigh: [
    "The second sniff tops off your lungs. Keep it short.",
    "Make the exhale longer than both inhales combined.",
    "Even one rep can shift your state. That's normal.",
    "Your body already does this when you cry or fall asleep.",
  ],
  resonant: [
    "No holds. Just a smooth, continuous rhythm.",
    "Start at 4s in / 4s out if 5.5 feels too slow.",
    "Nose breathing is recommended for this one.",
    "Real shifts happen at 4-8 weeks of daily practice.",
  ],
  wimhof: [
    "Stay seated or lying down the entire time.",
    "Tingling and lightheadedness are normal.",
    "The hold is flexible. Breathe when your body says to.",
    "Never practice this near water or while driving.",
  ],
  cyclic: [
    "Same pattern as the physiological sigh, just repeated.",
    "Consistency at 5 min/day beats longer sporadic sessions.",
    "The exhale should be roughly 2x the inhale.",
    "This beat meditation in a head-to-head Stanford trial.",
  ],
};

const milestoneMessages = [
  "You're doing great. Stay with it.",
  "Halfway there. You've got this.",
  "Almost done. Finish strong.",
];

function getMilestone(round: number, total: number): string | null {
  const pct = round / total;
  if (pct >= 0.75 && pct < 0.85) return milestoneMessages[2];
  if (pct >= 0.45 && pct < 0.55) return milestoneMessages[1];
  if (pct >= 0.2 && pct < 0.3) return milestoneMessages[0];
  return null;
}

const selectingTips = [
  "Tap a technique to start. Each one is different.",
  "Not sure where to start? Try Box Breathing.",
  "Physiological Sigh is the fastest. One breath.",
  "Cyclic Sighing is the best daily default.",
];

const doneTips: Record<string, string> = {
  box: "Nice work. Try Resonant next for a longer session.",
  "478": "That's all you need. Weil says twice a day changes everything.",
  sigh: "Quick and effective. Use this anytime you need a reset.",
  resonant: "Great session. The benefits compound over weeks.",
  wimhof: "Energized? Pair this with cold exposure for more.",
  cyclic: "5 minutes well spent. Come back tomorrow.",
};

export default function BreathCoach({ state, techniqueId, round, totalRounds }: Props) {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (state === "gated") {
      setMessage("");
      return;
    }

    if (state === "selecting") {
      setTipIndex((prev) => (prev + 1) % selectingTips.length);
      setMessage(selectingTips[tipIndex % selectingTips.length]);
      setVisible(true);
      return;
    }

    if (state === "countdown") {
      setMessage("Find a comfortable position. Relax your shoulders.");
      setVisible(true);
      return;
    }

    if (state === "warning") {
      setMessage("");
      return;
    }

    if (state === "done" && techniqueId) {
      setMessage(doneTips[techniqueId] || "Session complete. Well done.");
      setVisible(true);
      return;
    }

    if (state === "active" && techniqueId) {
      const milestone = getMilestone(round, totalRounds);
      if (milestone) {
        setMessage(milestone);
        setVisible(true);
        return;
      }

      const techniqueTips = tips[techniqueId];
      if (techniqueTips && round <= 2) {
        setMessage(techniqueTips[Math.floor(Math.random() * techniqueTips.length)]);
        setVisible(true);
      }
    }
  }, [state, techniqueId, round, totalRounds]);

  if (state === "gated" || state === "warning" || !message) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 max-w-[260px]"
        >
          <div className="relative">
            <button
              onClick={() => setVisible(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-white/50 text-[10px] hover:bg-white/25 transition-colors"
            >
              x
            </button>
            <div className="flex items-start gap-3 bg-white/[0.07] backdrop-blur-md border border-white/[0.14] rounded-2xl px-4 py-3.5 shadow-lg shadow-black/30">
              <div className="w-7 h-7 rounded-full bg-white/[0.12] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
