# Generation Template: The Two Identities

## Template ID
`two-identities`

## What This Generates
A detailed psychological profile of the ideal client's two identities — the Undesired Identity (who they are BEFORE working with the coach) and the Aspiring Identity (who they BECOME after). Each identity gets a memorable name, statistical benchmarks, emotional attributes, behavioral patterns, and belief systems. Also produces a condensed Before & After version formatted for direct use on sales pages. Based on Coach Syndicate Prompt 11 — The Two Identities framework.

## Client Inputs Required
```json
{
  "clientName": "string",
  "niche": "string",
  "targetAudience": "string",
  "unwantedFeelings": "string — emotional Pain Zone state",
  "desiredFeelings": "string — emotional Possibility state",
  "idealClientCurrentRevenue": "string — current income/results level",
  "idealClientCurrentMethods": "string — what they currently rely on",
  "transformation": "string",
  "aspiringIdentity": "string — who they want to become",
  "problemSolved": "string",
  "commonObjections": "array",
  "uniqueMechanism": "string"
}
```

## Context Dependencies
This template benefits from prior deliverables injected via `{{BELIEF_FRAMEWORK_CONTEXT}}`:
- `magnetic-messaging-statement` — Core messaging DNA (Hell Island / Heaven Island descriptions, 10-Element Map)
- `emotional-trigger-map` — Deep avatar psychology (12 emotional trigger categories, Top 5 Hooks)

These prior outputs provide rich emotional and psychological detail that makes the two identities more specific and resonant.

## Framework References
- **Coach Syndicate AI Prompt 11**: The Two Identities — Undesired Identity and Aspiring Identity framework with named personas
- **Ethical Manipulation Workbook**: Two Identity Templates (Before/After, 8 attributes each)
- **Belief-Shift Framework C4**: The Two Identities — Undesired vs Aspiring Self
- **AI Prompts PDF "Ethical Manipulation"**: Two Identities deep-dive — understanding the emotional terrain of both states
- **John Whiting Framework A1**: One avatar — both identities must describe the SAME person at two points in time

## Generation Prompt

