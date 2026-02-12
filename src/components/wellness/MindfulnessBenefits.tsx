import { Button } from "@/components/ui/button";
import { Moon, Brain, Heart, Smile } from "lucide-react";

const benefits = [
  { icon: Heart, label: "Reduced Stress", desc: "Lower cortisol levels and feel more at ease", color: "text-coral" },
  { icon: Moon, label: "Better Sleep", desc: "Fall asleep faster and sleep more deeply", color: "text-lavender" },
  { icon: Brain, label: "Improved Focus", desc: "Sharpen attention and reduce mental clutter", color: "text-teal" },
  { icon: Smile, label: "Emotional Regulation", desc: "Respond thoughtfully instead of reacting impulsively", color: "text-sunshine" },
];

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

export default function MindfulnessBenefits({ onComplete, onSkip }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-2">Why Mindfulness?</h2>
      <p className="text-muted-foreground mb-8">Science-backed benefits of daily practice</p>

      <div className="flex flex-col gap-4 max-w-sm w-full mb-8">
        {benefits.map((b, i) => (
          <div
            key={b.label}
            className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border animate-slide-up shadow-sm"
            style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'backwards' }}
          >
            <div className={`p-2 rounded-xl bg-muted ${b.color}`}>
              <b.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">{b.label}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button size="lg" onClick={onComplete} className="rounded-full px-8 font-bold">Got It ✨</Button>
      </div>
    </div>
  );
}
