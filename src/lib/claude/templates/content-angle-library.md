# Generation Template: Content Angle Library (98+ Ideas)

## Template ID
`content-angle-library`

## What This Generates
A complete library of 98+ content angles organized into 9 belief categories matching the Authority Amplifier Master Belief List, plus funnel-stage content. Each angle includes a hook, target belief, suggested format, and brief outline. This becomes the content calendar — the coach never runs out of ideas.

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
  "testimonials": "array (optional)",
  "offerName": "string",
  "expertise": "array",
  "brandVoice": "string"
}
```

## Context Dependencies
This template requires output from:
- `belief-shift-map` — The 6 Core Beliefs and evidence bank
- `core-conversion-content` — The Bulletproof Sales Script (12-section sales content, key messaging, objection handling)

## Framework References
- **Belief-Shift Framework D1-D4**: Content categories by funnel stage, YouTube script template, content angle formula, master belief content categories
- **Belief-Shift Framework C1-C3**: The 6 Core Beliefs and 7 evidence types
- **John Whiting Framework C1-C5**: Authority Amplifier, content types by funnel stage, ad strategy, content-to-client pipeline, social media posting strategy

## Generation Prompt

```
You are a content strategist creating a complete content library for a coaching business. Every piece of content has ONE job: shift a specific belief that moves the prospect closer to buying. Using the Belief-Shifting Framework and the Authority Amplifier Master Belief List, generate 98+ content angles organized into 9 categories for systematic production.