```
You are an expert in identity-based marketing and behavioral psychology for coaching businesses. Your job is to create two vivid, named identity profiles — the BEFORE and the AFTER — for the coach's ideal client. These identities are the foundation of all persuasion: every ad, email, post, video, and sales conversation either mirrors the Undesired Identity (so the prospect feels seen) or paints the Aspiring Identity (so the prospect feels pulled toward change).

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Core Problem Solved:** {{problemSolved}}
- **Unwanted Feelings (The Pain Zone):** {{unwantedFeelings}}
- **Desired Feelings (The Possibility):** {{desiredFeelings}}
- **Current Revenue / Results Level:** {{idealClientCurrentRevenue}}
- **Current Methods They Rely On:** {{idealClientCurrentMethods}}
- **Transformation:** {{transformation}}
- **Their Next-Level Self:** {{aspiringIdentity}}
- **Common Objections:** {{commonObjections}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Brand Voice:** {{brandVoice}}
{{#if clientSecretDesire}}- **Secret Desire:** {{clientSecretDesire}}{{/if}}
{{#if clientFalseProblem}}- **What They Think the Problem Is:** {{clientFalseProblem}}{{/if}}
{{#if clientExcuse}}- **Client Self-Limiting Story:** {{clientExcuse}}{{/if}}
{{#if topComplaints}}- **Top Complaints:** {{topComplaints}}{{/if}}
{{#if topDesires}}- **Top Desires:** {{topDesires}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

{{#if BELIEF_FRAMEWORK_CONTEXT}}
### PRIOR DELIVERABLE CONTEXT
Use the following previously generated content to deepen and align the two identities:

{{BELIEF_FRAMEWORK_CONTEXT}}
{{/if}}

### WHAT TO GENERATE

---

#### PART 1: THE UNDESIRED IDENTITY (Who They Are BEFORE)

This is who the prospect is RIGHT NOW — stuck, frustrated, and relying on methods that don't work. The goal is to describe this identity so accurately that the prospect reads it and thinks: "That's me. How do they know?"

**1. Identity Name**
Give this identity a 2-3 word name they would be embarrassed to identify with — something that stings because it's true. It should be specific to {{niche}}, not generic. Examples for other niches: "The Hustle Addict," "The Discount Coach," "The Perpetual Planner." The name should make them uncomfortable because they recognize themselves.

**2. Statistical Profile (Undesired Current Results)**
List 5-7 specific, measurable benchmarks that define this identity's current reality. Use numbers relevant to {{niche}}. Pull from {{idealClientCurrentRevenue}} and expand with realistic metrics for someone in this situation.

For each stat:
- The metric (e.g., monthly revenue, client count, hours worked per week)
- The specific number or range
- Why this number is painful (1 sentence)

**3. Top 3 Complaints**
The things they say OUT LOUD — to friends, spouse, in Facebook groups, to other coaches. These are the surface-level grievances they voice publicly. Write each as a direct quote in their voice.

**4. Top 3 Problems**
The REAL problems underneath the complaints — what they can't or won't articulate. These are the structural, behavioral, or psychological issues causing the complaints. For each:
- The real problem (1 sentence)
- Why they can't see it (1 sentence)

**5. Old Methods They Rely On**
List 5-7 approaches, tactics, or habits they currently use that keep them stuck. Pull from {{idealClientCurrentMethods}} and expand. For each:
- The method (what they do)
- Why it feels productive but isn't (the illusion)
- What it actually costs them

**6. Undesired Feelings**
List 5-7 specific emotions this identity experiences regularly. Pull from {{unwantedFeelings}} and expand. For each:
- The feeling (named precisely — not just "bad" or "stressed")
- When it hits hardest (specific moment, time of day, or trigger)

**7. Undesired Attributes**
List 5-7 behavioral or personality traits that define this identity — the patterns they fall into. Examples: reactive instead of proactive, price-competing instead of value-selling, avoiding instead of confronting. Each should be specific to {{niche}}.

**8. False Beliefs**
List 5-7 beliefs this identity holds that keep them trapped. These are things they would DEFEND if challenged — beliefs that feel like truth but are actually the cage. Write each in first person, as they would say it.

---

#### PART 2: THE ASPIRING IDENTITY (Who They BECOME After)

This is who the prospect becomes after working with {{clientName}} — confident, successful, and operating with a proven system. The goal is to paint this identity so vividly that the prospect feels a deep pull toward it.

**1. Identity Name**
Give this identity a 2-3 word name they would be PROUD to identify with — something aspirational but achievable, not fantasy. It should connect to {{aspiringIdentity}} and feel specific to {{niche}}. Examples for other niches: "The Authority Coach," "The Freedom CEO," "The Client Magnet."

**2. Statistical Profile (Desired Results)**
List 5-7 specific, measurable benchmarks that define this identity's transformed reality. Mirror the same metrics from the Undesired Identity but with the new numbers. These should be ambitious but credible.

For each stat:
- The metric (same categories as above for direct comparison)
- The specific number or range
- What this number means for their life (1 sentence)

**3. Things to Be Proud Of**
List 5-7 things they now brag about, post on social media, or tell friends with genuine pride. Write as direct quotes or observations. These should directly contrast the complaints from Part 1.

**4. What Life Looks Like With the Solution**
List 5-7 specific, vivid descriptions of their daily life, routine, and reality after the transformation. Be concrete — what does Tuesday morning look like? What happens when they check their phone? How do client calls feel now?

**5. New Method They Use**
Describe how {{uniqueMechanism}} has replaced their old methods. List 5-7 specific practices, systems, or habits they now follow. For each:
- The new method/practice
- What old method it replaced
- The result it produces

**6. Desired Feelings**
List 5-7 specific emotions this identity experiences regularly. Pull from {{desiredFeelings}} and expand. For each:
- The feeling (named precisely)
- When they feel it most (specific moment or trigger — mirror the Undesired Feelings timing)

**7. Desired Attributes**
List 5-7 behavioral or personality traits that define this identity. These should be the direct opposite of the Undesired Attributes — showing the same person, transformed.

**8. True Beliefs**
List 5-7 beliefs this identity holds that enable their success. Each should directly counter a False Belief from Part 1 — showing the belief shift. Write in first person, as they would now say it.

---

#### PART 3: CONDENSED BEFORE & AFTER (Sales Page Ready)

Write a condensed version formatted for direct use on a sales page, ad, or email. This is the quick-hit version a prospect can scan in 10 seconds and immediately feel the contrast.

**BEFORE (The [Undesired Identity Name]):**
- 3-5 punchy bullet points (each 1 sentence max)
- Written in second person ("You...")
- Focus on the most painful, recognizable elements
- End with the emotional weight — how it FEELS

**AFTER (The [Aspiring Identity Name]):**
- 3-5 punchy bullet points (each 1 sentence max)
- Written in second person ("You...")
- Focus on the most desirable, vivid elements
- End with the emotional payoff — how it FEELS

**THE BRIDGE (1-2 sentences):**
A single transition statement that connects the Before to the After and names {{uniqueMechanism}} as the vehicle. Format: "The difference between [Undesired Name] and [Aspiring Name] is [the specific shift]. {{offerName}} gives you [the mechanism] so you can [transformation]."

---

#### PART 4: IDENTITY APPLICATION GUIDE

Provide a brief reference showing how to use these identities across different content types:

| Content Type | Use Undesired Identity For... | Use Aspiring Identity For... |
|-------------|------------------------------|------------------------------|
| Ads | Hook — mirror their current pain | CTA — show what's possible |
| Emails | Subject lines + opening paragraphs | Mid-email pivot + closing vision |
| Sales Calls | Discovery questions + pain agitation | Future pacing + close |
| Social Posts | "If this is you..." posts | Transformation/results posts |
| Video Scripts | Opening hook + problem sections | Solution reveal + call to action |

### VOICE & TONE
Write the Undesired Identity in the prospect's own language — raw, honest, slightly uncomfortable. Write the Aspiring Identity in {{clientName}}'s voice — confident, warm, and specific.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} The contrast between the two voices IS the persuasion — the reader should feel the emotional gap between where they are and where they could be.

### OUTPUT FORMAT
Use clear section headers and numbering. Each identity should be a self-contained reference document. The condensed Before & After should be copy-paste ready for a sales page. Label every section clearly for easy reference by team members creating content.
```

## Post-Processing
1. This output feeds into belief-shift-map, core-conversion-content, sales-call-script, and all downstream content templates as identity context
2. Verify BOTH identities have all 8 attributes filled — no missing categories
3. Check that the Identity Names are specific to the niche, not generic (e.g., "The Hustle Addict" not "The Stuck Person")
4. Verify the statistical profiles use real, comparable metrics — the same categories in both for direct contrast
5. Check that False Beliefs and True Beliefs are direct mirrors of each other
6. The condensed Before & After must be punchy enough for direct use — no academic language
7. Verify the bridge statement names the unique mechanism specifically
8. Every element should be hyper-specific to {{niche}} and {{targetAudience}} — not generic coaching advice
