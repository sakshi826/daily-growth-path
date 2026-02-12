import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onComplete: (items: string[]) => void;
  onSkip: () => void;
}

export default function GratitudeCheckIn({ onComplete, onSkip }: Props) {
  const [items, setItems] = useState(["", "", ""]);

  const update = (i: number, val: string) => {
    const copy = [...items];
    copy[i] = val;
    setItems(copy);
  };

  const hasAny = items.some(i => i.trim());

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-2">Gratitude Check-In</h2>
      <p className="text-muted-foreground mb-8">Name 3 things you're grateful for</p>

      <div className="flex flex-col gap-4 max-w-sm w-full mb-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 200}ms`, animationFillMode: 'backwards' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{['🌟', '💛', '✨'][i]}</span>
              <Input
                placeholder={`I'm grateful for...`}
                value={item}
                onChange={e => update(i, e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button
          size="lg"
          disabled={!hasAny}
          onClick={() => onComplete(items.filter(i => i.trim()))}
          className="rounded-full px-8 font-bold"
        >
          Log Gratitude 🙏
        </Button>
      </div>
    </div>
  );
}
