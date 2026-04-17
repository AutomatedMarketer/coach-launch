# Generation Template: Offer 1-Sheet

## Template ID
`offer-one-sheet`

## What This Generates
A one-page sell-sheet that coaches can hand to prospects, share as a PDF, or use as a landing page summary. It distills the entire offer into a scannable, high-impact format: problem, benefits, how-it-works, what's included, guarantee, pricing, and a single clear CTA. Think of it as the "back of the napkin" pitch — everything a prospect needs to make a decision on one page.

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
  "offerName": "string",
  "pricePoint": "string",
  "commonObjections": "array",
  "testimonials": "array (optional)",
  "credentials": "string (optional)",
  "ctaType": "string",
  "ctaKeyword": "string (optional)",
  "brandVoice": "string"
}
```

## Context Dependencies
This template requires outputs from prior deliverables:
- `magnetic-messaging-statement` — The core messaging hook and 4P Power Message
- `belief-shift-map` — The 6 Core Beliefs, Hell Island/Heaven Island contrast, Aspiring Identity
- `core-conversion-content` — The Bulletproof Sales Script (12-section structure including the 3-phase solution, delivery details, and close)

## Framework References
- **Belief-Shift Framework B1**: The 12-section Conversion Code architecture (this 1-sheet is a compressed version)
- **Belief-Shift Framework A2**: Hell Island to Heaven Island journey
- **John Whiting Framework A1**: One offer, one avatar, one acquisition method
- **John Whiting Framework A4**: Unique Mechanism — what differentiates the offer
- **John Whiting Framework D1**: No-call close — the 1-sheet should sell without needing a conversation
- **AI Prompts PDF "Perfect Offer Part 3"**: One-sheet structure — problem statement, benefits, how it works, guarantee, deliverables, pricing, urgency

## Generation Prompt

```
You are an expert direct-response copywriter creating a one-page Offer 1-Sheet for a coaching business. This is a sell-sheet — a single-page document that gives a prospect everything they need to understand the offer and take action. It should be scannable, punchy, and formatted for print or PDF.

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
- **Offer:** {{offerName}} at {{pricePoint}}
{{#if programIncludes}}- **What's Included:** {{programIncludes}}{{/if}}
{{#if deliveryModel}}- **Delivery Model:** {{deliveryModel}}{{/if}}
{{#if guaranteeOrRisk}}- **Guarantee / Risk Reversal:** {{guaranteeOrRisk}}{{/if}}
{{#if guaranteeTimeframe}}- **Guarantee Timeframe (coach-provided — quote VERBATIM):** {{guaranteeTimeframe}}{{/if}}
- **Common Objections:** {{commonObjections}}
- **Brand Voice:** {{brandVoice}}
{{#if programPhases}}- **Program Phases:** {{programPhases}}{{else}}- **Program Phases:** Not provided — for Section 4, build 3 logical steps from {{uniqueMechanism}} and {{transformation}}. Name each step for {{niche}} specifically.{{/if}}
{{#if scarcityElement}}- **Scarcity Element:** {{scarcityElement}}{{/if}}
- **Revenue Per Client:** {{revenuePerClient}}
- **CTA Type:** {{ctaType}}
{{#if ctaKeyword}}- **CTA Keyword:** {{ctaKeyword}}{{/if}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
{{#if credentials}}- **Credentials:** {{credentials}}{{/if}}
{{#if doneForYou}}- **Done-For-You Services:** {{doneForYou}}{{/if}}
{{#if taughtSkills}}- **Skills Taught:** {{taughtSkills}}{{/if}}
{{#if bonuses}}- **Bonuses:** {{bonuses}}{{/if}}
{{#if clientCapacity}}- **Client Capacity:** {{clientCapacity}}{{/if}}
{{#if billboardResult}}- **Billboard Result:** {{billboardResult}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. BANNED CLICHES: Do NOT use these overused words in identity names, headlines, section headers, or key messaging: "prisoner," "captive," "trapped," "slave," "beggar," "grind/grinding," "hamster wheel," "treadmill," "rat race," "cage," "chains." Use niche-specific language instead.

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### DESIGN PRINCIPLES
1. **Scannable in 30 seconds** — A busy prospect should get the gist by skimming headlines and bold text alone.
2. **One page** — Everything fits on a single page (when printed or viewed as PDF). Keep sections tight.
3. **Problem-first** — Lead with the pain, then the solution. The prospect should feel seen before they see the offer.
4. **Specificity sells** — Use concrete numbers, timeframes, and outcomes. No vague promises.
5. **Self-closing** — The 1-sheet should do the selling. The CTA is the next step, not "let's chat about it."

### SECTIONS TO GENERATE

#### 1. HEADER
- **Program name:** {{offerName}}
- **Tagline:** One powerful line from the 4P Power Message (pulled from magnetic-messaging-statement context). Format: "How [audience] [get result] without [obstacle]"
- **For:** {{targetAudience}}

#### 2. THE PROBLEM (3-5 bullet points)
Using the Hell Island / Pain Zone language from the belief-shift-map:
- Start each bullet with a relatable symptom or frustration
- Use {{unwantedFeelings}} language — make the reader feel understood
- Include 1-2 statistics or data points if available (from the sales script context)
- End with: "If this sounds like you, keep reading."
- Keep each bullet to ONE line

#### 3. THE PROMISE (2-3 sentences)
- State the transformation clearly: what life looks like AFTER {{offerName}}
- Use {{desiredFeelings}} and {{aspiringIdentity}} language
- Reference {{uniqueMechanism}} as the vehicle
- This should feel like a bold, specific claim — not a vague aspiration

#### 4. HOW IT WORKS (3 phases)
CREDENTIAL RULE: Only state credentials, certifications, client counts, and results explicitly provided in the CLIENT INPUT DATA. If a credential is not listed, omit it. Do not estimate, round up, or infer achievements not in the questionnaire.

Pull the 3-phase structure from the core-conversion-content context:
- **Phase 1: [Name]** — One sentence: what happens and the immediate outcome
- **Phase 2: [Name]** — One sentence: what builds and the key shift
- **Phase 3: [Name]** — One sentence: the final result and complete transformation
Format as a clean numbered list with bold phase names.

#### 5. WHAT'S INCLUDED
A bullet list of everything the client gets. Pull deliverables from the sales script context and organize into:
- **Core Program** (3 main deliverables — the phases)
- **Bonuses** (3 bonus items — additional resources, tools, templates, or access)
- **Support** (how they get help — calls, community, messaging, etc.)
Each bullet: checkmark + deliverable name + brief value statement (e.g., "Weekly group coaching calls — get real-time answers and accountability")

#### 6. RESULTS & PROOF
{{#if testimonials}}
- Pull 2-3 of the strongest testimonials. For each:
  - Client first name + one identifying detail (role, niche, or location)
  - Before state (1 sentence)
  - After state with specific result (1 sentence)
  - Format as a short quote block
- Do not embellish or fabricate any details.
{{else}}
- Include 3 clearly marked placeholders: [INSERT CLIENT RESULT #1], [INSERT CLIENT RESULT #2], [INSERT CLIENT RESULT #3]
- Add note: "*** Replace with real client results before using. Include: name, before state, after result with specific numbers. ***"
- Do NOT invent fictional testimonials.
{{/if}}

#### 7. GUARANTEE
- Write a clear, confident guarantee statement
- Frame it as risk-reversal: "You have everything to gain and nothing to lose"
- Be specific about what the guarantee covers (e.g., "If you complete the program and don't see [specific result], we'll [guarantee action]")
- If no specific guarantee info is available, write a strong "satisfaction" or "implementation" guarantee and mark it: "*** Confirm guarantee terms with {{clientName}} before publishing ***"

#### 8. INVESTMENT
- State the price clearly: {{pricePoint}}
- Add a value reframe: what the transformation is worth vs. what they're investing
- If applicable, include payment plan option (e.g., "Or X payments of $Y")
- Add a "cost of inaction" line: "Every month you wait costs you [specific cost]..."
- Address the #1 money objection from {{commonObjections}} in one sentence

#### 9. CTA (Single Clear Next Step)
- One bold, clear call to action based on {{ctaType}}:
  - If "application": "Apply Now at [URL]" with note about selective acceptance
  - If "booking": "Book Your Strategy Call at [URL]"
  - If "dm-keyword": "DM me '{{ctaKeyword}}' on Instagram to get started"
{{#if ctaKeyword}}- Reinforce: "Just send the word '{{ctaKeyword}}' — I'll take it from there."{{/if}}
{{#if scarcityElement}}- Add urgency using the coach's scarcity element: {{scarcityElement}}{{else}}- For urgency, use qualitative language only: "This coaching relationship is selective" — do NOT invent a specific number of spots or countdown deadline.{{/if}}
- Final line: speak directly to the Aspiring Identity — "This is your moment to become [aspiringIdentity]."

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} This is a sell-sheet, not a novel. Every word must earn its place. Be direct, confident, and specific. No fluff, no filler, no generic coaching cliches. Write like you're handing this to someone at a live event and you have 60 seconds of their attention.

### FOLLOW THIS EXACT FORMAT
Use this fill-in-the-blank structure as the skeleton for the one-sheet. Replace every bracketed placeholder with real content from the CLIENT DETAILS and PRIOR DELIVERABLE CONTEXT above. Do NOT skip sections, do NOT reorder them, and do NOT add extra sections.

---

[PROGRAM NAME] FOR [IDEAL TARGET AUDIENCE]

Sick of [Top 3 Problems/Complaints]?
Get [Big Goal] in [Time Period]
with [Product Name]. Guaranteed.

This [time period] [delivery method type] helps [ideal target audience] get [big result 1], [big result 2] and [big result 3] without [pain point 1], [pain point 2] or [pain point 3].

---

THE PROBLEM FOR [IDEAL AUDIENCE]:
* [Statistical undesired current results — from Undesired Identity]
* [Top complaints — from questionnaire]
* [Top problems — from questionnaire]
* [Old methods they're using — from questionnaire]
* [Undesired feelings — from questionnaire]
* [Undesired attributes — from Undesired Identity]
* [False beliefs — from Undesired Identity]

---

WITH THIS PROGRAM:
* [Statistical desired results — from Aspiring Identity]
* [Things to be proud of — from Aspiring Identity]
* [What life is like with solutions — from Aspiring Identity]
* [New method — unique mechanism]
* [Desired feelings — from questionnaire]
* [Desired attributes — from Aspiring Identity]
* [True beliefs — from Aspiring Identity]

---

HOW IT WORKS:
It's a [delivery model] that helps [ideal audience] get [big goal] without [negative old method].
This works by [why new method works] in a way that gets [big goal].
As a result... instead of [old method] and [complaints]...
All you'll get are [phase 1 goal], [phase 2 goal] and [phase 3 goal].
With [product name], you can have less [complaints], get [big goal(s)], and [desired feelings]!
And in this program, I'm going to give you everything you need to get [big goal].
It's the exact same system me and my clients currently use to get [big goal(s)].
And it's designed to help you go from [old identity] to [aspiring identity] in [time period].

---

GUARANTEE:
[Risk reversal statement — from questionnaire guaranteeOrRisk field, or placeholder: "*** Confirm guarantee terms with coach before publishing ***"]

---

WHAT YOU'RE GETTING:
* [Phase 1 name] so you can get [phase 1 result] without [phase 1 pain point]
* [Phase 2 name] so you can get [phase 2 result] without [phase 2 pain point]
* [Phase 3 name] so you can get [phase 3 result] without [phase 3 pain point]
* BONUS 1: [bonus] so you can get [result] faster/easier
* BONUS 2: [bonus] so you can get [result] faster/easier
* [Deliverable 1] so you can get [benefit] and not have to worry about [pain]
* [Deliverable 2] so you can get [benefit] and not have to worry about [objection]

---

PRICING:
[Price from questionnaire — or placeholder: $X,000 one time OR $X,000 x 3]

---

CTA:
[Single clear call to action based on ctaType — one line telling them exactly what to do next]

---

Use the SECTIONS TO GENERATE guidelines above to fill in each bracket with specific, real content from the client's questionnaire and prior deliverables. Every bracket MUST be replaced — no brackets should remain in the final output.

### OUTPUT FORMAT
Return the 1-sheet as clean markdown with clear section headers. Use:
- **Bold** for emphasis and section headers
- Bullet points for lists
- Short paragraphs (1-2 sentences max)
- A horizontal rule (---) between major sections for visual separation
- Total length: 500-800 words (it must fit on ONE page when formatted)
- The structure MUST follow the EXACT FORMAT above — same sections, same order, same fill-in-the-blank skeleton
```

## Post-Processing
1. Verify total word count is 500-800 words (one page when formatted)
2. Check that all 9 sections are present and complete
3. Verify the 3-phase structure matches what was generated in core-conversion-content
4. Ensure testimonials are real (from input) or clearly marked as placeholders
5. Confirm pricing matches the client's actual price point
6. This deliverable is a terminal asset — no other templates depend on it
