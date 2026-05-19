export type Phase = {
  label: string;
  duration: number;
};

export type Technique = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  phases: Phase[];
  rounds: number;
  description: string;
};

export const techniques: Technique[] = [
  {
    id: "box",
    name: "Box Breathing",
    tagline: "🎯 Focus & calm",
    color: "#3b82f6",
    description: "Used by Navy SEALs. Equal parts inhale, hold, exhale, hold.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Exhale", duration: 4 },
      { label: "Hold", duration: 4 },
    ],
    rounds: 19,
  },
  {
    id: "478",
    name: "4-7-8",
    tagline: "🌙 Sleep & wind-down",
    color: "#8b5cf6",
    description: "Dr. Andrew Weil's technique. The natural tranquilizer.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Exhale", duration: 8 },
    ],
    rounds: 4,
  },
  {
    id: "sigh",
    name: "Physiological Sigh",
    tagline: "⚡ Instant reset",
    color: "#10b981",
    description: "Stanford-studied. One breath can change your state.",
    phases: [
      { label: "Inhale", duration: 2 },
      { label: "Sniff", duration: 1 },
      { label: "Exhale", duration: 6 },
    ],
    rounds: 3,
  },
  {
    id: "resonant",
    name: "Resonant",
    tagline: "🧘 HRV & coherence",
    color: "#f59e0b",
    description: "5.5 breaths/min. Where your systems sync up.",
    phases: [
      { label: "Inhale", duration: 5.5 },
      { label: "Exhale", duration: 5.5 },
    ],
    rounds: 27,
  },
  {
    id: "wimhof",
    name: "Wim Hof",
    tagline: "🔥 Energy & power",
    color: "#ef4444",
    description: "Controlled hyperventilation + hold. Morning activation only.",
    phases: [
      ...Array.from({ length: 30 }, () => ({ label: "Power Breath", duration: 2.5 })),
      { label: "Hold Empty", duration: 60 },
      { label: "Recovery Breath", duration: 15 },
    ],
    rounds: 3,
  },
  {
    id: "cyclic",
    name: "Cyclic Sighing",
    tagline: "☀️ Daily mood boost",
    color: "#06b6d4",
    description: "Beat meditation in a Stanford trial. 5 min/day.",
    phases: [
      { label: "Inhale", duration: 3 },
      { label: "Sniff", duration: 1 },
      { label: "Exhale", duration: 8 },
    ],
    rounds: 25,
  },
];
