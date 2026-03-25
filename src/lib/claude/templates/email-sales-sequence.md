# Generation Template: Email Sales Sequence (12-Email Funnel)

## Template ID
`email-sales-sequence`

## What This Generates
A complete 12-email sales sequence that takes prospects from lead magnet delivery through to final close over 10 days. This follows John Whiting's proven 12-email progression: deliver value, teach beliefs, present proof, and close with genuine urgency. Each email targets a specific belief shift and has a defined send timing.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "offerName": "string",
  "pricePoint": "string",
  "transformation": "string",
  "uniqueMechanism": "string",
  "targetAudience": "string",
  "problemSolved": "string",
  "commonObjections": "array",
  "testimonials": "array (optional)",
  "ctaType": "string",
  "ctaKeyword": "string (optional)",
  "brandVoice": "string",
  "unwantedFeelings": "string",
  "desiredFeelings": "string",
  "aspiringIdentity": "string",
  "leadMagnetName": "string"
}
```

## Context Dependencies
This template uses outputs from prior deliverables:
- **magnetic-messaging-statement** — Core messaging hook and positioning language
- **belief-shift-map** — The 6 Core Beliefs, Two Identities (Before/After), evidence bank
- **core-conversion-content** — The Bulletproof Sales Script (12-section structure, 3-phase solution)

## Framework References
- **AI Prompts PDF Prompt 28**: The 12-email sales sequence structure with specific timing and purpose per email
- **John Whiting Framework D1**: No-Call Close — emails support a self-closing model
- **John Whiting Framework D4**: Objection Handling Through Content — each email tackles a specific belief
- **John Whiting Framework D5**: Pre-Framing — set expectations before the sale
- **John Whiting Framework A6**: Anti-Avatar Repelling — wrong people should self-select OUT

## Generation Prompt

```
You are writing a complete 12-email sales sequence for a coaching business. These emails follow a proven 10-day progression that delivers value, shifts beliefs, presents proof, and closes with genuine urgency. The prospect receives the lead magnet first, then these 12 emails guide them to a purchase decision.

