# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Friday, November 27, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Day-after-Thanksgiving note: lean into gratitude, not retail urgency. No "sale," no fear-based pressure — this is a quiet, high-attention day for family conversations, which fits the brand naturally.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Grateful today for the people who make this community what it is. 💙
#TheBeatGoesOn started with a second chance on December 7, 2010, and every year since has been about making sure families are protected the way mine was given the chance to be. Latimore Life & Legacy is proud to stand with PAHS and the families connected to it.
If yesterday's table talk touched on "what would happen if," here's a calm next step: a quick, no-pressure protection review before the holiday season gets busy again.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.
#TheBeatGoesOn

**Google Business Profile**
Grateful for our PAHS community this season. Life insurance, mortgage protection, and final expense planning don't have to be complicated. Scan the QR code on our community mailer or message us to start a simple, pressure-free protection review.

**Image idea:** Navy/gold graphic with the real uploaded logo file (do not recreate), a warm autumn/gratitude visual (no retail "sale" imagery), and the line "Grateful Today. Protected Tomorrow."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov26_d27` (GBP: `utm_source=gbp&utm_medium=post`)

**Fact check:** PAHS sponsorship and outreach come from the campaign proof point supplied by Jackson. #TheBeatGoesOn date (Dec. 7, 2010) matches established brand story. No statistics, testimonials, rates, or guarantees used. No non-appointed carriers named.

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** The holidays have a way of surfacing "what if" conversations, around the table, in the car, after everyone's gone home. A short review can confirm who's covered, who your beneficiaries are, and whether the plan still fits your budget. Today's small step: write down the names of the people who'd be affected if your income stopped. Then scan the QR code or DM "PROTECT" and we'll help you look it over.

**SMS:** Latimore Life & Legacy tip: it's easier to review your family's protection plan before you need it, especially right after a holiday full of "what if" talk. Small step today: list who relies on your income. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A plan reviewed while life is calm means nobody has to figure it out during a hard moment."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Would a quick call work today or Monday? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. I'd like to keep this easy: a short, no-pressure conversation about your family's situation and a few options to consider.
Reply with a time that works, or use my booking link: [BOOKING LINK, still a placeholder].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE, still a placeholder]
To stop receiving emails, reply "unsubscribe." [Business address footer required.]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a short message exchange be easier? Either is fine.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days` (holiday-weekend leads: next business morning, Monday Nov 30).

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Publish the gratitude-angled post above with the tracked QR link, and send the Ethos postcard image with QR to 10 PAHS-connected contacts who haven't been touched this week.
2. **Why it matters:** Holiday weekend = high family-conversation attention but low ad-clutter competition; ties the physical postcard/direct-mail touchpoint to digital capture (awareness → interest → capture).
3. **Tracking:** QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_nov26`; use a separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any holiday-weekend capture gets a first touch same day if possible, otherwise first thing Monday (Nov 30). Reply or booking moves the lead toward conversion.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], hope you had a good Thanksgiving. I'm helping local families review their protection plans before they need them. If a friend or fellow PAHS family comes to mind, maybe from yesterday's table talk, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family who'd like a simple, no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the gratitude/PAHS post | Holiday attention on family + visible local proof builds authority | Approve and post FB + GBP post today | Engagement and QR scans | Jackson |
| 2 | **Leads:** clear the holiday-weekend capture queue | Speed-to-lead drives booking | Contact all unworked leads (today or Monday AM); set `next_followup_at` | Booked conversations | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders block the drip and follow-ups | Replace phone, booking link, and CRM name placeholders; test scan → lead → Supabase row | Clean attribution and a live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, pause on reply for manual follow-up, stop all on opt-out.
- Live Supabase data was not queried in this run. Lead counts must be pulled manually.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from PAHS materials over the holiday weekend?
2. How many new leads were contacted within 1 business hour?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reach Day 10 with no reply and need a manual call?
5. Did any referral conversations start from holiday-weekend family talk?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0 Welcome, 2 Education, 5 Social Proof, 10 Soft Ask, 17 Urgency Nudge, 30 Re-engagement), source tags, automation rules, and KPI targets are condensed in `daily-brief-2026-10-01.md` and the preset in `public/workflow-presets/latimore-email-drip-campaign.json`. The inputs are unchanged.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders in `app/page.tsx` and the preset. Full six-email and six-SMS copy is not drafted. Ask and it will be written.
