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

interface Props {
  onComplete: (mood: number, note?: string) => void;
  onSkip: () => void;
  skippable: boolean;
}

export default function MoodCheckIn({ onComplete, onSkip, skippable }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-2">How are you feeling?</h2>
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
        {skippable && (
          <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">
            Skip
          </Button>
        )}
        <Button
          size="lg"
          disabled={selected === null}
          onClick={() => selected !== null && onComplete(selected, note || undefined)}
          className="rounded-full px-8 font-bold"
        >
          Log Mood
        </Button>
      </div>
    </div>
  );
}
