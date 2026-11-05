# Latimore Life & Legacy Daily Marketing Command Brief
Date: Thursday, November 5, 2026

## 1. Facebook / Google Business Profile Post

**Facebook**
Some of the best things we do for our community happen long before anyone needs them. 💙
Every family connected to PAHS and our neighborhoods deserves to know their "what if" is covered. A quick protection review now can give you real peace of mind later. We're proud to support PAHS and to help local families plan ahead.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll walk you through it. No pressure, just clarity.

**Google Business Profile**
Protecting what matters starts with a simple conversation. Latimore Life & Legacy supports local families and PAHS through community outreach and sponsorship, and we offer plain-English reviews of life insurance, final expense, and mortgage protection. Scan the QR code to request your review.

**Image idea:** PAHS-branded photo or graphic with the postcard QR code front and center. Caption overlay: "Protect what matters. Scan to start."
**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov2026_w1` (GBP: `utm_source=gbp&utm_medium=profile_post&utm_campaign=pahs_protect_nov2026_w1`)

## 2. Client Education Tip
**Topic: Review your protection plan before you need it.**
- **Social caption:** Life changes: a new home, a new baby, a new job. Your protection plan should keep up. One 15-minute review can show whether your coverage still fits your family. Scan the QR code to get started.
- **SMS:** Hi {{first_name}}, quick tip from Latimore Life & Legacy: a yearly look at your coverage keeps it matched to your life. Want a free 15-minute review? Reply PROTECT. Reply STOP to opt out.
- **Talking point:** "Reviewing your plan while everything's calm means your family has choices later, and it only takes one short conversation."

## 3. New-Lead Follow-Up (QR / PAHS campaign, stage: New Lead)
- **SMS:** Hi [Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard! I'd be glad to go over a family protection quote with you. Would a quick call today or tomorrow work? Reply STOP to opt out.
- **Email:** Subject: Your family protection quote request. Hi [Name], thank you for requesting a quote through the PAHS community campaign. I'll keep this simple: reply with a good time for a 15-minute call, or tell me your top question and I'll start there. No pressure. — Jackson Latimore, Latimore Life & Legacy
- **Messenger/DM:** Hi [Name], thanks for reaching out! Want me to send a quick overview, or set up a short call?
- **Next Supabase status:** `contacted`, moving from New Lead to Nurturing. Set it to Engaged on reply and Booked on a scheduled call.

## 4. PAHS / Community Campaign Action
1. **Action:** Post today's PAHS post (Section 1) with the tracked QR/UTM link. Check that the Ethos postcard QR resolves to the tracked lead-capture page. Share the post in PAHS-connected community groups.
2. **Why:** It links the physical touchpoint (postcard/direct mail) to digital capture, moving people from awareness to interest to capture.
3. **Tracking:** Log scans and form submits by `utm_campaign=pahs_protect_nov2026_w1`. Tag each new lead with its source in Supabase.
4. **Follow-up trigger:** Any new capture gets a response within 1 business hour (Section 3 script).
5. **Metric for tomorrow:** QR scans, form completions, and calls booked from the last 24 hours. Compare them with the prior day.

## 5. Referral Prompt
- **Text:** Hi [Name], thank you for trusting me with your family's protection. If you know a parent or neighbor who'd benefit from a no-pressure review, I'd be grateful for an introduction. They can scan the QR code or DM "PROTECT."
- **Social:** Know a family who has been meaning to look at their protection plan? Send them our way. We'll keep it simple and pressure-free. DM "PROTECT."
- **In person:** "Who comes to mind that would want to make sure their family is covered? I'd be happy to give them the same clear review."
- **Card line:** "Help another family protect what matters. Scan or DM PROTECT."

## 6. Top 3 Business Priorities
1. **Build trust:** Publish the PAHS community post today. *Result:* visible local authority. *Owner:* Jackson/marketing.
2. **Capture and advance leads:** Respond to all new QR/DM leads within an hour and log their status in Supabase. *Result:* more booked conversations. *Owner:* Jackson.
3. **Strengthen the community authority system:** Verify the QR/UTM tracking and schedule next week's PAHS content. *Result:* clean attribution data. *Owner:* ops/marketing.

## 7. Tracking Notes for Supabase
Record `source`, `utm_campaign`, `utm_medium`, `pipeline_stage` (awareness → interest → capture → follow-up → conversion), `first_contact_at`, and `next_action_at`. Tag leads from the PAHS QR as `pahs_qr`.

## 8. Tomorrow's Review Questions
- How many scans, submits, and DMs came in, and from which source?
- Did every lead get a first response within 1 hour?
- Which post got the most engagement?
- Is any lead stuck at New Lead for more than 2 days?

---
**Compliance reminder:** Keep all copy free of guaranteed outcomes or returns. Include the opt-out and required disclosures. Have Jackson review it before posting.

---

# Latimore OS: Email Drip Campaign Engine (Condensed Addendum)

**Why it exists:** Most prospects need several trust-building touches, not one follow-up. This 30-day drip gives each lead a steady stream of clear, no-pressure help.

**Six stages and cadence:** Day 0 Welcome, Day 2 Education, Day 5 Social proof, Day 10 Soft ask, Day 17 Urgency nudge, Day 30 Re-engagement.

## Trigger Sources and Sequence Assignment
| Source | Sequence | CRM tags | Exit |
|---|---|---|---|
| PAHS QR | Family Protection / Community Trust | `src_pahs_qr`, `seq_family`, `stage_new` | booked / replied / opted out |
| Website form | General Protection Review | `src_web`, `seq_general` | same |
| Ethos quote | Fast Term / Living Benefits | `src_ethos`, `seq_term_lb` | same |
| Retirement inquiry | Annuity / Safe Money | `src_retire`, `seq_annuity` | same |
| Facebook DM "PROTECT" | Life Insurance Education | `src_fbdm`, `seq_edu` | same |
| Google Business Profile | Local Trust / Policy Review | `src_gbp`, `seq_local` | same |

## 30-Day Table
| Day | Stage | Channel | Angle | CTA |
|---|---|---|---|---|
| 0 | Welcome | Email + text | Confirm receipt and set expectations | Book a review |
| 2 | Education | Email | Simple coverage framework: income, debts, final costs, years to cover | Reply with your numbers |
| 5 | Social proof | Email | Local community credibility, with PAHS support | Book a review |
| 10 | Soft ask | Both | Low-pressure review invite | Book a review |
| 17 | Urgency nudge | Email + text | Why waiting costs more later, without fear tactics | Book a review |
| 30 | Re-engagement | Email | Fresh value and reopening the conversation | Reply "PROTECT" |

Pause the sequence if the lead replies. Stop it on booking. Resume with a manual follow-up.

## Email Drafts (core)
Each email uses `{{first_name}}`, the booking link, and this signature: Jackson Latimore, Founder | Protection & Retirement Advisor, Latimore Life & Legacy LLC, (###) ###-####.
- **Day 0:** "Thanks for reaching out, {{first_name}}. Here's what happens next: I'll review your request and follow up within one business day. Book a time here: [link]."
- **Day 2:** "A simple way to estimate coverage: add up income to replace, debts, final costs, and the years your family would need support."
- **Day 5:** "Latimore Life & Legacy is part of this community. We support PAHS and local families, and we'd be glad to help yours."
- **Day 10:** "Would a short, no-pressure review help? Pick a time: [link]."
- **Day 17:** "Coverage generally gets harder or costlier to secure as life and health change. No pressure, but a review now keeps your options open."
- **Day 30:** "Checking in, {{first_name}}. Here's one new tip on protecting your family. Reply PROTECT anytime."

*Footer on all: unsubscribe link and business address (CAN-SPAM).*

## Text Companions (240 characters max, with opt-out)
Day 0: "Hi {{first_name}}, Jackson at Latimore Life & Legacy. Got your request! Book a time: [link]. Reply STOP to opt out."
Days 2, 5, 10, 17 and 30 follow the same format, each tied to that day's CTA.

## Automation Rules
1. New lead with source captured: apply source, sequence, and stage tags, send Day 0, and schedule the later touches.
2. Booked: stop the sequence, set stage Booked, and create a reminder task.
3. Reply: pause the sequence, set stage Engaged, and flag it for manual follow-up.
4. Opt-out: stop all messaging and tag Opted Out.
5. No reply or booking after Day 10: create a manual call task for Jackson with a short script.
6. Day 30 with no engagement: tag Cold and move to the long-term nurture list.

Flow: Lead → tags → drip → task → pipeline move.

## KPIs
Open rate 35%+, click-through 3–8%, reply 5%+, booking conversion 10–20%, sequence completion 80%+, cold-lead revival 5–10%. Weekly: review each KPI against target, adjust the weakest stage, and run A/B tests on subject lines and CTA phrasing.

## Bottom Line
Lead → tag → drip → booking → task → pipeline: every lead gets steady, helpful follow-up, and nothing falls through the cracks.

**Open items before launch:** replace the placeholder phone `(###) ###-####`, the booking link `https://your-booking-link.com`, and the CRM name `Your CRM`.
