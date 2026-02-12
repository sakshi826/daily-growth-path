// Types
export interface MoodEntry {
  day: number;
  mood: number; // 1-5
  note?: string;
  date: string;
}

export interface JournalEntry {
  day: number;
  prompt: string;
  response: string;
  date: string;
}

export interface AssessmentAnswers {
  motivation: string;
  overwhelm: string;
  experience: string;
  stressTime: string;
  success: string;
}

export interface WellnessState {
  currentDay: number;
  currentActivity: number;
  assessmentAnswers: AssessmentAnswers | null;
  focusAreas: string[];
  moods: MoodEntry[];
  journals: JournalEntry[];
  gratitude: string[][];
  ritual: 'morning' | 'evening' | null;
  completedActivities: Record<string, boolean>;
  streak: number;
  onboardingComplete: boolean;
}

const STORAGE_KEY = 'wellness-pathway';

const defaultState: WellnessState = {
  currentDay: 0,
  currentActivity: 0,
  assessmentAnswers: null,
  focusAreas: [],
  moods: [],
  journals: [],
  gratitude: [],
  ritual: null,
  completedActivities: {},
  streak: 0,
  onboardingComplete: false,
};

export function getWellnessState(): WellnessState {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? { ...defaultState, ...JSON.parse(data) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

export function saveWellnessState(state: Partial<WellnessState>) {
  const current = getWellnessState();
  const updated = { ...current, ...state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function markActivityComplete(day: number, activity: number) {
  const state = getWellnessState();
  const key = `${day}-${activity}`;
  state.completedActivities[key] = true;
  saveWellnessState(state);
}

export function isActivityComplete(day: number, activity: number): boolean {
  const state = getWellnessState();
  return !!state.completedActivities[`${day}-${activity}`];
}

export function resetWellnessState() {
  localStorage.removeItem(STORAGE_KEY);
}

// Assessment logic
export function computeFocusAreas(answers: AssessmentAnswers): string[] {
  const areas: Record<string, number> = {
    Sleep: 0, Focus: 0, Stress: 0, 'Mental Health': 0, Meditation: 0, Music: 0, Work: 0,
  };

  if (answers.motivation === 'Better sleep') areas.Sleep += 3;
  if (answers.motivation === 'Reduce stress') areas.Stress += 3;
  if (answers.motivation === 'Improve focus') areas.Focus += 3;
  if (answers.motivation === 'Support for depression') areas['Mental Health'] += 3;
  if (answers.motivation === 'Learn meditation') areas.Meditation += 3;

  if (answers.overwhelm === 'Often' || answers.overwhelm === 'Almost always') {
    areas.Stress += 2;
    areas['Mental Health'] += 1;
  }

  if (answers.stressTime === 'Night' || answers.stressTime === 'Evening') areas.Sleep += 2;
  if (answers.stressTime === 'Morning' || answers.stressTime === 'Afternoon') areas.Work += 1;
  if (answers.stressTime === 'All day') { areas.Stress += 2; areas['Mental Health'] += 1; }

  if (answers.success === 'Feeling calmer') areas.Stress += 1;
  if (answers.success === 'Sleeping better') areas.Sleep += 2;
  if (answers.success === 'Being more focused') areas.Focus += 2;
  if (answers.success === 'Understanding my emotions') areas['Mental Health'] += 2;
  if (answers.success === 'All of the above') {
    Object.keys(areas).forEach(k => areas[k] += 1);
  }

  return Object.entries(areas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);
}

// Day activity definitions
export interface ActivityDef {
  id: string;
  title: string;
  type: string;
  cta: string;
  skippable: boolean;
}

export const dayActivities: Record<number, ActivityDef[]> = {
  0: [
    { id: 'tour', title: 'Product Tour', type: 'tour', cta: 'Watch', skippable: false },
    { id: 'assessment', title: 'Motivation Check', type: 'assessment', cta: 'Answer', skippable: false },
    { id: 'results', title: 'Results Reveal', type: 'results', cta: 'Start 7-Day Plan', skippable: false },
  ],
  1: [
    { id: 'mood', title: 'Mood Check-In', type: 'mood', cta: 'Log', skippable: true },
    { id: 'breathing', title: 'Breathing Reset', type: 'breathing', cta: 'Begin', skippable: true },
    { id: 'plans', title: 'Explore Plans', type: 'plans', cta: 'View', skippable: true },
  ],
  2: [
    { id: 'journal', title: 'Daily Calm Reflection', type: 'journal', cta: 'Write', skippable: true },
  ],
  3: [
    { id: 'benefits', title: 'Mindfulness Benefits', type: 'benefits', cta: 'Read', skippable: true },
    { id: 'progress', title: 'Progress View', type: 'progress', cta: 'View', skippable: true },
  ],
  4: [
    { id: 'ritual', title: 'Choose Your Ritual', type: 'ritual', cta: 'Choose', skippable: true },
    { id: 'gratitude', title: 'Gratitude Check-In', type: 'gratitude', cta: 'Log', skippable: true },
  ],
  5: [
    { id: 'insight', title: 'Personal Insight', type: 'insight', cta: 'View', skippable: true },
  ],
  6: [
    { id: 'reflection', title: 'Weekly Reflection', type: 'reflection', cta: 'Write', skippable: true },
  ],
  7: [
    { id: 'summary', title: 'Progress Summary', type: 'summary', cta: 'View', skippable: false },
    { id: 'categories', title: 'Explore Categories', type: 'categories', cta: 'Explore', skippable: true },
    { id: 'share', title: 'Share Streak', type: 'share', cta: 'Share', skippable: true },
  ],
};
