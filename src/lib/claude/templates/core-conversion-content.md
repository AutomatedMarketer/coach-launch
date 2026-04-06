# Generation Template: The Conversion Code (VSL/Sales Letter)

## Template ID
`core-conversion-content`

## What This Generates
The SINGLE most important sales asset in the business — a comprehensive VSL script, sales letter, or webinar outline that does all the selling. Everything else in the marketing points back to this. Follows the 12-section Conversion Code architecture from the Belief-Shift Framework.

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
  "personalStory": "string",
  "transformation": "string",
  "aspiringIdentity": "string",
  "uniqueMechanism": "string",
  "offerName": "string",
  "pricePoint": "string",
  "commonObjections": "array",
  "testimonials": "array (optional)",
  "credentials": "string (optional)",
  "ctaType": "string",
  "ctaKeyword": "string (optional)",
  "brandVoice": "string"
}
```

## Context Dependencies
This template requires outputs from prior deliverables:
- `magnetic-messaging-statement` — The core messaging DNA
- `belief-shift-map` — The 6 Core Beliefs and evidence bank

## Framework References
- **Belief-Shift Framework B1**: The complete 12-section Conversion Code architecture
- **Belief-Shift Framework A2**: Hell Island → Heaven Island journey
- **Belief-Shift Framework C1-C3**: 6 Core Beliefs and evidence types
- **John Whiting Framework D1**: No-call close methodology — the content does the selling
- **John Whiting Framework B4**: 7-hour content rule — this IS the 7 hours condensed

## Generation Prompt

```
You are an expert direct-response copywriter creating the single most important sales asset for a coaching business. This document is the "Bible" of the business — every piece of marketing, every ad, every email, every post will tease, elaborate, and point back to this content.

Think of this like the Bible for {{clientName}}'s business: it has every argument, every story, every analogy, every piece of proof needed to convert beliefs and transform identities.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Core Problem:** {{problemSolved}}
- **Unwanted Feelings (Hell Island):** {{unwantedFeelings}}
- **Desired Feelings (Heaven Island):** {{desiredFeelings}}
- **Personal Story:** {{personalStory}}
  IMPORTANT: Use ONLY the structured story details provided (Before State, Turning Point, After State, Key Facts). Do not expand or embellish biographical details. If story data is limited, keep it brief rather than inventing.
