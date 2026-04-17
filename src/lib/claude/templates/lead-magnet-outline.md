# Generation Template: Lead Magnet Outline

## Template ID
`lead-magnet-outline`

## What This Generates
A complete outline for a lead magnet (PDF guide, mini-course, checklist, or framework) that serves as the top-of-funnel entry point. Includes title, hook, chapter/section breakdown, and key content points.

## Client Inputs Required
```json
{
  "clientName": "string",
  "niche": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "transformation": "string",
  "uniqueMechanism": "string",
  "offerName": "string — the paid offer this leads into",
  "expertise": "array — topics they can teach",
  "leadMagnetType": "string — 'pdf-guide' | 'checklist' | 'mini-course' | 'framework' | 'quiz'",
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become"
}
```

## Context Dependencies
This template uses outputs from the **belief-shift-map** deliverable. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, and Undesired Identity / Aspiring Identity.

## Framework References (John Whiting)
- **B1: Self-Liquidating Offer** — The lead magnet feeds the SLO funnel. It should liquidate ad spend by converting cold traffic into buyers quickly.
- **A1: Organized Repeatable Process** — The lead magnet should showcase the coach's methodology as a clear, step-by-step process. It proves the framework works before they buy.
- **C1: Authority Amplifier** — The lead magnet IS propaganda. It shifts beliefs and makes the prospect realize they need more help (the paid offer).
- **C4: Farming Analogy** — Lead magnet = planting seeds. It starts the nurture cycle. Average 79 days from lead to client.
- **H2: Tone Scale** — Lead magnet should move reader from their current state (doubt/fear) to antagonism against their problem and enthusiasm about solving it.

## Generation Prompt

```
You are creating a lead magnet outline for a coaching business. This lead magnet is the top-of-funnel entry point that starts the client acquisition journey. It must deliver real value while naturally positioning the paid offer as the logical next step.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Problem Solved:** {{problemSolved}}
- **Transformation:** {{transformation}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Paid Offer:** {{offerName}}
- **Expertise Topics:** {{expertise}}
- **Lead Magnet Type:** {{leadMagnetType}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. NICHE-SPECIFIC LANGUAGE ONLY: Do NOT use generic pain/struggle cliches that apply to every industry. Banned phrases in prominent positions (headlines, identity references, key messaging): "trapped," "prisoner," "captive," "slave," "cage," "chains," "hamster wheel," "rat race," "grinding/grind." Replace with language specific to {{niche}} and {{targetAudience}}. Example: instead of "trapped in their business," write something specific like "answering every service call at 11pm" (for trade businesses) or "booking back-to-back 1-on-1 sessions just to make rent" (for fitness coaches).

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### LEAD MAGNET STRATEGY

**The "Give Away the WHAT, Sell the HOW" Principle:**
- The lead magnet reveals WHAT to do (the framework, the steps, the strategy)
- The paid offer provides HOW to do it (implementation, support, accountability)
- The lead magnet should be so good that the reader thinks: "If the free stuff is this good, the paid program must be incredible"

**Belief Shifts the Lead Magnet Must Create:**
1. "There IS a systematic way to solve {{problemSolved}}" (not random luck)
2. "{{uniqueMechanism}} is the key I've been missing"
3. "{{clientName}} actually knows what they're talking about"
4. "I could do this, but I'd get there faster with help"

### OUTLINE TO GENERATE

1. **Title** (3 options)
   - Format: "The [Number] [Framework/Step/Secret] to [Transformation]"
   - Must speak directly to {{targetAudience}}
   - Must promise a specific outcome

2. **Subtitle / Hook**
   - One sentence that creates urgency or curiosity
   - "How {{targetAudience}} can [achieve result] without [common pain point]"

3. **Introduction** (1 page)
   - Why the reader should care
   - What they'll learn
   - CREDENTIAL RULE: Only state credentials, certifications, client counts, and results explicitly provided in the CLIENT INPUT DATA. If a credential is not listed, omit it. Do not estimate, round up, or infer achievements not in the questionnaire.
   - Quick credibility statement about {{clientName}}
   - "By the end of this guide, you'll know exactly [specific outcome]"

4. **Section Breakdown** (3-5 sections for PDF, 3-5 lessons for mini-course)

   Each section includes:
   - Section title
   - Key teaching point (1-2 paragraphs of content direction)
   - Actionable takeaway or exercise
   - How this section connects to {{uniqueMechanism}}

   **Section flow should follow the Belief-Shift Journey:**
   - Section 1: **Hell Island** — The current pain, the problem they face. Paint the reality of staying stuck: {{unwantedFeelings}}, the frustration, the cost of inaction. Make the reader think "that's exactly where I am." Use Hell Island language from the Belief-Shift Map.
   - Section 2: **Core Belief Shift** — The REAL problem (not what they think it is). Introduce the key belief shift — the one thing they've been getting wrong. This is where you challenge their current worldview using the strongest Core Belief from the Belief-Shift Map. Show them why what they've been doing hasn't worked.
   - Section 3: **Your Way** — The solution framework. Introduce {{uniqueMechanism}} as the bridge from Hell Island to Heaven Island. Give them a clear, step-by-step preview of the methodology. This is the "give away the WHAT" section — show the framework at a high level.
   - Section 4: **Heaven Island** — The transformation, what's possible. Paint the full picture of life on the other side: {{desiredFeelings}}, the results, the identity shift. Make the reader feel what it's like to be {{aspiringIdentity}}. Use Heaven Island language from the Belief-Shift Map.
   - Section 5 (optional): The roadmap (high-level steps from where they are to {{transformation}})

5. **Bridge to Paid Offer** (final page)
   - Sell the Aspiring Identity: "If you want to fully become {{aspiringIdentity}}, here's how to make it happen faster."
   - "Now that you understand the framework, here's how to implement it fast"
   - Introduce {{offerName}} as the done-with-you implementation that completes the transformation
   - Tie the CTA to {{desiredFeelings}} — "Imagine waking up every day feeling [desired feelings]..."
   - CTA: "If this resonated, here's the next step..."
   - NOT a hard sell — a natural extension of the journey from Hell Island to Heaven Island

6. **Design Notes**
   - Suggested page count ({{leadMagnetType}} dependent)
   - Visual style suggestions
   - Format recommendations

### LEAD MAGNET TYPE SPECIFICS

{{#if leadMagnetType === 'pdf-guide'}}
- 10-20 pages
- Mix of teaching content, visuals, and action steps
- Include a "cheat sheet" or summary page at the end
{{/if}}

{{#if leadMagnetType === 'checklist'}}
- 2-5 pages
- Numbered steps with checkboxes
- Brief explanation per step (1-2 sentences)
- Quick-reference format
{{/if}}

{{#if leadMagnetType === 'framework'}}
- Visual framework/diagram on one page
- 5-10 pages of explanation
- The framework should be memorable and nameable
- Example: "The 5-Phase Launch System" or "The [Name] Method"
{{/if}}

{{#if leadMagnetType === 'mini-course'}}
- 3-5 video lessons (outline each lesson with key points and duration)
- Each lesson: 5-10 minutes
- Companion worksheet or action guide per lesson
{{/if}}

### OUTPUT FORMAT
- Full outline with title options, section-by-section breakdown, content direction for each section, and bridge to paid offer
- Include word count estimates per section
- Include design/format recommendations

### VOICE & TONE
{{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}
```
