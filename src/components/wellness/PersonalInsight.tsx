import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import type { WellnessState } from "@/lib/wellness-data";

interface Props {
  state: WellnessState;
  onComplete: () => void;
  onSkip: () => void;
}

export default function PersonalInsight({ state, onComplete, onSkip }: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setTimeout(() => setRevealed(true), 600);
  }, []);

  const avgMood = state.moods.length
    ? (state.moods.reduce((s, m) => s + m.mood, 0) / state.moods.length).toFixed(1)
    : "N/A";

  const insight = state.moods.length >= 2
    ? "You tend to feel calmer after practicing — keep it up!"
    : "Keep logging moods to unlock personalized insights about your wellness patterns.";

  // Confetti particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['bg-coral', 'bg-teal', 'bg-sunshine', 'bg-lavender', 'bg-blush'][i % 5],
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 relative overflow-hidden">
      {/* Confetti */}
      {revealed && particles.map(p => (
        <div
          key={p.id}
          className={`absolute w-2 h-2 rounded-full ${p.color} animate-confetti`}
          style={{
            left: `${p.x}%`,
            top: '50%',
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className={`transition-all duration-700 ${revealed ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div className="flex items-center gap-2 justify-center mb-6">
          <Sparkles className="w-6 h-6 text-sunshine" />
          <h2 className="text-2xl font-extrabold">Personal Insight</h2>
        </div>

        <div className="bg-gradient-to-br from-sunshine/20 to-coral/10 rounded-3xl p-8 max-w-sm mb-6">
          <p className="text-lg font-semibold text-center mb-4">{insight}</p>
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Average mood: </span>
            <span className="text-xl font-extrabold">{avgMood}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
          <Button size="lg" onClick={onComplete} className="rounded-full px-8 font-bold">Continue ✨</Button>
        </div>
      </div>
    </div>
  );
}
