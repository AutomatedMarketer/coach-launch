# Generation Template: Emotional Trigger Map (Money Messaging Part 2)

## Template ID
`emotional-trigger-map`

## What This Generates
A deep-dive emotional profile of the target audience across 12 psychological dimensions. This is the "emotional ammunition" for all content — every ad, email, post, sales page, and video script draws from these triggers to create copy that resonates at a gut level. While Part 1 (4P Power Message) maps the surface messaging, Part 2 goes beneath the surface into the hidden psychology that drives buying decisions.

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
  "offerName": "string",
  "brandVoice": "string"
}
```

## Framework References
- **Money Messaging Part 2 Workbook**: The 12-point emotional deep dive (false beliefs, secret wants, misconceived problems, real challenges, fears, frustrations, enemies, guilt, judgment, observations, true solutions, consequences)
- **Belief-Shift Framework A2**: Hell Island / Heaven Island emotional landscape
- **AI Prompts PDF "Ethical Manipulation"**: Two Identities framework — understanding the emotional terrain of both the Undesired and Aspiring Identity
- **John Whiting Framework C1**: Authority Amplifier — content designed to shift belief systems using emotional triggers
- **John Whiting Framework D4**: Objection handling through emotional resonance

## Generation Prompt

```
You are an expert in consumer psychology and direct-response marketing for coaching businesses. Your job is to create a comprehensive Emotional Trigger Map — a deep psychological profile of the target audience that goes far beyond surface-level pain points. This document becomes the emotional foundation for ALL marketing content.

IMPORTANT: This is "ethical manipulation" — understanding these triggers to HELP the prospect recognize their own situation and take action toward genuine transformation. Every trigger is a doorway to empathy, not exploitation. The goal is to make the prospect feel deeply understood, not manipulated.

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
- **Offer:** {{offerName}}
- **Brand Voice:** {{brandVoice}}
- **Ideal Client Current Revenue:** {{idealClientCurrentRevenue}}
- **Current Methods:** {{idealClientCurrentMethods}}
- **How Long Stuck:** {{idealClientStuckDuration}}
- **Failed Attempts:** {{idealClientFailedAttempts}}

