# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Friday, October 16, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Friday note: capture leads today, and queue weekend-safe follow-ups so nothing sits until Monday.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Friday night lights, packed stands, and neighbors cheering for the same kids. 💙
Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach. Families like yours are what make this community strong.
Heading into the weekend, here's one small step for the family: a short, no-pressure protection review, so the people you love are covered the way you intend.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.

**Google Business Profile**
Proud to support PAHS and local families. Life insurance, mortgage protection, and final expense planning can be simple. Scan the QR code on our community mailer or message us to start a pressure-free protection review.

**Image idea:** Navy/gold graphic using the real uploaded logo file (do not recreate), postcard mock-up with a large QR code, and the line "Protecting Today. Securing Tomorrow."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_oct26_d16` (GBP: `utm_source=gbp&utm_medium=post`)

**Compliance:** No guarantees, statistics, or testimonials. PAHS support comes from the supplied proof point.

---

## 2. Client Education Tip: Review Your Plan Before You Need It

**Social caption:** A protection plan works best when it's reviewed while life is calm. A quick check covers who is protected, who the beneficiaries are, and whether the plan still fits your budget. Small step today: write down who depends on your income. Then scan the QR code or DM "PROTECT" and we'll look it over together.

**SMS:** Latimore Life & Legacy tip: review your family's protection plan before you need it. Small step today: list who relies on your income. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A plan reviewed while life is calm means nobody has to figure it out during a hard moment."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Want a quick call today or early next week? Reply "CALL" or "EMAIL." Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. I'd like to keep this easy: a short, no-pressure conversation about your family's situation and a few options to consider.
Reply with a time that works, or use my booking link: [BOOKING LINK, still a placeholder].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE, still a placeholder]
To stop receiving emails, reply "unsubscribe." [Business address footer required.]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a short message exchange be easier? Either works.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days` (Friday leads: next business morning).

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post the FB/GBP item with the tracked QR link, and send the Ethos postcard image with QR to 10 PAHS-connected contacts before the weekend.
2. **Why it matters:** Connects the postcard/direct-mail touchpoint to digital capture (awareness, interest, capture).
3. **Tracking:** QR destination uses `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_oct26`; give each channel its own UTM. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any capture gets a first touch same day; after-hours captures get first touch Monday morning, with an SMS acknowledgement over the weekend.
5. **Metric for Monday:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], hope your week went well. I'm helping local families review their protection plans before they need them. If a friend or fellow PAHS family comes to mind, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family who'd like a simple, no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the PAHS post | Visible local proof builds authority | Approve and post FB + GBP today | Engagement and QR scans | Jackson |
| 2 | **Leads:** clear the week's capture queue | Speed-to-lead drives booking | Contact every unworked lead before the weekend; set `next_followup_at` | Booked conversations | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders block the drip and follow-ups | Replace phone, booking link, and CRM name; test scan to lead to Supabase row | Clean attribution, live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, pause on reply, stop all on opt-out.
- Live Supabase data was not queried in this run. Pull lead counts manually.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from PAHS materials this week?
2. How many new leads were contacted within 1 business hour?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reach Day 10 with no reply and need a manual call?
5. Did any referral conversations start?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0, 2, 5, 10, 17, 30), source tags, automation rules, and KPI targets are condensed in `daily-brief-2026-10-01.md` and `public/workflow-presets/latimore-email-drip-campaign.json`. Inputs are unchanged.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders. Full six-email and six-SMS copy is not drafted yet.
