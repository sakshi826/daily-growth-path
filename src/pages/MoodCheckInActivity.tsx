import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const moods = [
  { emoji: "😊", label: "Great", value: 5 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "😟", label: "Low", value: 2 },
  { emoji: "😢", label: "Struggling", value: 1 },
];

export default function MoodCheckInActivity() {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLog = () => {
    if (selected === null) return;
    const moodData = { mood: selected, note: note || undefined, date: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("mood_logs") || "[]");
    existing.push(moodData);
    localStorage.setItem("mood_logs", JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    const moodLabel = moods.find(m => m.value === selected)?.label;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-background">
        <div className="animate-scale-in text-center">
          <span className="text-6xl mb-4 block">✅</span>
          <h2 className="text-2xl font-extrabold mb-2 text-foreground">Mood Logged!</h2>
          <p className="text-muted-foreground mb-6">
            You're feeling <span className="font-bold text-foreground">{moodLabel}</span> today.
          </p>
          <Button
            onClick={() => { setSubmitted(false); setSelected(null); setNote(""); }}
            variant="outline"
            className="rounded-full px-6"
          >
            Log Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-background">
      <h2 className="text-2xl font-extrabold mb-2 text-foreground">How are you feeling?</h2>
      <p className="text-muted-foreground mb-8">Tap to select your mood</p>

      <div className="flex gap-4 mb-8">
        {moods.map(m => (
          <button
            key={m.value}
            onClick={() => setSelected(m.value)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 ${
              selected === m.value ? "animate-bounce-select bg-primary/10 scale-110 shadow-lg" : "hover:scale-105"
            }`}
          >
            <span className="text-4xl">{m.emoji}</span>
            <span className="text-xs font-semibold text-muted-foreground">{m.label}</span>
          </button>
        ))}
      </div>

      <Input
        placeholder="Add a note (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
        className="max-w-xs rounded-xl mb-8"
      />

      <div className="flex gap-3">
        <Button variant="ghost" onClick={() => { setSelected(null); setNote(""); }} className="rounded-full px-6">
          Skip
        </Button>
        <Button
          size="lg"
          disabled={selected === null}
          onClick={handleLog}
          className="rounded-full px-8 font-bold"
        >
          Log Mood
        </Button>
      </div>
    </div>
  );
}