### DEEP CLIENT PSYCHOLOGY (Coach-Provided Grounding Data)
{{#if clientExcuse}}- **Self-Limiting Story:** {{clientExcuse}}{{/if}}
{{#if clientSecretDesire}}- **Secret Desire:** {{clientSecretDesire}}{{/if}}
{{#if clientFalseProblem}}- **False Problem (What They Think):** {{clientFalseProblem}}{{/if}}
{{#if clientRealProblem}}- **Real Problem (Underneath):** {{clientRealProblem}}{{/if}}
{{#if clientSecretFear}}- **Secret Fear:** {{clientSecretFear}}{{/if}}
{{#if clientAngerTrigger}}- **Anger Trigger:** {{clientAngerTrigger}}{{/if}}
{{#if clientBlameTarget}}- **Who They Blame:** {{clientBlameTarget}}{{/if}}
{{#if clientGuiltShame}}- **Guilt/Shame:** {{clientGuiltShame}}{{/if}}
{{#if clientDailyReminder}}- **Daily Reminder:** {{clientDailyReminder}}{{/if}}
{{#if clientInactionConsequence}}- **3-Year Consequence of Inaction:** {{clientInactionConsequence}}{{/if}}

IMPORTANT: When any of the Deep Client Psychology fields above are provided, use them as GROUNDING DATA for the corresponding trigger categories. Do NOT ignore them — these are the coach's direct knowledge of their clients. Build each category around these specific insights, then expand to generate the full 10 bullet points.

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. NICHE-SPECIFIC LANGUAGE ONLY: Do NOT use generic pain/struggle cliches that apply to every industry. Banned phrases in prominent positions (headlines, identity references, key messaging): "trapped," "prisoner," "captive," "slave," "cage," "chains," "hamster wheel," "rat race," "grinding/grind." Replace with language specific to {{niche}} and {{targetAudience}}. Example: instead of "trapped in their business," write something specific like "answering every service call at 11pm" (for trade businesses) or "booking back-to-back 1-on-1 sessions just to make rent" (for fitness coaches).

### THE 12 EMOTIONAL TRIGGER CATEGORIES

For EACH of the 12 categories below, generate **10 specific, niche-relevant bullet points**. These must be hyper-specific to {{targetAudience}} in {{niche}} — not generic coaching language. Write each bullet as if you're reading the prospect's private thoughts.

---

#### TRIGGER 1: FALSE BELIEFS / LIES THEY TELL THEMSELVES
What {{targetAudience}} believes about their problem that isn't true. These are the mental traps keeping them stuck — beliefs they've accepted as fact that are actually holding them back.

Generate 10 false beliefs. For each:
- State the belief in their own words (first person, conversational)
- Brief note on why this belief feels true to them
- What this belief costs them

Example format: "I just need to work harder / hustle more" — Feels true because effort = results in most areas. Costs them: burnout, no leverage, income ceiling.

---

#### TRIGGER 2: SECRET WANTS / UNDISCLOSED DESIRES
What {{targetAudience}} truly wants but won't say out loud — the desires they're embarrassed to admit, afraid to voice, or don't even fully acknowledge to themselves. These go beyond the stated goal.

Generate 10 secret desires. For each:
- The desire itself (what they really want, in their private thoughts)
- Why they won't say it out loud (social pressure, embarrassment, fear of judgment)

---

#### TRIGGER 3: MISCONCEIVED PROBLEMS
What {{targetAudience}} THINKS is the problem vs. what's actually wrong. They're trying to solve the wrong thing — and that's why nothing works. This is the gap between the symptom they see and the root cause they can't see.

Generate 10 misconceived problems. For each:
- What they think the problem is (surface symptom)
- What the problem actually is (root cause that {{uniqueMechanism}} addresses)

---

#### TRIGGER 4: REAL CHALLENGES
The private struggles {{targetAudience}} won't admit publicly — the things they'd never post on social media or share in a group. These are the behind-closed-doors realities that make them feel alone in their struggle.

Generate 10 real challenges. For each:
- The private struggle (in their internal voice)
- Why they hide it (what they're afraid people would think)

---

#### TRIGGER 5: SECRET FEARS
What terrifies {{targetAudience}} — about the problem, about the solution, about failing, about succeeding, about being exposed. Fear is the #1 driver of inaction. These fears are often irrational but feel absolutely real.

Generate 10 secret fears. For each:
- The fear (specific and visceral)
- What triggers this fear (situations, conversations, moments)

---

#### TRIGGER 6: FRUSTRATIONS / GRIEVANCES
What makes {{targetAudience}} angry, annoyed, or resentful about their current situation. Frustration is powerful emotional fuel — it creates readiness for change when channeled correctly.

Generate 10 frustrations. For each:
- The frustration (specific situation or recurring experience)
- How it makes them feel (the emotional response)

---

#### TRIGGER 7: ENEMIES / RESENTMENT
Who or what {{targetAudience}} blames, resents, or feels wronged by. These are the external forces they see as obstacles — whether people, systems, industries, or circumstances.

Generate 10 enemies/resentments. For each:
- Who or what they resent (person, group, system, or circumstance)
- Why they feel this way (the perceived injustice)

---

#### TRIGGER 8: GUILT & SHAME
What {{targetAudience}} feels guilty about, ashamed of, or embarrassed by in relation to {{problemSolved}}. Guilt and shame are the heaviest emotions — they drive avoidance behavior and self-sabotage.

Generate 10 guilt/shame triggers. For each:
- What they feel guilty or ashamed about
- Who they feel they're letting down (themselves, family, clients, partners)

---

#### TRIGGER 9: WHO JUDGES THEM
The specific people or groups who make {{targetAudience}} feel inadequate, criticized, or "not enough." External judgment reinforces internal doubt — knowing who the judges are reveals what validation they're seeking.

Generate 10 judgment sources. For each:
- Who judges them (specific relationship or group)
- What the judgment sounds like (the words/looks/implications)
- How it makes them feel

---

#### TRIGGER 10: DAILY OBSERVATIONS
What {{targetAudience}} notices about themselves and others every day that reinforces their pain or desire. These are the small moments — scrolling social media, seeing competitors succeed, looking at bank accounts, catching their reflection — that trigger emotional responses.

Generate 10 daily observations. For each:
- The observation (specific moment or trigger)
- The emotional response (what they think/feel in that moment)

---

#### TRIGGER 11: TRUE SOLUTIONS / ACTUAL NEEDS
What {{targetAudience}} actually needs vs. what they think they need. This is where {{uniqueMechanism}} comes in — the real solution to the real problem, not the band-aid they keep applying to the symptom.

Generate 10 true solutions. For each:
- What they think they need (the surface-level fix they keep trying)
- What they actually need (the deeper solution)
- How {{uniqueMechanism}} delivers this

---

#### TRIGGER 12: CONSEQUENCES OF INACTION
What happens to {{targetAudience}} if absolutely nothing changes. Paint the picture of their life 6 months, 1 year, and 3 years from now if they stay on the current path. This is the "cost of doing nothing."

Generate consequences across 6 dimensions:
- **Mental** — stress, anxiety, decision fatigue, self-doubt (3-4 specific consequences)
- **Physical** — health, energy, sleep, appearance (3-4 specific consequences)
- **Financial** — income, savings, debt, missed opportunities (3-4 specific consequences)
- **Relational** — spouse, family, friends, clients, team (3-4 specific consequences)
- **Spiritual / Purpose** — meaning, fulfillment, legacy, alignment (3-4 specific consequences)
- **Quality of Life** — freedom, joy, experiences, daily satisfaction (3-4 specific consequences)

---

### SUMMARY: TOP 5 EMOTIONAL HOOKS

After completing all 12 categories, identify the **5 most powerful emotional triggers** from across all categories — the ones that would stop {{targetAudience}} mid-scroll, make them feel genuinely understood, and create the strongest motivation to change.

For each hook:
1. The trigger (1-2 sentences, written in second person — "You...")
2. Which category it comes from
3. Why it's powerful (what emotional nerve it hits)
4. How to use it (ad hook, email subject, post opener, video intro)

### CONTENT APPLICATION GUIDE

Provide a brief guide on how to weave these emotional triggers into different content types:
- **Ads**: Which triggers make the best ad hooks (usually fears + frustrations + consequences)
- **Emails**: Which triggers create the strongest open/click patterns (usually guilt + secret wants + daily observations)
- **Social Posts**: Which triggers drive engagement (usually enemies + false beliefs + misconceived problems)
- **Sales Copy**: Which triggers drive conversion (usually consequences + real challenges + true solutions)
- **Video Scripts**: Which triggers create the best retention (usually secret fears + judgment + secret wants)

### VOICE & TONE
Write each trigger in the prospect's own voice — the way they'd think it, not the way a marketer would write it.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} Be raw, specific, and emotionally honest. The best triggers make the reader think: "How did they know that about me?"

### OUTPUT FORMAT
Use clear section headers for each of the 12 categories. Number each bullet point within each category. Use the exact format specified for each trigger type. End with the Top 5 Hooks and Content Application Guide.
```

## Post-Processing
1. This output feeds into core-conversion-content (sales script) and lead-magnet-outline as context
2. Also indirectly feeds ALL Phase 2/3 deliverables through the sales script
3. Verify each category has exactly 10 specific, niche-relevant bullet points
4. Check that triggers are written in the prospect's voice (first person / internal monologue), not marketer language
5. Verify consequences of inaction covers all 6 dimensions
6. Top 5 Hooks should be genuinely the strongest triggers, not just the first 5
