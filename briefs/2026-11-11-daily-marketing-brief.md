# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Wednesday, November 11, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Today is Veterans Day. The post below honors service and veteran families without turning the holiday into a sales pitch. No discount, giveaway, or "today only" framing is used.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Today we pause to say thank you to the veterans and service members in our community, and to the families who stood behind them. 🇺🇸💙
Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and that same commitment to looking out for our neighbors extends to the families who've served.
If you're a veteran or military family and it's been a while since someone looked at your protection plan, we're glad to help, no pressure, no sales pitch today.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.
#TheBeatGoesOn

**Google Business Profile**
Honoring veterans and the families who supported them, today and every day. Latimore Life & Legacy is proud to support PAHS and local families with simple, pressure-free life insurance, mortgage protection, and final expense planning. Scan the QR code on our community mailer or message us to start a review.

**Image idea:** Navy/gold graphic with the real uploaded logo file (do not recreate), a subtle flag or star motif, and the line "Thank you for your service. We're here when you're ready."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov26_d11` (GBP: `utm_source=gbp&utm_medium=post`)

**Fact check:** PAHS sponsorship and outreach come from the campaign proof point supplied by Jackson. No statistics, testimonials, discounts, or veteran-specific product claims used. Compliance: no guarantees, no superlatives, no non-appointed carriers, no exploiting the holiday for urgency.

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** Insurance is easiest to set up when life is calm. A short review can confirm who's covered, who your beneficiaries are, and whether the plan still fits your budget. Today's small step: write down the names of the people who'd be affected if your income stopped. Then scan the QR code or DM "PROTECT" and we'll help you look it over.

**SMS:** Latimore Life & Legacy tip: it's easier to review your family's protection plan before you need it. Small step today: list who relies on your income. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A plan reviewed while life is calm means nobody has to figure it out during a hard moment."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Would a quick call work today or tomorrow? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. I'd like to keep this easy: a short, no-pressure conversation about your family's situation and a few options to consider.
Reply with a time that works, or use my booking link: [BOOKING LINK, still a placeholder].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE, still a placeholder]
To stop receiving emails, reply "unsubscribe." [Business address footer required.]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a short message exchange be easier? Either is fine.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days`.

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Publish the Veterans Day post above with the tracked QR link, and share it directly with any PAHS-connected veteran or military families in your contact list.
2. **Why it matters:** Ties a meaningful community moment to the existing PAHS trust anchor without turning a holiday of service into a promotion (awareness → interest → capture, done respectfully).
3. **Tracking:** QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_nov26`; use a separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any capture today is contacted within 1 business hour. Reply or booking moves the lead toward conversion.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], thinking of you today. I'm helping local families, including veteran and military families, review their protection plans before they need them. If a friend or fellow PAHS family comes to mind, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family, especially a veteran or military family, who'd like a simple, no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the Veterans Day / PAHS community post | Respectful, authentic community presence builds authority without feeling transactional | Approve and post FB + GBP post today | Engagement and QR scans | Jackson |
| 2 | **Leads:** same-day follow-up on every new capture | Speed-to-lead drives booking | Send SMS/email/DM within 1 business hour of any new capture | Booked conversations | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders block the drip and follow-ups from going live | Replace phone, booking link, and CRM name placeholders; test scan → lead → Supabase row | Clean attribution and a live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, pause on reply for manual follow-up, stop all on opt-out.
- Live Supabase data was not queried in this run. Lead counts must be pulled manually.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from today's materials?
2. How many new leads were contacted within 1 business hour?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reach Day 10 with no reply and need a manual call?
5. Did any referral conversations start?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0 Welcome, 2 Education, 5 Social Proof, 10 Soft Ask, 17 Urgency Nudge, 30 Re-engagement), source tags, automation rules, and KPI targets are fully drafted in `daily-brief-2026-10-01.md` and the preset in `public/workflow-presets/latimore-email-drip-campaign.json`. The inputs are unchanged.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders. Say the word and the full six-email and six-SMS copy will be finalized against real values.
