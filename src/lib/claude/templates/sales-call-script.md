# Generation Template: Sales Call Script (Word-for-Word Conversation)

## Template ID
`sales-call-script`

## What This Generates
A complete, word-for-word sales call script with 20+ sections and approximate timing. This is the phone or Zoom conversation that converts qualified prospects into paying clients. It follows John Whiting's discovery-to-close framework: build rapport, isolate the real problem, create doubt in the old approach, explore desire, present the solution, and handle objections.

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
  "offerName": "string",
  "pricePoint": "string",
  "commonObjections": "array",
  "testimonials": "array (optional)",
  "credentials": "string (optional)",
  "ctaType": "string",
  "brandVoice": "string"
}
```

## Context Dependencies
This template requires outputs from prior deliverables:
- `magnetic-messaging-statement` — Core messaging hook and positioning
- `belief-shift-map` — 6 Core Beliefs, Two Identities (Before/After), evidence bank, objection-to-belief map
- `emotional-trigger-map` — 12 emotional trigger categories for deep empathy during discovery
- `core-conversion-content` — Bulletproof Sales Script (3-phase solution, proof blocks, close structure)

## Framework References
- **AI Prompts PDF Prompt 29**: Complete sales call script with 20+ sections and objection handling
- **John Whiting Framework D1**: No-Call Close methodology — the content does the pre-selling; the call is for qualification and confirmation
- **John Whiting Framework D4**: Objection handling — every objection maps to a belief that needs shifting
- **John Whiting Framework D5**: Pre-Framing — set expectations early so the close feels natural

## Generation Prompt

```
You are writing a complete, word-for-word sales call script for a coaching business. This script is designed for a 45-60 minute phone or Zoom conversation with a qualified prospect who has already consumed content (lead magnet, emails, videos) and is considering the offer. The call follows a discovery-to-close framework — NOT a hard pitch.

