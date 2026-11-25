# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Wednesday, November 25, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Holiday-week note: today is the day before Thanksgiving. Lean into gratitude and family themes; keep outreach light and expect slower replies through the long weekend. Queue non-urgent follow-ups for Monday, December 1.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Tomorrow, so many of our Central PA families will be around the same table. 💙
Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and this time of year always reminds us why that matters: the people who count on you.
Before the holiday rush, here's one small, calm step: a quick, no-pressure review of your family's protection plan, so "someday" doesn't stay on the list.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.
Wishing your family a safe and happy Thanksgiving.
#TheBeatGoesOn

**Google Business Profile**
Grateful for the families and community we serve. Proud supporters of PAHS. If reviewing your family's protection plan has been on your list, scan the QR code on our community mailer or message us, we'll make it simple and pressure-free. Happy Thanksgiving from Latimore Life & Legacy.

**Image idea:** Navy/gold graphic with the real uploaded logo file (do not recreate), a subtle autumn/gratitude motif, large QR code, and the line "Grateful for this community. Protecting what matters."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov26_d25` (GBP: `utm_source=gbp&utm_medium=post`)

**Fact check:** PAHS sponsorship and outreach come from the campaign proof point supplied by Jackson. No statistics or testimonials used. Compliance: no guarantees, no superlatives, no non-appointed carriers.

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** Insurance is easiest to set up when life is calm. A short review can confirm who is covered, who your beneficiaries are, and whether the plan still fits your budget. Today's small step, before the holiday: write down the names of the people who would be affected if your income stopped. Then scan the QR code or DM "PROTECT" and we'll help you look it over.

**SMS:** Latimore Life & Legacy tip: it's easier to review your family's protection plan before you need it. Small step today: list who relies on your income. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A plan reviewed while life is calm means nobody has to figure it out during a hard moment, and the holidays are a good reminder of who that plan is really for."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. With the holiday coming up, would a quick call work this week or early next week? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. With Thanksgiving just ahead, I didn't want this to get lost in the shuffle, so I'll keep it short: a brief, no-pressure conversation about your family's situation and a few options to consider.
Reply with a time that works, or use my booking link: [BOOKING LINK, still a placeholder].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE, still a placeholder]
To stop receiving emails, reply "unsubscribe." [Business address footer required.]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. No rush with the holiday here, just let me know if a quick call or a short message exchange works better for you.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = Monday, Dec 1` (holiday-week leads skip to next business day after Thanksgiving).

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Publish the post above with the tracked QR link, and send the Ethos postcard image with QR to 10 PAHS-connected contacts with a brief Thanksgiving note attached.
2. **Why it matters:** Ties the physical postcard/direct-mail touchpoint to digital capture (awareness → interest → capture), while the gratitude framing keeps the holiday touch warm rather than transactional.
3. **Tracking:** QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_nov26`; use a separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any capture today gets a same-day first touch if possible; otherwise first thing Monday, December 1. Reply or booking moves the lead toward conversion.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked (expect lower volume given the holiday).

---

## 5. Referral Prompt

**Text:** Hi [Name], hope you're gearing up for a good Thanksgiving. I'm helping local families review their protection plans before they need them. If a friend or fellow PAHS family comes to mind over the holiday, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** Grateful for this community today and every day. Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family who'd like a simple, no-pressure look at their protection before the holidays wind down, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Grateful for this community. Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the gratitude-anchored PAHS post | Holiday-week visibility reinforces local authority without feeling salesy | Approve and post FB + GBP post today, before the holiday | Engagement and QR scans | Jackson |
| 2 | **Leads:** clear today's capture queue before the long weekend | Any lead untouched before Thanksgiving risks a 4-5 day cold gap | Contact all unworked leads today; set `next_followup_at` to Monday, Dec 1 | Booked conversations in early December | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders still block the drip and follow-ups | Replace phone, booking link, and CRM name placeholders; test scan → lead → Supabase row | Clean attribution and a live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, pause on reply for manual follow-up, stop all on opt-out.
- Holiday-week note: set `next_followup_at` to Monday, December 1 for anything that would otherwise land Thursday-Sunday.
- Live Supabase data was not queried in this run. Lead counts must be pulled manually.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from PAHS materials today?
2. How many new leads were contacted within 1 business hour, ahead of the holiday?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reach Day 10 with no reply and need a manual call when business resumes?
5. Did any referral conversations start over the holiday week?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0 Welcome, 2 Education, 5 Social Proof, 10 Soft Ask, 17 Urgency Nudge, 30 Re-engagement), source tags, automation rules, and KPI targets are condensed in `daily-brief-2026-10-01.md` and the preset in `public/workflow-presets/latimore-email-drip-campaign.json`. The inputs are unchanged.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders. Full six-email and six-SMS copy is not drafted. Ask and it will be written.
