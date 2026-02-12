import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  prompt: string;
  title: string;
  onComplete: (response: string) => void;
  onSkip: () => void;
  skippable: boolean;
  large?: boolean;
  weekSummary?: string;
}

export default function JournalEntry({ prompt, title, onComplete, onSkip, skippable, large, weekSummary }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-2">{title}</h2>

      {weekSummary && (
        <div className="bg-secondary/20 rounded-2xl p-4 mb-6 max-w-md w-full text-sm text-muted-foreground">
          {weekSummary}
        </div>
      )}

      <div className="bg-gradient-to-br from-coral/10 to-lavender/10 rounded-2xl p-6 mb-6 max-w-md w-full">
        <p className="text-lg font-semibold text-center italic">"{prompt}"</p>
      </div>

      <Textarea
        placeholder="Write your thoughts..."
        value={text}
        onChange={e => setText(e.target.value)}
        className={`max-w-md w-full rounded-xl mb-8 ${large ? "min-h-[200px]" : "min-h-[120px]"}`}
      />

      <div className="flex gap-3">
        {skippable && (
          <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        )}
        <Button
          size="lg"
          disabled={!text.trim()}
          onClick={() => onComplete(text)}
          className="rounded-full px-8 font-bold"
        >
          Save ✍️
        </Button>
      </div>
    </div>
  );
}
