# Generation Template: Belief Shift Map & Evidence Bank (Ethical Manipulation Framework)

## Template ID
`belief-shift-map`

## What This Generates
The complete "Ethical Manipulation" framework — the persuasion engine behind all marketing content. Includes two named identity personas (Before/After with 8 structured attributes each) and 6 Core Belief Shifts (each with 10 evidence components). This becomes the reference document for all content creation — every post, email, ad, video, and sales conversation targets one of these belief shifts using the evidence bank.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "unwantedFeelings": "string",
  "desiredFeelings": "string",
  "transformation": "string",
  "aspiringIdentity": "string",
  "uniqueMechanism": "string",
  "commonObjections": "array",
  "testimonials": "array (optional)",
  "offerName": "string",
  "pricePoint": "string",
  "brandVoice": "string"
}
```

## Context Dependencies
This template runs independently (no prior deliverables required), but benefits from being generated alongside:
- `magnetic-messaging-statement` — The core messaging DNA (runs in parallel)
- `emotional-trigger-map` — Deep avatar psychology (runs in parallel)

## Framework References
- **Ethical Manipulation Workbook**: Two Identity Templates (Before/After, 8 attributes each) + Belief Shift Template (10 components per belief)
- **Belief-Shift Framework C1-C3**: The 6 Core Beliefs, Belief Shift Structure, 7 Evidence Types
- **Belief-Shift Framework C4**: The Two Identities (Undesired vs Aspiring)
- **John Whiting Framework C1**: Authority Amplifier — content designed to shift belief systems
- **John Whiting Framework D4**: Objection handling through content (each objection = a belief to shift)
- **AI Prompts PDF Prompts 14-19**: Before/After Identity Frameworks + Belief Shift Templates

## Generation Prompt

```
You are an expert in belief-shifting marketing and "ethical manipulation" for coaching businesses. Ethical manipulation means understanding the deep belief systems that prevent prospects from taking action — and systematically providing evidence that shifts those beliefs toward truth. The ethics depend on the coach's genuine ability to deliver results.