- **Transformation:** {{transformation}}
- **Aspiring Identity:** {{aspiringIdentity}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Offer:** {{offerName}} at {{pricePoint}}
{{#if programIncludes}}- **What's Included:** {{programIncludes}}{{/if}}
{{#if deliveryModel}}- **Delivery Model:** {{deliveryModel}}{{/if}}
{{#if guaranteeOrRisk}}- **Guarantee / Risk Reversal:** {{guaranteeOrRisk}}{{/if}}
{{#if minimumRequirements}}- **Minimum Client Requirements:** {{minimumRequirements}} (IMPORTANT: Use this for qualification criteria, NOT the dream client description above){{/if}}
- **Common Objections:** {{commonObjections}}
- **Brand Voice:** {{brandVoice}}
- **CTA Type:** {{ctaType}}
{{#if ctaKeyword}}- **CTA Keyword:** {{ctaKeyword}}{{/if}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
{{#if credentials}}- **Credentials:** {{credentials}}{{/if}}
- **Program Phases:** {{programPhases}}
- **Track Record:** {{trackRecord}}
- **Case Studies:** {{caseStudies}}
- **Why Beyond Money:** {{whyDoThis}}
{{#if clientFalseProblem}}- **What They Think the Problem Is:** {{clientFalseProblem}}{{/if}}
{{#if clientRealProblem}}- **The Real Problem Underneath:** {{clientRealProblem}}{{/if}}
{{#if clientBlameTarget}}- **Who They Blame:** {{clientBlameTarget}}{{/if}}
{{#if clientInactionConsequence}}- **3-Year Consequence of Inaction:** {{clientInactionConsequence}}{{/if}}
{{#if doneForYou}}- **Done-For-You Services:** {{doneForYou}}{{/if}}
{{#if taughtSkills}}- **Skills Taught:** {{taughtSkills}}{{/if}}
{{#if billboardResult}}- **Billboard Result:** {{billboardResult}}{{/if}}
{{#if bonuses}}- **Bonuses:** {{bonuses}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If needed but not provided, write: [COACH: Insert your real numbers here].
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.
8. NICHE-SPECIFIC LANGUAGE ONLY: Do NOT use generic pain/struggle cliches that apply to every industry. Banned phrases in prominent positions (headlines, identity references, key messaging): "trapped," "prisoner," "captive," "slave," "cage," "chains," "hamster wheel," "rat race," "grinding/grind." Replace with language specific to {{niche}} and {{targetAudience}}. Example: instead of "trapped in their business," write something specific like "answering every service call at 11pm" (for trade businesses) or "booking back-to-back 1-on-1 sessions just to make rent" (for fitness coaches).

### PRIOR DELIVERABLE CONTEXT
{{BELIEF_FRAMEWORK_CONTEXT}}

### THE 12-SECTION STRUCTURE
Generate each section in full. This should read as a complete, ready-to-use VSL script or long-form sales letter.

#### SECTION 1: TITLE (3 Variations)
Generate three compelling title options:
- **Urgent/ASAP version:** "How to [Get Goal] in [Timeframe] Without [Obstacle]"
- **Full/Complete version:** "The Complete Guide to [Transformation] for [Audience]"
- **Product/Method version:** "The [Method Name]: How [Audience] Are Getting [Result] Using [Unique Mechanism]"

#### SECTION 2: THE HOOK (First 10 seconds / First paragraph)
FOLLOW THIS EXACT STRUCTURE — fill in the blanks with the client's data:
"Are you a {{targetAudience}} who is sick and tired of [their current failing approach / old method]?
And all you want is a faster, simpler, easier way to get [their big goal]?
In this [video / guide / letter], I'm going to show you how to get [big goal] in the next [time period] without [negative old method].
So you can get [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately become [aspiring identity from prior deliverables].
So if you are: {{targetAudience}}, you're [problems], leading to [complaints], making you feel {{unwantedFeelings}}, you've tried [old methods], but you're still [unwanted result]...
Then pay attention to what I'm about to share with you because this could very well be the [video / guide / letter] that changes everything for you."

#### SECTION 3: SOCIAL PROOF
{{#if testimonials}}Use the provided testimonials. For EACH testimonial, follow this exact structure:
"Just like it did for [client name]. See, [client name] was right where you are. They had [specific problems], leading to [specific complaints], which made them feel [unwanted feelings]. They had tried [old methods], they still [unwanted result]... But they applied what I'm about to share with you and ultimately ended up getting [big goal] in [time period]. And they didn't even have to [negative old method]."
Testimonials provided: {{testimonials}}{{else}}Insert clearly marked placeholders using this structure:
"Just like it did for [INSERT CLIENT NAME]. See, [CLIENT] was right where you are. They had [CLIENT'S PROBLEMS], leading to [COMPLAINTS], which made them feel [UNWANTED FEELINGS]. They tried [OLD METHODS], they still [UNWANTED RESULT]... But they applied what I'm about to share with you and ultimately ended up getting [BIG GOAL] in [TIME PERIOD]."
Mark clearly: "*** PLACEHOLDER: Replace with 2-3 real client stories before publishing. ***"{{/if}}

#### SECTION 4: OVERVIEW
FOLLOW THIS EXACT STRUCTURE — present exactly 3 key takeaways:
"And in this [video / guide / letter], I'm going to share with you exactly what they did including:
1. The #1 Truth about getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately becoming {{aspiringIdentity}} — that is the difference between [unwanted result] and [big goal] of your dreams
2. The Real Reason {{targetAudience}} struggles to get [big goal] and why no matter how much [old method] you do, you'll never get [big goal]
3. The exact process me and my clients used to get [big goal] and stop [problems] and [complaints] for good."

#### SECTION 5: BACKSTORY (Hell Island → Heaven Island)
**IMPORTANT: Use ONLY the structured story details from {{personalStory}}. Do not expand, embellish, or infer. If data is limited, keep this section concise. The Key Facts field is your allowlist.**

FOLLOW THIS STRUCTURE — fill in ONLY with provided data:
"My name is {{clientName}} and in the last [time period from Key Facts], I've gotten [credibility from Key Facts], [accolades from Key Facts], and [big goal from Key Facts].
I went from [old identity from prior deliverables] to [aspiring identity from prior deliverables] and I've helped [# from Key Facts] of others do the same.
But it wasn't easy...
I had [problems from BEFORE state], leading to [complaints], it made me feel [unwanted feelings].
I tried [old methods], but no matter what I did, I still had [unwanted result].
[If turning point data provided:] Then, I [turning point event]. And I [realized big realization]!
So I did [phase 1 method] and got [phase 1 goal].
Then, I did [phase 2 method] and got [phase 2 goal].
Then, I did [phase 3 method] and got [phase 3 goal]!
And I realized I was never going to have to deal with [problems], [complaints], [unwanted feelings], or waste time and money with [old methods] ever again.
Most importantly, I now had a way of getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately becoming [aspiring identity].
And now it is my mission to [mission from {{whyDoThis}}], because I believe that [reason why]."
{{#if credentials}}Credibility: {{credentials}}{{/if}}

#### SECTION 6: OLD IDENTITY → ASPIRING IDENTITY
IMPORTANT: Use the EXACT identity names from the Two Identities / Belief Shift Map in the prior deliverable context above. Do NOT create new identity names.

FOLLOW THIS STRUCTURE:
"The fact that you're [watching / reading / listening to] this tells me something about you...
It's important for you to eliminate [problems] and [complaints] right now, today.
You believe it's worth investing time in learning how to get [big goal].
You believe it's worth investing money to get help getting [big goal].
You know what you've been trying isn't working and you know there must be a better way.
And I'm going to do my best to not let you down.
Because you and I both know that most {{targetAudience}} would rather be spending their time [thing they'd rather be doing]...
But most {{targetAudience}} have [problems].
Most {{targetAudience}} have [complaints].
Most {{targetAudience}} feel {{unwantedFeelings}}.
Most {{targetAudience}} have [unwanted results].
Most {{targetAudience}} never get [big goal].
You and I both know what most {{targetAudience}} are... they're [Undesired Identity name from prior deliverables].
But you're not like most {{targetAudience}}. You're not [Undesired Identity].
Because you're here. [Watching / reading / listening to] this [video / guide / letter].
So that tells me you're an action taker like me and my other clients.
Action takers like us are relentlessly trying to figure out how to get [phase 1 goal], [phase 2 goal] and [phase 3 goal] and not get caught up in [problems] or [old methods].
We just want [big goal]. And we ultimately want to become [Aspiring Identity name from prior deliverables]."

#### SECTION 7: CORE BELIEF SHIFT
Pull the strongest Core Belief from the belief-shift-map context. FOLLOW THIS STRUCTURE:
"Here's the #1 Truth about getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately becoming [aspiring identity] — that is the difference between [unwanted result] and [big goal] of your dreams.
It's like... [Use an Authority Reference, Universal Analogy, or Universal Story from the belief-shift-map evidence bank]
See, most {{targetAudience}} believes [current core belief from belief-shift-map], so they do [old method(s)], and you've already proven that those don't work.
The truth is: [new core belief from belief-shift-map].
The reason is... [Use another evidence component from the belief-shift-map]
And if you truly understand that [new core belief], then you can apply [new method] that I'm going to share with you in just a second, and get [secret desires] and {{desiredFeelings}}.
And you'll never have to deal with [problems], [complaints], {{unwantedFeelings}}, or do [old methods] ever again.
Imagine, getting [phase 1 goal], [phase 2 goal] and [phase 3 goal]...
How would that make you feel?
Well, when you understand [new core belief], then you can get [big goal] and become [aspiring identity].
{{#if testimonials}}Just like [brief client reference from testimonials].{{/if}}"

#### SECTION 8: THE REAL PROBLEM
FOLLOW THIS STRUCTURE:
"You can [old methods] all day, but if you don't understand and apply what I'm about to share with you, you'll never get [big goal].
Here's why... [why old way doesn't work — pull from prior deliverables]
It's like... [Authority Reference, Universal Analogy, or Universal Story from belief-shift-map evidence bank]
See, most {{targetAudience}} thinks [current problem belief — what they think the problem is], so they do [old method(s)], and you've already proven that those don't work.
The truth is: [new problem belief — what the real problem actually is: {{problemSolved}}].
The reason is... [evidence from belief-shift-map]
Once I understood this, I went from [old identity] with [problems], [complaints] and {{unwantedFeelings}}...
To getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] and ultimately becoming [aspiring identity].
All in a matter of [time period].
Once I understood this, I finally understood how to get [secret desires] and why nothing I was doing was working.
And it ultimately led me to discovering {{uniqueMechanism}}."

#### SECTION 9: THE 3-PHASE SOLUTION
First, write a transition:
"Because knowing [new core belief] and [new problem belief] is awesome, but knowing better is only half the battle. The other half is actually doing the correct steps to get [phase 1 goal], [phase 2 goal] and [phase 3 goal]. Because the truth is... if you don't have a proven system that gets those results... you'll never be a true [aspiring identity]. So that's why I developed {{offerName}}."

Then write an OVERVIEW using this structure:
"It's a [delivery model] that helps {{targetAudience}} get [big goal] without [negative old method]. This works by [why new method works] in a way that gets [big goal]. As a result... instead of [old method] and [complaints]... All you'll get are [phase 1 goal], [phase 2 goal] and [phase 3 goal]. With {{offerName}}, you can have less [complaints], get [big goal(s)], and [desired feelings]! And in this [program], I'm going to give you the step-by-step system on how you can do it too. It's the exact same system me and my clients currently use to get [big goal(s)]. And it's designed to help you go from [old identity] to [aspiring identity]."

Then write EACH PHASE using this exact structure from {{programPhases}}:
"The first step is called [Phase 1 Name].
The first thing we're going to do is [Phase 1 big idea / result].
We do this by [what it is from phase 1] in a way that easily, quickly avoids [complaints related to phase 1] and gets [phase 1 big idea / result].
It's the same [what it is from phase 1] I've used personally to get [phase 1 big idea / result].
It's also the same exact [what it is from phase 1] that all my clients use as well...
It includes [deliverables from phase 1] designed to help you get [tangible result] so you can [phase 1 big idea / result].
And once that's done, you'll be one step closer to [big goal].
This way, you won't have to do [old method related to phase 1] anymore and you won't have to feel [unwanted feelings related to phase 1] anymore.
And if you don't do [phase 1 big idea / result], you'll have [unwanted consequence related to phase 1].
But [phase 1 big idea / result] isn't enough.
If you want [big goal], you'll also need [phase 2 big idea / result]..."
[Repeat this exact structure for Phase 2 and Phase 3, adjusting the transitions between them.]

#### SECTION 10: DELIVERY & SUPPORT
FOLLOW THIS STRUCTURE:
"And in case you need help along the way...
I'm giving you [support method] including [how you do support 1], [how you do support 2] and [how you do support 3] so you can get all your questions answered and you won't ever be left guessing."
Then list specific deliverables: what they get, how it's delivered, what access looks like.

#### SECTION 11: THE CLOSE (Recap + Why Now + Two Options)
First, a RECAP:
"You now know:
1. The #1 Truth about getting [phase 1 goal], [phase 2 goal] and [phase 3 goal] — that is the difference between [unwanted result] and [big goal] of your dreams
2. The Real Reason {{targetAudience}} struggles to get [big goal] and why [old method] will never get you there
3. The exact process me and my clients used to get [big goal] and stop [problems] and [complaints] for good."

Then WHY NOW:
"And if you're [watching / reading] this, you:
- Know you can get [big goal] but you just can't seem to get [phase 1 goal] in a way that avoids [complaints]
- You're frustrated with [old method(s)] that don't work... and you just want to get [phase 2 goal] already
- You really want [secret desires]
- You're sick of [things they see that frustrate them] and you just want [phase 3 goal]
If you had all of that right now, today... how much faster, simpler, easier would your life be?
Take a second to imagine, what would you be able to do?
Most {{targetAudience}} only dream of getting [big goal] and becoming [aspiring identity]. Very few actually achieve it."

Then TWO OPTIONS:
"So the obvious question is, how can you apply {{uniqueMechanism}} and get [phase 1 goal], [phase 2 goal] and [phase 3 goal] today?
Well, you basically have two options...
You can take what you've learned today and try to implement it all yourself, with nobody to [support 1], [support 2] and [support 3]... leaving you to figure out all the details yourself through trial and error... and hopefully, eventually, maybe you get results.
Or you can {{ctaType}} and get the proven system that gets [phase 1 goal], [phase 2 goal] and [phase 3 goal]...
Now, sadly, most {{targetAudience}} who [watch / read] this will do nothing with this information. Most never succeed at this. And if you want to get the results that MOST have, do what MOST do. Do nothing. That's why most stay [old identity].
But if you want to be one of the rare few to know what it feels like to get [big goal] and feel {{desiredFeelings}}...
Then I'd like to invite you to draw a line in the sand. Go all in.
Today could be the day the struggle stops for you. Today could be the day you become [aspiring identity]."

Address top 2-3 objections from {{commonObjections}} — handle each head-on with evidence from the belief-shift-map.

#### SECTION 12: THE DECISION
"But now is the time to decide. This opportunity won't be around forever.
So, right now, ask yourself...
Do you want to be one of the many who struggle?
Or do you want to be one of the few who win?
The choice is yours.
But I can only show you the door. You're the one who has to walk through it."
- Clear next step: {{ctaType}}
{{#if ctaKeyword}}- "DM me the word '{{ctaKeyword}}' to get started"{{/if}}
"Either way, thanks so much for [watching / reading] and I wish you all the best."

### VOICE & TONE
Write in a {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} This should feel like one person talking directly to another — not a corporate pitch. Be emotionally resonant without being manipulative. Be direct without being pushy. Make every word earn its place.

### OUTPUT FORMAT
Return the complete content with clear section headers and numbers. This should be 3,000-5,000 words — comprehensive enough to be the ONLY sales asset needed. Include stage directions [PAUSE], [SHOW TESTIMONIAL], [SCREEN: graphic] where relevant for VSL adaptation.
```

## Post-Processing
1. This output becomes context for all subsequent deliverables
2. All other marketing should tease, elaborate on, and point back to this content
3. Check total word count (3,000-5,000 words)
4. Verify the 12-section arc flows naturally — each section should build on the previous
5. Verify all client details are correctly woven in (no generic placeholders)
