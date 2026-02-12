import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

const INHALE_DURATION = 4000;
const HOLD_DURATION = 4000;
const EXHALE_DURATION = 4000;
const CYCLE_DURATION = INHALE_DURATION + HOLD_DURATION + EXHALE_DURATION;
const TOTAL_DURATION = 120; // 2 minutes

interface Props {
  onComplete: () => void;
  onSkip: () => void;
  skippable: boolean;
}

export default function BreathingReset({ onComplete, onSkip, skippable }: Props) {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);

  const phaseText: Record<Phase, string> = {
    idle: "Press Begin to start",
    inhale: "Breathe in...",
    hold: "Hold...",
    exhale: "Breathe out...",
  };

  const runCycle = useCallback(() => {
    setPhase('inhale');
    const t1 = setTimeout(() => setPhase('hold'), INHALE_DURATION);
    const t2 = setTimeout(() => setPhase('exhale'), INHALE_DURATION + HOLD_DURATION);
    return [t1, t2];
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers = runCycle();
    const interval = setInterval(() => {
      const newTimers = runCycle();
      timers.push(...newTimers);
    }, CYCLE_DURATION);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [started, runCycle]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, onComplete]);

  const bubbleScale = phase === 'inhale' ? 'scale-100' : phase === 'exhale' ? 'scale-[0.6]' : phase === 'hold' ? 'scale-100' : 'scale-[0.6]';
  const bubbleOpacity = phase === 'exhale' ? 'opacity-50' : 'opacity-100';

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-2">Breathing Reset</h2>
      <p className="text-muted-foreground mb-8">2-minute nervous system regulation</p>

      <div className="relative flex items-center justify-center mb-8">
        <div
          className={`w-48 h-48 rounded-full breathing-bubble transition-all ease-in-out flex items-center justify-center ${bubbleScale} ${bubbleOpacity}`}
          style={{ transitionDuration: phase === 'inhale' ? '4s' : phase === 'exhale' ? '4s' : '0.3s' }}
        >
          <span className="text-lg font-bold text-foreground/80">{phaseText[phase]}</span>
        </div>
      </div>

      {started && (
        <div className="text-3xl font-bold text-muted-foreground mb-8 tabular-nums">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      )}

      <div className="flex gap-3">
        {skippable && (
          <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">
            Skip
          </Button>
        )}
        {!started ? (
          <Button size="lg" onClick={() => setStarted(true)} className="rounded-full px-8 font-bold">
            Begin
          </Button>
        ) : (
          <Button variant="outline" onClick={onComplete} className="rounded-full px-8">
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
