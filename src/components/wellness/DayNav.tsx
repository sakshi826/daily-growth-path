import { cn } from "@/lib/utils";

interface DayNavProps {
  currentDay: number;
  onSelectDay: (day: number) => void;
  maxDay: number;
}

const dayLabels = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
const dayStages = ['Onboarding', 'Activation', 'Habit', 'Engagement', 'Reinforcement', 'Depth', 'Confidence', 'Conversion'];

export default function DayNav({ currentDay, onSelectDay, maxDay }: DayNavProps) {
  return (
    <div className="w-full overflow-x-auto bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-1 px-4 py-3 min-w-max mx-auto max-w-2xl">
        {dayLabels.map((label, i) => {
          const isActive = i === currentDay;
          const isCompleted = i < currentDay;
          const isLocked = i > maxDay;

          return (
            <button
              key={i}
              onClick={() => !isLocked && onSelectDay(i)}
              disabled={isLocked}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px]",
                isActive && "bg-primary text-primary-foreground shadow-lg scale-105",
                isCompleted && !isActive && "bg-secondary/30 text-secondary",
                isLocked && "opacity-30 cursor-not-allowed",
                !isActive && !isCompleted && !isLocked && "hover:bg-muted"
              )}
            >
              <div className={cn(
                "w-3 h-3 rounded-full transition-all",
                isActive && "bg-primary-foreground",
                isCompleted && !isActive && "bg-secondary",
                !isActive && !isCompleted && "bg-border"
              )} />
              <span className="text-xs font-bold">{label}</span>
              <span className="text-[10px] opacity-70">{dayStages[i]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
