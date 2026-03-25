# Generation Template: Perfect Pricing Framework

## Template ID
`pricing-framework`

## What This Generates
A complete pricing analysis and recommendation document that gives the coach a data-backed pricing strategy, value justification math, three guarantee options (bold to conservative), and specific scarcity/urgency tactics. This is the internal strategy document that informs how the coach prices, presents, and closes their offer — it feeds into sales pages, call scripts, and ad copy. All math is based on provided numbers; nothing is invented.

## Client Inputs Required
```json
{
  "clientName": "string",
  "offerName": "string",
  "pricePoint": "string",
  "revenuePerClient": "string (optional)",
  "idealClientCurrentRevenue": "string (optional)",
  "scarcityElement": "string (optional)",
  "guaranteeOrRisk": "string (optional)",
  "transformation": "string",
  "programDuration": "string (optional)",
  "programIncludes": "string (optional)"
}
```

## Context Dependencies
This template requires outputs from prior deliverables:
- `offer-one-sheet` — The complete offer summary including pricing, guarantee, what's included, and CTA structure

## Framework References
- **Coach Syndicate Prompt 21**: Perfect Pricing Framework — pricing structure, value justification, guarantee language, scarcity/urgency options
- **John Whiting Framework A4**: Unique Mechanism — the differentiation that justifies premium pricing
- **John Whiting Framework D1**: No-call close — pricing must be self-justifying on the page
- **Belief-Shift Framework C1 (Belief #4)**: Money Allocation belief shift — the prospect must see investment, not expense
- **AI Prompts PDF "Perfect Offer Part 3"**: Price anchoring, payment plan structure, guarantee framing

## Generation Prompt

```
You are an expert pricing strategist for coaching businesses. Your job is to create a complete pricing framework document — not just a number, but the full strategy: how to structure the price, how to justify the value with math, how to frame the guarantee, and how to create legitimate scarcity and urgency. Everything must be based on the numbers provided. If a number is not provided, flag it clearly — never invent financial figures.

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Offer:** {{offerName}}
- **Price Point:** {{pricePoint}}
{{#if revenuePerClient}}- **Revenue Per Client (for the client's business):** {{revenuePerClient}}{{/if}}
{{#if idealClientCurrentRevenue}}- **Ideal Client's Current Monthly Revenue:** {{idealClientCurrentRevenue}}{{/if}}
{{#if scarcityElement}}- **Existing Scarcity Element:** {{scarcityElement}}{{/if}}
{{#if guaranteeOrRisk}}- **Existing Guarantee / Risk Reversal:** {{guaranteeOrRisk}}{{/if}}
- **Transformation Promised:** {{transformation}}
{{#if programDuration}}- **Program Duration:** {{programDuration}}{{/if}}
{{#if programIncludes}}- **What's Included:** {{programIncludes}}{{/if}}

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

### WHAT TO GENERATE

---

#### SECTION 1: RECOMMENDED PRICING STRUCTURE

**Pay-In-Full Option**
- Recommended pay-in-full price based on the provided {{pricePoint}}
- Rationale: why this price point is justified (anchor against the transformation value, not competitor prices)
- Suggested discount percentage for pay-in-full vs. payment plan (industry standard: 10-15% savings)

**Payment Plan Option**
- Recommended number of payments and amount per payment
- Rationale: keep monthly payments below the prospect's "pain threshold" — a number they can commit to without financial stress
- Total payment plan cost (slightly higher than pay-in-full to incentivize PIF)

**Which to Lead With and Why**
- Clear recommendation on whether to present pay-in-full first or payment plan first, based on the price point and target audience
- The psychology behind the recommendation
- How to present both options on a sales page or call

---

#### SECTION 2: VALUE JUSTIFICATION (The Math That Sells)

This section gives the coach concrete math to use in sales conversations, on sales pages, and in content. All calculations must use ONLY the numbers provided.

{{#if idealClientCurrentRevenue}}
- **Current Monthly Revenue:** {{idealClientCurrentRevenue}}
{{else}}
- **Current Monthly Revenue:** [COACH TO FILL IN — this number is required for the math to work]
{{/if}}

{{#if revenuePerClient}}
- **Revenue Per Client:** {{revenuePerClient}}
{{else}}
- **Revenue Per Client:** [COACH TO FILL IN — how much does one new client bring in?]
{{/if}}

- **Target Monthly Revenue:** Calculate based on the transformation promise — what's the realistic target?
- **The Gap:** Difference between current and target monthly revenue
- **Program Investment:** {{pricePoint}}
- **How Long to Pay for Itself:** At a conservative result (50% of promised transformation), how many months/clients before the program pays for itself?
- **12-Month ROI at Conservative Result:** What is the total additional revenue generated over 12 months at 50% of the promised transformation, minus the program cost?

If any numbers are missing, clearly mark the calculation as: "*** [COACH: Insert your [specific number] here to complete this calculation] ***" — do NOT invent placeholder numbers.

**Value Reframe Statement:** Write 2-3 sentences the coach can use verbatim to reframe the price as an investment. Structure: "The real question isn't whether you can afford [price]. It's whether you can afford [cost of staying stuck]. At [conservative result], this program pays for itself in [timeframe] and generates [ROI] over the next 12 months."

---

#### SECTION 3: GUARANTEE LANGUAGE

Write 3 guarantee versions, from most bold to most conservative. The coach picks the one that matches their confidence level and risk tolerance.

**Version 1: THE BOLD GUARANTEE (Results-Based)**
- Ties directly to a specific, measurable outcome
- Highest risk for the coach, highest conversion rate
- Include the specific condition and the specific remedy (refund, free extension, etc.)
- Example structure: "If you [specific action] and don't [specific result] within [timeframe], I'll [specific remedy]."

**Version 2: THE BALANCED GUARANTEE (Implementation-Based)**
- Ties to completing the work, not just results
- Moderate risk, strong conversion
- Include the specific implementation requirements and the remedy
- Example structure: "Complete all [number] modules, submit your [deliverables], and attend [number] coaching calls. If you've done the work and aren't satisfied, [remedy]."

**Version 3: THE CONSERVATIVE GUARANTEE (Satisfaction-Based)**
- General satisfaction guarantee with a clear timeframe
- Lowest risk for the coach
- Include the timeframe and process for claiming
- Example structure: "Try [program name] for [timeframe]. If it's not for you, [remedy]. No questions asked."

{{#if guaranteeOrRisk}}
**Coach's Existing Guarantee:** {{guaranteeOrRisk}}
Analyze the existing guarantee and recommend whether to keep it, strengthen it, or adjust it — and why.
{{/if}}

For each version, add a one-line note on when to use it (e.g., "Use this when you have strong case studies to back it up" or "Use this for a new program before you have proven results").

---

#### SECTION 4: SCARCITY & URGENCY OPTIONS

**3 Legitimate Scarcity Tactics**
For each: describe the tactic, explain why it's legitimate (not manufactured), and provide the exact language the coach should use.

Scarcity must be REAL. Examples of legitimate scarcity:
- Limited coaching spots due to actual time constraints
- Cohort-based enrollment with a real start date
- Capped enrollment for quality of experience
- Bonus access that genuinely expires

Do NOT recommend fake scarcity (fake countdown timers, "only 3 spots left" when there are 300).

{{#if scarcityElement}}
The coach already has this scarcity element: {{scarcityElement}}. Build on it and suggest 2 additional complementary tactics.
{{/if}}

**3 Legitimate Urgency Tactics**
For each: describe the tactic, explain the real reason behind the deadline, and provide the exact language.

Urgency must be tied to a REAL reason to act now. Examples:
- Price increase at a specific date (and actually follow through)
- Bonus that expires after a specific enrollment window
- Cost of waiting calculated in real numbers (every month without [result] costs [amount])
- Seasonal timing that genuinely matters for the niche

**Recommended Fast-Action Bonus**
- One specific bonus for prospects who enroll within a short window (24-72 hours)
- What the bonus is, why it's valuable, and how to present it
- The bonus should complement the main offer — not be a random add-on
- Include the exact copy: "Enroll by [deadline] and get [bonus] — a $[value] addition, yours free."

---

### VOICE & TONE
{{STEVE_VOICE_PROFILE}} Write in a strategic, analytical tone for the internal sections (pricing structure, value math) and a persuasive, confident tone for the client-facing copy snippets (guarantee language, scarcity/urgency scripts). This document is primarily for the COACH to use as a strategy reference — it's a mix of internal analysis and ready-to-use copy blocks.

### OUTPUT FORMAT
Return the output as clean markdown with four clearly labeled sections. Use:
- **Bold** for key figures, recommendations, and emphasis
- Tables where math is involved (for easy scanning)
- Blockquotes (>) for ready-to-use copy snippets the coach can paste directly
- Clear [COACH TO FILL IN] markers wherever a number is missing
- Total length: 800-1200 words
```

## Post-Processing
1. Verify all four sections are present and complete
2. Check that ALL math uses only provided numbers — no invented figures
3. Verify missing numbers are clearly marked with [COACH TO FILL IN] placeholders
4. Check that all three guarantee versions are distinct in risk level and structure
5. Verify scarcity and urgency tactics are legitimate — no fake countdown timers or manufactured limits
6. Ensure the fast-action bonus is specific and complementary to the offer
7. Confirm the value reframe statement uses actual provided numbers
8. This deliverable is a terminal asset — no other templates depend on it
