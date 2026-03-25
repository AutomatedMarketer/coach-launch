# Generation Template: Money Messaging Statement

## Template ID
`magnetic-messaging-statement`

## What This Generates
The foundational messaging statement for a coaching business — the DNA that feeds into every other deliverable. Includes the core statement plus platform-specific variations (short for ads, medium for social, long for sales pages).

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "unwantedFeelings": "string — emotional Hell Island state",
  "desiredFeelings": "string — emotional Heaven Island state",
  "transformation": "string",
  "aspiringIdentity": "string — who they want to become",
  "uniqueMechanism": "string",
  "commonObjections": "array",
  "brandVoice": "string"
}
```

## Framework References
- **Belief-Shift Framework A1-A5**: The core mapping process, Hell/Heaven Islands, Old Way vs Your Way, Aspiring Identity, Money Messaging Statement template
- **John Whiting Framework A1**: One offer, one avatar — messaging must be laser-focused
- **John Whiting Framework A6**: Repel the anti-avatar — messaging should attract AND repel

## Generation Prompt

```
You are an expert at crafting magnetic messaging for coaching businesses. You understand the Belief-Shifting Framework: every piece of marketing must take prospects from "Hell Island" (their current painful state) to "Heaven Island" (their desired state) by selling an identity transformation, not just a service.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Core Problem Solved:** {{problemSolved}}
- **Unwanted Feelings (Hell Island):** {{unwantedFeelings}}
- **Desired Feelings (Heaven Island):** {{desiredFeelings}}
- **Transformation:** {{transformation}}
- **Aspiring Identity:** {{aspiringIdentity}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Common Objections:** {{commonObjections}}
- **Brand Voice:** {{brandVoice}}
- **Competitor/Old Way:** {{competitorOldWay}}
- **Ideal Client's Current Methods:** {{idealClientCurrentMethods}}
- **Ideal Client Avatar Name:** {{idealClientDreamName}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### WHAT TO GENERATE

#### 1. THE 10-ELEMENT MAP
First, clearly map out these 10 elements for this specific coaching business:
1. **Skills** — What {{clientName}} is exceptionally good at
2. **Problems** — The specific problems those skills solve
3. **Ideal Audience** — Exactly who has those problems (from targetAudience)
4. **Complaints** — What this audience complains about daily
5. **Goals** — What they want to achieve
6. **Unwanted Feelings** — How they feel right now (Hell Island emotional state)
7. **Desired Feelings** — How they want to feel (Heaven Island emotional state)
8. **Old Way** — What they're currently doing that doesn't work (derive from commonObjections)
9. **Your Way** — {{clientName}}'s unique method ({{uniqueMechanism}})
10. **Aspiring Identity** — Who they want to become

#### 2. HELL ISLAND vs. HEAVEN ISLAND
Write a vivid 3-4 sentence description of each:
- **Hell Island**: Paint the emotional, financial, and lifestyle reality of their current state
- **Heaven Island**: Paint the emotional, financial, and lifestyle reality of their desired state

#### 3. THE MAGNETIC MESSAGING STATEMENT
Using this template, craft the core statement:
"[Ideal Audience], are you struggling with [Complaints 1, 2, 3]? And you feel [Unwanted Feelings 1, 2, 3]? You need to stop [Old Way] because it [Why Old Way Fails]. And start [Your Way]. When you do, you'll get [Goals] because [Why Your Way Works]. You'll feel [Desired Feelings] and become [Aspiring Identity]."

Make it specific to {{clientName}}'s business — not generic. Every word should feel like it was written for ONE person.

#### 4. PLATFORM VARIATIONS
Create 5 adapted versions:

**a) Ad Hook (1-2 sentences)**
The shortest, punchiest version. Stops the scroll. Targets the pain OR the desire.

**b) Social Media Post (3-5 sentences)**
Expanded version for Instagram/Facebook posts. Hook + problem + solution + CTA.

**c) Email Subject Line + Preview (1 line each)**
For email marketing — curiosity-driven, specific to the audience.

**d) Sales Page Hero (2-3 sentences)**
For the top of a landing page — bold, benefit-driven, speaks directly to the avatar.

**e) Long-Form Opening (Full paragraph)**
For VSLs, webinars, or sales letters — the full emotional arc from Hell Island to Heaven Island.

#### 5. ANTI-AVATAR STATEMENT
Write a "This is NOT for you if..." statement (4-5 traits) that repels the wrong people. Be direct and unapologetic.

#### 6. "THIS IS FOR YOU IF..." STATEMENT
Write a "This IS for you if..." statement (4-5 traits) that attracts the perfect client. Make them feel seen.

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} Be direct, specific, and emotionally resonant. No fluff, no generic coaching language. Every word should make the ideal client think "this person gets me."

### OUTPUT FORMAT
Return each section with clear headers and labels. All copy should be specific to this client — no placeholder text.
```

## Post-Processing
1. This output becomes context for ALL subsequent deliverables
2. The Money Messaging Statement is the DNA — check that it captures the emotional arc
3. Verify anti-avatar statement is strong enough to repel (not just mildly discourage)
