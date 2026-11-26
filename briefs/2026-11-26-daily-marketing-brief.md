# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Thursday, November 26, 2026

> DRAFT: PENDING HUMAN APPROVAL. Jackson reviews and performs every post, send, and publish. Nothing below has been sent or scheduled.
> Holiday note: today is Thanksgiving Day. Recommend a light-touch, gratitude-only post with no sales ask — skip the QR/DM capture push today. New-lead follow-up, PAHS campaign action, and referral outreach queue for Friday or Monday morning instead.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Grateful today for the families, friends, and neighbors who make this community what it is. 💙
On December 7, 2010, I got a second Thanksgiving I wasn't guaranteed — and every year since, that's what #TheBeatGoesOn means to me and my family.
Wishing you and yours a warm, peaceful Thanksgiving. Rest, be with the people you love, and we'll be here when you're ready to talk about protecting them.

**Google Business Profile**
Happy Thanksgiving from Latimore Life & Legacy. We're grateful for this community and the families we're proud to serve. Our office is closed today — we'll be back Friday.

**Image idea:** Warm navy/gold graphic (real uploaded logo only, do not recreate) with the line "Grateful for this community. #TheBeatGoesOn" — no QR code or CTA button today.

**Suggested UTM campaign label:** none today (no capture CTA); resume `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov26` on Friday's post.

**Fact check:** December 7, 2010 date and #TheBeatGoesOn tagline match Jackson's brand story. No product claims, statistics, or testimonials used. Compliance: no guarantees, no superlatives, no non-appointed carriers.

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

Holiday recommendation: hold the education tip until Friday so today's only message is gratitude. Drafted below so it's ready to post then.

**Social caption:** Insurance is easiest to set up when life is calm. A short review can confirm who is covered, who your beneficiaries are, and whether the plan still fits your budget. This week's small step: write down the names of the people who would be affected if your income stopped. Then scan the QR code or DM "PROTECT" and we'll help you look it over.

**SMS:** Latimore Life & Legacy tip: it's easier to review your family's protection plan before you need it. Small step: list who relies on your income. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A plan reviewed while life is calm means nobody has to figure it out during a hard moment."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

Holiday recommendation: do not send today. Queue for first thing Friday morning — a holiday-day sales text reads as tone-deaf and can hurt trust.

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Would a quick call work later this week? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. I'd like to keep this easy: a short, no-pressure conversation about your family's situation and a few options to consider.
Reply with a time that works, or use my booking link: [BOOKING LINK, still a placeholder].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE, still a placeholder]
To stop receiving emails, reply "unsubscribe." [Business address footer required.]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a short message exchange work later this week? Either is fine.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = next business morning (Friday)`.

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** None — pause outbound PAHS capture activity for the holiday. If anything is scheduled to auto-send today, hold it until Friday.
2. **Why it matters:** A capture-focused post or send on a major family holiday competes with people's attention in the wrong way and can read as opportunistic; waiting one day protects trust (awareness → interest → capture still works Friday).
3. **Tracking:** When resumed Friday, QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_nov26`; use a separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any inbound scan or DM that does arrive today still gets a same-day human reply from Jackson if practical; otherwise first thing Friday.
5. **Metric for Friday's review:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked — compare Thanksgiving week to the prior week's baseline.

---

## 5. Referral Prompt

Holiday recommendation: skip the digital/text referral ask today; the in-person script below is appropriate if Jackson is at a family gathering and a natural conversation comes up.

**Text:** *(hold until Friday)* Hi [Name], hope your week is going well. I'm helping local families review their protection plans before they need them. If a friend or fellow PAHS family comes to mind, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.

**Social:** *(hold until Friday)* Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." Helping one family protect what matters helps our whole community. 💙

**In-person (usable today):** "If a family member or friend here today ever wants a simple, no-pressure look at their protection, I'd be honored to help. No rush — just let me know."

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** post the gratitude-only Thanksgiving message | A warm, no-ask post on a major holiday builds authority without feeling transactional | Approve and post the FB + GBP copy above today | Goodwill engagement, no capture metrics expected today | Jackson |
| 2 | **Leads:** stage Friday's catch-up queue | Holiday-week leads still need fast follow-up once the day passes | Review any new leads from today; queue Friday-morning sends per Section 3 | Clean, no-overdue inbox Friday morning | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders still block the drip and automated follow-ups | Replace phone, booking link, and CRM name placeholders; test scan → lead → Supabase row | Clean attribution and a live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, pause on reply for manual follow-up, stop all on opt-out.
- Live Supabase data was not queried in this run. Lead counts must be pulled manually, and expect a quiet day given the holiday.

## 8. Tomorrow's Review Questions

1. Did the gratitude-only post get engagement without feeling like it needed a reply?
2. How many leads came in over the holiday that still need a first touch Friday morning?
3. Were any PAHS sends or posts accidentally auto-scheduled for today that should have held?
4. Which Day-10/Day-17 drip leads (if live) land on Thanksgiving week and need manual timing judgment?
5. Did any in-person referral conversations happen at holiday gatherings worth a follow-up note?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0 Welcome, 2 Education, 5 Social Proof, 10 Soft Ask, 17 Urgency Nudge, 30 Re-engagement), source tags, automation rules, and KPI targets are condensed in `daily-brief-2026-10-01.md` and the preset in `public/workflow-presets/latimore-email-drip-campaign.json`. The inputs are unchanged.

**Holiday note:** if any lead's Day-10 "Soft Ask" or Day-17 "Urgency Nudge" touch lands on Thanksgiving Day itself, recommend shifting it one day to Friday — same message, better timing.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders. Full six-email and six-SMS copy is not drafted. Ask and it will be written.