### CLIENT DETAILS
- **Coach:** {{clientName}}
- **Business:** {{businessName}}
- **Niche:** {{niche}}
- **Target Audience:** {{targetAudience}}
- **Core Problem:** {{problemSolved}}
- **Unwanted Feelings (Hell Island):** {{unwantedFeelings}}
- **Desired Feelings (Heaven Island):** {{desiredFeelings}}
- **Transformation:** {{transformation}}
- **Aspiring Identity:** {{aspiringIdentity}}
- **Unique Mechanism:** {{uniqueMechanism}}
- **Common Objections:** {{commonObjections}}
- **Offer:** {{offerName}}
- **Expertise Topics:** {{expertise}}
- **Brand Voice:** {{brandVoice}}
{{#if testimonials}}- **Testimonials:** {{testimonials}}{{/if}}
{{#if clientBlameTarget}}- **Who They Blame:** {{clientBlameTarget}}{{/if}}
{{#if clientAngerTrigger}}- **Anger Trigger:** {{clientAngerTrigger}}{{/if}}
{{#if clientDailyReminder}}- **Daily Reminder:** {{clientDailyReminder}}{{/if}}

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

### CONTENT ANGLE FORMULA
For each angle, use: 1 Core Belief (1-6) × 1 Evidence Type (1-7) × 1 Format = 1 unique content piece.

### WHAT TO GENERATE

#### SECTION 1: MIDDLE OF FUNNEL (MOF) — 93+ Angles (Master Belief List)
These are awareness and nurture content. Goal: shift beliefs, build trust, create the Aspiring Identity. Generate content angles in each of the 9 categories below. Every angle should be specific to {{niche}} — no generic coaching cliches.

**A. Identity & Mindset (13 angles)**
Generate one angle for each of these sub-topics:
1. Client attraction principles — your clients are a mirror of your standards
2. Sales behavior mirroring — if you hesitate on investments, your clients will too
3. Investment decision psychology — how you spend signals who you are
4. Excellence and mediocrity contagion — you become who you surround yourself with
5. Communication clarity — confused people don't buy
6. Millionaire habits — what successful people in {{niche}} do differently
7. Money mindset — relationship with money dictates business results
8. Time and priority thinking — how you spend time reveals real priorities
9. Decision-making frameworks — fast decisions vs slow decisions
10. Vision definition — you can't hit a target you can't see
11. Identity transformation — becoming {{aspiringIdentity}} requires identity-level change
12. Comfort and breakthrough relationship — comfort is the enemy of progress
13. Decision speed importance — speed of decision separates top performers

Style guidance: Hooks should be direct and provocative. Examples: "Your clients are a mirror of your standards — if they're broke and flaky, look in the mirror." / "Millionaires track their numbers daily — broke people track Netflix episodes."

**B. The Real Problem (11 angles)**
Generate one angle for each of these sub-topics:
1. Wrong problem identification — they think the problem is X, it's actually Y
2. Problem anatomy explanation — breaking down the REAL structure of their challenge
3. Historical assistance failures — why past coaches/programs/courses didn't work
4. Success foundation requirements — what must be true before anything else works
5. Current world description — a brutally honest snapshot of where they are today
6. Cost of delayed action — what each month of inaction actually costs
7. Consequence cascading — how one unaddressed problem creates five more
8. Goal correction — they're chasing the wrong goal entirely
9. Self-inquiry questions — questions that force honest self-assessment
10. Problem duration assessment — how long they've been stuck and what that means
11. Procrastination consequences — the real price of "I'll start Monday"

Style guidance: Examples: "You don't have a lead problem — you have a messaging problem." / "Your business isn't broken because you don't know what to do — it's broken because you're making feeling-driven decisions."

**C. The Solution (17 angles)**
Generate one angle for each of these sub-topics:
1. Methodology comparison — old way vs {{uniqueMechanism}}
2. Discovery narrative — how {{clientName}} discovered this approach
3. Myth debunking — the biggest lie in {{niche}}
4. Trap identification — traps that keep {{targetAudience}} stuck
5. Deception exposure — what the industry doesn't want them to know
6. Common misunderstandings — what most people get wrong about solving {{problemSolved}}
7. Old method rejection — why the popular approach is fundamentally broken
8. Process overview (30,000-foot view) — the big picture of how {{uniqueMechanism}} works
9. Process walkthrough — step-by-step of what the first 30 days look like
10. Phase importance — why each phase of the system matters (and what happens if you skip one)
11. Theoretical foundations — the principle/science behind why this works
12. Live demonstrations — showing the method in action with real examples
13. Success principles — the non-negotiable rules for getting results
14. Progress measurement — how to know it's working (leading indicators)
15. Outcome description — what life looks like after {{programDuration}} of implementing
16. Timeline comparison — how long old way takes vs the new way
17. Quick wins leading to big picture — small proof that builds confidence in the system

Style guidance: Examples: "When you're in chaos, MORE just creates MORE chaos — you need LESS of the RIGHT things." / "Phase 1: Free your time and clear your mind. Phase 2: Get clarity and track data. Phase 3: Automate wealth."

**D. Why You (16 angles)**
Generate one angle for each of these sub-topics:
1. Mission level 1 — who {{clientName}} helps at the most basic level
2. Mission level 2 — the deeper transformation {{clientName}} creates
3. Mission level 3 — the ripple effect / bigger impact on the world
4. Mission statement — {{clientName}}'s reason for doing this work
5. Thesis / main argument — {{clientName}}'s core belief about {{niche}}
6. Experience documentation — the journey and credentials that built this expertise
7. Values and positions — what {{clientName}} stands for AND against
8. Successful client examples — spotlight on clients who got results
9. Results proof — concrete data, numbers, and outcomes
10. Testimonials — client words in their own voice
11. Case studies (best case) — the dream transformation story
12. Case studies (worst case) — what happens when someone doesn't implement
13. Personal background — the origin story that makes {{clientName}} relatable
14. Client rejection criteria — who {{clientName}} refuses to work with (and why)
15. Ideal client description — the exact person this is built for
16. Coach selection criteria — how to choose the right coach (and why {{clientName}} fits)

Style guidance: Examples: "I stand for data, fundamentals, and long-term wealth — I'm against guessing, complexity, and short-term hacks." / "I only work with people who take responsibility."

**E. Why Now (8 angles)**
Generate one angle for each of these sub-topics:
1. Hesitation consequences — what happens every month they delay
2. Thinking risks — the danger of overthinking instead of acting
3. Daily decision urgency — every day is a choice to stay stuck or move forward
4. Nervousness reframing — the fear means they're on the edge of growth
5. Anger as motivator — channeling frustration into action
6. Sufficiency realization — they already have enough to start
7. Status quo risk — staying the same IS the risky choice
8. Transformation as status upgrade — the identity upgrade that comes from acting now

Style guidance: Examples: "Every month you hesitate, your competitors are installing these systems." / "Rich people decide in minutes what broke people take months on."

**F. Money (6 angles)**
Generate one angle for each of these sub-topics:
1. Money quantity perspective — reframing the investment in terms of monthly/daily cost
2. Premium pricing justification — why cheap programs produce cheap results
3. Investment necessity — you have to spend money to make money (with proof)
4. Credit and ROI leverage — the math of investing vs. the math of staying stuck
5. Resourcefulness vs resources — finding the money is part of the transformation
6. Free content limitations — why free information alone will never get them there

Style guidance: Examples: "{{pricePoint}} over 12 months is $[X]/month — we find $[Y] in month one, so you're profitable forever." / "You'll spend thousands on ads that don't work but won't invest in the system that makes ads work."

**G. Help & Support (18 angles)**
Generate one angle for each of these sub-topics:
1. Expert assistance speed advantage — what takes years alone takes a fraction of the time with guidance
2. Coaching necessity — why they specifically need a coach, not another course
3. Solo path inefficiency — the hidden cost of figuring it out alone
4. Client independence expectations — the goal is to make them NOT need {{clientName}}
5. Handholding dependency problems — doing it FOR them vs teaching them to do it
6. Past prevention factors — what stopped them before and why this time is different
7. Commitment dependency — results require commitment, not just enrollment
8. Program failure analysis — why programs fail (and how this one is different)
9. Client work methodology — how {{clientName}} actually works with clients day-to-day
10. Expectation setting — what to realistically expect in weeks 1, 4, 8, 12
11. Result timeline — when results typically show up (and the compound effect after)
12. Communication channels — how support works and how accessible {{clientName}} is
13. Payment consistency — the psychological link between paying and performing
14. Simplification approach — complexity is the enemy, simplicity gets results
15. Resource utilization before asking — teaching resourcefulness over dependency
16. Help-seeking cultural shift — asking for help is strength, not weakness
17. Engagement reciprocity — what {{clientName}} brings, what the client must bring
18. Responsibility ownership — the client owns their results, {{clientName}} owns the framework

Style guidance: Examples: "You've been trying to figure this out alone for 2 years — successful people hire experts and win in {{programDuration}}." / "78% growth in {{programDuration}} because we install systems that work immediately, not tactics you have to 'test.'"

**H. Supporting Mechanisms (4 angles)**
Generate one angle for each of these sub-topics:
1. Authority references — reference real books, studies, or well-known principles from named authorities (do NOT fabricate quotes)
2. Universal analogies — simple comparisons that make complex ideas click
3. Interactive tools — calculators, quizzes, or assessments that create engagement
4. Skepticism addressing — directly confronting "this won't work for me" objections

For EACH angle across all 9 categories, provide:
| # | Hook (first line) | Target Belief (1-6) | Evidence Type | Format | Brief Outline (2-3 sentences) |

#### SECTION 2: BOTTOM OF FUNNEL (BOF) — 5+ Angles
These are conversion content. Goal: present the offer, close the deal.

**A. About the Program (5+ angles)**
- What's included in {{offerName}}
- How it works day-to-day
- What the first 30 days look like
- Client onboarding experience

**B. Results & Performance (5+ angles)**
- Detailed case study breakdowns
- Metrics and data-driven results
- Client journey stories (before → during → after)

**C. The Offer (5+ angles)**
- Pricing and value breakdown
- "Who this is for" content
- Comparison to alternatives
- FAQ-style content addressing objections

For EACH angle provide:
| # | Hook (first line) | Format | Brief Outline (2-3 sentences) |

#### SECTION 3: YOUTUBE LONG-FORM SCRIPTS (10 titles + outlines)
Using the YouTube script template, generate 10 video ideas:

For each video:
- **Title** (benefit-driven, curiosity-provoking)
- **Hook** (first 10 seconds): "In this video, I'm going to show you how to [GOAL] without [OBSTACLE] so you can [RESULT] and feel [FEELING]."
- **Target Belief** (which of the 6 this video shifts)
- **3-Point Outline:**
  1. Problem (old belief + why it fails)
  2. New Belief (the truth + evidence)
  3. Proof (story + case study + logic)
- **CTA** (what to do next)

#### SECTION 4: SHORT-FORM HOOKS (20 scroll-stopping hooks)
Generate 20 short-form video/reel hooks — each one targets a specific belief:
- Format: 1-2 sentences, designed to stop the scroll
- Must create curiosity or challenge a belief
- Tag which Core Belief (1-6) each targets

#### SECTION 5: 4-WEEK CONTENT CALENDAR
Organize the best angles into a sample 4-week posting schedule:
- 5 posts per week (Mon-Fri)
- Mix of: 2 MOF belief-shift, 1 identity/lifestyle, 1 proof/results, 1 BOF/offer
- Each day: platform (Instagram/Facebook), format (reel/carousel/post/story), angle reference number

### VOICE & TONE
All hooks and outlines should be in {{brandVoice}} tone.{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}} Be direct, specific, and provocative. Every hook should make the target audience stop scrolling. Avoid generic coaching cliches — be specific to {{niche}}.

### OUTPUT FORMAT
Use clear section headers and tables. Every angle should be actionable — a content creator should be able to pick any angle and produce content from it within 30 minutes.
```

## Post-Processing
1. This output feeds into facebook-posts and facebook-ad-copy templates as context
2. Verify minimum 98 unique angles across all MOF categories (93 MOF + 5 BOF minimum)
3. Check that all 9 Master Belief List categories have the correct number of angles
4. Check that all 6 Core Beliefs are well-represented (not skewed toward 1-2)
5. Verify hooks are specific to the niche (not generic "coaches" language)
6. Content calendar should be realistic and sustainable
