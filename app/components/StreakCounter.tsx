"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function getStreak(): { count: number; isNew: boolean } {
  const today = new Date().toISOString().split("T")[0];
  const lastDate = localStorage.getItem("breathbuilt_last_session");
  const streak = parseInt(localStorage.getItem("breathbuilt_streak") || "0", 10);

  if (lastDate === today) {
    return { count: streak, isNew: false };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (lastDate === yesterdayStr) {
    return { count: streak, isNew: false };
  }

  return { count: 0, isNew: false };
}

export function recordSession() {
  const today = new Date().toISOString().split("T")[0];
  const lastDate = localStorage.getItem("breathbuilt_last_session");
  const streak = parseInt(localStorage.getItem("breathbuilt_streak") || "0", 10);

  if (lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const newStreak = lastDate === yesterdayStr ? streak + 1 : 1;
  localStorage.setItem("breathbuilt_streak", String(newStreak));
  localStorage.setItem("breathbuilt_last_session", today);
}

export default function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const { count } = getStreak();
    setStreak(count);
  }, []);

  if (streak < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1]"
    >
      <span className="text-[11px]">🔥</span>
      <span className="text-[11px] text-white/40 font-medium">
        Day {streak}
      </span>
    </motion.div>
  );
}
