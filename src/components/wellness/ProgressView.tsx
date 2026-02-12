import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { WellnessState } from "@/lib/wellness-data";

interface Props {
  state: WellnessState;
  onComplete: () => void;
  onSkip: () => void;
}

const moodLabels = ["", "😢", "😟", "😐", "🙂", "😊"];

export default function ProgressView({ state, onComplete, onSkip }: Props) {
  const completedCount = Object.keys(state.completedActivities).length;
  const moodData = state.moods.map((m, i) => ({
    name: `Day ${m.day}`,
    mood: m.mood,
    label: moodLabels[m.mood],
  }));

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-6 py-8">
      <h2 className="text-2xl font-extrabold mb-8">Your Progress</h2>

      {/* Streak */}
      <div className="flex items-center gap-3 mb-8 bg-coral/10 rounded-2xl px-6 py-4">
        <Flame className="w-8 h-8 text-coral animate-float" />
        <div>
          <div className="text-3xl font-extrabold">{state.streak || state.currentDay}</div>
          <div className="text-sm text-muted-foreground font-semibold">Day Streak</div>
        </div>
      </div>

      {/* Day progress bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex justify-between mb-2 text-sm font-semibold text-muted-foreground">
          <span>Day {state.currentDay}</span>
          <span>Day 7</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-coral to-teal rounded-full transition-all duration-500"
            style={{ width: `${(state.currentDay / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Mood chart */}
      {moodData.length > 0 && (
        <div className="w-full max-w-sm mb-8">
          <h3 className="font-bold mb-3">Mood Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={moodData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[1, 5]} hide />
              <Tooltip formatter={(v: number) => moodLabels[v]} />
              <Line type="monotone" dataKey="mood" stroke="hsl(174, 55%, 55%)" strokeWidth={3} dot={{ fill: "hsl(12, 80%, 65%)", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Stats */}
      <div className="bg-card rounded-2xl p-4 border border-border max-w-sm w-full mb-8">
        <div className="text-sm text-muted-foreground">Activities completed</div>
        <div className="text-2xl font-extrabold">{completedCount}</div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button size="lg" onClick={onComplete} className="rounded-full px-8 font-bold">Continue</Button>
      </div>
    </div>
  );
}
