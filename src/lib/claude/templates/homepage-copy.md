# Generation Template: Homepage Copy

## Template ID
`homepage-copy`

## What This Generates
Full homepage for a coaching client's website — hero section, problem/solution, offer overview, social proof section, CTA sections, and footer content.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string — who they help (e.g., 'burned-out corporate professionals')",
  "problemSolved": "string — the core problem they solve",
  "offerName": "string — name of their coaching program",
  "pricePoint": "string — e.g., '$3,000', '$5,000/month'",
  "transformation": "string — the end result clients achieve",
  "uniqueMechanism": "string — what makes their method different",
  "targetAudience": "string — specific demographics and psychographics",
  "personalStory": "string — client's origin story / why they do this",
  "testimonials": "array — any existing client results or testimonials",
  "ctaType": "string — 'application' | 'booking' | 'dm-keyword'",
  "ctaKeyword": "string — DM keyword if applicable (e.g., 'READY')",
  "brandVoice": "string — 'motivational' | 'tactical' | 'casual' | 'authoritative'",
  "unwantedFeelings": "string — feelings the target audience wants to escape (e.g., 'stuck, overwhelmed, invisible')",
  "desiredFeelings": "string — feelings the target audience wants to experience (e.g., 'confident, in control, respected')",
  "aspiringIdentity": "string — who the target audience wants to become (e.g., 'a thriving, fully booked coach')"
}
```

## Context Dependencies
This template uses outputs from prior deliverables:
- **magnetic-messaging-statement** — provides the core messaging hook and positioning language
- **belief-shift-map** — provides Hell Island/Heaven Island contrast, 6 Core Beliefs, Aspiring Identity, and Undesired Identity traits

## Framework References (John Whiting)
- **A1: Core Offer Philosophy** — One offer, one avatar, one acquisition method. Homepage must be laser-focused on ONE person with ONE problem.
- **A6: Repelling the Anti-Avatar** — Homepage should attract the perfect client AND repel the wrong ones. Include qualifying language.
- **A4: Unique Mechanism** — Every coach needs a "thing" that differentiates them. Homepage must feature this prominently.
- **C1: Authority Amplifier / Belief Shifting** — Homepage copy should shift beliefs. Not just describe the offer — install new beliefs about what's possible.
- **D1: No-Call Close** — CTA should match the self-closing model (DM keyword, application, or direct booking — NOT "schedule a free call" unless client specifically wants calls).
- **B4: 7-Hour Content Rule** — Homepage is one touchpoint in a longer journey. It should push visitors toward MORE content consumption, not hard-close immediately.

## Voice Layer
{{STEVE_VOICE_PROFILE}}
> Applied after content generation. All copy gets rewritten through Steve's personality, tone, and communication style.

## Generation Prompt

```
You are an expert direct-response copywriter building a coaching business homepage. Use the proven frameworks below to create high-converting copy.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Problem Solved:** {{problemSolved}}
- **Offer:** {{offerName}} at {{pricePoint}}
{{#if programIncludes}}- **What's Included:** {{programIncludes}}{{/if}}
{{#if deliveryModel}}- **Delivery Model:** {{deliveryModel}}{{/if}}
- **Transformation:** {{transformation}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Target Audience:** {{targetAudience}}
- **Personal Story:** {{personalStory}}
  IMPORTANT: Use ONLY the structured story details provided (Before State, Turning Point, After State, Key Facts). Do not expand or embellish biographical details. If story data is limited, keep it brief rather than inventing.
- **Brand Voice:** {{brandVoice}}
- **CTA Type:** {{ctaType}}
{{#if ctaKeyword}}- **CTA Keyword:** {{ctaKeyword}}{{/if}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}
- **Program Phases:** {{programPhases}}
- **Track Record:** {{trackRecord}}
{{#if billboardResult}}- **Billboard Result:** {{billboardResult}}{{/if}}
{{#if elevatorPitch}}- **Elevator Pitch:** {{elevatorPitch}}{{/if}}
{{#if totalClientsCoached}}- **Total Clients Coached:** {{totalClientsCoached}}{{/if}}
{{#if doneForYou}}- **Done-For-You Services:** {{doneForYou}}{{/if}}

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

### FRAMEWORK RULES

1. **One Avatar Focus**: Every word on this page speaks to ONE specific person — {{targetAudience}}. If it doesn't serve that person, cut it.

2. **Repel the Anti-Avatar**: Include a section that tells the WRONG person to leave. Use language like: "This is NOT for you if..." followed by traits of uncommitted, excuse-making, shortcut-seeking people.

3. **Lead with the Problem (Hell Island)**: Open with the pain point {{targetAudience}} is experiencing RIGHT NOW — paint the Hell Island picture using {{unwantedFeelings}}. Make them feel understood before offering the solution.

4. **Unique Mechanism Spotlight (Heaven Island Bridge)**: Feature {{uniqueMechanism}} as the bridge FROM Hell Island TO Heaven Island. Paint the Heaven Island picture using {{desiredFeelings}}. Explain WHY this approach works when others haven't.

5. **Belief-Shifting Copy**: Don't just describe — shift beliefs. Address the false beliefs holding {{targetAudience}} back:
   - "You don't need more information, you need the RIGHT system"
   - "The problem isn't your work ethic, it's your strategy"
   - Challenge what they currently believe about solving {{problemSolved}}

6. **Results Over Features**: Lead with transformation ({{transformation}}), not deliverables. Show what life looks like AFTER working with {{clientName}}.

7. **Self-Closing CTA**: The CTA should be {{ctaType}}. Frame it as selective/exclusive — the client is CHOOSING them, not begging for their business.
   {{#if ctaKeyword}}CTA: "DM me the word '{{ctaKeyword}}' on Instagram to get started"{{/if}}

8. **Social Proof**: {{#if testimonials}}Use {{testimonials}} strategically throughout — not bunched at the bottom. Do not embellish or fabricate additional details.{{else}}Mark testimonial sections with [INSERT TESTIMONIAL] placeholders. Include guidance: "*** Add 2-3 real client results with specific outcomes before publishing. ***" Do NOT invent fictional testimonials.{{/if}}

9. **Aspiring Identity Hero**: The hero headline should speak to the Aspiring Identity ({{aspiringIdentity}}). The reader should see who they want to BECOME, not just what they want to fix.

10. **Hell Island / Heaven Island Contrast**: The Problem section paints Hell Island (where they are now + {{unwantedFeelings}}). The Solution section paints Heaven Island (where they'll be + {{desiredFeelings}}). The contrast should be vivid and emotionally charged.

### SECTIONS TO GENERATE

1. **Hero Section**
   - Headline (speaks to the Aspiring Identity — {{aspiringIdentity}} — benefit-driven)
   - Subheadline (addresses the core problem / Hell Island state)
   - Primary CTA button
   - Optional: hero image description/suggestion

2. **Problem Section** ("The Problem")
   - 3-5 pain points the target audience is experiencing
   - "Sound familiar?" validation moment
   - Bridge to the solution

3. **Solution Section** ("The {{uniqueMechanism}}")
   - How {{offerName}} works at a high level
   - 3 phases/steps (organized, repeatable process — per the framework)
   - Why this approach is different

4. **Results Section**
   - Transformation promise
   - Specific outcomes / metrics where possible
   - Testimonials woven in (if provided)

5. **About Section** (Brief)
   - {{clientName}}'s story in 2-3 paragraphs
   - Why they created {{offerName}}
   - Credibility markers

6. **"Not For You If..." Section**
   - 4-5 anti-avatar traits mapped to the Undesired Identity from the belief-shift-map (excuse makers, shortcut seekers, those who cling to {{unwantedFeelings}} as their identity)
   - "If that's you, please don't apply."

7. **"This IS For You If..." Section**
   - 4-5 perfect avatar traits mapped to the Aspiring Identity ({{aspiringIdentity}}) — action takers, committed, those who resonate with {{desiredFeelings}}

8. **Final CTA Section**
   - Restate the transformation
   - Clear next step ({{ctaType}})
   - Urgency without being sleazy

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Return each section with clear headers. Include copy ready to paste into a website builder. No placeholder text — all copy should be specific to this client's details.
```

## Post-Processing
1. Run through Steve's voice filter (when available)
2. Check word count (homepage should be 1,500-3,000 words total)
3. Verify all client details are correctly inserted
4. Flag any sections that need testimonials but none were provided
