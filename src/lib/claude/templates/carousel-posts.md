# Generation Template: Carousel Posts (5-10 Instagram/Facebook Carousels)

## Template ID
`carousel-posts`

## What This Generates
5-10 Instagram/Facebook carousel posts with slide-by-slide content. Each carousel is designed to drive engagement, build authority, and trigger ManyChat keyword automations. Per John Whiting's Phase 3 workbook, carousels are high-save, high-share content that feeds the DM automation funnel.

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
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become",
  "ctaKeyword": "string (optional) — ManyChat/DM automation keyword",
  "leadMagnetName": "string (optional) — free resource to offer via DM"
}
```

## Context Dependencies
This template uses outputs from the **magnetic-messaging-statement**, **belief-shift-map**, and **content-angle-library** deliverables. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, Undesired Identity / Aspiring Identity, and the Content Angle Library with specific carousel angles.

## Framework References (John Whiting)
- **C1: Authority Amplifier** — Carousels are "mini-courses" that shift beliefs one slide at a time. Each carousel is propaganda with a built-in engagement trigger.
- **C5: Social Media Strategy** — Carousels get the highest save rate on Instagram. Saves signal value to the algorithm = more reach.
- **C7: ManyChat Integration** — Every carousel ends with a keyword trigger CTA. "Comment [KEYWORD] and I'll send you..." This feeds the DM automation funnel automatically.
- **C2: Content by Funnel Stage** — Mix educational (TOF), belief-shifting (MOF), and proof (BOF) carousels across the content calendar.
- **D4: Objection Handling** — "Old way vs new way" carousels naturally handle objections by reframing the old belief.
- **H2: Emotional Tone Scale** — Slide progression should move the reader UP the emotional scale: curiosity → understanding → excitement → action.

## Generation Prompt

```
You are creating 5-10 Instagram/Facebook carousel posts for a coaching business. Each carousel is a slide-by-slide content piece designed to educate, shift beliefs, and drive engagement through ManyChat keyword triggers.

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
- **ManyChat Keyword:** {{ctaKeyword}}
- **Lead Magnet:** {{leadMagnetName}}

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

### CAROUSEL MIX (Per the Content Playbook Framework)

Generate carousels in this ratio:

**EDUCATIONAL CAROUSELS (2-3 carousels)**
- Teach a 3-5 step framework or process from {{expertise}}
- Slide 1: Hook — bold claim or question ("The 5-step framework that [transformation]")
- Slides 2-6: One step per slide with a clear headline + 1-2 sentences of explanation
- Final Slide: CTA with ManyChat keyword trigger
- Goal: establish authority, get saves and shares
- Give away the WHAT and the WHY. Sell the HOW and the ACCOUNTABILITY.
- Each step should be genuinely useful — if the reader follows the steps, they should see a result

**BELIEF-SHIFTING CAROUSELS (2-3 carousels)**
- "Old Way vs New Way" format — directly challenge a Core Belief from the Belief-Shift Map
- Slide 1: Hook — "Stop doing [old way]. Here's what actually works."
- Slide 2: The old belief / old way (with Hell Island language from {{unwantedFeelings}})
- Slide 3: Why it doesn't work (consequences, data, or logic)
- Slide 4: The new belief / new way (the paradigm shift)
- Slide 5: Why it works (proof — story, analogy, or data)
- Final Slide: CTA with ManyChat keyword trigger
- Reference specific beliefs from the Belief-Shift Map (in PRIOR DELIVERABLE CONTEXT)
- Content is designed to shift belief systems

**STORY CAROUSELS (1-2 carousels)**
- Transformation journey — personal or client story told across slides
- Slide 1: Hook — "I went from [before state] to [after state]. Here's what changed."
- Slide 2: The struggle / before state (relatable, vivid, emotional)
- Slide 3: The turning point / realization
- Slide 4: What they did differently (the shift)
- Slide 5: The result / after state (specific and aspirational)
- Final Slide: CTA — "If this resonates, comment [KEYWORD] and I'll send you [resource]"
- Draw from {{personalStory}} or client transformations. **Use ONLY facts from the structured story fields. Do not invent additional personal anecdotes.**
- Goal: build connection and show that transformation is possible

**RESULTS/PROOF CAROUSELS (1-2 carousels)**
- Showcase client wins, transformations, or data
- Slide 1: Hook — attention-grabbing result ("How [client] went from [X] to [Y] in [timeframe]")
- Slide 2: The before state (relatable struggle)
- Slide 3: What they implemented (tied to {{uniqueMechanism}})
- Slide 4-5: Specific results — metrics, screenshots, quotes
- Final Slide: CTA — "Want results like this? Comment [KEYWORD] below"
- {{#if testimonials}}Draw from real testimonials only — do not embellish: {{testimonials}}{{else}}Do NOT create fictional client results. Insert [INSERT CLIENT RESULT HERE] as a placeholder with guidance: "*** Replace with a real client transformation: name, before state, after state, timeframe, specific metrics. ***"{{/if}}
- Goal: social proof that drives action

### CAROUSEL SLIDE FORMAT (For Each Carousel)

1. **Carousel Number & Type** (e.g., "Carousel #1 — Educational")
2. **Carousel Title** (for the coach's content calendar)
3. **Core Belief Targeted** (which belief from the Belief-Shift Map this carousel addresses)
4. **Funnel Stage** (TOF / MOF / BOF)

For EACH slide within the carousel:
- **Slide Number** (Slide 1, Slide 2, etc.)
- **Headline Text** (large, bold text — 5-10 words max)
- **Body Text** (supporting text — 1-3 short sentences, 30-50 words max per slide)
- **Visual Direction** (background color/style, icon suggestions, layout notes)

After the slides:
- **Caption** (the post caption that accompanies the carousel — 100-200 words)
  - Must include engagement hook and the ManyChat keyword CTA
  - {{#if ctaKeyword}}"Comment '{{ctaKeyword}}' below and I'll send you {{leadMagnetName}}"{{/if}}
- **Hashtags** (5-10 relevant hashtags)
- **ManyChat Trigger** (the exact keyword and what it sends)

### CAROUSEL DESIGN PRINCIPLES
- Slide 1 is the THUMBNAIL — it must stop the scroll on its own
- Keep text LARGE and minimal — carousels are viewed on mobile
- Max 5-10 words for headlines, 30-50 words for body text per slide
- Use contrast: dark backgrounds with light text or vice versa
- Consistent visual style across all slides within one carousel
- Progress indicators (slide numbers or progress dots) help retention
- The last slide should create urgency to comment/engage
- Carousels work because they train the swipe behavior — each slide must reward the swipe

### MANYCHAT INTEGRATION RULES
- Every carousel ends with a keyword trigger CTA
- The keyword should be simple, memorable, and relevant (e.g., "FRAMEWORK", "BLUEPRINT", "FREEDOM")
- {{#if ctaKeyword}}Use "{{ctaKeyword}}" as the primary keyword{{else}}Suggest a unique keyword for each carousel{{/if}}
- The CTA must clearly state what they'll receive: "Comment [KEYWORD] and I'll DM you [specific thing]"
- ManyChat keyword triggers convert 3-5x better than "link in bio" because they create a micro-commitment

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Number each carousel (Carousel #1, Carousel #2, etc.) with type label, funnel stage, all slides with text and visual direction, caption, hashtags, and ManyChat trigger details. Each carousel should be ready to design and post immediately.
```
