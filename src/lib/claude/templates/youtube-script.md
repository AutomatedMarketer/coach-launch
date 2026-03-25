# Generation Template: YouTube Script (Long-Form, 10-20 Minutes)

## Template ID
`youtube-script`

## What This Generates
ONE complete long-form YouTube script (10-20 minutes) following John Whiting's Phase 3 Authority Amplifier workbook structure. The script is designed to shift ONE core belief, establish authority, and drive viewers toward a single CTA.

## Client Inputs Required
```json
{
  "clientName": "string",
  "niche": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "offerName": "string",
  "uniqueMechanism": "string",
  "transformation": "string",
  "personalStory": "string",
  "expertise": "array — 5-10 topics they're expert in",
  "commonObjections": "array",
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become"
}
```

## Context Dependencies
This template uses outputs from the **magnetic-messaging-statement**, **belief-shift-map**, **core-conversion-content**, and **content-angle-library** deliverables. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, Undesired Identity / Aspiring Identity, Content Angle Library with specific video angles, and Conversion Code structure.

## Framework References (John Whiting)
- **C1: Authority Amplifier** — Every piece of content is propaganda: shifts a belief, installs a new one, or breaks an old one. A YouTube video is the highest-leverage propaganda format.
- **C4: Long-Form Content Strategy** — Long-form builds deep trust. One great video replaces 50 mediocre posts. Optimize for watch time and belief shifting, not views.
- **C1: Proof Blocks** — The core of the video is a series of "proof blocks" — authority quotes, analogies, stories, case studies, data, logic traps, and reframes — stacked to make the new belief undeniable.
- **D4: Objection Handling** — Weave objection handling naturally into the script. Address the top 2-3 objections before they arise.
- **A6: Repelling Anti-Avatar** — The hook and intro should qualify the viewer. Tell the wrong people this video isn't for them.
- **H2: Emotional Tone Scale** — Move the viewer UP the scale: from fear/confusion → antagonism against the old way → enthusiasm about the new belief → action.

## Generation Prompt

