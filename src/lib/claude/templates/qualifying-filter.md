# Generation Template: Qualifying Filter (Anti-Avatar & This Is For You If)

## Template ID
`qualifying-filter`

## What This Generates
Two qualifying sections that coaches can use on sales pages, applications, landing pages, or social media posts: a "This Is For You If" section (6 bullet points describing the exact person who is a perfect fit) and a "This Is Not For You If" section (6 bullet points describing who should not apply). Together they act as a filter — attracting dream clients and repelling bad-fit prospects before they ever get on a call. Written by someone who has worked with hundreds of coaches and knows exactly who thrives and who doesn't.

## Client Inputs Required
```json
{
  "clientName": "string",
  "offerName": "string",
  "targetAudience": "string",
  "minimumRequirements": "string (optional)",
  "idealClientCurrentRevenue": "string (optional)",
  "idealClientDreamName": "string (optional)",
  "transformation": "string",
  "aspiringIdentity": "string",
  "problemSolved": "string",
  "unwantedFeelings": "string",
  "commonObjections": "array"
}
```

## Context Dependencies
This template requires outputs from prior deliverables:
- `belief-shift-map` — The Two Identities (Before/After personas), 6 Core Belief Shifts, and the Objection-to-Belief Map

## Framework References
- **Coach Syndicate Prompt 20**: Anti-Avatar & "This Is For You If" framework — qualifying prospects through direct, specific language
- **Belief-Shift Framework C4**: The Two Identities (Undesired vs Aspiring) — the Before Identity informs the "Not For You" list, the After Identity informs the "For You" list
- **John Whiting Framework A1**: One offer, one avatar — specificity in who you serve and who you don't
- **John Whiting Framework D4**: Objection handling — the "Not For You" list preemptively disqualifies objection-heavy prospects
- **Ethical Manipulation Workbook**: False Beliefs and Old Methods from the Before Identity feed the disqualification criteria

## Generation Prompt

