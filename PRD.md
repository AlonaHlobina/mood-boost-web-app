# Mood Boost App

A friendly, cartoon-style web application designed to lift users' spirits through interactive conversations and positive engagement.

**Experience Qualities**: 
1. **Welcoming** - Users should immediately feel welcomed and supported with warm, encouraging language
2. **Playful** - The cartoon aesthetic and friendly interactions create a lighthearted, fun atmosphere  
3. **Supportive** - Every element communicates care and understanding for users having difficult days

**Complexity Level**: Light Application (multiple features with basic state)
- Single-page app with interactive chat functionality and progress tracking through the "coolness bar"

## Essential Features

**Mood Boost Character**
- Functionality: Animated cartoon character that provides encouragement and guides conversation
- Purpose: Creates emotional connection and makes the experience feel personal
- Trigger: Appears immediately on page load with greeting
- Progression: Character greeting → Speech bubble appears → User reads welcome message → Ready for interaction
- Success criteria: Character displays properly with speech bubble and feels approachable

**Interactive Chat System** 
- Functionality: Question-and-answer interface for mood boosting conversations
- Purpose: Engages users in positive self-reflection and provides personalized encouragement
- Trigger: User begins interaction after reading character greeting
- Progression: Welcome message → First question appears → User responds → Follow-up questions → Encouragement provided
- Success criteria: Chat flows naturally and users feel heard and supported

**Progress Tracking (Coolness Bar)**
- Functionality: Visual progress indicator showing conversation advancement
- Purpose: Gamifies the experience and shows users they're making progress toward feeling better  
- Trigger: Fills as user completes questions/interactions
- Progression: Empty bar → Gradual filling during conversation → Full bar indicates completion
- Success criteria: Bar updates smoothly and provides sense of accomplishment

## Edge Case Handling

- **No JavaScript Support**: App gracefully displays static content with encouraging message
- **Mobile Portrait/Landscape**: Layout adapts fluidly between orientations maintaining readability
- **Very Small Screens**: Elements stack vertically with appropriate scaling
- **Slow Loading**: Character and elements appear progressively without blocking interaction

## Design Direction

The design should feel like a friendly children's book illustration - warm, inviting, and slightly whimsical with soft rounded edges that communicate safety and approachability rather than clinical or corporate aesthetics.

## Color Selection

Analogous (adjacent colors on color wheel) - Using a palette of soft blues, teals, and light greens to create a calming, cohesive atmosphere that feels both cheerful and soothing.

- **Primary Color**: Light Pastel Blue (oklch(0.9 0.05 220)) - Main container background that feels peaceful and open
- **Secondary Colors**: Soft teal (oklch(0.85 0.06 200)) for accents and warm cream (oklch(0.95 0.02 80)) for text areas  
- **Accent Color**: Cheerful mint green (oklch(0.88 0.08 150)) for the progress bar and interactive elements that feels energizing
- **Foreground/Background Pairings**: 
  - Primary Background (Light Pastel Blue): Dark navy text (oklch(0.25 0.05 220)) - Ratio 8.2:1 ✓
  - Secondary (Soft Teal): White text (oklch(1 0 0)) - Ratio 12.1:1 ✓  
  - Accent (Mint Green): Dark teal text (oklch(0.3 0.06 180)) - Ratio 6.8:1 ✓
  - Card/Speech Bubble (Warm Cream): Dark navy text (oklch(0.25 0.05 220)) - Ratio 9.1:1 ✓

## Font Selection

Typography should feel friendly and approachable like a children's book while maintaining excellent readability - choosing rounded, humanistic fonts that feel hand-drawn but professional.

- **Typographic Hierarchy**: 
  - H1 (App Title): Comic Neue Bold/32px/normal letter spacing - playful but readable
  - Character Speech: Comic Neue Regular/16px/relaxed line height - conversational tone
  - Body Text: Comic Neue Regular/14px/comfortable spacing - easy reading
  - Footer: Comic Neue Light/12px/wide letter spacing - subtle attribution

## Animations

Subtle, bouncy animations that feel organic and alive, like elements are gently breathing or responding to user presence, creating warmth without being distracting.

- **Purposeful Meaning**: Gentle bounce effects on character elements communicate friendliness and approachability, while smooth progress bar fills provide satisfying feedback
- **Hierarchy of Movement**: Character gets primary animation attention, secondary movement on interactive elements, minimal movement on text areas

## Component Selection

- **Components**: Card for main container, Button for interactions, Progress for coolness bar, custom speech bubble component
- **Customizations**: Cartoon-style speech bubble with tail, rounded character placeholder with friendly styling, custom progress bar with playful colors
- **States**: Buttons have gentle hover effects with slight scale, interactive elements respond with soft color transitions, progress bar animates fills smoothly
- **Icon Selection**: Rounded, friendly icons from Phosphor that match the cartoon aesthetic
- **Spacing**: Generous padding using Tailwind's 6-8 scale for breathing room, 4-6 for internal component spacing
- **Mobile**: Single column layout with larger touch targets, character scales appropriately, speech bubble repositions above character on very small screens