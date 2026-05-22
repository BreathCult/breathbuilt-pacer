"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  technique: string;
  color: string;
  onClose: () => void;
};

export default function FeedbackModal({ technique, color, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim() || undefined,
          technique,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm mx-4 mb-6 sm:mb-0 rounded-2xl border border-white/[0.08] bg-[#111111] p-6"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-4"
                style={{ backgroundColor: color }}
              />
              <p className="text-white text-sm font-medium mb-1">
                Thank you
              </p>
              <p className="text-white/40 text-xs mb-6">
                Your feedback helps shape breathCult.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs text-white/60 border border-white/10 active:scale-95 transition-transform"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <h3 className="text-sm font-medium text-white/90">
                    Share feedback
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/30 hover:text-white/50 text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would you improve? Any features you'd like to see?"
                  rows={3}
                  className="w-full px-3.5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/25 outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all resize-none"
                  autoFocus
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional, for follow-up)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/25 outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all"
                  autoComplete="email"
                  autoCapitalize="off"
                />

                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="w-full py-3 rounded-xl text-sm font-medium text-white/90 active:scale-[0.98] transition-all disabled:opacity-30"
                  style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>

              <p className="text-[10px] text-white/15 text-center mt-3">
                Feedback is anonymous unless you include your email.
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
