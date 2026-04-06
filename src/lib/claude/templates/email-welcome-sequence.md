# Generation Template: Email Welcome Sequence (5-7 Emails)

## Template ID
`email-welcome-sequence`

## What This Generates
A 5-7 email welcome/nurture sequence sent to new leads after they opt in (lead magnet download, webinar signup, or list join). Goal: build relationship, shift beliefs, and move them toward the offer.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "offerName": "string",
  "pricePoint": "string",
  "transformation": "string",
  "uniqueMechanism": "string",
  "leadMagnetName": "string — what they opted in for",
  "commonObjections": "array — top 3-5 objections the audience has",
  "personalStory": "string",
  "testimonials": "array (optional)",
  "ctaType": "string — 'application' | 'booking' | 'dm-keyword'",
  "ctaKeyword": "string (optional)",
  "brandVoice": "string",
  "unwantedFeelings": "string — feelings the target audience wants to escape",
  "desiredFeelings": "string — feelings the target audience wants to experience",
  "aspiringIdentity": "string — who the target audience wants to become"
}
```

## Context Dependencies
This template uses outputs from prior deliverables:
- **magnetic-messaging-statement** — provides the core messaging hook and positioning language
- **belief-shift-map** — provides Hell Island/Heaven Island contrast, 6 Core Beliefs, Aspiring Identity, and Undesired Identity traits

## Framework References (John Whiting)
- **C1: Authority Amplifier** — Every email is propaganda: content designed to shift beliefs. Each email should install ONE new buying belief or break ONE old belief.
- **C2: Content by Funnel Stage** — Welcome sequence is middle-of-funnel. Goal is nurture and indoctrination, NOT hard selling.
- **B4: 7-Hour Content Rule** — It takes ~7 hours of content consumption before someone buys. Each email adds to that total.
- **D4: Objection Handling Through Content** — Dedicate individual emails to handling specific objections. Don't handle them all in one email.
- **C4: Farming Analogy** — Seeds planted (opt-in), now watering (nurture sequence). Don't try to harvest in email 2.
- **H2: Emotional Tone Scale** — Move the reader UP the tone scale with each email. Start at their current state (fear/doubt), move toward antagonism against the problem, then enthusiasm about the solution.

## Generation Prompt

```
You are writing a 5-7 email welcome sequence for a coaching business. Each email serves a specific strategic purpose in moving the prospect from "just opted in" to "ready to apply/buy."

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Problem Solved:** {{problemSolved}}
- **Offer:** {{offerName}} at {{pricePoint}}
- **Transformation:** {{transformation}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Lead Magnet:** {{leadMagnetName}}
- **Common Objections:** {{commonObjections}}
- **Personal Story:** {{personalStory}}
  IMPORTANT: Use ONLY the structured story details provided (Before State, Turning Point, After State, Key Facts). Do not expand or embellish biographical details. If story data is limited, keep it brief rather than inventing.
- **CTA Type:** {{ctaType}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}
- **Case Studies:** {{caseStudies}}

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

### SEQUENCE STRUCTURE

**Email 1: Welcome + Delivery** (Send immediately)
- Deliver the {{leadMagnetName}}
- Set expectations for what's coming
- Share ONE quick win / insight to build immediate trust
- Belief to install: "I'm in the right place"
- Tone: warm, welcoming, briefly establish authority

**Email 2: Origin Story → Hell Island to Heaven Island** (Day 1-2)
- Tell {{clientName}}'s story using the Hell Island → Heaven Island arc
- Start in Hell Island: paint the struggle using language that mirrors {{unwantedFeelings}}
- Show the turning point / discovery
- Arrive at Heaven Island: paint the after-state using {{desiredFeelings}}
- Mirror the reader's current situation — they should see themselves in the Hell Island part
- Belief to install: "This person understands my struggle — they've been on my Hell Island"
- End with a question or engagement hook
- NO selling

**Email 3: Core Belief #1 — Your Current Method Is the Problem** (Day 3-4)
- Maps to Core Belief #1 (method) from the belief-shift-map
- Challenge the #1 false belief about their current approach to solving {{problemSolved}}
- Show why the method they've been using (not them personally) is what's broken
- Reframe with the truth: one offer, one avatar, one channel
- Belief to install: "My current method is what's holding me back — not me"
- Objection addressed: {{commonObjections[0]}}

**Email 4: Core Belief #2 — The Real Problem Is Not What You Think** (Day 5-6)
- Maps to Core Belief #2 (real problem) from the belief-shift-map
- Redefine the actual problem beneath the surface problem
- Show that what they think is the problem (e.g., "I need more leads") is actually a symptom of a deeper issue
- Introduce {{uniqueMechanism}} as the solution to the REAL problem
- Show the 3-phase/step process at a high level
- Belief to install: "I've been solving the wrong problem this whole time"
- Objection addressed: {{commonObjections[1]}}

**Email 5: Core Belief #5 — Why This Approach Works** (Day 7-8)
- Maps to Core Belief #5 (best method) from the belief-shift-map
- Share proof that {{uniqueMechanism}} actually works — client result or personal result
- Specific numbers/outcomes where possible
- Position this as the "organized, repeatable process"
- Belief to install: "This method is proven and it works for people like me"
- {{#if testimonials}}Use: {{testimonials}}{{/if}}
- Objection addressed: {{commonObjections[2]}}

**Email 6: Core Belief #4 — The Cost of Inaction + Investment Reframe** (Day 9-10)
- Maps to Core Belief #4 (money) from the belief-shift-map
- Paint the picture of what happens if they do NOTHING — they stay on Hell Island with {{unwantedFeelings}}
- Calculate the real cost of inaction (lost revenue, wasted time, emotional toll)
- Reframe investment: {{pricePoint}} is not a cost, it's the price of leaving Hell Island
- Use the pendulum law: staying stuck swings them further into frustration
- Contrast: Hell Island (now + {{unwantedFeelings}}) vs. Heaven Island ({{programDuration}} from now + {{desiredFeelings}})
- Belief to install: "The biggest risk is doing nothing — inaction has a price tag too"
- Move them to ANTAGONISM against their problem

**Email 7: The Invitation → Aspiring Identity Sell** (Day 11-12)
- Sell the Aspiring Identity ({{aspiringIdentity}}), not just the offer
- Frame {{offerName}} as the vehicle to become {{aspiringIdentity}}
- Full offer breakdown: what's included, what they get, the transformation
- Price anchor: frame {{pricePoint}} against the cost of staying on Hell Island
- Include the "Not for you if..." filter — mapped to Undesired Identity traits
- Include the "This IS for you if..." qualifier — mapped to Aspiring Identity traits
- CTA: {{ctaType}} {{#if ctaKeyword}}— DM "{{ctaKeyword}}"{{/if}}
- Close on identity: "This is for people who are ready to become {{aspiringIdentity}}"
- No desperation. Frame it as: "If this resonates, here's how to take the next step"

### EMAIL FORMAT RULES

For EACH email, provide:
1. **Subject Line** (and 1 alternative)
2. **Preview Text** (the snippet shown in inbox)
3. **Body Copy** (300-500 words per email)
4. **CTA** (what action to take — even if it's just "hit reply")
5. **P.S. Line** (optional but recommended for emails 5-7)

### COPY PRINCIPLES
- Write like a human, not a marketer
- Short paragraphs (1-3 sentences max)
- Use "you" more than "I"
- Every email earns the right to send the next one
- Subject lines: curiosity-driven, NOT clickbait
- NO: "Hey {{firstName}}!" openers on every email — vary the openings
- Include line breaks for mobile readability

### VOICE & TONE
{{brandVoice}} tone throughout.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Return all 5-7 emails in order, clearly separated with email number, send timing, and strategic purpose noted above each.
```
