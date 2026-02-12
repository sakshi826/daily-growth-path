import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle, Award } from "lucide-react";

interface Props {
  streak: number;
  onComplete: () => void;
  onSkip: () => void;
}

export default function ShareStreak({ streak, onComplete, onSkip }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `🏆 I just completed a ${streak}-day wellness journey! Feeling calmer, more focused, and grateful. Join me! ✨`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <h2 className="text-2xl font-extrabold mb-8">Share Your Achievement</h2>

      {/* Shareable card */}
      <div className="bg-gradient-to-br from-coral/20 via-sunshine/10 to-teal/20 rounded-3xl p-8 max-w-sm w-full mb-8 border border-coral/20">
        <div className="flex justify-center mb-4">
          <Award className="w-16 h-16 text-sunshine" />
        </div>
        <h3 className="text-xl font-extrabold text-center mb-2">🎉 {streak}-Day Streak!</h3>
        <p className="text-center text-muted-foreground text-sm">
          Completed a full wellness pathway with breathing exercises, mood tracking, journaling, and more.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button size="lg" onClick={handleShare} className="rounded-full px-8 font-bold gap-2">
          {copied ? <CheckCircle className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          {copied ? "Copied!" : "Share"}
        </Button>
      </div>

      <Button variant="link" onClick={onComplete} className="mt-4 text-muted-foreground">
        Finish Journey →
      </Button>
    </div>
  );
}
