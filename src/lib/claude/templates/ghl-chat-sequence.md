# Generation Template: GHL Chat/SMS Sequence

## Template ID
`ghl-chat-sequence`

## What This Generates
An automated chat/SMS follow-up sequence for GoHighLevel (GHL). Includes DM keyword trigger flow, qualification questions, offer delivery, and follow-up messages. Output is structured and copy-paste-friendly with clear trigger conditions, time delays, tags, and conditional branching at every step.

## Client Inputs Required
```json
{
  "clientName": "string",
  "businessName": "string",
  "offerName": "string",
  "pricePoint": "string",
  "targetAudience": "string",
  "transformation": "string",
  "ctaKeyword": "string — the DM trigger word (e.g., 'READY', 'COACHING')",
  "qualificationQuestions": "(AI-generated from niche, targetAudience, and pricePoint)",
  "minimumRequirements": "(AI-derived from targetAudience and pricePoint)",
  "offerDetailsUrl": "string — link to offer page or PDF (optional)",
  "applicationUrl": "string — link to application form (optional)",
  "platformType": "string — 'instagram-dm' | 'sms' | 'website-chat'",
  "brandVoice": "string",
  "unwantedFeelings": "array — feelings the target audience wants to escape (from belief-shift map)",
  "desiredFeelings": "array — feelings the target audience wants to experience",
  "aspiringIdentity": "string — the identity the target audience wants to become"
}
```

## Context Dependencies
This template uses outputs from the **belief-shift-map** deliverable. The `{{BELIEF_FRAMEWORK_CONTEXT}}` placeholder injects the client's 6 Core Beliefs, Money Messaging Statement, Hell Island / Heaven Island descriptions, and Undesired Identity / Aspiring Identity.

## Framework References (John Whiting)
- **F1: ManyChat Automation** — John's DM flow: keyword trigger -> qualification questions -> weed out non-fits -> send offer details -> application. No human until qualified application received.
- **F2: Pipeline Stages** — Lead -> Customer -> DM -> Qualified -> App -> Client. Chat sequence maps to DM -> Qualified -> App stages.
- **B1: Self-Closing System** — The automation handles qualification. The human handles relationship. Never use AI pretending to be the coach.
- **D3: Follow-Up Approach** — "I don't chase." Follow-up is warm, not aggressive. Personal voice notes when possible.
- **B3: Application Funnel** — Qualification questions weed out non-fits. Must qualify for niche, stage of business, budget readiness.

## Generation Prompt

