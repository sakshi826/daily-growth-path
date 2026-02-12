import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp } from "lucide-react";

const areaIcons: Record<string, string> = {
  Sleep: "🌙", Focus: "🎯", Stress: "🧘", "Mental Health": "💚",
  Meditation: "🧠", Music: "🎵", Work: "💼",
};

const areaColors: Record<string, string> = {
  Sleep: "bg-lavender/20 border-lavender", Focus: "bg-teal/20 border-teal",
  Stress: "bg-sage/20 border-sage", "Mental Health": "bg-blush/20 border-blush",
  Meditation: "bg-coral/20 border-coral", Music: "bg-sunshine/20 border-sunshine",
  Work: "bg-sky/20 border-sky",
};

interface Props {
  focusAreas: string[];
  onStart: () => void;
}

export default function ResultsReveal({ focusAreas, onStart }: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setTimeout(() => setRevealed(true), 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className={`transition-all duration-700 ${revealed ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div className="flex items-center gap-2 mb-6 justify-center">
          <Sparkles className="w-6 h-6 text-coral" />
          <h2 className="text-2xl font-extrabold">Your Focus Areas</h2>
        </div>

        <div className="flex flex-col gap-4 mb-8 max-w-sm mx-auto">
          {focusAreas.map((area, i) => (
            <div
              key={area}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${areaColors[area] || "bg-muted border-border"} animate-slide-up`}
              style={{ animationDelay: `${i * 200 + 300}ms`, animationFillMode: 'backwards' }}
            >
              <span className="text-3xl">{areaIcons[area] || "✨"}</span>
              <span className="text-lg font-bold">{area}</span>
            </div>
          ))}
        </div>

        <div className="bg-secondary/20 rounded-2xl p-5 mb-8 max-w-sm mx-auto animate-slide-up" style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-teal" />
            <span className="font-bold text-sm">Did you know?</span>
          </div>
          <p className="text-muted-foreground text-sm">
            <strong>92% of users</strong> saw improvement in their focus areas within the first week.
          </p>
        </div>

        <p className="text-center text-muted-foreground mb-8 max-w-xs mx-auto">
          We've personalized your 7-day plan to help you build lasting habits around what matters most to you.
        </p>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={onStart}
            className="rounded-full px-10 py-6 text-lg font-bold animate-pulse-glow"
          >
            Start 7-Day Plan 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}
