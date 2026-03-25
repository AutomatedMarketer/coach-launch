# Generation Template: Facebook Ad Copy (3-5 Variations)

## Template ID
`facebook-ad-copy`

## What This Generates
3-5 Facebook/Instagram ad variations — primary text, headlines, descriptions, and CTA buttons. Includes both SLO (self-liquidating offer) ads and retargeting/content ads.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "offerName": "string",
  "pricePoint": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "transformation": "string",
  "uniqueMechanism": "string",
  "leadMagnetName": "string — free offer for TOF ads",
  "leadMagnetUrl": "string",
  "commonObjections": "array",
  "testimonials": "array (optional)",
  "adGoal": "string — 'lead-gen' | 'slo-purchase' | 'content-retargeting' | 'application'",
  "dailyBudget": "string (optional)",
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become"
}
```

## Context Dependencies
This template uses outputs from the **belief-shift-map** and **content-angle-library** deliverables. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, Undesired Identity / Aspiring Identity, and the Content Angle Library with specific ad angles.

## Framework References (John Whiting)
- **C3: Ad Strategy** — 50% of ad spend on content/retargeting (no CTA), 50% on SLO funnel. Retargeting ads optimize for CONSUMPTION, not conversion.
- **C3: Ad Scaling** — Establish baseline conversion rates first. Stress test by increasing budget. If rates hold, scale.
- **C3: DM Ads Warning** — John does NOT run DM ads. They optimize for low-quality button-tappers. Let people come organically after seeing content.
- **B1: Self-Closing System** — Ads feed the top of funnel. SLO liquidates 90-93% of ad spend.
- **A3: Pricing — "Lowest cost = lowest quality"** — Be willing to pay more per lead because higher quality = higher LTV.
- **C1: Belief Shifting** — Even ads are propaganda. Every ad should shift one belief.

## Generation Prompt

```
You are writing Facebook/Instagram ad copy for a coaching business. Create 3-5 ad variations across different angles and ad types.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Offer:** {{offerName}} at {{pricePoint}}
- **Target Audience:** {{targetAudience}}
{{#if minimumRequirements}}- **Minimum Client Requirements:** {{minimumRequirements}}{{/if}}
- **Problem Solved:** {{problemSolved}}
- **Transformation:** {{transformation}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Lead Magnet:** {{leadMagnetName}} ({{leadMagnetUrl}})
- **Common Objections:** {{commonObjections}}
- **Ad Goal:** {{adGoal}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}
{{#if clientSecretFear}}- **Secret Fear:** {{clientSecretFear}}{{/if}}
{{#if clientAngerTrigger}}- **Anger Trigger:** {{clientAngerTrigger}}{{/if}}
{{#if billboardResult}}- **Billboard Result:** {{billboardResult}}{{/if}}

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

### AD VARIATIONS TO CREATE

**Ad 1: Problem-Aware (Lead Gen / SLO)**
- Hook: Use the Money Messaging Statement from the Belief-Shift Map as the primary text or opening line
- Agitate the problem with specific details they'll recognize — reference Hell Island language and {{unwantedFeelings}}
- Present {{leadMagnetName}} as the first step to solving it
- Angle: "The problem isn't what you think it is"
- CTA: Download / Get Access

**Ad 2: Solution-Aware (Lead Gen / SLO)**
- Hook: Lead with the transformation / result
- "What if you could [transformation] in {{programDuration}}?"
- Introduce {{uniqueMechanism}} as the how
- Social proof if available
- CTA: Learn More / Get the Guide

**Ad 3: Testimonial / Case Study**
- Hook: Lead with a specific client result
- Format: "[Client name] went from [before] to [after] in [timeframe]"
- Let the story create desire
- CTA: "Want results like this?"
- {{#if testimonials}}Use ONLY real testimonials — do not embellish or add fictional details: {{testimonials}}{{else}}Do NOT create a fictional testimonial. Instead, output this placeholder:

[TESTIMONIAL PLACEHOLDER]
*** Replace this with a real client result. Include: client first name, their before state, what they did, their after state with specific numbers/timeframe. ***

Adapt the rest of this ad to work WITHOUT a testimonial — use the coach's own transformation from their personal story instead.{{/if}}

**Ad 4: Retargeting / Belief-Shift Content Ad (No Hard CTA)**
- This ad optimizes for CONSUMPTION, not conversion
- Target ONE specific Core Belief from the Belief-Shift Map (provided in PRIOR DELIVERABLE CONTEXT)
- Use a specific belief-shift angle from the Content Angle Library — pick the strongest analogy, metaphor, or reframe for that belief
- NO link, NO CTA button — goal is to stay in their feed and build trust
- This is "propaganda" — content designed to shift beliefs
- Suggested audience: people who visited site or engaged with previous ads

**Ad 5: Direct Offer (Application / BOF)**
- For warm audiences ONLY (retargeting pool)
- Sell the Aspiring Identity: "If you're ready to become {{aspiringIdentity}}..." — paint the Heaven Island vision tied to {{desiredFeelings}}
- Direct presentation of {{offerName}}
- {{pricePoint}} stated openly
- Include qualifier: "This is for [type of person]. If that's you..."
- CTA: Apply Now / Book a Call

### AD FORMAT (For Each Variation)

1. **Primary Text** (the main ad copy above the image/video)
   - Short version (under 125 characters — visible without "See More")
   - Long version (300-500 words for expanded view)

2. **Headline** (under the image — 40 characters max)

3. **Description** (under headline — 30 characters max)

4. **CTA Button** (Learn More / Sign Up / Apply Now / Download / Shop Now)

5. **Suggested Image/Video Direction** (brief description of visual)

6. **Targeting Notes**
   - Audience type: cold / warm / retargeting
   - Optimization event: landing page view / purchase / engagement / video view
   - Suggested daily budget range

### AD COPY PRINCIPLES
- Every ad shifts ONE belief
- Hook must stop the scroll in 1 second
- Retargeting ads: optimize for consumption, NOT conversion
- SLO ads: optimize for purchases (book, course, low-ticket)
- Don't run DM ads — they attract low-quality clickers
- Be willing to pay more per lead for higher quality
- Test multiple angles, keep what converts
- Include social proof whenever possible

### FACEBOOK AD POLICY COMPLIANCE
- No income claims without disclaimers
- No "you" in before/after comparisons
- No guaranteed results language
- No engagement bait (like/share/comment to enter)
- Keep health/finance claims evidence-based

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}
```
