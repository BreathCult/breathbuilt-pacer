"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const techniques = [
  {
    name: "Box Breathing",
    color: "#3b82f6",
    pattern: "4s in, 4s hold, 4s out, 4s hold",
    duration: "~5 min",
    bestFor: "Focus, pre-performance, stress",
  },
  {
    name: "4-7-8",
    color: "#8b5cf6",
    pattern: "4s in, 7s hold, 8s out",
    duration: "~1 min",
    bestFor: "Sleep, acute anxiety",
  },
  {
    name: "Physiological Sigh",
    color: "#10b981",
    pattern: "2s in, 1s sniff, 6s out",
    duration: "~30 sec",
    bestFor: "Emergency reset, one breath",
  },
  {
    name: "Resonant",
    color: "#f59e0b",
    pattern: "5.5s in, 5.5s out",
    duration: "5-20 min",
    bestFor: "HRV training, daily practice",
  },
  {
    name: "Wim Hof",
    color: "#ef4444",
    pattern: "30 breaths + hold + recovery",
    duration: "~7.5 min",
    bestFor: "Morning energy, activation",
  },
  {
    name: "Cyclic Sighing",
    color: "#06b6d4",
    pattern: "3s in, 1s sniff, 8s out",
    duration: "5 min",
    bestFor: "Daily mood boost",
  },
];

export default function GuidePanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] text-white/50 hover:bg-white/[0.14] hover:text-white/70 transition-all active:scale-95"
        aria-label="Open guide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span className="text-xs font-medium">Guide</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#111] border-l border-white/[0.08] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-light text-white">Quick Guide</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/30 hover:bg-white/[0.1] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {techniques.map((t) => (
                    <div
                      key={t.name}
                      className="rounded-xl p-3.5 border border-white/[0.06]"
                      style={{ background: `${t.color}08` }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: t.color }}
                        />
                        <p className="text-sm font-medium text-white/85">{t.name}</p>
                      </div>
                      <p className="text-xs text-white/40 mb-1">{t.pattern}</p>
                      <div className="flex gap-3">
                        <p className="text-[11px] text-white/25">{t.duration}</p>
                        <p className="text-[11px] text-white/25">{t.bestFor}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/breathcult-guide.pdf"
                  download="breathcult-guide.pdf"
                  className="mt-6 w-full py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/60 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-colors active:scale-[0.98]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Full Guide (PDF)
                </a>

                <p className="text-[10px] text-white/15 text-center mt-4 leading-relaxed">
                  Not medical advice. Consult a physician before starting
                  any breathwork practice.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
