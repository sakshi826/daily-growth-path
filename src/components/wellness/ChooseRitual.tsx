import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onComplete: (choice: 'morning' | 'evening') => void;
  onSkip: () => void;
}

export default function ChooseRitual({ onComplete, onSkip }: Props) {
  const [selected, setSelected] = useState<'morning' | 'evening' | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-2">Choose Your Ritual</h2>
      <p className="text-muted-foreground mb-8">When would you like to practice?</p>

      <div className="flex gap-4 mb-8">
        {(['morning', 'evening'] as const).map(opt => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`flex flex-col items-center gap-3 p-8 rounded-3xl border-2 transition-all duration-300 w-40 ${
              selected === opt
                ? opt === 'morning'
                  ? "border-sunshine bg-sunshine/15 scale-105 shadow-lg"
                  : "border-lavender bg-lavender/15 scale-105 shadow-lg"
                : "border-border hover:scale-102"
            }`}
          >
            <span className="text-5xl">{opt === 'morning' ? '☀️' : '🌙'}</span>
            <span className="font-bold capitalize text-lg">{opt}</span>
            <span className="text-xs text-muted-foreground">
              {opt === 'morning' ? 'Start your day calm' : 'Wind down peacefully'}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button
          size="lg"
          disabled={!selected}
          onClick={() => selected && onComplete(selected)}
          className="rounded-full px-8 font-bold"
        >
          Choose
        </Button>
      </div>
    </div>
  );
}
