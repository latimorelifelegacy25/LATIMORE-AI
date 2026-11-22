# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Sunday, November 22, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Weekend note: today is Sunday, so the focus is community visibility and a light touch. New-capture follow-ups and priority actions queue for Monday morning where noted.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Sunday is for family, and that's exactly why protection matters. 💙
Latimore Life & Legacy is proud to stand behind PAHS through sponsorship and community outreach, because the families who show up for this community deserve to be covered too.
A short, no-pressure protection review takes just a few minutes and can bring real peace of mind heading into the week.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.
#TheBeatGoesOn

**Google Business Profile**
Proud to support PAHS and the families of our community. Life insurance, mortgage protection, and final expense planning don't have to be complicated. Scan the QR code on our community mailer or message us to start a simple, pressure-free protection review.

**Image idea:** Navy/gold graphic with the real uploaded logo file (do not recreate), a postcard mock-up, large QR code, and the line "Protecting Today. Securing Tomorrow."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov26_d22` (GBP: `utm_source=gbp&utm_medium=post`)

**Fact check:** PAHS sponsorship and outreach come from the campaign proof point supplied by Jackson. No statistics, testimonials, rate guarantees, or non-appointed carriers referenced.

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** Insurance is easiest to set up when life is calm. A short review can confirm who is covered, who your beneficiaries are, and whether the plan still fits your budget. Today's small step: write down the names of the people who would be affected if your income stopped. Then scan the QR code or DM "PROTECT" and we'll help you look it over.

**SMS:** Latimore Life & Legacy tip: it's easier to review your family's protection plan before you need it. Small step today: list who relies on your income. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A plan reviewed while life is calm means nobody has to figure it out during a hard moment."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Would a quick call work Monday? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. I'd like to keep this easy: a short, no-pressure conversation about your family's situation and a few options to consider.
Reply with a time that works, or use my booking link: [BOOKING LINK, still a placeholder].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE, still a placeholder]
To stop receiving emails, reply "unsubscribe." [Business address footer required.]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a short message exchange be easier? Either is fine.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at` = Monday morning for any Sunday capture.

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Publish the post above with the tracked QR link. Hold outbound postcard/contact sends for Monday morning rather than Sunday.
2. **Why it matters:** Keeps the physical postcard/direct-mail touchpoint tied to digital capture (awareness → interest → capture) without over-messaging on a family day.
3. **Tracking:** QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_nov26`; use a separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any Sunday capture gets a first touch Monday morning. Reply or booking moves the lead toward conversion.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], hope you're having a good Sunday. I'm helping local families review their protection plans before they need them. If a friend or fellow PAHS family comes to mind, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family who'd like a simple, no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the PAHS community post | Visible local proof builds authority | Approve and post FB + GBP post today | Engagement and QR scans | Jackson |
| 2 | **Leads:** queue Monday's first-touch follow-ups | Speed-to-lead drives booking once the week starts | List any weekend captures now; contact first thing Monday; set `next_followup_at` | Booked conversations | Jackson |
| 3 | **Authority system:** close the launch blockers that have carried since early October | `phone_number`, `booking_link`, and `crm_name` are still placeholders over a month later, blocking the drip and clean attribution | Replace the three placeholders; test scan → lead → Supabase row | Clean attribution and a live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, pause on reply for manual follow-up, stop all on opt-out.
- Live Supabase data was not queried in this run. Lead counts must be pulled manually.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from PAHS materials over the weekend?
2. How many new leads were contacted within 1 business hour of Monday's open?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reach Day 10 with no reply and need a manual call?
5. Did any referral conversations start?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0 Welcome, 2 Education, 5 Social Proof, 10 Soft Ask, 17 Urgency Nudge, 30 Re-engagement), source tags, automation rules, and KPI targets are condensed in `daily-brief-2026-10-01.md` and the preset in `public/workflow-presets/latimore-email-drip-campaign.json`. The inputs are unchanged from that run.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders, as they have since the September/October briefs. Full six-email and six-SMS copy is not drafted. Ask and it will be written.
