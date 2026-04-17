# Generation Template: Shorts/Reels Scripts (5-10 Short-Form Videos)

## Template ID
`shorts-reels-scripts`

## What This Generates
5-10 short-form video scripts (30-60 seconds each) for Instagram Reels, YouTube Shorts, and TikTok. Each script is a standalone "belief bomb" — one belief shift, one story hook, or one action step — designed to stop the scroll and drive profile visits or DMs.

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
  "aspiringIdentity": "string — the identity the target audience wants to become",
  "ctaKeyword": "string (optional) — ManyChat/DM automation keyword"
}
```

## Context Dependencies
This template uses the output from the **youtube-script** deliverable as its primary source — the best moments are clipped and adapted into standalone short-form pieces. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, Undesired Identity / Aspiring Identity, Content Angle Library, and the completed YouTube script output.

## Framework References (John Whiting)
- **C1: Authority Amplifier** — Short-form is the "air war" — rapid belief bombs that saturate the feed. Each reel shifts ONE micro-belief or plants ONE seed.
- **C4: Content Repurposing** — Long-form is the source. Short-form is the distribution. Every YouTube video should produce 5-10 clips.
- **C5: Social Media Strategy** — Short-form drives discovery (new eyeballs). Long-form drives depth (trust and conversion). Use shorts to feed the long-form funnel.
- **C6: Outflow = Inflow** — Volume matters on short-form. Post 1-3 shorts per day. The algorithm rewards consistency.
- **A6: Repelling Anti-Avatar** — Polarizing clips perform best. Take a stance. Filter out the wrong people.

## Generation Prompt

```
You are writing 5-10 short-form video scripts (30-60 seconds each) for Instagram Reels, YouTube Shorts, and TikTok. These scripts are derived from or inspired by the coach's long-form YouTube content. Each one is a standalone "belief bomb" — it must work on its own, even if the viewer never sees the full video.

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
- **DM Keyword:** {{ctaKeyword}}
{{#if clientDailyReminder}}- **Daily Reminder:** {{clientDailyReminder}}{{/if}}
{{#if topComplaints}}- **Top Complaints:** {{topComplaints}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### SCRIPT MIX (Per John Whiting's Authority Amplifier Framework)

Generate scripts in this ratio:

**HOOK CLIPS (2-3 scripts)**
- Extract the most compelling, scroll-stopping moments from the YouTube script or belief-shift map
- These are the "pattern interrupt" moments — bold claims, surprising stats, or contrarian takes
- Format: hook statement → 1-2 sentences of context → cliffhanger or mic drop
- Goal: stop the scroll, create curiosity, drive profile visits
- Example opening: "Stop doing [common practice]. Here's why it's killing your [result]..."

**BELIEF SHIFT CLIPS (2-3 scripts)**
- Each clip targets ONE Core Belief from the Belief-Shift Map (provided in PRIOR DELIVERABLE CONTEXT)
- Pick the single strongest proof block for that belief (analogy, reframe, or logic trap)
- Format: state the old belief → challenge it in ONE powerful way → install the new belief
- Keep it tight — one belief per clip, no tangents
- Per John: "A 30-second reel that shifts one belief is worth more than a 10-minute video that shifts none"

**STORY CLIPS (1-2 scripts)**
- Short, punchy versions of personal anecdotes or client transformations
- Format: "I used to [relatable struggle]..." → turning point → result → lesson
- Draw from {{personalStory}} or client stories from the YouTube script. **Use ONLY facts from the structured story fields. Do not invent additional personal anecdotes.**
- Goal: build connection, make the coach relatable and aspirational
- The viewer should think "that was me" or "I want that"

**CTA CLIPS (1-2 scripts)**
- Direct call-to-action — drive DMs, link clicks, or follows
- {{#if ctaKeyword}}Primary CTA: "DM me '{{ctaKeyword}}' and I'll send you [free resource]"{{/if}}
- Or: "Link in bio to get [lead magnet / free resource]"
- Format: quick value or insight → "If you want [transformation]..." → specific CTA
- Per John: frame as selective — "This is only for [type of person]"
- Include a qualifier to filter out the anti-avatar

### SCRIPT FORMAT (For Each Short)

1. **Script Number & Type** (e.g., "Short #1 — Hook Clip")
2. **Platform Notes** (any platform-specific adjustments)
3. **Hook** (first 1-3 seconds — the text that appears on screen or the opening words)
4. **Body** (the spoken script — 60-120 words for 30-60 seconds at ~2 words/sec)
5. **On-Screen Text** (key phrases to overlay — viewers often watch without sound)
6. **CTA / Closing** (what happens in the last 3-5 seconds)
7. **Suggested Visual** (talking head, B-roll direction, text animation style)
8. **Hashtags** (3-5 relevant hashtags per platform)
9. **Estimated Duration** (30s / 45s / 60s)

### SHORT-FORM PRINCIPLES
- The HOOK is everything — you have 1-2 seconds before they scroll
- Write for SOUND OFF first — on-screen text must carry the message alone
- One idea per video. ONE. No cramming multiple points.
- Speak in short, punchy sentences. No run-ons.
- End with a loop trigger (makes them want to rewatch) or a strong CTA
- Polarizing > safe. Take a stance.
- Pattern: disrupt → deliver → direct (hook → value → CTA)
- Energy should be HIGH from the first word — no slow intros
- Per John: "Short-form is the air war. Long-form is the ground war. You need both."

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Number each script (Short #1, Short #2, etc.) with type label, full spoken script, on-screen text overlay, visual direction, hashtags, and estimated duration. Each script should be ready to film immediately.
```