Your job is to create the complete Belief Shift Map: two named identity personas and 6 Core Belief Shifts with full evidence banks. This document becomes the "persuasion engine" that powers ALL marketing content.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Core Problem:** {{problemSolved}}
- **Unwanted Feelings (The Pain Zone):** {{unwantedFeelings}}
- **Desired Feelings (The Possibility):** {{desiredFeelings}}
- **Transformation:** {{transformation}}
- **Their Next-Level Self:** {{aspiringIdentity}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Common Objections:** {{commonObjections}}
- **Offer:** {{offerName}} at {{pricePoint}}
- **Brand Voice:** {{brandVoice}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
- **Competitor/Old Way:** {{competitorOldWay}}
- **Ideal Client Current Revenue:** {{idealClientCurrentRevenue}}
- **Current Methods:** {{idealClientCurrentMethods}}
- **Case Studies:** {{caseStudies}}
{{#if clientExcuse}}- **Client Self-Limiting Story:** {{clientExcuse}}{{/if}}
{{#if clientFalseProblem}}- **What They Think the Problem Is:** {{clientFalseProblem}}{{/if}}
{{#if clientRealProblem}}- **The Real Problem Underneath:** {{clientRealProblem}}{{/if}}
{{#if clientSecretDesire}}- **Secret Desire:** {{clientSecretDesire}}{{/if}}
{{#if topComplaints}}- **Top Complaints (In Their Own Words):** {{topComplaints}}{{/if}}
{{#if topDesires}}- **Top Desires:** {{topDesires}}{{/if}}
{{#if whyCurrentMethodFails}}- **Why Current Method Fails:** {{whyCurrentMethodFails}}{{/if}}
{{#if bestClientEver}}- **Best Client Ever:** {{bestClientEver}}{{/if}}

### CONTENT GUARDRAILS
- BANNED CLICHES: Do NOT use these overused words in identity names, headlines, section headers, or key messaging: "prisoner," "captive," "trapped," "slave," "beggar," "grind/grinding," "hamster wheel," "treadmill," "rat race," "cage," "chains." Use niche-specific language instead.
- Do NOT invent statistics, dollar amounts, percentages, or client counts. Use placeholders: [COACH: Insert your real numbers here].
- The voice profile describes communication STYLE only — do not pull biographical facts, company names, or mentor names from it.

### WHAT TO GENERATE

---

#### PART 1: THE TWO IDENTITIES

Create two detailed identity personas — the BEFORE (who the prospect is now) and the AFTER (who they become). These identities are used across ALL marketing: ads contrast them, emails reference them, sales calls paint them, content targets the shift between them.

**BEFORE IDENTITY (The Undesired Self)**

⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️
The Two Identities deliverable has ALREADY been generated. The identity names from that deliverable are the ONLY names you may use. You MUST:
1. Find the Undesired Identity name and Aspiring Identity name in the PRIOR DELIVERABLE CONTEXT above
2. Use those EXACT names — no abbreviations, no "improvements," no synonyms, no new names
3. If you cannot find them in the context, check the === IDENTITY NAMES === section
4. NEVER create a new identity name. If you generate a name that differs from the prior deliverable by even one word, you have failed this instruction.
⚠️ END MANDATORY SECTION ⚠️

If NO prior identity context exists at all (this is the first deliverable being generated), ONLY THEN create one: a vivid, memorable name/label that captures who the prospect currently is — specific to {{niche}} (e.g., "The Scattered Coach," "The Overwhelmed Practitioner"). Then fill in ALL 8 attributes:

1. **Name/Label:** A 2-3 word identity label that's slightly embarrassing — they'd recognize themselves but wouldn't want to be called it publicly
2. **Statistics/Current Results:** Specific numbers that describe their current reality (income, hours worked, client count, years stuck, debt level — use data relevant to {{niche}})
3. **Complaints:** 5-7 things they complain about daily — what they say out loud to friends, spouse, or in online forums
4. **Problems:** 5-7 real problems they face — the actual obstacles creating their complaints
5. **Old Methods:** 5-7 approaches they're currently using that don't work (the things they'll defend even though they fail)
6. **Unwanted Feelings:** 5-7 specific emotions they experience daily (pull from {{unwantedFeelings}} and expand — be visceral and specific)
7. **Attributes:** 5-7 behavioral/personality traits that define this identity (e.g., reactive, scattered, penny-pinching, excuse-making)
8. **False Beliefs:** 5-7 beliefs they hold that keep them stuck (these become the raw material for the 6 Core Belief Shifts below)

**AFTER IDENTITY (The Aspiring Self)**

⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️
(Same rule as above — the Aspiring Identity name MUST come from the Two Identities prior deliverable. Use the EXACT name. Do NOT invent a new one.)
⚠️ END MANDATORY SECTION ⚠️

If NO prior identity context exists at all, ONLY THEN create one: a powerful, aspirational name/label based on {{aspiringIdentity}} — specific to {{niche}} (e.g., "The Wealthy Coach," "The Elite CEO," "The Freedom Builder"). Then fill in ALL 8 attributes:

1. **Name/Label:** A 2-3 word identity label they'd be proud to be called — aspirational but achievable
2. **Statistics/Desired Results:** Specific numbers that describe their transformed reality (income, hours, freedom metrics — be concrete)
3. **Pride Points:** 5-7 things they're proud of — what they brag about to friends, post on social media
4. **Solutions:** 5-7 things that are now solved — the problems from the Before list that are gone
5. **New Methods:** 5-7 approaches they now use ({{uniqueMechanism}} and its components)
6. **Desired Feelings:** 5-7 specific emotions they experience daily (pull from {{desiredFeelings}} and expand)
7. **Attributes:** 5-7 behavioral/personality traits that define this identity (e.g., proactive, systematic, data-driven, decisive)
8. **True Beliefs:** 5-7 beliefs that enable this identity (the opposite of the false beliefs above)

**CONDENSED BEFORE/AFTER (for sales pages and ads):**
Write a 3-4 sentence vivid paragraph for each identity that captures the emotional essence — suitable for pasting directly into a sales page, ad, or email.

---

#### PART 2: THE 6 CORE BELIEF SHIFTS

These are the 6 beliefs that MUST change before a prospect will buy. Every piece of marketing content targets one of these shifts. For EACH of the 6 beliefs, generate ALL 13 components below.

**BELIEF #1: CORE BELIEF (The Fundamental Truth)**
- Old Belief: "[Current approach / status quo] is the path to [their goal]"
- New Belief: "[{{uniqueMechanism}}] is the proven path to [their goal]"

**BELIEF #2: THE REAL PROBLEM**
- Old Belief: "My problem is [surface symptom they think is the issue]"
- New Belief: "My real problem is [the root cause {{clientName}} addresses through {{uniqueMechanism}}]"

**BELIEF #3: TIME PRIORITY**
- Old Belief: "I don't have time / I should spend my time on [current activities that don't work]"
- New Belief: "This is my #1 priority / I should invest my time in [activities {{clientName}}'s method prioritizes]"

**BELIEF #4: MONEY ALLOCATION**
- Old Belief: "I can't afford it / My money should go to [current expenses that don't move the needle]"
- New Belief: "This is an investment, not an expense / {{offerName}} pays for itself through [specific ROI]"

**BELIEF #5: METHOD EFFECTIVENESS**
- Old Belief: "[Alternative approach / what they've tried before] is the best way to [goal]"
- New Belief: "[{{uniqueMechanism}}] is the only method that addresses [the root cause] — everything else treats symptoms"

**BELIEF #6: HELP & SUPPORT**
- Old Belief: "I can figure this out myself / I just need more information"
- New Belief: "I need expert guidance from someone who's done this / {{clientName}}'s system is the fastest path"

#### FOR EACH OF THE 6 BELIEFS, GENERATE ALL 13 COMPONENTS:

**Component 1: Current Belief Statement**
Write the old belief exactly as the prospect would say it — in their own words, in first person. Make it feel like you're reading their mind.

**Component 2: Problems This Belief Causes (3-5 specific results)**
What concrete, measurable problems does holding this belief create? Be specific to {{niche}}.

**Component 3: Cost of Keeping This Belief (6 dimensions)**
- **Mental cost:** How it affects their thinking, stress, decision-making
- **Physical cost:** How it affects their health, energy, appearance
- **Financial cost:** Specific dollar amounts lost, wasted, or missed
- **Relational cost:** How it affects spouse, family, friends, clients, team
- **Spiritual/Purpose cost:** How it affects their sense of meaning, legacy, alignment
- **Quality of Life cost:** How it affects daily joy, freedom, experiences

**Component 4: New Required Belief Statement**
The truth they must accept. Write it as a clear, confident declaration.

**Component 5: Life With the New Belief (vivid description)**
Paint a 3-4 sentence picture of what their daily life looks like once they adopt this belief. Use specific sensory details — what they see, feel, do differently. Reference the After Identity.

**Component 6: Authority Reference**
IMPORTANT: Do NOT fabricate or guess quotes. AI-generated quotes attributed to famous people are almost always wrong and will destroy credibility if anyone checks. Instead, do ONE of these:
- Reference a REAL book by title and author (e.g., "In 'Good to Great,' Jim Collins shows that...")
- Paraphrase a well-known principle or teaching from a named authority (e.g., "Peter Drucker's principle that 'what gets measured gets managed' applies here because...")
- Cite a real, verifiable study or statistic with the source (e.g., "A McKinsey study of 400 companies found...")
- If you cannot verify a quote is real, do NOT use it. Use a logic trap or analogy instead.

**Component 7: Universal Analogy**
A relatable metaphor that everyone understands — something from everyday life that makes this belief shift feel obvious and inevitable. (e.g., "You wouldn't try to perform surgery on yourself just because you watched a YouTube video...")

**Component 8: Universal Story**
A hypothetical but relatable teaching scenario that illustrates the belief shift. NOT a fake client result — this is a "imagine if..." story that makes the concept click. Think parables, thought experiments, or well-known examples from other industries.

**Component 9: Personal Story Prompt**
A specific story angle {{clientName}} could tell from their own experience that proves this belief shift. Frame it as: "Tell the story of when you [specific experience] and how it taught you [this belief]." Include bullet points for the story arc: struggle → realization → transformation → lesson.

**Component 10: Client Case Study Prompt**
{{#if testimonials}}Using the provided testimonials, frame a case study that proves this belief shift. Structure: who they were (Before Identity) → what they believed (old belief) → what changed (the shift) → specific results (numbers, timeline).{{else}}Write a template for a future case study: "[CLIENT NAME] was a [Before Identity trait]. They believed [old belief]. After implementing [specific part of {{uniqueMechanism}}], they [specific measurable result] in [timeframe]. The belief that shifted: [old → new]." Mark clearly: "*** Replace with real client story before publishing ***"{{/if}}

**Component 11: External Case Study**
FOLLOW THIS STRUCTURE: "[External authority / organization] did a real controlled study. The results showed that if you do [new method], you'll go from [hell island] to [heaven island]. The specific stats are [these]. Here is a link to the source where I got this information."
— Reference a REAL, verifiable external study or research that supports this belief shift. Cite the source. If you cannot find a real, verifiable study, write: [COACH: Insert a real external study or statistic that supports this belief. Include the source link.]

**Component 12: Internal Case Study**
FOLLOW THIS STRUCTURE: "We did a controlled study internally. The results showed that if you do [new method], you'll go from [hell island] to [heaven island]. The specific stats are [these]."
— Use real data from {{trackRecord}} or {{caseStudies}} if provided. If no internal data is provided: [COACH: Insert your own internal data — how many clients, what results, what timeframe. E.g., "Out of our last 50 clients, 43 achieved [result] within [timeframe]."]

**Component 13: Cross-Domain Reference (Other Area)**
FOLLOW THIS STRUCTURE: "You already do/think this in [this other area of your life], so you know it works."
— Find a belief or behavior the prospect ALREADY holds in another area of life (health, relationships, parenting, investing, sports) that directly mirrors this new belief. This makes the shift feel obvious and safe rather than risky — they already believe it, just not in this context yet. Make the connection specific and undeniable.

---

#### PART 3: OBJECTION-TO-BELIEF MAP

Map each common objection from {{commonObjections}} to the Core Belief it stems from, plus the specific evidence component that best addresses it:

| Objection | Root Belief (1-6) | Best Evidence Component | Content Angle |
|-----------|-------------------|------------------------|---------------|

Add 3-5 additional objections that {{targetAudience}} commonly raise but might not have listed — predict them from the niche psychology.

This table becomes the content strategy — every objection is a content opportunity, and every content piece should target a specific belief using a specific evidence type.

---

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} Write the old beliefs in the prospect's own language — how they'd actually say it in conversation with a friend. Write the new beliefs in {{clientName}}'s language — authoritative but empathetic. Make the evidence feel like undeniable truth, not opinion. The identities should be vivid enough that the prospect immediately recognizes themselves in the Before and desperately wants to become the After.

### OUTPUT FORMAT
Use clear headers and numbering for each section. The output should be structured so that any team member can grab a specific belief shift + its evidence and turn it into a piece of content within 30 minutes. Label every component clearly (Component 1, Component 2, etc.) for easy reference.
```

## Post-Processing
1. This output feeds into core-conversion-content, content-angle-library, and all downstream templates as context
2. Verify BOTH identities have all 8 attributes filled (no missing categories)
3. Verify ALL 6 beliefs have ALL 10 components (no shortcuts — count them)
4. Check that evidence types are varied within each belief (not all analogies or all stories)
5. Verify the condensed Before/After paragraphs are punchy enough for direct use in ads
6. Check that the Objection-to-Belief map covers all provided objections plus 3-5 predicted ones
7. Every belief shift should be hyper-specific to {{niche}} — not generic coaching advice
