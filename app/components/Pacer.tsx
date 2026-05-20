"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techniques as allTechniques, Technique } from "../techniques";
import TechniqueSelector from "./TechniqueSelector";
import BreathingCircle from "./BreathingCircle";
import EmailGate from "./EmailGate";
import BreathCoach from "./BreathCoach";
import GuidePanel from "./GuidePanel";
import { recordSession } from "./StreakCounter";

type SessionState = "gated" | "selecting" | "warning" | "countdown" | "active" | "done";

export default function Pacer() {
  const [state, setState] = useState<SessionState>("gated");
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [startCountdown, setStartCountdown] = useState(3);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const phaseStartRef = useRef(0);

  useEffect(() => {
    if (localStorage.getItem("breathcult_unlocked") === "true") {
      setState("selecting");
    }
  }, []);

  const totalDuration = technique
    ? technique.phases.reduce((sum, p) => sum + p.duration, 0) *
      technique.rounds
    : 0;

  const currentPhase = technique?.phases[phaseIndex] ?? null;

  const handleSelect = useCallback((t: Technique) => {
    setTechnique(t);
    if (t.id === "wimhof") {
      setState("warning");
    } else {
      setState("countdown");
      setStartCountdown(3);
    }
  }, []);

  const handleStop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setState("selecting");
    setTechnique(null);
    setPhaseIndex(0);
    setRound(1);
    setCountdown(0);
    setTotalElapsed(0);
  }, []);

  const handleRestart = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setPhaseIndex(0);
    setRound(1);
    setCountdown(0);
    setTotalElapsed(0);
    setState("countdown");
    setStartCountdown(3);
  }, []);

  // Pre-session 3-2-1 countdown
  useEffect(() => {
    if (state !== "countdown") return;
    if (startCountdown <= 0) {
      setState("active");
      startTimeRef.current = performance.now();
      phaseStartRef.current = performance.now();
      if (technique) setCountdown(technique.phases[0].duration);
      return;
    }
    const timer = setTimeout(() => setStartCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [state, startCountdown, technique]);

  // Main breathing loop using requestAnimationFrame
  useEffect(() => {
    if (state !== "active" || !technique) return;

    let localPhaseIndex = phaseIndex;
    let localRound = round;
    let localPhaseStart = phaseStartRef.current;

    const tick = (now: number) => {
      const phase = technique.phases[localPhaseIndex];
      const elapsed = (now - localPhaseStart) / 1000;
      const remaining = Math.max(0, phase.duration - elapsed);

      setCountdown(remaining);
      setTotalElapsed((now - startTimeRef.current) / 1000);

      if (remaining <= 0) {
        const nextPhaseIndex = localPhaseIndex + 1;
        if (nextPhaseIndex >= technique.phases.length) {
          const nextRound = localRound + 1;
          if (nextRound > technique.rounds) {
            setState("done");
            recordSession();
            return;
          }
          localRound = nextRound;
          localPhaseIndex = 0;
          setRound(nextRound);
        } else {
          localPhaseIndex = nextPhaseIndex;
        }
        setPhaseIndex(localPhaseIndex);
        localPhaseStart = now;
        phaseStartRef.current = now;
        setCountdown(technique.phases[localPhaseIndex].duration);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [state, technique, phaseIndex, round]);

  const coachProps = {
    state,
    techniqueId: technique?.id ?? null,
    round,
    totalRounds: technique?.rounds ?? 0,
  };

  // Email gate (no coach or guide on this screen)
  if (state === "gated") {
    return <EmailGate onUnlock={() => setState("selecting")} />;
  }

  let content: React.ReactNode;

  // Wim Hof safety warning
  if (state === "warning" && technique) {
    content = (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm"
        >
          <div
            className="w-3 h-3 rounded-full mx-auto mb-6"
            style={{ backgroundColor: technique.color }}
          />
          <h2 className="text-xl font-light text-white mb-4">Before you begin</h2>
          <div className="text-sm text-white/50 leading-relaxed space-y-3 text-left">
            <p className="text-white/70 font-medium text-center">
              The Wim Hof Method involves controlled hyperventilation. Read these warnings carefully.
            </p>
            <p>
              <span className="text-red-400/90">Never practice in or near water</span>, while driving, standing, or anywhere a loss of consciousness could cause injury.
            </p>
            <p>
              Sit or lie down in a safe, comfortable position.
            </p>
            <p>
              Do not practice if you have epilepsy, are pregnant, have a history of seizures, or have serious cardiovascular conditions. Consult your doctor first.
            </p>
            <p className="text-white/30 text-xs">
              Tingling, lightheadedness, and mild dizziness are normal. Stop immediately if you feel pain or extreme discomfort.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleStop}
              className="flex-1 py-3 rounded-xl text-sm text-white/40 border border-white/10 active:scale-95 transition-transform"
            >
              Back
            </button>
            <button
              onClick={() => {
                setState("countdown");
                setStartCountdown(3);
              }}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-white/90 border active:scale-95 transition-transform"
              style={{
                borderColor: `${technique.color}40`,
                background: `${technique.color}15`,
              }}
            >
              I understand
            </button>
          </div>
        </motion.div>
      </div>
    );
  } else if (state === "done" && technique) {
    content = (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            className="w-4 h-4 rounded-full mx-auto mb-6"
            style={{ backgroundColor: technique.color }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <h2 className="text-2xl font-light text-white mb-2">Session complete</h2>
          <p className="text-sm text-white/50 mb-1">
            {technique.name}
          </p>
          <p className="text-xs text-white/30">
            {technique.rounds} rounds &middot; {Math.round(totalDuration / 60)} min
          </p>
          <div className="flex gap-3 mt-10">
            <button
              onClick={handleStop}
              className="px-5 py-3 rounded-full text-sm font-medium text-white/60 border border-white/10 active:scale-95 transition-all hover:bg-white/[0.06]"
            >
              Home
            </button>
            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-full text-sm font-medium text-white/90 active:scale-95 transition-all"
              style={{
                background: `${technique.color}20`,
                border: `1px solid ${technique.color}40`,
              }}
            >
              Breathe again
            </button>
            <button
              onClick={async () => {
                const url = window.location.origin;
                const text = `Try breathcult today. Align your natural hardware. Free breathing pacer, no app needed.`;
                if (navigator.share) {
                  try {
                    await navigator.share({ title: "breathcult", text, url });
                  } catch {}
                } else {
                  await navigator.clipboard.writeText(`${text} ${url}`);
                  const btn = document.getElementById("share-btn");
                  if (btn) btn.textContent = "Copied!";
                  setTimeout(() => {
                    if (btn) btn.textContent = "Share";
                  }, 2000);
                }
              }}
              id="share-btn"
              className="px-5 py-3 rounded-full text-sm font-medium text-white/60 border border-white/10 active:scale-95 transition-all hover:bg-white/[0.06]"
            >
              Share
            </button>
          </div>
        </motion.div>
      </div>
    );
  } else if (state === "countdown" && technique) {
    content = (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={startCountdown}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {startCountdown > 0 ? (
              <p
                className="text-7xl font-extralight"
                style={{ color: technique.color }}
              >
                {startCountdown}
              </p>
            ) : (
              <p className="text-3xl font-light text-white">Begin</p>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="text-sm text-white/30 mt-6">{technique.name}</p>
      </div>
    );
  } else if (state === "active" && technique && currentPhase) {
    const progress = totalElapsed / totalDuration;
    content = (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 relative">
        <div className="absolute top-12 right-6">
          <p className="text-xs text-white/25 tabular-nums">
            {round}/{technique.rounds}
          </p>
        </div>
        <div className="w-[300px] h-[300px]">
          <BreathingCircle
            phase={currentPhase}
            color={technique.color}
            countdown={countdown}
            progress={progress}
          />
        </div>
        <p className="text-xs text-white/20 mt-8">{technique.name}</p>
        <button
          onClick={handleStop}
          className="mt-6 px-6 py-2.5 rounded-full text-xs text-white/40 border border-white/10 active:scale-95 transition-transform"
        >
          Stop
        </button>
      </div>
    );
  } else {
    content = (
      <TechniqueSelector techniques={allTechniques} onSelect={handleSelect} />
    );
  }

  return (
    <>
      {content}
      <GuidePanel />
      <BreathCoach {...coachProps} />
    </>
  );
}
