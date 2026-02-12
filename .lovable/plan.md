

# 7-Day Wellness Pathway — Activity Flow

## Design & Style
- **Headspace-inspired**: Bright, warm colors (coral, teal, yellow, lavender), rounded shapes, playful illustrations using CSS shapes/gradients, large friendly typography
- **Linear flow**: Each day shows activities one at a time with a "Next" button progression
- **Day selector**: A top nav showing Day 0–7 with progress dots, current day highlighted

---

## Day 0 — Onboarding

### 1. Product Tour (Animated Slideshow)
- 4–5 auto-advancing slides with playful CSS animations (fade, scale, slide)
- Covers: How the app works, categories (Sleep, Focus, Stress, Work, Kids, Music, Mental Health), what to expect in 7 days
- Each slide has an illustration (CSS art/gradients), headline, and short description
- "Watch" CTA, not skippable

### 2. Motivation Check (5-Question Assessment)
Full assessment with these questions:
1. **What brings you here?** → Better sleep / Reduce stress / Improve focus / Support for depression / Learn meditation
2. **How often do you feel overwhelmed?** → Rarely / Sometimes / Often / Almost always
3. **Have you tried meditation before?** → Never / A few times / Regularly but stopped / I practice regularly
4. **When do you feel most stressed?** → Morning / Afternoon / Evening / Night / All day
5. **What does success look like for you?** → Feeling calmer / Sleeping better / Being more focused / Understanding my emotions / All of the above

- Each question is a full-screen card with animated transitions between them
- Progress bar at top showing 1/5, 2/5, etc.
- Answers stored in localStorage to personalize later content

### 3. Results Reveal
- Animated reveal of "Your Focus Areas" based on assessment answers (top 3 categories highlighted)
- Social proof stat: "92% of users saw improvement in their first week"
- Motivational message personalized to their answers
- "Start 7-Day Plan" CTA button with scale animation

---

## Day 1 — Activation

### 1. Mood Check-In
- 5 emoji options (😊 Great, 🙂 Good, 😐 Okay, 😟 Low, 😢 Struggling)
- Tap to select with bounce animation
- Optional one-line note field
- "Log" CTA, skippable

### 2. Breathing Reset (2 min)
- **Animated breathing bubble**: Circle expands (inhale 4s) → holds (4s) → contracts (exhale 4s)
- Smooth CSS animation with color gradient shifts (teal → lavender)
- Text overlay: "Breathe in..." / "Hold..." / "Breathe out..."
- Timer countdown showing remaining time
- "Begin" CTA to start, skippable

### 3. Priced Plans Popup
- Modal/bottom sheet showing plan options
- Dismissible (skippable), "View" CTA

---

## Day 2 — Habit Building

### 1. Daily Calm Reflection (Journal)
- One reflective prompt displayed beautifully (e.g., "What's one thing you're grateful for today?")
- Text area for writing response
- Saved to localStorage
- "Write" CTA, skippable

---

## Day 3 — Engagement

### 1. Mindfulness Benefits Card (Education)
- Beautifully designed info card with animated entry
- Key benefits of mindfulness with icons (reduced stress, better sleep, improved focus, emotional regulation)
- "Read" CTA, skippable

### 2. Progress View (Dashboard)
- Current streak counter with flame icon animation
- Days completed visualization (7-day progress bar)
- Mood trend chart (using Recharts) showing logged moods
- Activities completed count
- "View" CTA, skippable

---

## Day 4 — Reinforcement

### 1. Choose Your Ritual
- Two beautifully illustrated cards: "Morning Ritual" ☀️ vs "Evening Ritual" 🌙
- Tap to select with scale animation
- Choice saved for future personalization
- "Choose" CTA, skippable

### 2. Gratitude Check-In
- Prompt: "Name 3 things you're grateful for"
- Three input fields with staggered fade-in animation
- Saved to localStorage
- "Log" CTA, skippable

---

## Day 5 — Depth

### 1. Personal Insight Card
- Personalized insight based on logged data (e.g., "You tend to feel calmer after practicing — keep it up!")
- Animated card reveal with confetti-like particles
- Shows comparison of moods on practice vs non-practice days
- "View" CTA, skippable

---

## Day 6 — Confidence

### 1. Weekly Reflection (Journal)
- Deeper reflection prompt: "What has changed for you this week?"
- Larger text area for extended writing
- Shows a summary of the week's highlights before the prompt
- "Write" CTA, skippable

---

## Day 7 — Conversion

### 1. Progress Summary
- Full 7-day journey recap with animated timeline
- Total sessions completed, streak count, mood improvement trend
- Key milestones highlighted with celebratory animations
- "View" CTA, not skippable

### 2. Explore Categories
- Grid of category cards (Sleep, Focus, Stress, Work, Kids, Music, Mental Health)
- Each card has a unique color and icon
- Tap to preview what's available
- "Explore" CTA, skippable

### 3. Share Streak
- Shareable card showing their 7-day achievement
- "Share" button (copies a shareable message/image concept to clipboard)
- Social sharing prompt with celebratory animation
- "Share" CTA, skippable

---

## Technical Approach
- All progress, moods, journal entries, and assessment data stored in **localStorage**
- Day progression tracked automatically
- Recharts used for mood trend visualization on Progress View
- Custom CSS animations for breathing bubble, card transitions, and celebrations
- Responsive design for mobile-first experience