IMPORTANT: Write this as MAIN LINES ONLY — the actual words the coach should say. Include timing, section labels, and brief notes on delivery, but the bulk should be speakable dialogue. This is a conversation guide, not a marketing document.

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
- **Offer:** {{offerName}} at {{pricePoint}}
{{#if programIncludes}}- **What's Included:** {{programIncludes}}{{/if}}
{{#if deliveryModel}}- **Delivery Model:** {{deliveryModel}}{{/if}}
{{#if guaranteeOrRisk}}- **Guarantee / Risk Reversal:** {{guaranteeOrRisk}}{{/if}}
{{#if salesApproach}}- **Sales Approach:** {{salesApproach}}{{/if}}
- **Common Objections:** {{commonObjections}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
{{#if credentials}}- **Credentials:** {{credentials}}{{/if}}
- **Brand Voice:** {{brandVoice}}
- **Objection Rebuttals:** {{objectionRebuttals}}
- **Program Phases:** {{programPhases}}
- **Case Studies:** {{caseStudies}}
{{#if clientExcuse}}- **Client Self-Limiting Story:** {{clientExcuse}}{{/if}}
{{#if clientRealProblem}}- **The Real Problem Underneath:** {{clientRealProblem}}{{/if}}
{{#if clientInactionConsequence}}- **3-Year Consequence of Inaction:** {{clientInactionConsequence}}{{/if}}
{{#if clientFalseProblem}}- **What They Think the Problem Is:** {{clientFalseProblem}}{{/if}}
{{#if doneForYou}}- **Done-For-You Services:** {{doneForYou}}{{/if}}
{{#if taughtSkills}}- **Skills Taught:** {{taughtSkills}}{{/if}}
{{#if clientCapacity}}- **Client Capacity:** {{clientCapacity}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. NICHE-SPECIFIC LANGUAGE ONLY: Discovery questions, objection handling, and pitch examples must use language and scenarios specific to {{niche}}. Do NOT use generic coaching questions like "what's holding you back?" Instead use niche-specific questions like "walk me through what happens when a new lead comes in — from first contact to close, what does that process look like right now?" (for coaches) or "when was the last time you took a full week off without checking your phone?" (for business owners). Every section of the script should feel like it was written for THIS specific audience.
9. BANNED CLICHES: Do NOT use these overused words in identity names, headlines, section headers, or key messaging: "prisoner," "captive," "trapped," "slave," "beggar," "grind/grinding," "hamster wheel," "treadmill," "rat race," "cage," "chains." Use niche-specific language instead.

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### THE SALES CALL SCRIPT

Write the complete script with these sections. Include the actual words to say, with [NOTES] in brackets for delivery guidance.

---

#### SECTION 1: INTRODUCTION & RAPPORT (0:00-0:01)
**Goal:** Break the ice, make them comfortable, establish you're a real person

Script the greeting:
- Warm, casual opening — first name basis
- Quick personal connection (reference something from their application or DMs if applicable)
- Set a friendly tone: "Before we dive in, how's your day going?"
- [NOTE: Keep this short — 60 seconds max. Don't spend 10 minutes on small talk.]

---

#### SECTION 2: FRAME SETTING (0:01-0:02)
**Goal:** Set expectations for the call so both parties know what's happening

Script the frame:
- "Here's how I like to do these calls..."
- Explain the structure: "I'll ask you some questions to understand where you are, then if I think I can help, I'll share what that looks like. If not, I'll point you in the right direction. Sound fair?"
- Remove pressure: "This isn't a pitch. I genuinely want to understand your situation first."
- Get agreement: "Cool. Let's start with..."

---

#### SECTION 3: PROBLEM ISOLATION (0:02-0:03)
**Goal:** Identify their #1 problem in their own words

Script the opening question:
- "So tell me — what's the biggest challenge you're facing with [relevant to {{niche}}] right now?"
- [NOTE: SHUT UP and listen. Let them talk. Don't interrupt. Don't solve yet.]
- Follow-up: "And how long has that been going on?"

---

#### SECTION 4: PROBLEM UNDERSTANDING — DEEP PROBING (0:03-0:11)
**Goal:** Go 10x deeper than the surface answer. Uncover the REAL pain.

Script a series of probing questions. Use these question types:

**Chunking Questions (quantify the problem):**
- "When you say [their words], what does that actually look like day-to-day?"
- "Can you give me a specific example from this past week?"
- "What's that costing you — in time? In money? In energy?"

**Consequence Questions (expand the pain):**
- "How is that affecting [their family/health/business/finances]?"
- "If nothing changes in the next 6-12 months, where does that leave you?"
- "What's the ripple effect of staying stuck here?"

**Feeling Questions (tap into emotion):**
- "How does that make you feel when you think about it?"
- "What's the worst part about this for you personally?"
- "Is there anyone else who's affected by this situation?"

[NOTE: This section is the MOST IMPORTANT part of the call. Spend 8-10 minutes here. The more pain you uncover, the easier the close. Use emotional triggers from the Emotional Trigger Map in the prior deliverable context to guide your probing.]

---

#### SECTION 5: DOUBT CREATION (0:11-0:12)
**Goal:** Make them question their current approach without being condescending

Script the doubt:
- "So you've been trying to [their current approach]... and how's that been working?"
- [NOTE: They'll usually laugh or say "obviously not great." That's the opening.]
- "Why do you think [current approach] hasn't worked so far?"
- "What do you think has been missing?"

---

#### SECTION 6: PAST SOLUTION ANALYSIS (0:12-0:15)
**Goal:** Understand what they've tried before and why it failed (inoculate against "I've tried this before")

Script the questions:
- "What else have you tried to solve this?"
- "What programs, coaches, or courses have you invested in?"
- "What worked? What didn't? Why?"
- "What's different about your situation now compared to when you tried those things?"

[NOTE: Listen for patterns — usually they've consumed information but lacked implementation support, accountability, or the right system. Reference this later in the pitch.]

---

#### SECTION 7: SUPPORT ASSESSMENT (0:15-0:17)
**Goal:** Identify their current support system (or lack thereof)

Script the questions:
- "Who's helping you with this right now?"
- "Do you have a coach, mentor, or community around this?"
- "How are you making decisions about [their challenge] — on your own or with guidance?"

[NOTE: Most will say they're figuring it out alone. This sets up Belief #6 (Help/Support) for the pitch.]

---

#### SECTION 8: DESIRE EXPLORATION (0:17-0:17)
**Goal:** Get them to paint their own Heaven Island — make the future feel real

Script the questions:
- "Okay, let's flip this. If we could wave a magic wand — what would your [business/life/health] look like 6-12 months from now?"
- "Walk me through your ideal day."
- "How would that feel compared to where you are now?"
- "Who would you become if this was handled?"

[NOTE: Let them dream out loud. Reference {{aspiringIdentity}} language from the belief-shift-map. The more vividly they describe their desired future, the more motivated they'll be to invest in getting there.]

---

#### SECTION 9: WHY NOW / COST OF INACTION (0:17-0:21)
**Goal:** Create urgency through the cost of staying stuck — not artificial pressure

Script the bridge:
- "Let me ask you something... You've been dealing with [their problem] for [timeframe they mentioned]. What has that already cost you?"
- "In terms of money? Time? Relationships? Your own wellbeing?"
- "And if nothing changes — if you're in this exact same spot 12 months from now — what does that look like?"
- "Is that acceptable to you?"

[NOTE: This should feel like a mirror, not a manipulation. You're reflecting back what they already know but haven't confronted.]

---

#### SECTION 10: CLARITY TIE-DOWN (0:21-0:23)
**Goal:** Summarize everything back to them — make them feel heard and confirm understanding

Script the summary:
- "Let me make sure I'm understanding you correctly..."
- Summarize their problem, what they've tried, what's not working, what they want, and what's at stake
- "Does that sound right? Did I miss anything?"

[NOTE: If they say "yes, exactly" — you've built enough trust for the transition. If they correct you, adjust and re-confirm.]

---

#### SECTION 11: DISCOVERY COMMITMENT (0:23-0:24)
**Goal:** Get permission to present the solution

Script the transition:
- "Based on everything you've shared, I actually think I can help. Would you like to hear how?"
- [NOTE: They will almost always say yes. If they say "sure" or "I guess," that's fine — enthusiasm comes during the pitch.]
- "Cool. Let me walk you through exactly what I'd do if we worked together."

---

#### SECTION 12: TRANSITION TO PITCH (0:24-0:26)
**Goal:** Bridge from their pain to your solution naturally

Script the bridge:
- "So here's what I've noticed from everything you've shared..."
- Identify the 1-2 root causes behind their problems (reference Core Beliefs from the belief-shift-map)
- "The reason [their old approach] hasn't worked is because it treats [symptom], not [root cause]."
- "What I've built addresses [root cause] directly. Here's how..."

---

#### SECTION 13: THE PITCH — 3-PHASE SOLUTION (0:26-0:35)
**Goal:** Present {{uniqueMechanism}} as the clear, structured path from their Hell Island to Heaven Island

Script the 3-phase walkthrough (pull from core-conversion-content):

**"Phase 1: [Phase 1 Name]"**
- What it is and what happens
- Why it matters (connects to their specific problem)
- The immediate outcome they'll experience
- "This addresses [specific issue they mentioned earlier]"

**"Phase 2: [Phase 2 Name]"**
- What builds on Phase 1
- The key shift that happens here
- "Remember when you said [reference their words from discovery]? This is where that changes."

**"Phase 3: [Phase 3 Name]"**
- The final piece that completes the transformation
- Paint the After picture using their own words from the Desire section
- "This is where you go from [Before Identity] to [After Identity]"

[NOTE: Throughout the pitch, reference THEIR specific words from the discovery. "You mentioned X — Phase 2 directly solves that." This makes it feel custom, not scripted.]

---

#### SECTION 14: TEMPERATURE CHECK (0:36-0:39)
**Goal:** Gauge their interest and address concerns before moving to close

Script the check:
- "So on a scale of 1 to 10, how does this feel so far?"
- If 7+: "What would make it a 10?" [Handle that specific concern]
- If 5-6: "What's holding you back?" [This is an objection — handle it]
- If below 5: "Sounds like this might not be the right fit, and that's totally okay. What specifically doesn't resonate?"

[NOTE: The temperature check reveals hidden objections. Don't skip it.]

---

#### SECTION 15: TRANSITION TO CLOSE (0:39-0:40)
**Goal:** Move from "does this make sense" to "here's how to get started"

Script the transition:
- "Great. So would you like to hear what it looks like to get started?"
- [NOTE: This is asking for permission to present the offer details — NOT the close itself.]

---

#### SECTION 16: DELIVERABLES & SUPPORT (0:40-0:41)
**Goal:** Explain exactly what they get and how the program is delivered

Script the details:
- Walk through what's included (coaching calls, community, templates, support channels)
- How the program is delivered (timeline, format, access)
- The support structure: "You'll never be stuck wondering what to do next"
- "Any questions about how it works?"

---

#### SECTION 17: INVESTMENT REVEAL (0:41-0:42)
**Goal:** Present the price confidently — don't hide it, don't apologize

Script the reveal:
- "The investment for {{offerName}} is {{pricePoint}}."
- [NOTE: State the price and STOP TALKING. Let them process. Do not fill the silence with justification.]
- If they need payment options: "We also offer [payment plan] if that works better for your situation."
- Value frame: "To put that in perspective — you mentioned [their specific cost of staying stuck]. This pays for itself when..."

---

#### SECTION 18: OBJECTION HANDLING

**Generate scripted responses for each of these common objections:**

**Objection: "I need to think about it"**
- "I totally understand. Can I ask — what specifically do you need to think about?"
- [NOTE: This reveals the REAL objection behind the stall. It's usually money or fear.]
- "In my experience, 'I need to think about it' usually means there's a specific concern I haven't addressed. What is it?"

**Objection: "I can't afford it"**
- "I hear you. Let me ask — is it that the money literally doesn't exist, or that you're not sure if it's worth the investment?"
- If literal: "Would the payment plan make this possible?"
- If value: "What would it be worth to you to go from [current state] to [desired state] in [timeframe]?"
- Reference Core Belief #4 (Money) from the belief-shift-map

**Objection: "I've tried coaching/programs before"**
- "What specifically didn't work?"
- [NOTE: Listen — they'll reveal what was missing. Your pitch should address that gap.]
- "That makes sense. The difference with {{uniqueMechanism}} is [specific differentiation]. What was missing before was [what they said]."

**Objection: "I need to talk to my [spouse/partner/business partner]"**
- "Absolutely — it's important to be aligned. What specifically do you think they'd want to know?"
- "Would it help if I [sent them the details / jumped on a quick call with both of you]?"

**Also generate objection responses for each item in {{commonObjections}}, using the Objection-to-Belief map from the belief-shift-map context.**

---

#### SECTION 19: THE CLOSE (0:42+)
**Goal:** Secure the commitment

Script the close:
- If ready: "Awesome. Let me get you set up right now. I'll [send the link / take your details / walk you through the onboarding]."
- If needs time: "No pressure at all. I'll send you a summary of everything we discussed. When's a good time to follow up — tomorrow or the day after?"
- If no: "I respect that. If anything changes, you know where to find me. In the meantime, [offer free resource or next step]."

[NOTE: Never beg, negotiate on price, or create fake urgency. "I don't chase. You jump, I jump."]

---

#### SECTION 20: POST-CALL SUMMARY
**Goal:** Quick reference card for follow-up

Generate a template for the coach to fill in after the call:
- Prospect name:
- Key problem identified:
- What resonated most:
- Objections raised:
- Outcome (closed / follow-up / not a fit):
- Follow-up date:
- Notes:

---

### SCRIPT PRINCIPLES
- Write MAIN LINES only — the words the coach actually says
- Keep it conversational — this is a dialogue, not a monologue
- Include [DELIVERY NOTES] for pacing, pauses, and emphasis
- The discovery section (Sections 3-10) should take 50% of the call
- The pitch (Sections 12-17) should take 25%
- Objection handling and close should take 25%
- Reference the prospect's own words throughout — "You mentioned earlier that..."
- Never be pushy — "I don't chase. You jump, I jump."

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} This should sound like a smart, caring professional having a real conversation — not a telemarketer reading a script. Be direct without being aggressive. Be empathetic without being soft.

### OUTPUT FORMAT
Label each section clearly with the section number, title, and approximate timing. Write the actual dialogue the coach should say. Include [NOTES] for delivery guidance. End with the post-call summary template.
```

## Post-Processing
1. Verify all 20 sections are present and complete
2. Check that the script includes responses for ALL provided commonObjections
3. Verify the 3-phase pitch matches the structure from core-conversion-content
4. Ensure the discovery section is the longest part (~50% of script)
5. Check that the script references emotional triggers and belief shifts from prior deliverables
6. This deliverable is terminal — no other templates depend on it
