# Generation Template: Mission Statement

## Template ID
`mission-statement`

## What This Generates
A bold, energizing mission statement for a coaching business that serves as the coach's north star. Follows the framework: "We will [achieve specific money/client goal] by [specific deadline] because [specific reason why this matters and who it helps]. They will no longer [specific bad thing] and will instead [specific good thing]." This statement is personal, measurable, deadline-driven, and emotionally charged — it fuels every decision, piece of content, and sales conversation.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string",
  "targetAudience": "string",
  "revenueGoal": "string — specific revenue or client count target",
  "revenueGoalDeadline": "string — specific date or timeframe",
  "whyDoThis": "string — the deeper reason beyond money",
  "transformation": "string — what clients achieve",
  "unwantedFeelings": "string — what the audience currently suffers",
  "desiredFeelings": "string — what the audience wants to feel",
  "problemSolved": "string"
}
```

## Framework References
- **Coach Syndicate Prompt 1**: Mission statement template — measurable goal + deadline + reason why + transformation
- **John Whiting Framework H1**: "You are the source" — the mission must come from deep personal conviction, not surface-level ambition
- **John Whiting Framework A1**: One offer, one avatar — the mission must name WHO specifically benefits
- **Belief-Shift Framework A2**: Hell Island / Heaven Island — the mission captures the journey from pain to possibility

## Generation Prompt

```
You are an expert at crafting mission statements for coaching businesses. A great mission statement is not a corporate platitude — it is a personal declaration of war against a specific problem, with a measurable goal and a deadline.

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Revenue / Client Goal:** {{revenueGoal}}
- **Goal Deadline:** {{revenueGoalDeadline}}
- **Why They Do This (Beyond Money):** {{whyDoThis}}
- **Transformation Delivered:** {{transformation}}
- **Unwanted Feelings (The Pain Zone):** {{unwantedFeelings}}
- **Desired Feelings (The Possibility):** {{desiredFeelings}}
- **Core Problem Solved:** {{problemSolved}}
{{#if elevatorPitch}}- **Elevator Pitch:** {{elevatorPitch}}{{/if}}
{{#if twelveMonthVision}}- **12-Month Vision:** {{twelveMonthVision}}{{/if}}
{{#if coachingYears}}- **Years Coaching:** {{coachingYears}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### WHAT TO GENERATE

#### 1. THE CORE MISSION STATEMENT
Craft a single powerful statement following this framework:

"We will [achieve specific money/client goal] by [specific deadline] because [specific reason why this matters and who it helps]. They will no longer [specific bad thing] and will instead [specific good thing]."

Rules for the core statement:
- **Measurable goal**: Include the exact number from revenueGoal (revenue figure or client count). If no number is provided, do NOT invent one.
- **Specific deadline**: Use the exact deadline from revenueGoalDeadline. If none provided, do NOT invent one.
- **The "because" must go beyond money**: Connect to the deeper reason from whyDoThis — the people it helps, the problem it eliminates, the legacy it creates.
- **"No longer" clause**: Pull directly from unwantedFeelings and problemSolved — the specific pain that gets eliminated.
- **"Will instead" clause**: Pull directly from desiredFeelings and transformation — the specific outcome that replaces the pain.
- **First person**: Written as "I will..." or "We will..." — this is the coach speaking to themselves and their team.
- **Energizing**: When the coach reads this on a bad day, it should reignite their fire.

#### 2. THE BREAKDOWN
After the core statement, break it down into its 4 components with brief commentary:

**THE GOAL** — What exactly are we building? (restate the measurable target)
**THE DEADLINE** — By when? (restate the specific timeframe and why urgency matters)
**THE REASON** — Why does this matter beyond revenue? (expand on whyDoThis — who benefits, what changes in the world)
**THE TRANSFORMATION** — What changes for every person we help? (contrast the "no longer" state with the "will instead" state)

#### 3. DAILY REMINDER VERSION
Create a shortened version (1-2 sentences max) that {{clientName}} can put on their phone wallpaper, bathroom mirror, or desk. It should hit the emotional core without needing all the detail.

#### 4. TEAM / PUBLIC VERSION
Create a version suitable for sharing with a team, on a website "Our Mission" section, or in a pitch deck. Third person ("We help..."), professional but still emotionally resonant. 2-3 sentences max.

### VOICE & TONE
Write in first person for the core statement and breakdown. Be direct, bold, and specific — not corporate or generic. This is a personal declaration, not a PR statement.{{#if brandVoice}} Brand voice: {{brandVoice}}{{/if}}{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} Every word should make {{clientName}} feel fired up to get to work.

### OUTPUT FORMAT
Return each section with clear headers. The core mission statement should stand alone at the top in bold. All content must be specific to this coach — no placeholder text, no generic coaching language.
```

## Post-Processing
1. This output serves as a motivational anchor — it does not feed into other templates as context
2. Verify the mission statement includes all 4 components: measurable goal, deadline, reason why, transformation
3. Verify the "because" reason goes beyond money
4. Verify no details were invented — every fact should trace back to a specific client input field
5. The daily reminder version should be punchy enough to fit on a phone wallpaper