```
You are writing a GHL (GoHighLevel) chat/SMS automation sequence for a coaching business. This replaces manual sales conversations with a structured qualification and offer delivery flow.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Offer:** {{offerName}} at {{pricePoint}}
- **Target Audience:** {{targetAudience}}
- **Transformation:** {{transformation}}
- **DM Keyword:** {{ctaKeyword}}
- **Qualification Questions:** (Generate 3-5 smart qualification questions based on the niche, target audience, and price point. Ask about their current situation, experience level, readiness to invest, and commitment level. These filter out non-fits before a sales call.)
- **Minimum Requirements:** {{#if minimumRequirements}}{{minimumRequirements}}{{else}}(Infer minimum requirements from the target audience and price point. Consider: minimum revenue/income, experience level, time commitment, and mindset readiness.){{/if}}
- **Offer Details URL:** {{offerDetailsUrl}}
- **Application URL:** {{applicationUrl}}
- **Platform:** {{platformType}}
- **Brand Voice:** {{brandVoice}}
{{#if salesApproach}}- **Sales Approach:** {{salesApproach}}{{/if}}
- **Unwanted Feelings:** {{unwantedFeelings}}
- **Desired Feelings:** {{desiredFeelings}}
- **Aspiring Identity:** {{aspiringIdentity}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. BANNED CLICHES: Do NOT use these overused words in identity names, headlines, section headers, or key messaging: "prisoner," "captive," "trapped," "slave," "beggar," "grind/grinding," "hamster wheel," "treadmill," "rat race," "cage," "chains." Use niche-specific language instead.

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

---

### OUTPUT FORMAT

Structure the output so each message is a standalone block that can be directly copied into GHL's workflow builder. Use this exact format for every message step:

---
#### STEP [#]: [Step Name]

**Trigger Condition:**
> [Exactly what causes this step to fire — e.g., "Contact replies with keyword 'READY'", "Previous step completed + 24 hour wait", "Contact replies YES to qualification Q2"]

**Time Delay:** [None / Wait X minutes / Wait X hours / Wait X days]

**Condition Check (If/Then):**
> - IF [condition A]: → Go to Step [X]
> - IF [condition B]: → Go to Step [Y]
> - IF no response after [timeframe]: → Go to Step [Z]

**Tags to Apply:** [+Add: tag-name] | [-Remove: tag-name]
**Pipeline Stage:** [Move to: stage-name] (if applicable)

**Message Content (copy-paste ready):**
```
[Exact message text — paste directly into GHL message action]
```

**Next Step:** [Step name + number] | **End:** [if sequence ends here]
---

---

### TRIGGER CONDITIONS SECTION

Before the message sequence, generate a summary of all triggers needed in GHL:

**Workflow Trigger:** Inbound message contains keyword "{{ctaKeyword}}"
**Channel:** {{platformType}}
**Enrollment Rules:**
- Allow re-enrollment: No
- Skip if contact is already in workflow: Yes
- Skip if contact has tag "Applied" or "Client": Yes

---

### SEQUENCE FLOW

**Step 1: Keyword Trigger Response** (Instant)
- Acknowledge their message warmly
- Use Money Messaging language from the Belief-Shift Map — mirror the language of the transformation they're seeking
- "Hey! Thanks for reaching out. Before I share the details, I want to make sure this is actually the right fit for you."
- Transition to first qualification question
- Tone: friendly, human, NOT salesy
- **Tags:** +DM-Lead
- **Pipeline:** Move to "DM Received"
- **Condition:** IF no response after 2 hours → send a gentle nudge ("Hey, just checking — did you still want to learn about {{offerName}}?")

**Step 2: Qualification Question 1** (Instant after reply)
- Ask first {{qualificationQuestions}} question
- Keep message SHORT (1-3 sentences — this is chat, not email)
- **Condition:**
  - IF reply indicates disqualification → Go to Disqualification Step
  - IF reply is valid → Go to Step 3
  - IF no response after 24 hours → Send reminder: "No rush — just wanted to follow up on my question. Still interested?"

**Step 3: Qualification Question 2** (Instant after reply)
- Acknowledge their answer briefly before asking the next question
- Ask second {{qualificationQuestions}} question
- **Condition:**
  - IF reply indicates disqualification → Go to Disqualification Step
  - IF reply is valid → Go to Step 4
  - IF no response after 24 hours → Send reminder

**Step 4: Qualification Question 3** (Instant after reply)
- Acknowledge briefly, ask final qualification question
- This is the investment/commitment qualifier
- **Condition:**
  - IF qualified (all answers pass) → Go to Step 5 + Tag: +Qualified
  - IF disqualified → Go to Disqualification Step + Tag: +Disqualified
  - IF no response after 24 hours → Send reminder

**Step 5: Qualified — Offer Details** (Instant after passing qualification)
- "Awesome — sounds like this could be a great fit. Let me share the details."
- Send {{offerDetailsUrl}} or describe the offer in 3-5 bullet points
- Include {{pricePoint}} openly — no hiding
- "Take a look and let me know if you have any questions."
- **Tags:** +Qualified, +Offer-Sent
- **Pipeline:** Move to "Qualified"
- **Condition:**
  - IF reply is positive/interested → Go to Step 6
  - IF reply is "not sure" / objection → Go to Objection Handler Step
  - IF no response after 1 hour → Go to Step 6 automatically

**Step 6: Application Invite** (30 min - 1 hour after Step 5)
- "If what you saw resonates, the next step is to fill out a quick application."
- Send {{applicationUrl}}
- Frame as selective: "I review every application personally to make sure it's a mutual fit."
- NOT "hurry up and apply" — calm, confident
- **Tags:** +Application-Sent
- **Pipeline:** Move to "Application Sent"
- **Condition:**
  - IF contact submits application → Tag: +Applied, Pipeline: "Applied", End sequence
  - IF no response after 24 hours → Go to Step 7

**Step 7: Follow-Up #1 — Core Belief Nurture** (24 hours if no application)
- Check in casually while addressing ONE Core Belief from the Belief-Shift Map
- Share a quick insight that shifts that belief — keep it to 2-3 sentences max
- "Hey — just checking if you had a chance to look at the details. Also, something I see a lot with [target audience]: [old belief]. The truth is [new belief]. Any questions I can answer?"
- NO pressure
- **Tags:** +Follow-Up-Needed
- **Condition:**
  - IF reply is positive → Redirect to Step 6 (Application Invite)
  - IF reply is negative/not interested → Tag: +Closed-Lost, End sequence
  - IF no response after 48 hours → Go to Step 8

**Step 8: Follow-Up #2 — Second Core Belief** (48 hours if still no response)
- Value-add follow-up addressing a DIFFERENT Core Belief
- Share a piece of content, tip, or insight that shifts this belief
- "By the way, I thought this might help with [their qualification answer topic]: [content link]"
- Soft remind: "The application is still open whenever you're ready."
- **Condition:**
  - IF reply is positive → Redirect to Step 6
  - IF no response after 5 days → Go to Step 9

**Step 9: Final Follow-Up — Aspiring Identity** (5-7 days after last message)
- Paint the Aspiring Identity vision: "I work with people who are becoming {{aspiringIdentity}} — and I could tell from your answers that's where you're headed."
- Tie it to {{desiredFeelings}} — what their life looks and feels like on the other side
- "If now isn't the right time, totally understand. The door's open whenever you're ready."
- Per John: "I don't chase." This is the last message.
- **Tags:** +Sequence-Complete, -Follow-Up-Needed
- **Pipeline:** Move to "Nurture" (for future campaigns)
- **End of sequence.**

---

### DISQUALIFICATION STEP

**Step DQ: Polite Redirect**

**Trigger Condition:** Contact's qualification answers don't meet {{minimumRequirements}}

**Message Content:**
- Acknowledge their interest warmly
- Use Undesired Identity language to frame the "not yet" — "This program is for people who are done feeling {{unwantedFeelings}} and ready to make a real change. If you're not quite there yet, that's okay."
- Explain why it's not the right fit YET (position as "not yet" not "never")
- Offer a free resource or lower-tier recommendation
- "When you're at [requirement level], I'd love to chat."
- **Tags:** +Disqualified, +Free-Resource-Sent
- **Pipeline:** Move to "Nurture"
- **End of sequence.**

---

### OBJECTION HANDLER STEP

**Step OBJ: Address Objections**

**Trigger Condition:** Contact replies with hesitation, questions, or objections after receiving offer details

**Message Content:**
- Acknowledge their concern: "Totally fair question."
- Address the specific objection with a Core Belief shift from the Belief-Shift Map
- If price objection: reframe investment vs. cost using {{transformation}} value
- If time objection: address with realistic expectations
- If trust objection: share social proof or offer a no-risk next step
- Always end with: "Happy to answer any other questions. No pressure either way."
- **Condition:**
  - IF reply is positive → Go to Step 6 (Application Invite)
  - IF reply is still hesitant → "Totally understand. I'll leave the link here — {{applicationUrl}} — whenever you're ready."
  - **Tags:** +Objection-Handled

---

### GHL WORKFLOW CONFIGURATION SUMMARY

**Tags to create in GHL:**
| Tag Name | Applied When |
|---|---|
| `DM-Lead` | Contact triggers keyword |
| `Qualified` | Passes all qualification questions |
| `Disqualified` | Fails qualification criteria |
| `Offer-Sent` | Offer details delivered |
| `Application-Sent` | Application link sent |
| `Applied` | Contact submits application |
| `Follow-Up-Needed` | No response to offer/application |
| `Sequence-Complete` | Finished all follow-ups |
| `Closed-Lost` | Contact explicitly declines |
| `Objection-Handled` | Responded to an objection |
| `Free-Resource-Sent` | Disqualified but sent free resource |

**Pipeline Stages to create:**
1. DM Received
2. Qualifying
3. Qualified
4. Offer Sent
5. Application Sent
6. Applied
7. Nurture
8. Closed-Lost

**Workflow Settings:**
- Workflow name: "{{offerName}} — DM Qualification Flow"
- Trigger: Inbound message contains "{{ctaKeyword}}"
- Channel: {{platformType}}
- Allow re-enrollment: No
- Contact enrolled filter: Skip if tag = "Applied" or "Client"

### COPY PRINCIPLES
- Chat messages are SHORT (1-3 sentences)
- Use line breaks for readability
- Sound like a real person texting, not a marketing email
- Never pretend the automation is the coach — it can be positioned as "the team" or just be clearly automated
- Emojis: 1-2 max per message, only if brand voice supports it

### VOICE & TONE
{{brandVoice}} adapted for chat format.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}
```
