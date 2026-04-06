# Generation Template: Facebook Posts (10-20 Posts)

## Template ID
`facebook-posts`

## What This Generates
10-20 Facebook posts across different content types — value posts, story posts, belief-shifting posts, results posts, and CTA posts. Designed for organic reach + paid retargeting.

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
  "testimonials": "array (optional)",
  "ctaKeyword": "string (optional)",
  "contentStyle": "string — 'short-punchy' | 'story-driven' | 'educational' | 'mixed'",
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become"
}
```

## Context Dependencies
This template uses outputs from the **belief-shift-map** and **content-angle-library** deliverables. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, Undesired Identity / Aspiring Identity, and the Content Angle Library with specific post angles.

## Framework References (John Whiting)
- **C1: Authority Amplifier** — Every post is propaganda: shifts a belief, installs a new one, or breaks an old one. No "filler" content.
- **C2: Content by Funnel Stage** — Mix of TOF (awareness), MOF (belief-shifting), and BOF (conversion) posts.
- **C5: Social Media Strategy** — Force distribution with paid retargeting. Don't rely on organic algorithm.
- **D4: Objection Handling** — Turn each objection into a post. Each post handles ONE objection.
- **A6: Repelling Anti-Avatar** — Some posts should be polarizing. Tell the wrong people to unfollow.
- **C6: Outflow = Inflow** — Volume matters. Consistent posting compounds.
- **H2: Emotional Tone Scale** — Posts should move readers UP the scale: from fear/doubt → antagonism against the problem → enthusiasm about the solution.

## Generation Prompt

```
You are writing 10-20 Facebook posts for a coaching business. Each post serves a specific strategic purpose in the content marketing ecosystem. These posts will be used organically AND as retargeting ads.

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
- **Content Style:** {{contentStyle}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}
{{#if clientAngerTrigger}}- **Anger Trigger:** {{clientAngerTrigger}}{{/if}}
{{#if clientDailyReminder}}- **Daily Reminder:** {{clientDailyReminder}}{{/if}}
{{#if topComplaints}}- **Top Complaints:** {{topComplaints}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. BANNED CLICHES: Do NOT use these overused words in identity names, headlines, section headers, or key messaging: "prisoner," "captive," "trapped," "slave," "beggar," "grind/grinding," "hamster wheel," "treadmill," "rat race," "cage," "chains." Use niche-specific language instead.

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### POST MIX (Per the Content Playbook Framework)

Generate posts in this ratio:
- **4-5 Value Posts** (TOF — awareness)
- **3-4 Story Posts** (MOF — connection/belief shifting)
- **3-4 Belief-Shifting Posts** (MOF — break old beliefs / install new ones)
- **2-3 Results/Proof Posts** (BOF — social proof)
- **2-3 CTA Posts** (BOF — direct invitation)
- **1-2 Polarizing/Filter Posts** (anti-avatar repelling)

### POST TYPE DETAILS

**VALUE POSTS (4-5)**
- Share ONE actionable insight from {{expertise}}
- Format: hook → insight → action step → engagement question
- Goal: establish authority, get saves/shares
- Example framework: "Most [target audience] think [common belief]. Here's what actually works: [insight]. Try this today: [action step]. What's been your experience with this?"

**STORY POSTS (3-4)**
- Personal anecdotes from {{personalStory}} or client work. **For story-type posts, draw ONLY from the structured story fields (Before State, Turning Point, After State, Key Facts). Do not invent additional personal anecdotes.**
- Format: scene-setting → conflict → lesson → bridge to reader
- Goal: build connection, make coach relatable
- Content should make them think "that was me"
- Each story should naturally demonstrate expertise without teaching

**BELIEF-SHIFTING POSTS (3-4)**
- Each post targets ONE of the 6 Core Beliefs from the Belief-Shift Map (provided in PRIOR DELIVERABLE CONTEXT)
- For each Core Belief, use one of these evidence types as the post format:
  - **Analogy Post** — use a relatable analogy to make the belief shift click
  - **Metaphor Post** — paint a vivid metaphor that reframes the old belief
  - **Case Study Post** — tell a story (client or personal) that proves the new belief
  - **Data/Logic Post** — use a statistic, fact, or logical argument to break the old belief
- Reference the Content Angle Library (in PRIOR DELIVERABLE CONTEXT) for specific angles to use
- Format: state the old belief → challenge it with evidence → reframe → install the new belief
- Content is designed to shift belief systems

**RESULTS/PROOF POSTS (2-3)**
- Client wins, transformations, metrics
- Format: before state → what they did → after state → lesson
- {{#if testimonials}}Draw from real testimonials only — do not embellish: {{testimonials}}{{else}}Use the coach's OWN documented results from their personal story. Do NOT create hypothetical case studies or fictional client stories. If insufficient proof exists, insert [INSERT CLIENT RESULT HERE] as a placeholder.{{/if}}

**CTA POSTS (2-3)**
- Direct invitation to learn about {{offerName}}
- NOT hard sell — position as an opportunity for the RIGHT person
- Include the "This is for you if..." qualifier
- {{#if ctaKeyword}}CTA: "DM me '{{ctaKeyword}}' to get the details"{{/if}}
- Frame as selective. The coach is CHOOSING clients, not begging.

**IDENTITY POSTS (1-2)**
- Contrast the Undesired Identity vs the Aspiring Identity ({{aspiringIdentity}})
- Paint a vivid picture of who they're becoming if they stay stuck (Undesired Identity — tied to {{unwantedFeelings}})
- Then paint the Aspiring Identity — what life looks, feels, and sounds like when they've made the shift (tied to {{desiredFeelings}})
- Format: "There are two types of [target audience]..." or "You're either becoming [Aspiring Identity] or staying [Undesired Identity]"
- Goal: make the reader self-select into the Aspiring Identity

**POLARIZING/FILTER POSTS (1-2)**
- Take a strong stance on something in the {{niche}}
- Tell the wrong people to unfollow
- Frame the offer as NOT for people looking for easy shortcuts
- Format: bold statement → explanation → "If you disagree, that's fine — this isn't for you"

### POST FORMAT RULES

For EACH post:
1. **Hook** (first 1-2 lines — what stops the scroll)
2. **Body** (the content — 100-300 words depending on type)
3. **CTA/Closing** (engagement question, action step, or offer link)
4. **Post Type Label** (for the coach's content calendar)
5. **Funnel Stage** (TOF / MOF / BOF)
6. **Retargeting Note** (should this run as a paid retargeting ad? Y/N + suggested audience)

### COPY PRINCIPLES
- First line is EVERYTHING — it must stop the scroll
- Write like you talk, not like a textbook
- Short paragraphs (1-2 sentences)
- Use line breaks aggressively for mobile readability
- NO hashtag spam (0-3 relevant hashtags max)
- Engagement hooks: ask questions, invite comments, create debate
- Optimize for CONSUMPTION, not conversion (except CTA posts)

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Number each post (Post 1, Post 2, etc.) with type label, funnel stage, and retargeting note. Ready to copy-paste into Facebook.
```
