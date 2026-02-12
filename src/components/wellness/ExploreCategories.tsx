import { Button } from "@/components/ui/button";

const categories = [
  { name: "Sleep", emoji: "🌙", color: "bg-lavender/20 border-lavender" },
  { name: "Focus", emoji: "🎯", color: "bg-teal/20 border-teal" },
  { name: "Stress", emoji: "🧘", color: "bg-sage/20 border-sage" },
  { name: "Work", emoji: "💼", color: "bg-sky/20 border-sky" },
  { name: "Kids", emoji: "👶", color: "bg-sunshine/20 border-sunshine" },
  { name: "Music", emoji: "🎵", color: "bg-blush/20 border-blush" },
  { name: "Mental Health", emoji: "💚", color: "bg-coral/20 border-coral" },
];

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

export default function ExploreCategories({ onComplete, onSkip }: Props) {
  return (
    <div className="flex flex-col items-center min-h-[80vh] px-6 py-8">
      <h2 className="text-2xl font-extrabold mb-2">Explore Categories</h2>
      <p className="text-muted-foreground mb-8">Discover more content tailored for you</p>

      <div className="grid grid-cols-2 gap-3 max-w-sm w-full mb-8">
        {categories.map((c, i) => (
          <button
            key={c.name}
            className={`flex flex-col items-center gap-2 p-6 rounded-2xl border-2 ${c.color} hover:scale-105 transition-all duration-200 animate-slide-up`}
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
          >
            <span className="text-3xl">{c.emoji}</span>
            <span className="font-bold text-sm">{c.name}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button size="lg" onClick={onComplete} className="rounded-full px-8 font-bold">Continue</Button>
      </div>
    </div>
  );
}
