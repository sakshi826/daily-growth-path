import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Flame, CheckCircle, TrendingUp, Award } from "lucide-react";
import type { WellnessState } from "@/lib/wellness-data";

interface Props {
  state: WellnessState;
  onComplete: () => void;
}

const milestones = [
  { day: 0, label: "Started your journey", icon: "🚀" },
  { day: 1, label: "First mood logged", icon: "😊" },
  { day: 2, label: "Journaled reflections", icon: "✍️" },
  { day: 3, label: "Learned mindfulness benefits", icon: "🧠" },
  { day: 4, label: "Practiced gratitude", icon: "🙏" },
  { day: 5, label: "Gained personal insights", icon: "✨" },
  { day: 6, label: "Reflected on the week", icon: "💭" },
  { day: 7, label: "Completed 7-day pathway!", icon: "🏆" },
];

export default function ProgressSummary({ state, onComplete }: Props) {
  const [visibleMilestones, setVisibleMilestones] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleMilestones(v => {
        if (v >= milestones.length) { clearInterval(interval); return v; }
        return v + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const completedCount = Object.keys(state.completedActivities).length;

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-6 py-8">
      <div className="flex items-center gap-2 mb-2">
        <Award className="w-8 h-8 text-sunshine" />
        <h2 className="text-2xl font-extrabold">Your 7-Day Journey</h2>
      </div>
      <p className="text-muted-foreground mb-8">What an incredible week!</p>

      {/* Stats row */}
      <div className="flex gap-4 mb-8">
        <div className="bg-coral/10 rounded-2xl px-5 py-3 text-center">
          <Flame className="w-5 h-5 text-coral mx-auto mb-1" />
          <div className="text-xl font-extrabold">7</div>
          <div className="text-xs text-muted-foreground">Days</div>
        </div>
        <div className="bg-teal/10 rounded-2xl px-5 py-3 text-center">
          <CheckCircle className="w-5 h-5 text-teal mx-auto mb-1" />
          <div className="text-xl font-extrabold">{completedCount}</div>
          <div className="text-xs text-muted-foreground">Activities</div>
        </div>
        <div className="bg-lavender/10 rounded-2xl px-5 py-3 text-center">
          <TrendingUp className="w-5 h-5 text-lavender mx-auto mb-1" />
          <div className="text-xl font-extrabold">{state.moods.length}</div>
          <div className="text-xs text-muted-foreground">Moods</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-sm w-full mb-8">
        {milestones.map((m, i) => (
          <div
            key={m.day}
            className={`flex items-center gap-3 py-2 transition-all duration-300 ${
              i < visibleMilestones ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg flex-shrink-0">
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{m.label}</div>
              <div className="text-xs text-muted-foreground">Day {m.day}</div>
            </div>
            {i <= state.currentDay && (
              <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button size="lg" onClick={onComplete} className="rounded-full px-8 font-bold animate-pulse-glow">
        Continue 🎉
      </Button>
    </div>
  );
}
