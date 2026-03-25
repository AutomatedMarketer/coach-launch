# Generation Templates

Prompt templates that power the AI content generation pipeline. Each template combines:

1. **John Whiting's Framework** — the methodology (what to generate and why)
2. **Client Questionnaire Answers** — personalization ({{placeholders}})
3. **Steve Krebs's Voice Profile** — personality layer ({{STEVE_VOICE_PROFILE}}, TBD)

## Templates

| Template | File | What It Generates |
|----------|------|-------------------|
| Homepage Copy | `homepage-copy.md` | Full homepage — hero, problem, solution, proof, CTA |
| About Page | `about-page.md` | Origin story, mission, credibility, values |
| Email Welcome Sequence | `email-welcome-sequence.md` | 5-7 nurture emails after opt-in |
| Email Sales Sequence | `email-sales-sequence.md` | 3-5 bottom-of-funnel conversion emails |
| GHL Chat Sequence | `ghl-chat-sequence.md` | DM/SMS automation flow for GoHighLevel |
| Facebook Posts | `facebook-posts.md` | 10-20 posts across value, story, belief-shift, CTA |
| Facebook Ad Copy | `facebook-ad-copy.md` | 3-5 ad variations (SLO, retargeting, direct offer) |
| Lead Magnet Outline | `lead-magnet-outline.md` | Complete outline for PDF/checklist/mini-course |

## How the App Uses These

1. Client fills out onboarding questionnaire
2. App maps answers to template placeholders
3. Each template is sent to Claude API with the client's data injected
4. Steve's voice profile is applied as a post-processing layer
5. Generated content is returned to the dashboard for review/edit/export

## Placeholder Format

- `{{clientName}}` — simple string replacement
- `{{#if testimonials}}...{{/if}}` — conditional sections
- `{{commonObjections[0]}}` — array access
- `{{STEVE_VOICE_PROFILE}}` — global voice layer (injected by the app)
