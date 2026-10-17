# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Saturday, October 17, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Weekend note: today is Saturday, so the focus is community visibility and capture. Follow-ups queue for Monday morning where noted.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Some of the best moments in our community happen on a Saturday: a game, a gathering, a neighbor stopping to say hello. 💙
Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and we're grateful for the local families who make this place home.
Protecting the people you love doesn't have to wait for a hard day. A short, no-pressure protection review can help you see where your family stands while life is steady.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.
#TheBeatGoesOn

**Google Business Profile**
Proud to support PAHS and local families. Life insurance, mortgage protection, and final expense planning can be simple and pressure-free. Scan the QR code on our community mailer or send us a message to start a protection review.

**Image idea:** Navy/gold graphic using the real uploaded logo file (do not recreate), a postcard mock-up with a large scannable QR code, and the line "Protecting Today. Securing Tomorrow."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_oct26_d17` (GBP: `utm_source=gbp&utm_medium=post`)

**Fact check:** PAHS sponsorship and outreach come from the campaign proof point supplied by Jackson. No statistics, testimonials, or guarantees used.

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** A protection plan works best when it was set up before it was needed. A quick review can confirm who is covered, who your beneficiaries are, and whether the plan still fits your budget. Today's small step: check who is listed as beneficiary on your current coverage, or write down who relies on your income. Then scan the QR code or DM "PROTECT" and we'll help you look it over.

**SMS:** Latimore Life & Legacy tip: review your family's protection plan before you need it. Small step today: confirm who your beneficiaries are. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "Reviewing your plan while life is calm means your family never has to sort it out during a hard moment."

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

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days` (weekend leads: next business morning).

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Publish the post above with the tracked QR link, and send the Ethos postcard image with QR to 10 PAHS-connected contacts, using a distinct UTM for this send.
2. **Why it matters:** Connects the physical postcard/direct-mail touchpoint to digital capture (awareness, interest, capture).
3. **Tracking:** QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_oct26`; use a separate `utm_content` per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any weekend capture gets a first touch the same day if possible, otherwise first thing Monday. A reply pauses automation for manual follow-up; a booking moves the lead to Booked.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], hope your weekend is going well. I'm helping local families review their protection plans before they need them. If a friend or fellow PAHS family comes to mind, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family who'd like a simple, no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the PAHS community post | Visible local support builds authority | Approve and post FB + GBP today | Engagement and QR scans | Jackson |
| 2 | **Leads:** work the weekend capture queue | Speed-to-lead drives booking | Contact unworked leads today or Monday AM; set `next_followup_at` | Booked conversations | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders block the drip and follow-ups | Replace phone, booking link, and CRM name; test scan, lead, Supabase row | Clean attribution and a live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop on booking, pause on reply, stop all on opt-out.
- Live Supabase data was not queried in this run. Lead counts must be pulled manually.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from PAHS materials?
2. How many new leads were contacted within 1 business hour?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reach Day 10 with no reply and need a manual call?
5. Did any referral conversations start?

---

## Addendum: Email Drip Campaign System (Latimore OS)
Inputs are unchanged from prior briefs. The six-stage, 30-day drip (Day 0, 2, 5, 10, 17, 30), source tags, automation rules, and KPI targets are condensed in `daily-brief-2026-10-01.md` and `public/workflow-presets/latimore-email-drip-campaign.json`.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders. Full six-email and six-SMS copy is not drafted; ask and it will be written.
