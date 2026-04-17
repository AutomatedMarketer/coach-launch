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
  "pricePoint": "string (synthesized from structured pricing.displayString)",
  "pricePointUSD": "string (synthesized from pricing.totalUSD — raw number)",
  "paymentPlanBreakdown": "string (auto-computed from pricing when billingType === 'installments')",
  "pifBreakdown": "string (auto-computed from pricing when pifDiscountPercent > 0)",
  "revenuePerClient": "string (optional)",
  "idealClientCurrentRevenue": "string (required) — coach-provided estimate, drives all value-gap math",
  "targetClientMonthlyRevenue": "string (required) — coach-provided target post-program revenue/outcome",
  "monthlyActionCost": "string (required) — cost of inaction, used verbatim in value-reframe statement",
  "firstResultTimeframe": "string (required) — when clients see their first measurable win",
  "scarcityElement": "string (required v6b) — capacity cap / cohort timing / bonus window",
  "guaranteeOrRisk": "string (optional)",
  "guaranteeTimeframe": "string (required if guaranteeOrRisk is set) — quoted verbatim in guarantee copy",
  "fastActionBonusDeadline": "string (optional) — quoted verbatim in fast-action bonus copy",
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
- **Price Point (verbatim display string):** {{pricePoint}}
- **Price Point (raw USD number — use for any math):** {{pricePointUSD}}
{{#if paymentPlanBreakdown}}- **Computed Payment Plan (use verbatim — do NOT recalculate):** {{paymentPlanBreakdown}}{{/if}}
{{#if pifBreakdown}}- **Computed Pay-In-Full Discount (use verbatim — do NOT recalculate):** {{pifBreakdown}}{{/if}}
{{#if revenuePerClient}}- **Revenue Per Client (for the client's business):** {{revenuePerClient}}{{/if}}
- **Ideal Client's Current Revenue (coach-provided):** {{idealClientCurrentRevenue}}
- **Target Client Monthly Revenue After Program (coach-provided):** {{targetClientMonthlyRevenue}}
- **Cost of Inaction (coach-provided — quote VERBATIM):** {{monthlyActionCost}}
- **First Measurable Result Timeframe (coach-provided):** {{firstResultTimeframe}}
{{#if scarcityElement}}- **Existing Scarcity Element:** {{scarcityElement}}{{/if}}
{{#if guaranteeOrRisk}}- **Existing Guarantee / Risk Reversal:** {{guaranteeOrRisk}}{{/if}}
{{#if guaranteeTimeframe}}- **Guarantee Timeframe (coach-provided — quote VERBATIM in any guarantee copy):** {{guaranteeTimeframe}}{{/if}}
{{#if fastActionBonusDeadline}}- **Fast-Action Bonus Deadline (coach-provided — use VERBATIM):** {{fastActionBonusDeadline}}{{/if}}
- **Transformation Promised:** {{transformation}}
{{#if programDuration}}- **Program Duration:** {{programDuration}}{{/if}}
{{#if programIncludes}}- **What's Included:** {{programIncludes}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
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

⚠️ HARD RULE: Quote {{pricePoint}} verbatim. If `paymentPlanBreakdown` or `pifBreakdown` are provided above, quote them VERBATIM — the math is already computed, do NOT recalculate or restate with different numbers. Do NOT invent any dollar amount that is not in CLIENT DETAILS.

**Pay-In-Full Option**
- **Price:** {{pricePoint}} (use this string exactly; do not rephrase)
- **Rationale:** why this price point is justified (anchor against the transformation value, not competitor prices)
{{#if pifBreakdown}}- **Pay-In-Full Discount:** {{pifBreakdown}} — quote verbatim.{{else}}- **Pay-In-Full Discount:** The coach has not set a PIF discount percentage. Skip this bullet rather than invent one.{{/if}}

**Payment Plan Option**
{{#if paymentPlanBreakdown}}- **Recommended Structure:** {{paymentPlanBreakdown}} — quote verbatim.
- Rationale: this structure keeps the per-payment amount below most prospects' "pain threshold" while preserving the full investment.{{else}}- The coach has configured this offer as {{pricePoint}}. No payment plan was provided. If you recommend one, describe it qualitatively only (e.g., "Consider offering 3 or 6 monthly payments") — do NOT invent per-payment dollar amounts.{{/if}}

**Which to Lead With and Why**
- Clear recommendation on whether to present pay-in-full first or payment plan first, based on the price point and target audience
- The psychology behind the recommendation
- How to present both options on a sales page or call

---

#### SECTION 2: VALUE JUSTIFICATION (The Math That Sells)

This section gives the coach concrete math to use in sales conversations, on sales pages, and in content. All calculations must use ONLY the numbers provided.

- **Current Revenue (coach-provided):** {{idealClientCurrentRevenue}}
- **Target Revenue / Outcome After Program (coach-provided):** {{targetClientMonthlyRevenue}}
- **Cost of Staying Stuck (coach-provided — quote verbatim):** {{monthlyActionCost}}
- **First Measurable Result (coach-provided):** {{firstResultTimeframe}}
- **Program Investment:** {{pricePoint}} (verbatim)
{{#if revenuePerClient}}- **Revenue Per Client (business-revenue coaches only):** {{revenuePerClient}}{{/if}}

⚠️ HARD RULE for this section: Build the value narrative using ONLY the numbers above. Combine current revenue and target revenue to describe the income gap qualitatively (e.g., "moving from {{idealClientCurrentRevenue}} into {{targetClientMonthlyRevenue}}") rather than inventing a specific gap dollar amount. Do NOT invent ROI multiples, "pays for itself in X months" figures, or 12-month revenue projections. If a figure is needed but not provided, describe it qualitatively.

⚠️ **NO COMPARISON PRICE ANCHORS.** Do NOT generate "Additional Value Anchors," "What Alternatives Cost," or comparison tables with invented prices for personal chefs, corporate wellness programs, therapists, gym memberships, consultants, or any external service. These prices are always invented. If the coach wants price anchoring, they provide their own comparisons.

**Value Reframe Statement:** Write 2-3 sentences the coach can use verbatim to reframe the price as an investment. Use the coach-provided numbers verbatim — no invention.

Structure: "The real question isn't whether you can afford {{pricePoint}}. It's whether you can afford {{monthlyActionCost}}. Clients in {{offerName}} see their first measurable result {{firstResultTimeframe}} — moving from {{idealClientCurrentRevenue}} toward {{targetClientMonthlyRevenue}}."

---

#### SECTION 3: GUARANTEE LANGUAGE

Write 3 guarantee versions, from most bold to most conservative. The coach picks the one that matches their confidence level and risk tolerance.

{{#if guaranteeTimeframe}}⚠️ IMPORTANT: For any guarantee copy you write, use the coach-provided timeframe **{{guaranteeTimeframe}}** VERBATIM. Do NOT invent a different timeframe like "30 days" or "60 days" unless that's what {{guaranteeTimeframe}} says.{{else}}⚠️ IMPORTANT: No guarantee timeframe was provided. Write the 3 guarantee versions with `[timeframe]` as an inline editorial blank (e.g. "Try [program name] for [timeframe]") — do NOT invent a number of days. The coach fills this in.{{/if}}

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
- Cost of waiting using coach-provided data: "{{monthlyActionCost}}" — cite this verbatim, do NOT invent other figures
- Seasonal timing that genuinely matters for the niche

**Recommended Fast-Action Bonus**
- One specific bonus for prospects who enroll within a short window.
- What the bonus is, why it's valuable, and how to present it.
- The bonus should complement the main offer — not be a random add-on.
{{#if fastActionBonusDeadline}}- Use the coach-provided deadline VERBATIM: **{{fastActionBonusDeadline}}**. Copy template: "Enroll by {{fastActionBonusDeadline}} and get [bonus] — yours free."
{{else}}- No deadline was provided — describe the offer qualitatively ("Enroll within the fast-action window and get [bonus]") rather than inventing a specific timeframe.
{{/if}}

---

### VOICE & TONE
{{STEVE_VOICE_PROFILE}} Write in a strategic, analytical tone for the internal sections (pricing structure, value math) and a persuasive, confident tone for the client-facing copy snippets (guarantee language, scarcity/urgency scripts). This document is primarily for the COACH to use as a strategy reference — it's a mix of internal analysis and ready-to-use copy blocks.

### OUTPUT FORMAT
Return the output as clean markdown with four clearly labeled sections. Use:
- **Bold** for key figures, recommendations, and emphasis
- Tables where math is involved (for easy scanning)
- Blockquotes (>) for ready-to-use copy snippets the coach can paste directly
- If a required number is missing, skip the sentence or describe the concept qualitatively instead
- Total length: 800-1200 words
```

## Post-Processing
1. Verify all four sections are present and complete
2. Check that ALL math uses only provided numbers — no invented figures
3. Verify missing numbers are handled qualitatively (skipped or rephrased) — not left as placeholder markers
4. Check that all three guarantee versions are distinct in risk level and structure
5. Verify scarcity and urgency tactics are legitimate — no fake countdown timers or manufactured limits
6. Ensure the fast-action bonus is specific and complementary to the offer
7. Confirm the value reframe statement uses actual provided numbers
8. This deliverable is a terminal asset — no other templates depend on it
