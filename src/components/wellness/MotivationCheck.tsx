import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { AssessmentAnswers } from "@/lib/wellness-data";

const questions = [
  {
    question: "What brings you here?",
    options: ["Better sleep", "Reduce stress", "Improve focus", "Support for depression", "Learn meditation"],
    key: "motivation" as const,
  },
  {
    question: "How often do you feel overwhelmed?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
    key: "overwhelm" as const,
  },
  {
    question: "Have you tried meditation before?",
    options: ["Never", "A few times", "Regularly but stopped", "I practice regularly"],
    key: "experience" as const,
  },
  {
    question: "When do you feel most stressed?",
    options: ["Morning", "Afternoon", "Evening", "Night", "All day"],
    key: "stressTime" as const,
  },
  {
    question: "What does success look like for you?",
    options: ["Feeling calmer", "Sleeping better", "Being more focused", "Understanding my emotions", "All of the above"],
    key: "success" as const,
  },
];

const optionColors = [
  "border-coral/40 hover:bg-coral/10 data-[selected=true]:bg-coral/20 data-[selected=true]:border-coral",
  "border-teal/40 hover:bg-teal/10 data-[selected=true]:bg-teal/20 data-[selected=true]:border-teal",
  "border-lavender/40 hover:bg-lavender/10 data-[selected=true]:bg-lavender/20 data-[selected=true]:border-lavender",
  "border-sunshine/40 hover:bg-sunshine/10 data-[selected=true]:bg-sunshine/20 data-[selected=true]:border-sunshine",
  "border-blush/40 hover:bg-blush/10 data-[selected=true]:bg-blush/20 data-[selected=true]:border-blush",
];

interface Props {
  onComplete: (answers: AssessmentAnswers) => void;
}

export default function MotivationCheck({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});
  const [animating, setAnimating] = useState(false);

  const q = questions[step];
  const selected = answers[q.key];

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [q.key]: option }));
  };

  const handleNext = () => {
    if (!selected) return;
    if (step < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(s => s + 1);
        setAnimating(false);
      }, 300);
    } else {
      onComplete(answers as AssessmentAnswers);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-6 py-8">
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-muted-foreground">Question {step + 1} of {questions.length}</span>
        </div>
        <Progress value={((step + 1) / questions.length) * 100} className="h-2" />
      </div>

      <div
        className={`flex flex-col items-center w-full max-w-md flex-1 transition-all duration-300 ${
          animating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-extrabold text-center mb-8 mt-4">{q.question}</h2>

        <div className="flex flex-col gap-3 w-full mb-8">
          {q.options.map((option, i) => (
            <button
              key={option}
              data-selected={selected === option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 font-semibold text-base ${
                optionColors[i % optionColors.length]
              } ${selected === option ? "scale-[1.02] shadow-md" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>

        <Button
          size="lg"
          disabled={!selected}
          onClick={handleNext}
          className="rounded-full px-8 py-6 text-lg font-bold w-full max-w-xs"
        >
          {step === questions.length - 1 ? "See Results" : "Next →"}
        </Button>
      </div>
    </div>
  );
}