```
You are an expert direct-response copywriter specializing in qualifying and disqualifying language for coaching businesses. Your job is to write two powerful filter sections that a coach can drop into a sales page, application form, social post, or landing page. The goal: attract dream clients who are ready to do the work, and repel bad-fit prospects before they waste anyone's time.

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Offer:** {{offerName}}
- **Target Audience:** {{targetAudience}}
- **Core Problem Solved:** {{problemSolved}}
- **Unwanted Feelings (The Pain Zone):** {{unwantedFeelings}}
- **Transformation Promised:** {{transformation}}
- **Their Next-Level Self:** {{aspiringIdentity}}
- **Common Objections:** {{commonObjections}}
{{#if minimumRequirements}}- **Minimum Requirements:** {{minimumRequirements}}{{/if}}
{{#if idealClientCurrentRevenue}}- **Ideal Client Current Revenue:** {{idealClientCurrentRevenue}}{{/if}}
{{#if idealClientDreamName}}- **Ideal Client Dream Name:** {{idealClientDreamName}}{{/if}}

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

### IDENTITY NAME RULE
⚠️ MANDATORY — IDENTITY NAMES ARE LOCKED ⚠️
The Two Identities deliverable has ALREADY been generated. Find the Undesired Identity name and Aspiring Identity name in the PRIOR DELIVERABLE CONTEXT above and use those EXACT names. Do NOT invent new identity names, synonyms, or variations.

You MUST reference BOTH identity names by their exact label at least once in your output — typically in the final bullet of each section or in the usage notes. For example: "You can already see yourself becoming [Aspiring Identity name] instead of staying stuck as [Undesired Identity name]."
⚠️ END MANDATORY IDENTITY NAMES ⚠️

### WRITING PRINCIPLES
1. **Specificity over vagueness** — Every bullet should describe a concrete behavior, situation, or characteristic — not a vague aspiration. "You've been coaching for at least 6 months and have paying clients" beats "You're serious about your business."
2. **Recognition, not aspiration** — The "For You" bullets should make the right person think "that's literally me." The "Not For You" bullets should make the wrong person think "okay, this isn't for me."
3. **Pull from the Two Identities** — The "For You" list draws from traits of someone transitioning FROM the Before Identity TOWARD the After Identity. The "Not For You" list draws from traits of someone deeply embedded in the Before Identity who isn't ready to change. Reference the identity names by their exact labels — this creates continuity with the rest of the marketing system.
4. **Disqualify with respect** — The "Not For You" section is direct but not condescending. It's honest, not mean. It protects the coach's time AND saves the wrong prospect from a bad investment.
5. **Use real language** — Write the way real people talk. No corporate jargon. No motivational poster language. If the target audience is coaches, write like a coach would talk to another coach.
6. **No banned cliches** — Do NOT use these overused words in any bullet: "prisoner," "captive," "trapped," "slave," "beggar," "grind," "hamster wheel," "treadmill," "rat race," "cage," "chains." Use niche-specific language instead.

### SECTION 1: THIS IS FOR YOU IF...

Write exactly 6 bullet points. Each bullet describes a specific characteristic, behavior, or situation that identifies a perfect-fit client.

**Bullet structure:** Start with "You..." and describe something they are currently doing, experiencing, or have achieved. Be specific enough that the wrong person would NOT claim it.

**What each bullet should target:**
- Bullet 1: Their current situation or stage (where they are right now in their journey)
- Bullet 2: A specific behavior that shows they're coachable and action-oriented
- Bullet 3: A frustration or pain point that proves they've outgrown their current approach
- Bullet 4: A belief or mindset that shows they're ready for the transformation
- Bullet 5: A resource, skill, or commitment they already have (minimum requirement)
- Bullet 6: A desire or ambition that aligns with the After Identity — stated as something they already feel, not something they should feel. THIS BULLET MUST reference the Aspiring Identity by its exact name from the Two Identities deliverable (e.g., "You can already see yourself as [Aspiring Identity name]...")

Pull from the After Identity attributes and True Beliefs from the belief-shift-map context to inform what "ready" looks like.

### SECTION 2: THIS IS NOT FOR YOU IF...

Write exactly 6 bullet points. Each bullet describes a specific characteristic, behavior, or mindset that disqualifies a prospect.

**Bullet structure:** Start with "You..." and describe something about them that makes this program a bad fit. Be direct. This coach's time is valuable and the wrong clients cost everyone.

**What each bullet should target:**
- Bullet 1: A behavior that signals they won't do the work (excuse-making, procrastination, etc.)
- Bullet 2: A false belief they hold that would prevent them from getting results (pulled from Before Identity False Beliefs)
- Bullet 3: A financial or commitment red flag (not willing to invest, looking for free/cheap shortcuts)
- Bullet 4: A mindset that clashes with the coaching methodology (e.g., "just tell me what to post" vs. building a real system)
- Bullet 5: A stage or situation where the timing is genuinely wrong (too early, too late, wrong niche)
- Bullet 6: An attitude or expectation that guarantees disappointment (magic-pill thinking, overnight success expectations, unwillingness to be uncomfortable). THIS BULLET MUST reference the Undesired Identity by its exact name from the Two Identities deliverable (e.g., "You're comfortable staying as [Undesired Identity name] and aren't ready to change...")

Pull from the Before Identity attributes, Old Methods, and False Beliefs from the belief-shift-map context to inform what "not ready" looks like.

### VOICE & TONE
{{STEVE_VOICE_PROFILE}} Write in a tone that is confident, direct, and experienced. This reads like it was written by someone who has enrolled hundreds of clients and knows EXACTLY who succeeds and who doesn't. No apologizing for the standards. No softening the disqualifiers. But also no arrogance — this is protective, not elitist. The coach genuinely wants to help the RIGHT people and protect the WRONG people from a bad investment.

### OUTPUT FORMAT
Return the output as clean markdown with two clearly labeled sections:

---

## THIS IS FOR YOU IF...

1. You [specific qualifier]...
2. You [specific qualifier]...
3. You [specific qualifier]...
4. You [specific qualifier]...
5. You [specific qualifier]...
6. You [specific qualifier]...

---

## THIS IS NOT FOR YOU IF...

1. You [specific disqualifier]...
2. You [specific disqualifier]...
3. You [specific disqualifier]...
4. You [specific disqualifier]...
5. You [specific disqualifier]...
6. You [specific disqualifier]...

---

After the two sections, add a brief **USAGE NOTES** block (3-4 sentences) advising the coach on where to place these sections for maximum impact (sales page, application form, social media, email sequence).

Total length: 400-600 words (both sections combined, excluding usage notes).
```

## Post-Processing
1. Verify exactly 6 bullets in each section (no more, no less)
2. Check that every bullet starts with "You" for consistency
3. Verify the "For You" bullets describe concrete, verifiable traits — not vague aspirations
4. Verify the "Not For You" bullets are direct but respectful — honest disqualification, not insults
5. Check that bullets pull from the Two Identities in the belief-shift-map context
6. Ensure no fabricated statistics, client stories, or invented details appear
7. This deliverable is a terminal asset — no other templates depend on it
