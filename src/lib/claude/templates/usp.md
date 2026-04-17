# Generation Template: Unique Selling Proposition

## Template ID
`usp`

## What This Generates
A powerful, specific Unique Selling Proposition for the coaching business — the single statement that answers "why should I choose YOU over everyone else?" Includes the core USP plus 3 alternative versions with different angles/emphasis so the coach can choose the one that resonates most. Based on the Coach Syndicate Prompt 10 framework: "For [target market] who are struggling with [main problem], unlike [competitors] who [what competitors do], we are different because we help them [get specific desire] through [specific new way] so that they never have to worry about [specific problem] again."

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "niche": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "competitorOldWay": "string — what competitors or old methods do",
  "uniqueMechanism": "string",
  "transformation": "string",
  "desiredFeelings": "string",
  "offerName": "string"
}
```

## Framework References
- **Coach Syndicate AI Prompt 10**: Unique Selling Proposition framework — the fill-in-the-blank USP structure
- **John Whiting Framework A1**: One offer, one avatar — the USP must be laser-focused on a single transformation for a single audience
- **John Whiting Framework A6**: Repel the anti-avatar — a strong USP attracts the right people AND repels the wrong ones
- **Belief-Shift Framework A5**: Money Messaging Statement — the USP distills the messaging DNA into a single promise

## Generation Prompt

```
You are an expert at crafting unique selling propositions for coaching businesses. A great USP is not a tagline or slogan — it is a clear, specific statement that tells the ideal client exactly why THIS coach is different from every other option, including doing nothing.

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Core Problem Solved:** {{problemSolved}}
- **What Competitors / Old Methods Do:** {{competitorOldWay}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Transformation:** {{transformation}}
- **Desired Feelings:** {{desiredFeelings}}
- **Offer:** {{offerName}}
- **Brand Voice:** {{brandVoice}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### WHAT TO GENERATE

---

#### 1. USP BREAKDOWN (The Raw Ingredients)

Before writing the USP, map out the 6 raw ingredients that make it work:

1. **Target Market** — Who exactly this is for (from {{targetAudience}}). Be specific enough that they self-identify immediately.
2. **Main Problem** — The single biggest struggle they face (from {{problemSolved}}). Use their language, not clinical terms.
3. **Competitor / Old Way** — What the alternatives are and why they fail (from {{competitorOldWay}}). Name the category, not specific competitors.
4. **Specific Desire** — The concrete outcome they want (from {{transformation}}). Make it measurable or tangible when possible.
5. **Specific New Way** — How {{clientName}} delivers results differently (from {{uniqueMechanism}}). This is the "secret sauce."
6. **Problem Eliminated** — The specific worry or pain that disappears forever. Not vague relief — a named problem that is gone.

---

#### 2. CORE USP (Version A — The Foundation)

Using this framework, write the primary USP:

"For [target market] who are struggling with [main problem], unlike [competitors or old methods] who [what competitors do], we are different because we help them [get specific desire] through [specific new way] so that they never have to worry about [specific problem] again."

Rules:
- Every bracket must be filled with SPECIFIC language from the client details — no generic filler
- The "unlike" clause must name a real alternative the audience has tried or considered
- The "specific new way" must reference {{uniqueMechanism}} clearly
- The "never have to worry about" must name a concrete, specific problem — not "stress" or "struggle"
- Total length: 2-4 sentences maximum. Punchy. Confident. Zero fluff.

---

#### 3. ALTERNATIVE USP — Version B (Pain-Led)

Write a second version that leads with the PAIN. Open with the problem, agitate it, then present {{clientName}}'s solution as the antidote. This version hits harder emotionally.

Structure:
- Open with the pain (1 sentence that makes them wince)
- Name the failed alternatives (1 sentence)
- Present the solution and unique mechanism (1 sentence)
- Close with the specific transformation (1 sentence)

---

#### 4. ALTERNATIVE USP — Version C (Outcome-Led)

Write a third version that leads with the RESULT. Open with the aspirational outcome, then explain what makes it possible. This version is more inspirational and forward-looking.

Structure:
- Open with the desired outcome (1 sentence — vivid, specific, desirable)
- Explain what makes it possible ({{uniqueMechanism}})
- Contrast with why other methods fail (brief)
- Close with the identity shift — who they become

---

#### 5. ALTERNATIVE USP — Version D (Mechanism-Led)

Write a fourth version that leads with the UNIQUE MECHANISM. Open with "what if there were a..." and present the method as the breakthrough. This version works best when the mechanism is genuinely novel or counterintuitive.

Structure:
- Open with "what if" or a counterintuitive claim about the method
- Explain what the mechanism does differently (2-3 specific differences)
- Name who it is for and the transformation it delivers
- Close with what they never have to do again

---

#### 6. USP COMPARISON TABLE

Present all 4 versions in a quick-reference table:

| Version | Lead Angle | Best Used For | Opening Line |
|---------|-----------|---------------|-------------|
| A (Core) | Framework | Website hero, elevator pitch | ... |
| B (Pain-Led) | Pain | Ads, cold outreach, retargeting | ... |
| C (Outcome-Led) | Aspiration | Social media bios, email signatures | ... |
| D (Mechanism-Led) | Method | Webinar intros, VSL openings | ... |

---

#### 7. USP ACID TEST

For each version, answer these 5 questions (YES/NO + brief note):
1. **Specific?** — Could a competitor copy-paste this and have it still be true? (If yes, it's not specific enough.)
2. **Measurable?** — Does it reference a tangible outcome, not just a feeling?
3. **Different?** — Does it clearly separate {{clientName}} from the alternatives?
4. **Believable?** — Would a skeptical prospect find this credible?
5. **Memorable?** — Could someone repeat this from memory after hearing it once?

Flag any version that fails 2+ tests and suggest a specific fix.

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} Be direct, specific, and confident. No hedging language ("might," "could," "possibly"). No generic coaching buzzwords ("unlock your potential," "level up," "transform your life"). Every word must earn its place.

### OUTPUT FORMAT
Use clear section headers. Present the USP Breakdown first, then each version with its label (A/B/C/D), then the comparison table, then the acid test. The coach should be able to scan this document in 2 minutes and pick their favorite version.
```

## Post-Processing
1. This output can feed into homepage-copy, about-page, ad copy, and social media templates as positioning context
2. Verify all 4 versions are genuinely different in angle — not just rewording of the same structure
3. Check that each version uses specific language from the client inputs, not generic coaching filler
4. The acid test should honestly flag weak versions — do not pass everything automatically
5. Verify the "unlike" clause names real alternatives the audience recognizes, not strawmen
