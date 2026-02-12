import { useState, useCallback } from "react";
import DayNav from "./DayNav";
import ProductTour from "./ProductTour";
import MotivationCheck from "./MotivationCheck";
import ResultsReveal from "./ResultsReveal";
import MoodCheckIn from "./MoodCheckIn";
import BreathingReset from "./BreathingReset";
import PricedPlans from "./PricedPlans";
import JournalEntry from "./JournalEntry";
import MindfulnessBenefits from "./MindfulnessBenefits";
import ProgressView from "./ProgressView";
import ChooseRitual from "./ChooseRitual";
import GratitudeCheckIn from "./GratitudeCheckIn";
import PersonalInsight from "./PersonalInsight";
import ProgressSummary from "./ProgressSummary";
import ExploreCategories from "./ExploreCategories";
import ShareStreak from "./ShareStreak";
import {
  getWellnessState,
  saveWellnessState,
  markActivityComplete,
  computeFocusAreas,
  dayActivities,
  type AssessmentAnswers,
  type WellnessState,
} from "@/lib/wellness-data";

export default function WellnessPathway() {
  const [state, setState] = useState<WellnessState>(getWellnessState);

  const refresh = useCallback(() => {
    setState(getWellnessState());
  }, []);

  const advanceActivity = useCallback(() => {
    const activities = dayActivities[state.currentDay];
    markActivityComplete(state.currentDay, state.currentActivity);
    if (state.currentActivity < (activities?.length || 1) - 1) {
      const updated = saveWellnessState({ currentActivity: state.currentActivity + 1 });
      setState(updated);
    } else {
      // Move to next day
      const nextDay = Math.min(state.currentDay + 1, 7);
      const updated = saveWellnessState({
        currentDay: nextDay,
        currentActivity: 0,
        streak: nextDay,
        onboardingComplete: state.currentDay === 0 ? true : state.onboardingComplete,
      });
      setState(updated);
    }
  }, [state]);

  const handleSelectDay = useCallback((day: number) => {
    const updated = saveWellnessState({ currentDay: day, currentActivity: 0 });
    setState(updated);
  }, []);

  const handleAssessment = useCallback((answers: AssessmentAnswers) => {
    const focusAreas = computeFocusAreas(answers);
    const updated = saveWellnessState({ assessmentAnswers: answers, focusAreas });
    setState(updated);
    advanceActivity();
  }, [advanceActivity]);

  const handleMood = useCallback((mood: number, note?: string) => {
    const entry = { day: state.currentDay, mood, note, date: new Date().toISOString() };
    const updated = saveWellnessState({ moods: [...state.moods, entry] });
    setState(updated);
    advanceActivity();
  }, [state, advanceActivity]);

  const handleJournal = useCallback((response: string, prompt: string) => {
    const entry = { day: state.currentDay, prompt, response, date: new Date().toISOString() };
    const updated = saveWellnessState({ journals: [...state.journals, entry] });
    setState(updated);
    advanceActivity();
  }, [state, advanceActivity]);

  const handleGratitude = useCallback((items: string[]) => {
    const updated = saveWellnessState({ gratitude: [...state.gratitude, items] });
    setState(updated);
    advanceActivity();
  }, [state, advanceActivity]);

  const handleRitual = useCallback((choice: 'morning' | 'evening') => {
    const updated = saveWellnessState({ ritual: choice });
    setState(updated);
    advanceActivity();
  }, [advanceActivity]);

  // Render current activity
  const renderActivity = () => {
    const activities = dayActivities[state.currentDay];
    if (!activities) return <div className="p-8 text-center">Journey complete! 🎉</div>;

    const activity = activities[state.currentActivity];
    if (!activity) return <div className="p-8 text-center">All done for today!</div>;

    switch (activity.type) {
      case 'tour':
        return <ProductTour onComplete={advanceActivity} />;
      case 'assessment':
        return <MotivationCheck onComplete={handleAssessment} />;
      case 'results':
        return <ResultsReveal focusAreas={state.focusAreas} onStart={advanceActivity} />;
      case 'mood':
        return <MoodCheckIn onComplete={handleMood} onSkip={advanceActivity} skippable={activity.skippable} />;
      case 'breathing':
        return <BreathingReset onComplete={advanceActivity} onSkip={advanceActivity} skippable={activity.skippable} />;
      case 'plans':
        return <PricedPlans onComplete={advanceActivity} onSkip={advanceActivity} />;
      case 'journal':
        return (
          <JournalEntry
            title="Daily Calm Reflection"
            prompt="What's one thing you're grateful for today?"
            onComplete={(r) => handleJournal(r, "What's one thing you're grateful for today?")}
            onSkip={advanceActivity}
            skippable={activity.skippable}
          />
        );
      case 'benefits':
        return <MindfulnessBenefits onComplete={advanceActivity} onSkip={advanceActivity} />;
      case 'progress':
        return <ProgressView state={state} onComplete={advanceActivity} onSkip={advanceActivity} />;
      case 'ritual':
        return <ChooseRitual onComplete={handleRitual} onSkip={advanceActivity} />;
      case 'gratitude':
        return <GratitudeCheckIn onComplete={handleGratitude} onSkip={advanceActivity} />;
      case 'insight':
        return <PersonalInsight state={state} onComplete={advanceActivity} onSkip={advanceActivity} />;
      case 'reflection':
        return (
          <JournalEntry
            title="Weekly Reflection"
            prompt="What has changed for you this week?"
            onComplete={(r) => handleJournal(r, "What has changed for you this week?")}
            onSkip={advanceActivity}
            skippable={activity.skippable}
            large
            weekSummary={`This week you completed ${Object.keys(state.completedActivities).length} activities, logged ${state.moods.length} moods, and built a ${state.streak || state.currentDay}-day streak.`}
          />
        );
      case 'summary':
        return <ProgressSummary state={state} onComplete={advanceActivity} />;
      case 'categories':
        return <ExploreCategories onComplete={advanceActivity} onSkip={advanceActivity} />;
      case 'share':
        return <ShareStreak streak={state.streak || 7} onComplete={advanceActivity} onSkip={advanceActivity} />;
      default:
        return <div className="p-8 text-center">Unknown activity</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DayNav currentDay={state.currentDay} onSelectDay={handleSelectDay} maxDay={Math.max(state.currentDay, state.onboardingComplete ? 7 : 0)} />
      <main className="max-w-2xl mx-auto">
        {renderActivity()}
      </main>
    </div>
  );
}