IMPORTANT: Generate EXACTLY 12 emails. Not 5, not 8, not 10 — exactly 12. Each email has a specific purpose and send timing that must be followed.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Offer:** {{offerName}} at {{pricePoint}}
- **Transformation:** {{transformation}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Target Audience:** {{targetAudience}}
- **Core Problem:** {{problemSolved}}
- **Common Objections:** {{commonObjections}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
- **CTA Type:** {{ctaType}}
{{#if ctaKeyword}}- **CTA Keyword:** {{ctaKeyword}}{{/if}}
- **Brand Voice:** {{brandVoice}}
- **Unwanted Feelings (The Pain Zone):** {{unwantedFeelings}}
- **Desired Feelings (The Possibility):** {{desiredFeelings}}
- **Their Next-Level Self:** {{aspiringIdentity}}
- **Lead Magnet:** {{leadMagnetName}}
- **Case Studies:** {{caseStudies}}
- **Scarcity Element:** {{scarcityElement}}
- **Revenue Goal:** {{revenueGoal}}
{{#if clientSecretFear}}- **Secret Fear:** {{clientSecretFear}}{{/if}}
{{#if clientGuiltShame}}- **Guilt/Shame:** {{clientGuiltShame}}{{/if}}
{{#if clientSecretDesire}}- **Secret Desire:** {{clientSecretDesire}}{{/if}}
{{#if clientInactionConsequence}}- **3-Year Consequence of Inaction:** {{clientInactionConsequence}}{{/if}}
{{#if bonuses}}- **Bonuses:** {{bonuses}}{{/if}}
{{#if scarcityElement}}- **Scarcity Element:** {{scarcityElement}}{{/if}}

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

### THE 12-EMAIL SEQUENCE

---

#### EMAIL 1: ACCESS & CONFIRMATION
**Send timing:** Immediately after opt-in
**Purpose:** Deliver the lead magnet and set expectations for what's coming
**Belief addressed:** None yet — pure value delivery and relationship building

Content requirements:
- Deliver {{leadMagnetName}} with a direct download link placeholder: [INSERT DOWNLOAD LINK]
- Welcome them warmly — make them feel like they made a smart decision
- Set expectations: "Over the next few days, I'm going to share [X] with you"
- Brief credibility statement (1-2 sentences about {{clientName}}'s results)
- NO selling in this email — pure value and trust building
- Sign off with personality, not corporate formality

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
Congratulations on getting the [video/guide/letter] to get [big goal] in [time period]!
(Read this entire email to get access)
Real quick... I want to make sure you got this email, and you were able to open the link below... so
...can you just reply, 'got it', so I know you got this email?
Thanks!
--- Click here to [Watch/Read] the [video/guide/letter] ---
[Signoff],
[Name]"

---

#### EMAIL 2: CONTENT OVERVIEW
**Send timing:** Day 1 (24 hours after opt-in)
**Purpose:** Overview of what they'll learn from the lead magnet content + position {{clientName}} as the guide
**Belief addressed:** Core Belief #1 (method) — begin planting the seed that there's a better way

Content requirements:
- Reference {{leadMagnetName}} — "Did you get a chance to check out [lead magnet]?"
- Highlight the 3 most valuable insights from the lead magnet
- Bridge to the bigger problem: "But here's what the guide doesn't cover..."
- Tease that there's a complete system ({{uniqueMechanism}}) behind the free content
- End with a question that creates engagement: "Quick question — what's the #1 thing holding you back from [goal]?"

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
Earlier you got the [video/guide/letter] to get [big goal] in [time period].
--- Click here to Check it out ---
Inside, I'm going to share with you:
- The #1 Truth about getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] that is the difference between [unwanted result] and [big goal] of your dreams
- The Real Reason [ideal audience] struggles to get [big goal] and why no matter how much [old method] you do, you'll never get [big goal]
- The exact process me and my clients used to get [big goal] and stop [problems] and [complaints] for good.
--- Click here to Get [Big Goal] Now ---
PS: Want my personal help to get [big goal] in [time period]? [CTA link]"

---

#### EMAIL 3: CORE BELIEF TEACHING
**Send timing:** Day 2
**Purpose:** Teach the #1 foundational belief shift — the biggest "aha" that changes everything
**Belief addressed:** Core Belief #1 (the fundamental truth about their method/approach)

Content requirements:
- Open with a bold, counterintuitive statement that challenges what {{targetAudience}} currently believes
- Pull the strongest belief shift from the belief-shift-map: old belief → new belief
- Use 2-3 evidence components from the belief-shift-map (authority reference + analogy + story)
- Make the reader think: "I never saw it that way before"
- NO pitch yet — pure teaching that naturally positions {{uniqueMechanism}} as the answer
- End with: "Tomorrow, I'll show you why [surface problem] isn't actually your problem..."

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
Here's the #1 Truth about getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately becoming [aspiring identity] that is the difference between [unwanted result] and [big goal] of your dreams.
It's like... [Authority figure reference OR Universal analogy OR Universal story from belief-shift-map]
See, most [ideal audience] believes [current core belief], so they do [old method(s)], and you've already proven that those don't work.
Click here to learn how to never have to deal with [problems], [complaints], [unwanted feelings], or do [old methods] ever again.
PS: Want my personal help to get [big goal] in [time period]? [CTA link]"

---

#### EMAIL 4: THE REAL PROBLEM
**Send timing:** Day 3
**Purpose:** Reveal the real problem (not the surface symptom) — create the "aha moment"
**Belief addressed:** Core Belief #2 (what they think is wrong vs. what's actually wrong)

Content requirements:
- Open: "Most {{targetAudience}} think their problem is [surface symptom]. It's not."
- Use the Real Problem belief shift from the belief-shift-map
- Explain the root cause that {{uniqueMechanism}} addresses
- Show why their current approach (old methods) treats the symptom, not the cause
- Make it feel like a diagnosis, not a sales pitch
- Paint the consequence: "As long as you keep treating [symptom], you'll keep getting [current results]"
- End with: "So what's the actual solution? I'll break it down starting tomorrow..."

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
You can [old methods] all day, but if you don't understand and apply what I'm about to share with you, you'll never get [big goal].
Here's why... [why old way doesn't work]
It's like... [evidence from belief-shift-map]
See, most [ideal audience] thinks [current problem belief], so they do [old method(s)], and you've already proven that those don't work.
The truth is: [new problem belief they need to have].
Watch the [video/guide/letter] below to see what I mean.
--- Click here to Watch Now ---
PS: Want my personal help to get [big goal] in [time period]? [CTA link]"

---

#### EMAIL 5: PHASE 1 OF THE METHOD
**Send timing:** Day 4
**Purpose:** Teach Phase 1 of {{uniqueMechanism}} — give them a taste of the system
**Belief addressed:** Core Belief #5 (method effectiveness)

Content requirements:
- "Here's the first step to [transformation]: [Phase 1 Name]"
- Explain what Phase 1 does and why it matters (pull from core-conversion-content 3-phase structure)
- Give one actionable takeaway they can implement TODAY
- Show the immediate outcome of Phase 1
- Reference that this is step 1 of 3 — there's a complete system
- End with: "Phase 1 gets you [quick win]. But Phase 2 is where things really accelerate..."

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
If you want [phase 1 goal], keep reading...
There's a right way, and a wrong way to get [phase 1 goal].
And we've found that the best way to do that is with [phase 1 big idea / result].
We do this by [what it is from phase 1] in a way that easily, quickly avoids [complaints related to phase 1] and gets [phase 1 big idea / result].
I explain it all in the [video/guide/letter] linked below...
--- Click here to Watch Now ---
PS: Want my personal help to get [big goal] in [time period]? [CTA link]"

---

#### EMAIL 6: PHASE 2 OF THE METHOD
**Send timing:** Day 5
**Purpose:** Teach Phase 2 — build on Phase 1, show the compound effect
**Belief addressed:** Core Belief #5 (method effectiveness) + Core Belief #3 (time priority)

Content requirements:
- "Yesterday I showed you [Phase 1]. Today: [Phase 2 Name] — this is where it gets exciting."
- Explain what Phase 2 builds on top of Phase 1
- Show why most people get stuck between Phase 1 and 2 (this is where DIY fails)
- The shift: "This is why you can't just [old approach] — you need a system"
- Address time objection naturally: "This isn't about working more hours — it's about working on the RIGHT things"
- End with: "Tomorrow, I'll show you the final piece — Phase 3 is what separates [Before Identity] from [After Identity]..."

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
Yesterday, I sent you an email about how to get [phase 1 goal].
But if you don't do [phase 1 big idea / result], you'll have [unwanted consequence related to phase 1].
But [phase 1 big idea / result] isn't enough.
If you want [big goal], you'll also need [phase 2 big idea / result].
Now, we do this by [what it is from phase 2] in a way that easily, quickly avoids [complaints] and gets [phase 2 big idea / result].
It's the same [what it is from phase 2] I've used personally to get [phase 2 big idea / result] and I explain it all in the [video/guide/letter] linked below...
--- Click here to Watch Now ---
PS: Want my personal help to get [big goal] in [time period]? [CTA link]"

---

#### EMAIL 7: PHASE 3 OF THE METHOD + FULL REVEAL
**Send timing:** Day 6
**Purpose:** Teach Phase 3 and reveal {{offerName}} as the complete implementation vehicle
**Belief addressed:** Core Belief #6 (help/support) — plant the seed that they need guidance

Content requirements:
- "Phase 3: [Phase 3 Name] — this is where [Before Identity] becomes [After Identity]"
- Explain Phase 3 and the complete transformation when all 3 phases work together
- THE TRANSITION: "Now, I've given you the framework. But there's a difference between knowing the path and walking it."
- Introduce {{offerName}} naturally — "That's exactly why I built [offer]"
- Brief overview: what it is, who it's for, the core promise
- NOT a hard pitch — it's a reveal. "If you're curious, I'll share more tomorrow."
- End with genuine selectivity: "This isn't for everyone — tomorrow I'll explain who it IS for"

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
I sent you a few emails over the last couple days about how to get [phase 1 big idea / result] and [phase 2 big idea / result].
And while they are obviously vital...
[Phase 3 big idea / result] is required if you want to get [big goal] and [secret desires] in [time period].
There are many ways to do this, but what we have found works best is [what it is from phase 3] in a way that easily, quickly avoids [complaints] and gets [phase 3 big idea / result].
I explain how it all comes together in the [video/guide/letter] linked below...
--- Click here to Watch Now ---
PS: Want my personal help to get [big goal] in [time period]? [CTA link]"

---

#### EMAIL 8: SOCIAL PROOF / TESTIMONIAL
**Send timing:** Day 7
**Purpose:** Let results do the talking — proof over promises
**Belief addressed:** All beliefs reinforced through third-party evidence

Content requirements:
{{#if testimonials}}
- Feature 2-3 client transformation stories from {{testimonials}}
- Structure each as: Before (pain + feelings) → What they did (implemented the method) → After (specific results + timeline)
- Do NOT embellish or fabricate details from the testimonials
- Let the clients' words speak — use quotes where possible
{{else}}
- Use {{clientName}}'s own transformation story as the primary proof
- Include 2-3 placeholder sections: [INSERT CLIENT RESULT #1], [INSERT CLIENT RESULT #2]
- Mark clearly: "*** Replace with real client testimonials before sending ***"
{{/if}}
- Frame it as: "Don't take my word for it — here's what happened for [clients]"
- CTA: "Want results like these? Here's how to get started: {{ctaType}}"

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
[New method] could very well be the thing that changes everything for you.
Just like it did for me and just like it did for [client name].
See, [client] was right where you are. They had [specific problems], leading to [specific complaints], which made them feel [unwanted feelings].
They had tried [old methods], they still [unwanted result]...
But they applied what I shared and ultimately ended up getting [big goal] in [time period]. And they didn't even have to [negative old method].
--- Hear [client] Story Here ---
PS: My client roster is almost full, and I only have a few spots left to personally help you get [big goal] in [time period]. [CTA link]"

---

#### EMAIL 9: URGENCY / WHY NOW
**Send timing:** Day 8
**Purpose:** Address the "I'll do it later" belief — make the cost of waiting visceral
**Belief addressed:** Core Belief #3 (time priority) + consequences of inaction

Content requirements:
- Open with a cost calculation: "Let me ask you something — what is staying stuck costing you?"
- Break down the cost of inaction per month across: income lost, time wasted, opportunities missed, emotional toll
- Use specific numbers relevant to {{niche}} and {{targetAudience}}
- "Every month you wait is another month as [Before Identity] instead of [After Identity]"
- Address "I need to think about it" — this is a fear response, not a logical process
- Present genuine urgency: limited spots, cohort start date, or bonus deadline (must be real, not manufactured)
- CTA: Direct and confident

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
I sent you a few emails over the last few days about how you can get [big goal] in [time period] with [new method].
And if you're reading this, you:
- Know you can get [big goal] but you just can't seem to get [phase 1 goal] in a way that avoids [complaints]
- You're frustrated with [old method(s)] that don't work... and you just want to get [phase 2 goal] already
- You really want [secret desires]
- You're sick of [things they see that frustrate them] and you just want [phase 3 goal]
So if you want to finally draw a line in the sand and become a [aspiring identity], today might be your last chance...
--- [CTA: Book Your Call / Sign Up Now] ---
PS: As of 11:59pm tonight, I'm closing my client roster until further notice, but if you [act] today, there might be a chance to work together."

---

#### EMAIL 10: TWO OPTIONS
**Send timing:** Day 9
**Purpose:** Frame the decision as Option A (DIY) vs Option B (guided) — make the choice clear
**Belief addressed:** Core Belief #6 (help/support) — why they need guidance, not just information

Content requirements:
- "You have two paths forward. Let me lay them out honestly."
- **Option A (DIY):** Continue figuring it out alone — outline the realistic timeline, challenges, and likely results (slow, uncertain, expensive in lost time)
- **Option B ({{offerName}}):** Get expert guidance with a proven system — outline the timeline, support, and expected results (fast, proven, supported)
- Be respectful of both options — "Option A works for some people. If you're a natural self-starter with unlimited time, go for it."
- BUT: "If you want the fastest path from [Before Identity] to [After Identity], Option B exists for a reason."
- Address the money belief: {{pricePoint}} vs. the cost of another year stuck
- CTA: "If Option B resonates, here's the next step"

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
If you had [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately became [aspiring identity]...
How much faster, simpler, easier would your life be?
Take a second to imagine, what would you be able to do?
- [Thing they'd rather do]?
- [Thing they'd rather do]?
- [Thing they'd rather do]?
Most [ideal audience] only dream of getting [big goal] and becoming [aspiring identity].
Very few actually achieve it.
But if you want to be one of the rare few...
--- [CTA: Book Your Call / Sign Up Now] ---
PS: As of 11:59pm tonight, I'm closing my client roster until further notice."

---

#### EMAIL 11: 6-HOUR DEADLINE
**Send timing:** Day 10 (morning)
**Purpose:** Create genuine urgency — the window is closing
**Belief addressed:** Decision-making urgency

Content requirements:
- Subject line creates urgency without being spammy
- "I'm closing enrollment for [offer] tonight at [time]"
- Brief recap: what they get, the transformation, the price
- Address the final hesitation: "If you've read every email and you're STILL thinking about it — that hesitation is exactly what's keeping you stuck"
- Reference the Before/After Identity one more time
- "In 6 hours, this offer closes. You can either be the same person tomorrow, or you can be someone who took action."
- CTA: Clear and urgent

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
At this point, the obvious question is, how can you apply [new method] and get [phase 1 goal], [phase 2 goal] and [phase 3 goal] today?
Well, you basically have two options...
You can take what I've shared with you and try to implement it all yourself, with nobody to [support 1], [support 2] and [support 3]... leaving you to figure out all the details yourself through trial and error...
Or you can [CTA action] and get the proven system that gets [phase 1 goal], [phase 2 goal] and [phase 3 goal]...
Now is the time to decide!
--- [CTA: Book Before 11:59pm] ---
PS: This opportunity closes after 11:59pm tonight."

---

#### EMAIL 12: FINAL 2-HOUR DEADLINE
**Send timing:** Day 10 (6 hours after Email 11)
**Purpose:** Last chance — the door is closing
**Belief addressed:** Final push — identity choice

Content requirements:
- Short and punchy (150-200 words max)
- "2 hours left."
- No new arguments — just the core choice: "You've seen the framework. You've seen the results. You know the price."
- Restate the transformation in one powerful sentence
- "The only question is: are you ready to become [After Identity]?"
- CTA: Final, simple, clear
{{#if ctaKeyword}}- "DM me '{{ctaKeyword}}' right now — I'll handle the rest."{{/if}}
- Sign off with warmth: "Either way, I respect your decision. But if you're in — now's the time."
- P.S.: One-line recap of guarantee or strongest proof point

FOLLOW THIS BODY STRUCTURE:
"Hey %FIRSTNAME%,
REAL QUICK:
In less than 2 hours, my client roster is closing for the foreseeable future.
So, I want you to take a second to think about...
What are the next [time period] going to look like for you?
Struggling with [complaints], [problems], doing [old methods], getting [unwanted result] and feeling [unwanted feelings]?
Or...
Following a proven method to get [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately get [big goal] in the next [time period] and become [aspiring identity].
Those are your options. Which will you choose?
This Offer Closes at 11:59 PM EST TONIGHT (less than 2 hours from now...)
--- [Final CTA] ---"

---

### EMAIL FORMAT (for EACH of the 12 emails)
1. **Email # and Title** (e.g., "Email 1: Access & Confirmation")
2. **Send Timing** (e.g., "Send: Immediately after opt-in")
3. **Subject Line** + 1 alternative
4. **Preview Text** (40-80 chars)
5. **Body Copy** (Emails 1-10: 250-500 words | Email 11: 200-300 words | Email 12: 150-200 words)
6. **CTA** (clear next step)
7. **P.S. Line** (optional but recommended)

### COPY PRINCIPLES
- Confident, not desperate — "Take it or leave it" energy
- Price is stated openly — never hidden or teased
- Proof over promises — use evidence from belief-shift-map
- Urgency must be REAL (limited spots, cohort dates) — never fake scarcity
- Each email stands alone (reader might only see 1-2) but the sequence builds
- Anti-avatar repelling: wrong people should self-select OUT
- Per John Whiting: "I don't chase. You jump, I jump."

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} These emails should feel like messages from a trusted advisor, not a marketing robot. Be direct, specific, and emotionally resonant.

### OUTPUT FORMAT
Number each email clearly (Email 1 through Email 12). Include send timing prominently. Use the exact format specified above for each email.
```

## Post-Processing
1. Verify EXACTLY 12 emails are generated (not fewer)
2. Check send timing matches the 10-day schedule
3. Verify emails get progressively shorter (long value → short close)
4. Check that all 6 Core Beliefs are addressed across the sequence
5. Verify CTAs match the client's chosen ctaType
6. If no testimonials provided, verify placeholders are clearly marked
