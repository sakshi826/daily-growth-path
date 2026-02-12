import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

const plans = [
  { name: "Free", price: "$0", period: "forever", features: ["7-day pathway", "Mood tracking", "Breathing exercises"], color: "border-border" },
  { name: "Premium", price: "$9.99", period: "/month", features: ["Everything in Free", "Unlimited sessions", "Advanced insights", "All categories"], color: "border-coral", popular: true },
  { name: "Annual", price: "$59.99", period: "/year", features: ["Everything in Premium", "50% savings", "Priority support", "Family sharing"], color: "border-teal" },
];

export default function PricedPlans({ onComplete, onSkip }: Props) {
  return (
    <div className="flex flex-col items-center min-h-[80vh] px-6 py-8">
      <h2 className="text-2xl font-extrabold mb-2">Choose Your Plan</h2>
      <p className="text-muted-foreground mb-8">Continue your wellness journey</p>

      <div className="flex flex-col gap-4 w-full max-w-sm mb-8">
        {plans.map(plan => (
          <Card key={plan.name} className={`border-2 ${plan.color} ${plan.popular ? "shadow-lg scale-[1.02]" : ""} rounded-2xl`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                {plan.popular && <span className="text-xs bg-coral/20 text-coral px-2 py-1 rounded-full font-bold">Popular</span>}
              </div>
              <div>
                <span className="text-2xl font-extrabold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-teal" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="rounded-full px-6">Skip</Button>
        <Button size="lg" onClick={onComplete} className="rounded-full px-8 font-bold">Continue</Button>
      </div>
    </div>
  );
}
