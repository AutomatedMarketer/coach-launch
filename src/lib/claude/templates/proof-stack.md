# Generation Template: Proof Stack

## Template ID
`proof-stack`

## What This Generates
A complete, organized proof stack reference document — the coach's entire body of evidence compiled into one place. This includes track record, credentials, positions held, stages and media appearances, notable clients, and structured client case studies. This document becomes the go-to reference for sales pages, proposals, ad copy, and anywhere credibility needs to be established quickly.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "credentials": "string — certifications, degrees, years of experience, clients coached",
  "storyFacts": "string — verified factual details from their background",
  "trackRecord": "string — businesses built, revenue generated, events run, results achieved",
  "caseStudies": "string — client success stories with names, details, results",
  "testimonials": "string — direct quotes or paraphrased feedback from clients"
}
```

## Framework References
- **Coach Syndicate Prompt 5**: Proof stack framework — organized credibility documentation across 6 categories
- **John Whiting Framework A1**: One offer, one avatar — proof should demonstrate expertise for the SPECIFIC audience, not general accomplishment
- **John Whiting Framework C1**: Authority Amplifier — proof points are the raw material for authority content
- **John Whiting Framework D4**: Objection handling — proof stack directly counters "Why should I trust you?" and "Does this actually work?"

## Generation Prompt

```
You are organizing a comprehensive proof stack for a coaching professional. A proof stack is an organized inventory of all credibility evidence — everything that answers the prospect's unspoken question: "Why should I believe you can help ME?"

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Credentials:** {{credentials}}
- **Verified Story Facts:** {{storyFacts}}
- **Track Record:** {{trackRecord}}
- **Case Studies:** {{caseStudies}}
- **Testimonials:** {{testimonials}}
{{#if businessesBuiltList}}- **Businesses Built (Detailed):** {{businessesBuiltList}}{{/if}}
{{#if positionsHeld}}- **Positions Held:** {{positionsHeld}}{{/if}}
{{#if mediaAndStages}}- **Media & Stages:** {{mediaAndStages}}{{/if}}
{{#if notableAssociations}}- **Notable Associations:** {{notableAssociations}}{{/if}}
{{#if coachingYears}}- **Years Coaching:** {{coachingYears}}{{/if}}
{{#if totalClientsCoached}}- **Total Clients Coached:** {{totalClientsCoached}}{{/if}}
{{#if firstBusiness}}- **First Business:** {{firstBusiness}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### ANTI-HALLUCINATION RULES — READ CAREFULLY
1. **DO NOT invent credentials.** If a certification, degree, or qualification is not explicitly listed, do not include it.
2. **DO NOT invent revenue figures.** If no revenue numbers are provided, do not estimate or fabricate them.
3. **DO NOT invent client names or stories.** Only include clients, case studies, or results that are explicitly provided in the data.
4. **DO NOT invent media appearances, speaking events, or publications.** Only include what is explicitly stated.
5. **DO NOT round up or embellish numbers.** If they coached 47 clients, say 47 — not "nearly 50" or "50+".
6. **For any section with no data provided**, write exactly: "No data provided for this section." Do NOT leave it blank, do NOT skip it silently, and do NOT fill it with assumptions.
7. **DO NOT perform math on client numbers.** Do NOT multiply, add, or aggregate client figures to produce a new number. If the client says "$5,000 per client," do NOT calculate "$500,000 total revenue" — that total is not in the data. Only cite totals, sums, or aggregates if the client explicitly provided them as totals.
8. **USE THE CLIENT'S EXACT PHRASING for durations, nouns, and context.**
   - If the client says "13 years of personal training," write "13 years of personal training" — NOT "15 years in the fitness industry," NOT "over a decade," NOT "10+ years training clients."
   - Do NOT change nouns: "personal training" ≠ "fitness industry." "Built a gym" ≠ "owned a fitness business." Keep the exact words the client used.
   - Do NOT change verbs: "built" ≠ "sold" ≠ "ran" ≠ "founded" ≠ "grew." Keep the exact verb the client used.
   - Do NOT widen or narrow the scope of any claim.

### WHAT TO GENERATE

Organize all available proof into these 6 categories. Include ONLY sections where real data exists. For empty sections, include the header and write "No data provided for this section."

---

#### SECTION 1: TRACK RECORD
Businesses built, revenue generated, events organized, communities created, years in the field, number of clients served.

Pull from: trackRecord, storyFacts, credentials

Format as scannable bullet points:
- [Metric] — [Context]
- Example: "Built a coaching practice to $250K/year in 18 months — starting from zero clients"

If trackRecord is empty or not provided, write: "No data provided for this section."

---

#### SECTION 2: CREDENTIALS & QUALIFICATIONS
Certifications, degrees, formal training, books written, courses completed, years of experience, total clients coached.

Pull from: credentials, storyFacts

Format as scannable bullet points:
- [Credential] — [Issuing body or context, if provided]

If credentials is empty or not provided, write: "No data provided for this section."

---

#### SECTION 3: POSITIONS HELD
Notable professional roles, advisory positions, board memberships, organizational leadership.

Pull from: storyFacts, credentials

Format as:
- [Position] — [Organization], [Timeframe if provided]

If no positions are mentioned in the data, write: "No data provided for this section."

---

#### SECTION 4: STAGES & MEDIA
Speaking engagements, podcast appearances, media features, interviews, publications, YouTube channels, social media presence.

Pull from: storyFacts, trackRecord

Format as:
- [Appearance/Feature] — [Platform/Event], [Context if provided]

If no media appearances are mentioned in the data, write: "No data provided for this section."

---

#### SECTION 5: NOTABLE CLIENTS
Specific clients by name (only if names are provided) with brief context on who they are and what was accomplished.

Pull from: caseStudies, testimonials

Format as:
- **[Client Name]** — [Who they are] | [What was accomplished together]

If no client names are provided, write: "No data provided for this section."

---

#### SECTION 6: CLIENT RESULTS — STRUCTURED CASE STUDIES
The most detailed section. Each case study follows this exact format:

| Field | Detail |
|-------|--------|
| **Client** | Name (or "Anonymous" if no name provided) |
| **Business/Niche** | What they do |
| **Before** | Where they were before working with {{clientName}} |
| **What We Did** | The specific intervention, program, or approach used |
| **Result** | The measurable outcome achieved |
| **Timeframe** | How long it took |
| **Quote** | Direct testimonial quote (only if provided in testimonials) |

Rules for case studies:
- Only create case study entries for clients explicitly described in caseStudies or testimonials
- If only a testimonial quote exists without a full story, include it as a standalone quote entry (no table)
- If caseStudies and testimonials are both empty, write: "No data provided for this section."
- NEVER create fictional case studies to demonstrate the format

---

#### SUMMARY: PROOF AT A GLANCE
After all 6 sections, create a brief "Proof at a Glance" box — 3-5 of the most impressive, verifiable proof points from across all sections. These are the stats/facts that would go in a speaker intro, ad headline, or sales page hero section.

Format:
- [Proof point 1]
- [Proof point 2]
- [Proof point 3]

If insufficient data exists for a meaningful summary, write: "Insufficient proof data provided to generate a summary. Complete the fields above to unlock this section."

### VOICE & TONE
Write in a factual, confident tone. No hype, no superlatives ("incredible results," "world-class"). Let the numbers and specifics speak for themselves. The proof stack is a reference document — clarity and accuracy matter more than persuasion.{{#if brandVoice}} Brand voice: {{brandVoice}}{{/if}}{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
Use clear section headers numbered 1-6 as specified above. Each section should be scannable with bullet points or tables. End with the "Proof at a Glance" summary. If a section has no data, include the header and the "No data provided" notice — do NOT silently omit sections.
```

## Post-Processing
1. This output feeds into sales pages, about pages, ad copy, and proposals as a credibility reference
2. Verify EVERY fact in the proof stack traces to a specific client input field — flag anything that cannot be sourced
3. Verify no invented credentials, revenue figures, client names, or media appearances
4. Verify empty sections show "No data provided for this section" rather than being silently skipped
5. Verify case study tables only exist for clients explicitly described in the input data
6. The "Proof at a Glance" summary should contain only the strongest verifiable proof points
