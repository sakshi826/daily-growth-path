import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Moon, Brain, Briefcase, Baby, Music, Heart } from "lucide-react";

const slides = [
  {
    title: "Welcome to Your Wellness Journey",
    description: "A guided 7-day pathway designed to bring calm, clarity, and balance into your daily life.",
    icon: Sparkles,
    gradient: "from-coral to-sunshine",
    bgColor: "bg-coral/10",
  },
  {
    title: "Explore Rich Categories",
    description: "From Sleep & Focus to Stress Relief, Work, Kids, Music, and Mental Health — we've got you covered.",
    icons: [Moon, Brain, Briefcase, Baby, Music, Heart],
    gradient: "from-teal to-sage",
    bgColor: "bg-teal/10",
  },
  {
    title: "Daily Activities, Your Pace",
    description: "Each day brings curated activities — breathing exercises, reflections, mood tracking, and personalized insights.",
    icon: Brain,
    gradient: "from-lavender to-blush",
    bgColor: "bg-lavender/10",
  },
  {
    title: "Track Your Growth",
    description: "Watch your streak grow, see mood trends, and celebrate milestones along the way.",
    icon: Sparkles,
    gradient: "from-sunshine to-coral",
    bgColor: "bg-sunshine/10",
  },
  {
    title: "Ready to Begin?",
    description: "Let's start with a quick assessment to personalize your experience. Your journey to wellness starts now!",
    icon: Heart,
    gradient: "from-coral to-lavender",
    bgColor: "bg-coral/10",
  },
];

interface ProductTourProps {
  onComplete: () => void;
}

export default function ProductTour({ onComplete }: ProductTourProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (current < slides.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          setCurrent(c => c + 1);
          setAnimating(false);
        }, 300);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [current]);

  const slide = slides[current];
  const Icon = slide.icon || Sparkles;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary" : i < current ? "w-2 bg-secondary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>

      <div
        className={`flex flex-col items-center text-center max-w-md transition-all duration-500 ${
          animating ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Illustration */}
        <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8 animate-float`}>
          {'icons' in slide && slide.icons ? (
            <div className="grid grid-cols-3 gap-2">
              {slide.icons.map((Ic, i) => (
                <Ic key={i} className="w-8 h-8 text-primary-foreground" />
              ))}
            </div>
          ) : (
            <Icon className="w-16 h-16 text-primary-foreground" />
          )}
        </div>

        <h2 className="text-2xl font-extrabold mb-4">{slide.title}</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">{slide.description}</p>
      </div>

      {current === slides.length - 1 && (
        <Button
          size="lg"
          onClick={onComplete}
          className="animate-slide-up rounded-full px-8 py-6 text-lg font-bold bg-primary hover:bg-primary/90 animate-pulse-glow"
        >
          Let's Go! →
        </Button>
      )}
    </div>
  );
}
