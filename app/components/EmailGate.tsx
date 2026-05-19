"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onUnlock: () => void;
};

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

      localStorage.setItem("breathbuilt_unlocked", "true");
      onUnlock();
    } catch {
      setError("Connection error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-sm"
      >
        <h1 className="text-3xl font-light tracking-tight text-white">
          breathcult
        </h1>

        <p className="text-sm text-white/50 mt-6 leading-relaxed">
          For the ones doing it all.
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
        className="mt-8 w-full max-w-sm flex flex-col gap-3"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-10 max-w-xs"
      >
        <p className="text-[10px] text-white/15 leading-relaxed">
          This tool is for educational and wellness purposes only. It is not
          medical advice and does not replace professional medical care. Consult
          your doctor before starting any breathing practice, especially if you
          have heart, lung, blood pressure, or anxiety conditions. If you are
          pregnant, have epilepsy, or have recently had surgery, seek medical
          guidance first.
        </p>
        <p className="text-xs text-white/10 mt-4">@breathcult</p>
      </motion.div>
    </div>
  );
}
