"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phase } from "../techniques";

type Props = {
  phase: Phase;
  color: string;
  countdown: number;
  progress: number;
};

function getScale(label: string): number {
  switch (label) {
    case "Inhale":
    case "Sniff":
    case "Power Breath":
    case "Recovery Breath":
      return 1;
    case "Exhale":
      return 0.5;
    case "Hold":
    case "Hold Empty":
      return -1;
    default:
      return 0.75;
  }
}

export default function BreathingCircle({
  phase,
  color,
  countdown,
  progress,
}: Props) {
  const scale = getScale(phase.label);
  const isHold = scale === -1;
  const displayNum = Math.max(1, Math.ceil(countdown));
  const prevNum = useRef(displayNum);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (displayNum !== prevNum.current) {
      prevNum.current = displayNum;
      setAnimKey((k) => k + 1);
    }
  }, [displayNum]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Background glow */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
        animate={{
          width: isHold ? 280 : scale === 1 ? 320 : 180,
          height: isHold ? 280 : scale === 1 ? 320 : 180,
        }}
        transition={{
          duration: phase.duration,
          ease: "easeInOut",
        }}
      />

      {/* Main circle */}
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          border: `2px solid ${color}`,
          boxShadow: `0 0 30px ${color}40, inset 0 0 30px ${color}10`,
        }}
        animate={{
          width: isHold ? 220 : scale === 1 ? 260 : 140,
          height: isHold ? 220 : scale === 1 ? 260 : 140,
        }}
        transition={{
          duration: phase.duration,
          ease: "easeInOut",
        }}
      >
        <div className="text-center">
          <motion.p
            className="text-2xl font-light tracking-wide"
            style={{ color }}
            key={phase.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {phase.label}
          </motion.p>
          <div className="h-12 mt-1 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={animKey}
                className="text-4xl font-extralight text-white/90 tabular-nums"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {displayNum}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Progress ring */}
      <svg
        className="absolute"
        width="300"
        height="300"
        viewBox="0 0 300 300"
      >
        <circle
          cx="150"
          cy="150"
          r="145"
          fill="none"
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="2"
        />
        <motion.circle
          cx="150"
          cy="150"
          r="145"
          fill="none"
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 145}
          style={{
            strokeDashoffset: 2 * Math.PI * 145 * (1 - progress),
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
}
