"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onUnlock: () => void;
};

const previewTechniques = [
  { name: "Box Breathing", tagline: "🎯 Focus & calm", color: "#3b82f6" },
  { name: "4-7-8", tagline: "🌙 Sleep & wind-down", color: "#8b5cf6" },
  { name: "Physiological Sigh", tagline: "⚡ Instant reset", color: "#10b981" },
  { name: "Resonant", tagline: "🧘 HRV & coherence", color: "#f59e0b" },
  { name: "Wim Hof", tagline: "🔥 Energy & power", color: "#ef4444" },
  { name: "Cyclic Sighing", tagline: "☀️ Daily mood boost", color: "#06b6d4" },
];

export default function EmailGate({ onUnlock }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("breathcult_unlocked", "true");
      onUnlock();
    } catch {
      setError("Connection error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh px-6 py-10 overflow-hidden">
      {/* Teal radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-sm relative z-10"
      >
        {/* Breath wave logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-6"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            {/* Outer circle with teal glow */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(6, 182, 212, 0.5)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Inner glow circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(6, 182, 212, 0.15)"
              strokeWidth="4"
              fill="none"
            />
            {/* Breath wave */}
            <path
              d="M4 32 C12 32, 16 20, 24 20 C28 20, 30 28, 32 32 C34 36, 36 44, 40 44 C48 44, 52 32, 60 32"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-light tracking-tight text-white">
          breathCult
        </h1>

        <p className="text-sm text-white/50 mt-6 leading-relaxed italic">
          It&apos;s all about the breath, forget about the rest.
        </p>

        <p className="text-sm text-white/30 mt-3 leading-relaxed">
          The set before the set. The calm after the chaos.
          <br />
          Sometimes slowing down is what speeds you back up.
        </p>

        <p className="text-sm text-white/50 mt-6 leading-relaxed">
          6 guided breathing techniques. Free. No app required.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-sm flex flex-col gap-3 relative z-10"
      >
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
          autoComplete="email"
          autoCapitalize="off"
        />

        {error && (
          <p className="text-xs text-red-400/80 px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-white/[0.12] text-white text-sm font-medium border border-white/[0.15] active:scale-[0.98] hover:bg-white/[0.16] transition-all disabled:opacity-40"
        >
          {loading ? "Unlocking..." : "Unlock the pacer"}
        </button>

        <p className="text-xs text-white/15 text-center mt-1">
          No spam. Just tools for grounding yourself.
        </p>
      </motion.form>

      {/* Technique preview (faded, behind the gate) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 w-full max-w-sm relative z-10"
      >
        <div className="relative">
          {/* Fade overlay on the preview */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-10 pointer-events-none" />
          <div className="grid grid-cols-2 gap-2 opacity-30">
            {previewTechniques.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-xs text-white/70 font-medium">
                    {t.name}
                  </span>
                </div>
                <p className="text-[10px] text-white/30">{t.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-6 max-w-xs relative z-10"
      >
        <p className="text-[10px] text-white/15 leading-relaxed">
          This tool is for educational and wellness purposes only. It is not
          medical advice and does not replace professional medical care. Consult
          your doctor before starting any breathing practice, especially if you
          have heart, lung, blood pressure, or anxiety conditions. If you are
          pregnant, have epilepsy, or have recently had surgery, seek medical
          guidance first.
        </p>
        <p className="text-xs text-white/10 mt-4">@thebreathcult</p>
      </motion.div>
    </div>
  );
}
