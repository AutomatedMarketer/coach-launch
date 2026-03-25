# Generation Template: About Page

## Template ID
`about-page`

## What This Generates
Full "About" page for a coaching client's website — personal brand positioning, origin story, mission, credibility, and connection CTA.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string",
  "personalStory": "string — full background, why they became a coach",
  "transformation": "string — what they help clients achieve",
  "credentials": "string — certifications, experience, results",
  "values": "(AI-derived from personalStory — extract core values and beliefs)",
  "targetAudience": "string",
  "uniqueMechanism": "string",
  "personalDetails": "string — family, hobbies, humanizing details (optional)",
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
- **A1: Core Offer Philosophy** — Build everything around your ONE best client. The about page should make that person feel like the coach was PUT HERE for them.
- **H1: Core Belief System** — "You are the source." The about page should position the coach as someone who took ownership and built from nothing — modeling what clients should do.
- **A6: Anti-Avatar Repelling** — Even the about page should filter. The coach's story should naturally repel people who don't share their values.
- **C1: Belief Shifting** — The about page is propaganda. It installs the belief: "This person understands me and has been where I am."

## Generation Prompt

```
You are writing an About page for a coaching business. This page must do three things: build deep trust, establish authority, and make the perfect client feel "this person GETS me."

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Personal Story:** {{personalStory}}
  IMPORTANT: Use ONLY the structured story details provided (Before State, Turning Point, After State, Key Facts). Do not expand or embellish biographical details. If story data is limited, keep it brief rather than inventing.
- **Transformation Delivered:** {{transformation}}
- **Credentials:** {{credentials}}
- **Core Values:** (Extract 3-5 core values and beliefs from the personal story above. Identify what drives this coach.)
- **Target Audience:** {{targetAudience}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Personal Details:** {{personalDetails}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}
- **Track Record:** {{trackRecord}}
- **Why Beyond Money:** {{whyDoThis}}
{{#if upbringing}}- **Upbringing:** {{upbringing}}{{/if}}
{{#if parentInfluence}}- **Parent Influence:** {{parentInfluence}}{{/if}}
{{#if coachingLineage}}- **Coaching Lineage:** {{coachingLineage}}{{/if}}
{{#if firstBusiness}}- **First Business:** {{firstBusiness}}{{/if}}
{{#if personalLife}}- **Personal Life:** {{personalLife}}{{/if}}
{{#if clientGuiltShame}}- **Client Guilt/Shame (for empathy section):** {{clientGuiltShame}}{{/if}}

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

1. **Story Arc (Hell Island → Heaven Island)**: Use the belief-shift journey structure:
   - **Hell Island**: Where they started — paint the struggle using language that mirrors {{unwantedFeelings}}. The reader's current pain should be reflected in the coach's past.
   - **The Turning Point**: The discovery/breakthrough that shifted everything
   - **Heaven Island**: What they built as a result — paint this using language that mirrors {{desiredFeelings}}
   - **The Mission**: Why they now help others make the same Hell → Heaven journey

2. **Mirror the Avatar**: The coach's story should mirror the target audience's current situation. {{targetAudience}} should read this and think "that was me."

3. **Authority Without Arrogance**: Present credentials and results confidently but without bragging. Frame results as proof that the methodology works, not that the coach is special.

4. **Values as Filters**: Each value statement naturally attracts the right client and repels the wrong one. Example: "I believe in doing the hard work, not finding shortcuts" filters out shortcut-seekers.

5. **Human Connection**: Include personal details that make the coach relatable — family, hobbies, quirks. But keep it brief. This isn't a memoir.

### SECTIONS TO GENERATE

1. **Opening Hook** (2-3 sentences)
   - Start with a relatable moment or bold statement
   - NOT "Hi, I'm {{clientName}}..." — that's boring

2. **The Origin Story** (3-4 paragraphs)
   - **Hell Island**: The struggle / before state — mirror the {{unwantedFeelings}} the reader currently has
   - **The Turning Point**: The discovery that changed everything
   - **Heaven Island**: The result / transformation — paint the {{desiredFeelings}} the reader wants
   - The mission that emerged — helping others make this same journey

3. **What I Believe** (bullet list)
   - Map to the 6 Core Beliefs from the belief-shift-map (coach's version of each):
     - Belief about method: "The old way doesn't work — here's why"
     - Belief about the real problem: "It's not what you think is holding you back"
     - Belief about who can do this: "You don't need X background to succeed"
     - Belief about money/investment: "Investing in yourself is the first step"
     - Belief about the best approach: "Why this method works when others haven't"
     - Belief about timing: "The best time to start was yesterday — the next best time is now"
   - Each belief is a filter (attracts right people, repels wrong ones)

4. **The Numbers / Credibility** (brief)
   - {{credentials}} formatted as scannable proof points
   - Client results if available

5. **The Personal Side** (1-2 paragraphs)
   - {{personalDetails}} woven naturally
   - Makes the coach feel like a real human, not a sales machine

6. **CTA** (closing)
   - "If this resonates..." bridge to next step
   - Link to offer page or application

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Full page copy, section by section. 800-1,500 words total.
```