```
You are writing a complete long-form YouTube video script (10-20 minutes) for a coaching business. This script follows John Whiting's Authority Amplifier framework — every section exists to shift ONE core belief in the viewer's mind.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Problem Solved:** {{problemSolved}}
- **Offer:** {{offerName}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Transformation:** {{transformation}}
- **Personal Story:** {{personalStory}}
- **Expertise Topics:** {{expertise}}
- **Common Objections:** {{commonObjections}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### SCRIPT STRUCTURE (Per John Whiting's Authority Amplifier Workbook)

Generate the full script with these sections clearly labeled:

**1. HOOK (0:00-0:30)**
- Open with: "How to get [GOAL] without [OBSTACLE]..."
- Use the Money Messaging Statement from the Belief-Shift Map as the foundation
- Reference a specific {{unwantedFeelings}} the viewer is experiencing RIGHT NOW
- Make a bold promise about what they'll learn in this video
- Pattern interrupt — say something unexpected that challenges their current belief
- Goal: stop the scroll and earn the first 30 seconds

**2. INTRO (0:30-1:30)**
- Quick positioning: who {{clientName}} is and why they're qualified to teach this
- State what the viewer will learn (3 key takeaways)
- Qualify the viewer: "This video is for [target audience] who [specific situation]"
- Anti-avatar filter: "If you're looking for [shortcut/easy way], this isn't for you"
- Subscribe CTA (soft): "If you're serious about [transformation], subscribe — I post [frequency]"

**3. PROBLEM (1:30-4:00)**
- Challenge the viewer's CURRENT belief about their problem
- Name the old belief explicitly: "You probably think [old belief]..."
- Show the consequences of holding that belief — paint Hell Island vividly using {{unwantedFeelings}}
- Use 2-3 specific examples of how this belief plays out in real life
- Create cognitive dissonance: make them uncomfortable staying where they are
- Per John: "The problem section isn't about the surface problem — it's about the BELIEF that causes the problem"

**4. NEW BELIEF / PARADIGM SHIFT (4:00-8:00)**
- Introduce the NEW belief that replaces the old one
- This is the core of the video — the single belief shift you're engineering
- Stack at least 5-7 "proof blocks" from the 10 Content Block types below. Label each one with its type so the coach knows what persuasion tool they're using:

  **The 10 Content Block Types (use at least 5-7 in this section):**
  1. **Authority Reference** — reference a REAL book by title/author, paraphrase a known principle from a named authority, or cite a verifiable study. Do NOT fabricate quotes — AI-generated quotes attributed to famous people are almost always wrong and destroy credibility
  2. **Universal Analogy** — a relatable everyday comparison that makes the shift click instantly (e.g., "You wouldn't try to fly a plane without training...")
  3. **Universal Story** — a well-known narrative or hypothetical scenario that illustrates the principle (NOT a fake testimonial — a teaching parable)
  4. **Personal Story** — a moment from {{personalStory}} that proves this belief changed everything for {{clientName}}. **Use ONLY facts from the Key Facts field. Do not fabricate personal anecdotes or expand briefly mentioned details into elaborate narratives.**
  5. **Client Story** — a specific client transformation that demonstrates the belief shift in action (use from testimonials if available)
  6. **External Case Study** — proof from outside the coaching industry (research, business case, historical example) that validates the principle
  7. **Cross-Domain Reference** — a parallel from a completely different field that makes the belief undeniable (e.g., sports, medicine, engineering)
  8. **Statistics/Data** — concrete numbers, percentages, or research findings that support the new belief
  9. **Logic Trap** — an irrefutable logical argument that makes the old belief impossible to defend ("If [old belief] were true, then [absurd consequence] would also be true...")
  10. **Reframe** — flip the viewer's perspective entirely ("What if the problem isn't [X], it's actually [Y]?")

- Reference specific angles from the Content Angle Library (in PRIOR DELIVERABLE CONTEXT)
- Handle the top 2-3 objections from {{commonObjections}} naturally within the proof blocks
- Per John: "Stack proof until the new belief feels obvious"
- Label each proof block: `[PROOF BLOCK: Authority Quote]`, `[PROOF BLOCK: Logic Trap]`, etc.

**5. PROOF / STORIES (8:00-12:00)**
- **Personal Story**: Detailed version of how {{clientName}} discovered this belief shift
  - Where they were before (relatable struggle)
  - The moment of realization
  - What changed after adopting the new belief
- **Client Story**: A client or student who made this same shift
  - Before state → what they did → after state
  - Specific results and transformation
- **External Example**: A well-known example (business, person, or case study) that proves the new belief
- Per John: "Stories are the highest form of proof. People don't argue with stories."

**6. ACTION STEPS (12:00-15:00)**
- Give 3-5 concrete steps the viewer can take TODAY to start applying the new belief
- Each step should be specific and actionable (not vague advice)
- Frame steps as the {{uniqueMechanism}} in action
- For each step: what to do, how to do it, what result to expect
- This section builds goodwill and demonstrates expertise
- Per John: "Give away the WHAT and the WHY. Sell the HOW and the ACCOUNTABILITY."

**7. CTA (15:00-End)**
- Recap the belief shift: "So remember — it's not about [old belief], it's about [new belief]"
- Paint the {{aspiringIdentity}} vision using {{desiredFeelings}}
- Offer a clear next step:
  - Free resource / lead magnet (primary CTA)
  - {{offerName}} for those ready to go deeper (secondary CTA)
- Subscribe + bell CTA
- End with an engagement hook: "Drop a comment below — what's your biggest takeaway?"
- Per John: "The CTA should feel like a natural next step, not a pitch"

### SCRIPT FORMAT RULES

For the FULL script, provide:
1. **Section labels** with approximate timestamps
2. **Spoken dialogue** — written exactly as the coach should say it (conversational, not scripted-sounding)
3. **[DIRECTION NOTES]** in brackets for on-screen text, B-roll suggestions, or emphasis cues
4. **Estimated word count** per section (target 1,500-2,500 words total for a 10-15 min video at ~150 words/min)

### SCRIPT PRINCIPLES
- Write for SPEAKING, not reading — short sentences, natural pauses, conversational tone
- Every section exists to build toward the ONE belief shift
- Use "you" language — talk directly to the viewer
- Include pattern interrupts every 2-3 minutes to hold attention
- Vary energy: calm explanation → passionate story → direct challenge → warm encouragement
- No fluff — every sentence earns its place
- The script should feel like a conversation with a smart friend, not a lecture

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Deliver the complete script with section headers, timestamps, spoken dialogue, and direction notes. Include a summary at the top with: video title (SEO-optimized), thumbnail text suggestion, description with keywords, and the core belief shift being engineered.
```
