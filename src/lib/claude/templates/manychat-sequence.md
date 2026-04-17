# Generation Template: ManyChat Automation Flow

## Template ID
`manychat-sequence`

## What This Generates
A complete ManyChat automation flow for coaching businesses. Includes a DM keyword trigger, welcome/qualification sequence, nurture sequence over 7 days, and sales conversion sequence. Each message node includes content, button labels, next-step logic, and time delays — formatted so it's easy to manually recreate in ManyChat.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "offerName": "string",
  "pricePoint": "string (synthesized from pricing.displayString)",
  "targetAudience": "string",
  "problemSolved": "string",
  "transformation": "string",
  "uniqueMechanism": "string",
  "ctaType": "string — 'application' | 'booking' | 'dm-keyword'",
  "ctaKeyword": "string (required when ctaType === 'dm-keyword')",
  "applicationUrl": "string (required when ctaType === 'application')",
  "offerDetailsUrl": "string (required when ctaType === 'booking')",
  "leadMagnetUrl": "string (required)",
  "leadMagnetName": "string (required)",
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become",
  "monthlyActionCost": "string (required) — quoted verbatim in urgency nodes",
  "firstResultTimeframe": "string (required) — quoted verbatim for result-timing claims",
  "programDuration": "string (optional)"
}
```

## Context Dependencies
This template uses outputs from the **belief-shift-map** and **magnetic-messaging-statement** deliverables. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, and Undesired Identity / Aspiring Identity.

## Framework References (John Whiting)
- **F1: ManyChat Automation** — John's DM flow: keyword trigger -> qualification questions -> weed out non-fits -> send offer details -> application. No human until qualified application received.
- **F2: Pipeline Stages** — Lead -> Customer -> DM -> Qualified -> App -> Client. ManyChat maps to the DM -> Qualified -> App stages.
- **B1: Self-Closing System** — The automation handles qualification. The human handles relationship. Never use AI pretending to be the coach.
- **D3: Follow-Up Approach** — "I don't chase." Follow-up is warm, not aggressive.
- **B3: Application Funnel** — Qualification questions weed out non-fits. Must qualify for niche, stage of business, budget readiness.
- **D1: Content Strategy** — Value-first nurture. Give real insight, not just teasers. Build belief through content.

## Generation Prompt

```
You are writing a complete ManyChat automation flow for a coaching business. This flow handles the entire journey from DM keyword trigger through qualification, nurture, and conversion — all inside ManyChat's visual flow builder.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Offer:** {{offerName}} at {{pricePoint}}
- **Target Audience:** {{targetAudience}}
{{#if minimumRequirements}}- **Minimum Client Requirements:** {{minimumRequirements}}{{/if}}
- **Problem Solved:** {{problemSolved}}
- **Transformation:** {{transformation}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **CTA Type:** {{ctaType}}
- **DM Keyword:** {{ctaKeyword}}
- **Brand Voice:** {{brandVoice}}
{{#if salesApproach}}- **Sales Approach:** {{salesApproach}}{{/if}}
- **First Measurable Result Timeframe (coach-provided):** {{firstResultTimeframe}}
- **Monthly Cost of Inaction (coach-provided — use verbatim in any urgency node):** {{monthlyActionCost}}
- **Lead Magnet URL:** {{leadMagnetUrl}}
- **Lead Magnet Name:** {{leadMagnetName}}
{{#if applicationUrl}}- **Application URL:** {{applicationUrl}}{{/if}}
{{#if offerDetailsUrl}}- **Offer / Sales Page URL:** {{offerDetailsUrl}}{{/if}}
{{#if programDuration}}- **Program Duration:** {{programDuration}}{{/if}}

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

---

### OUTPUT FORMAT

Structure the output as a ManyChat flow with clearly labeled nodes. For EVERY message node, include:
1. **Node Name** — descriptive label for the ManyChat flow builder
2. **Trigger** — what activates this node (keyword, button tap, time delay, condition)
3. **Message Content** — the exact text to paste into ManyChat (ready to copy)
4. **Buttons / Quick Replies** — label and action for each button (if any)
5. **Next Step Logic** — what happens after this node (which node it connects to, and conditions)
6. **Time Delay** — wait time before this node fires (if any)
7. **Tags to Apply** — ManyChat tags to assign at this step
8. **Custom Field Updates** — any custom fields to set (if applicable)

Use this exact format for each node:

---
#### NODE: [Node Name]
- **Trigger:** [what activates this node]
- **Delay:** [none / X minutes / X hours / X days]
- **Tags:** [+Add Tag Name] or [-Remove Tag Name]
- **Custom Fields:** [field_name = value] (if any)

**Message:**
> [Exact message text — ready to copy-paste into ManyChat]

**Buttons:**
| Button Label | Action | Connects To |
|---|---|---|
| [label] | [action type] | [next node name] |

**Next Step:** [what happens next + conditions]
---

---

### FLOW 1: DM KEYWORD TRIGGER + WELCOME/QUALIFICATION (3-5 messages)

**Purpose:** When someone DMs the keyword "{{ctaKeyword}}" (or comments it on a post), immediately engage, qualify them, and route qualified leads to the offer.

**Node 1: Keyword Trigger Response** (Instant)
- Acknowledge their DM warmly and personally
- Use Money Messaging language from the Belief-Shift Map
- Reference the {{problemSolved}} and hint at the {{transformation}}
- Transition to the first qualification question with a quick reply button
- Tone: friendly, human, NOT salesy
- Example: "Hey! So glad you reached out. Before I share the details about {{offerName}}, I want to make sure it's actually the right fit for you. Quick question..."

**Node 2: Qualification Question 1** (Instant after button tap)
- Ask about their current situation related to {{targetAudience}}
- Use quick reply buttons for common answers (makes it easy + gives you data)
- Example: "Where are you at right now with your [niche] business?" with buttons like "Just starting out", "Have some clients", "Established but stuck"

**Node 3: Qualification Question 2** (Instant after button tap)
- Ask about their biggest challenge related to {{problemSolved}}
- Quick reply buttons with 3-4 common pain points from the belief-shift map
- Acknowledge their previous answer briefly before asking

**Node 4: Qualification Question 3** (Instant after button tap)
- Ask about readiness/commitment level — this is the budget/investment qualifier
- Be direct but not aggressive: "If this turns out to be the right fit, are you in a position to invest in solving this?"
- Quick reply buttons: "Yes, ready to invest", "Need to know more first", "Not right now"

**Node 5: Qualification Router** (Instant — conditional)
- IF qualified (right answers): route to FLOW 2 (Offer Delivery)
- IF not ready: route to FLOW 3 (Nurture Sequence)
- IF disqualified: route to Disqualification Node
- Apply appropriate tags based on routing

---

### FLOW 2: OFFER DELIVERY + SALES CONVERSION (3-5 messages)

**Purpose:** Deliver the offer details to qualified leads and guide them to apply/book.

**Node 6: Offer Delivery** (Instant after qualification)
- Congratulate them on being a fit
- Deliver the offer details for {{offerName}} in 3-5 bullet points
- Include {{pricePoint}} openly
- Reference `firstResultTimeframe` VERBATIM when describing timing: clients see their first measurable win {{firstResultTimeframe}}. Do NOT invent other week-N milestones.
- Button action depends on CTA type — `{{ctaType}}`. Use EXACTLY ONE of the three branches below (the one matching {{ctaType}}); do NOT combine them:
  {{#if ctaType === 'application'}}- Application CTA: button links to {{applicationUrl}}{{/if}}
  {{#if ctaType === 'booking'}}- Booking CTA: button links to {{offerDetailsUrl}}{{/if}}
  {{#if ctaType === 'dm-keyword'}}- DM-keyword CTA: button label "Reply {{ctaKeyword}}" that tags the user and triggers the next-step node{{/if}}
- Include a "I have questions" button that routes to Q&A node

**Node 7: Social Proof / Case Study** (1 hour delay if no button tap)
- Share a brief success story or result from someone similar in {{targetAudience}}
- Connect the result to the {{transformation}} they're seeking
- Soft CTA: "Ready to get started?" button linking back to application

**Node 8: Urgency / Scarcity Reminder** (24 hours if no application)
- If there's genuine scarcity (limited spots, cohort start date), mention it
- If no real scarcity, use "momentum" framing instead: "The best time to start is when you're feeling this pull"
- If you reference the cost of staying stuck, use `monthlyActionCost` VERBATIM ("{{monthlyActionCost}}"). Do NOT invent dollar figures.
- Address ONE Core Belief from the Belief-Shift Map
- Button: "Apply Now" + "Not ready yet" (routes to nurture)

**Node 9: Final Conversion Push** (48 hours if still no action)
- Paint the Aspiring Identity vision using {{aspiringIdentity}} and {{desiredFeelings}}
- Contrast with the pain of staying stuck ({{unwantedFeelings}})
- Last direct CTA: "If this resonates, here's the link. If not, no worries at all."
- Per John: "I don't chase." This is the last sales message.

---

### FLOW 3: NURTURE SEQUENCE (5-7 messages over 7 days)

**Purpose:** For leads who aren't ready to buy yet. Build trust, shift beliefs, and warm them up over time.

**Node N1: Day 1 — Value Drop** (Immediate after routing to nurture)
- Share a genuinely useful tip or insight related to {{problemSolved}}
- Use the {{uniqueMechanism}} to frame the advice differently than what they've heard before
- No sell — pure value
- Button: "This is helpful!" (engagement tracker)

**Node N2: Day 2 — Belief Shift #1** (24 hours)
- Address the FIRST Core Belief from the Belief-Shift Map
- Share the old belief -> new belief shift in a conversational way
- Keep it to 2-3 sentences — this is DM, not an essay
- Quick reply: "That makes sense" / "Tell me more"

**Node N3: Day 3 — Story / Social Proof** (24 hours)
- Share a brief client story or personal story from {{clientName}}
- Connect it to the {{transformation}} and the belief shift from yesterday
- Button: "I want results like that" (routes back to offer delivery)

**Node N4: Day 4 — Belief Shift #2** (24 hours)
- Address the SECOND Core Belief from the Belief-Shift Map
- Frame it as "something most {{targetAudience}} get wrong"
- Quick reply: "I never thought of it that way" / "How do I fix this?"

**Node N5: Day 5 — Free Resource** (24 hours)
- Send the lead magnet: {{leadMagnetName}} — link: {{leadMagnetUrl}}
- Frame it as: "I put this together for people in your exact situation"
- Button: "Thanks!" + "Tell me about {{offerName}}"

**Node N6: Day 6 — Belief Shift #3 + Soft Pitch** (24 hours)
- Address the THIRD Core Belief
- Transition naturally into how {{offerName}} solves this at a deeper level
- Soft CTA: "If you ever want to go deeper on this, {{offerName}} is built for exactly that"
- Button: "Tell me more" (routes to offer delivery) + "Just browsing" (continues nurture)

**Node N7: Day 7 — Aspiring Identity Close** (24 hours)
- Paint the full Aspiring Identity picture: what life looks like as {{aspiringIdentity}}
- Reference {{desiredFeelings}} — make it visceral
- Final soft CTA: "Whenever you're ready, I'm here. No rush."
- Tag as "Nurture-Complete"
- Per John: "I don't chase." This is the last nurture message.

---

### DISQUALIFICATION NODE

**Node DQ: Polite Redirect**
- Acknowledge their interest warmly
- Explain it's not the right fit RIGHT NOW (not "never")
- Offer a free resource as a consolation
- "When you're at [X stage], reach out again — I'd love to help."
- Tag: "Not-Qualified-Yet"

---

### MANYCHAT CONFIGURATION NOTES

**Tags to create in ManyChat:**
- `DM-Lead` — applied on keyword trigger
- `Qualified` — passed qualification questions
- `Not-Qualified-Yet` — didn't meet criteria
- `Offer-Sent` — received offer details
- `Applied` — clicked application link
- `Nurture-Active` — in nurture sequence
- `Nurture-Complete` — finished nurture sequence
- `Engaged` — tapped any button (high intent signal)
- `No-Response` — didn't engage after 48 hours

**Custom Fields to create:**
- `qualification_status` — "qualified" / "nurture" / "disqualified"
- `biggest_challenge` — their answer to qualification Q2
- `readiness_level` — their answer to qualification Q3
- `lead_source` — "dm-keyword" / "comment-trigger" / "story-reply"

**Growth Tools to set up:**
- Instagram Post Comment Trigger: keyword "{{ctaKeyword}}" triggers the flow
- Instagram Story Reply Trigger: auto-respond to story replies with flow entry
- Reels Comment Trigger: same keyword on Reels

**Automation Rules:**
- If subscriber has tag "Applied" — stop all sequences
- If subscriber has tag "No-Response" after nurture — move to re-engagement list
- If subscriber taps "Not ready yet" — route to nurture, remove from sales sequence

### COPY PRINCIPLES
- DM messages are SHORT (1-3 sentences max)
- Use line breaks for readability on mobile
- Sound like a real person texting, not a marketing bot
- Never pretend the automation is the coach — position as "the team" or be transparent
- Emojis: 1-2 max per message, only if {{brandVoice}} supports it
- Quick reply buttons should feel natural, not forced
- Every message should provide value OR move toward a decision — never filler

### VOICE & TONE
{{brandVoice}} adapted for Instagram DM format.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}
```
