# Generation Template: Human Bio

## Template ID
`human-bio`

## What This Generates
A warm, personal "human side" bio — NOT a professional credentials bio. This is the section on a website, social profile, or speaker page that makes people say "I like this person" before they ever get on a call. It covers where they live, their family, hobbies, personality, and what drives them beyond business. Third person, 300 words max, feels like a friend introducing the coach at a dinner party.

## Client Inputs Required
```json
{
  "clientName": "string",
  "personalDetails": "string — general personal information",
  "personalFamily": "string — family details (spouse, kids, pets, etc.)",
  "personalHobbies": "string — hobbies, interests, passions outside work",
  "personalTraits": "string — personality traits, quirks, values",
  "personalLocation": "string — where they live",
  "whyDoThis": "string — what drives them beyond business",
  "storyFacts": "string — verified factual details from their background"
}
```

## Framework References
- **Coach Syndicate Prompt 4**: Human bio framework — the "like" factor that precedes trust and buying decisions
- **John Whiting Framework H1**: "You are the source" — authenticity and real human connection are the foundation of a coaching brand
- **John Whiting Framework A6**: Anti-avatar repelling — even personal details filter; the right person reads this and thinks "we'd get along"

## Generation Prompt

```
You are writing a short personal bio for a coaching professional. This is NOT a credentials bio or resume — this is the "human side" section that makes prospects feel a genuine personal connection before any sales conversation.

IMPORTANT: Use ONLY the facts provided below. If a detail is not explicitly provided, do not include it. A brief true answer beats an embellished one. If data says [DATA NOT PROVIDED — DO NOT INVENT], skip that section entirely.

### CLIENT DETAILS
- **Name:** {{clientName}}
- **Personal Details:** {{personalDetails}}
- **Family:** {{personalFamily}}
- **Hobbies & Interests:** {{personalHobbies}}
- **Personality & Traits:** {{personalTraits}}
- **Location:** {{personalLocation}}
- **What Drives Them Beyond Business:** {{whyDoThis}}
- **Verified Story Facts:** {{storyFacts}}
{{#if personalLife}}- **Personal Life:** {{personalLife}}{{/if}}
{{#if upbringing}}- **Upbringing:** {{upbringing}}{{/if}}
{{#if parentInfluence}}- **Parent Influence:** {{parentInfluence}}{{/if}}

### ANTI-HALLUCINATION RULES (apply to ALL content below)
1. Use ONLY facts explicitly provided in CLIENT DETAILS above. If a detail is not listed, do not include it.
2. DO NOT invent statistics, dollar amounts, percentages, client counts, or timeframes. If a section needs a figure that is not in CLIENT DETAILS, either skip that sentence/section entirely or describe the effect qualitatively (e.g. "significant ROI," "within a few weeks," "well under what alternatives cost"). Do NOT write "[COACH: Insert X]" placeholders — they make the output feel half-finished.
3. DO NOT fabricate quotes attributed to real people. Paraphrase known principles by name instead.
4. DO NOT invent client stories, testimonials, or case studies. Use placeholders: [INSERT CLIENT TESTIMONIAL].
5. If any field says [DATA NOT PROVIDED — DO NOT INVENT], skip that element entirely or use a placeholder.
6. When prior deliverables define identity names (Undesired Identity, Aspiring Identity), use those EXACT names — do not create new ones.
7. The voice profile describes communication STYLE only — do not pull biographical facts, company names, mentor names, or dollar amounts from it into the generated content.

### ANTI-HALLUCINATION RULES — READ CAREFULLY
1. **DO NOT invent family members.** If personalFamily is empty or not provided, do not mention a spouse, kids, pets, or any family.
2. **DO NOT invent hobbies.** If personalHobbies is empty, do not guess at interests. Omit that section.
3. **DO NOT invent personality traits.** If personalTraits is empty, do not add adjectives like "passionate" or "down-to-earth" — only use traits explicitly provided.
4. **DO NOT invent a location.** If personalLocation is empty, do not mention where they live.
5. **DO NOT invent backstory details.** Only use facts explicitly stated in storyFacts and personalDetails.
6. **If most fields are empty**, write a shorter bio (even 2-3 sentences is fine) rather than padding with made-up details. A truthful 50-word bio beats a fictional 300-word one.

### WHAT TO GENERATE

Write a single bio passage (NO section headers, NO bullet points) in third person. Maximum 300 words.

**Structure** (include only sections where data exists):

1. **Opening line** — A warm, slightly unexpected introduction. Not "{{clientName}} is a coach who..." — start with something human. Use a detail from their personality or life that makes them memorable.

2. **Where they live** — Only if personalLocation is provided. One sentence, woven naturally.

3. **Family** — Only if personalFamily is provided. Mention specifics (names, ages, number of kids, pets) ONLY if those specifics are in the data. Keep it warm, not clinical.

4. **What they do for fun** — Only if personalHobbies is provided. Use their actual hobbies. Do NOT substitute generic hobbies ("enjoys spending time outdoors") if specific ones were given.

5. **What makes them tick** — Only if personalTraits or whyDoThis is provided. What drives them, what they care about, what kind of person they are — in a sentence or two.

6. **Closing line** — A brief sentence that bridges from the personal to the professional without becoming a sales pitch. Something that makes the reader think "I'd want to grab coffee with this person."

### VOICE & TONE
Write as if a close friend is introducing {{clientName}} at a casual event. Warm, specific, real. No corporate language. No marketing speak. No superlatives ("incredible," "amazing," "passionate"). Let the specific details do the work.{{#if brandVoice}} Brand voice: {{brandVoice}}{{/if}}{{#if voiceNotes}} Voice notes from the coach: {{voiceNotes}}{{/if}} {{STEVE_VOICE_PROFILE}}

### OUTPUT FORMAT
A single flowing passage in third person. No headers, no bullet points, no sections — just well-crafted prose. 100-300 words depending on how much data is available. If very little personal data is provided, keep it short and honest rather than long and fabricated.
```

## Post-Processing
1. This output is used on About pages, speaker bios, social media profiles, and pitch decks
2. Verify EVERY detail in the bio traces back to a specific client input field — flag any detail that cannot be sourced
3. Verify word count is 300 or under
4. Verify no invented family members, hobbies, personality traits, or locations
5. If most input fields were empty, the bio should be noticeably shorter — not padded
6. Tone check: should read like a friend introducing them, not like a LinkedIn summary
