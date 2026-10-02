# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Thursday, October 1, 2026

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Strong schools build strong families, and strong families deserve a plan. 💙
Here in our community, PAHS families show up for each other every day. Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and we want to make sure the families behind those Friday-night lights are covered, too.
A quick protection review now means one less worry later. It takes a few minutes, with no pressure.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.

**Google Business Profile**
Proud to support PAHS and the families of our community. Life insurance, mortgage protection, and final expense planning can feel overwhelming. We keep it simple and pressure-free. Scan the QR code on our community mailer or message us to start a quick protection review.

**Image idea:** PAHS-colored graphic with a postcard mock-up, large QR code, and the line "Protect what matters. Before life forces the conversation."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_oct26_d01` (GBP: `utm_source=gbp&utm_medium=post`)

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** Insurance is easiest to set up when life is calm. A 10-minute review now can confirm your family has enough coverage, the right beneficiaries, and a plan that fits your budget. Today's small step: write down who depends on your income. Then scan the QR code or DM "PROTECT" and we'll help you check it.

**SMS:** Quick tip from Latimore Life & Legacy: it's easier to review your family's protection plan before you need it. Small step today: list who relies on your income. Want help? Reply PROTECT.

**Talking point:** "Most families don't need a bigger plan, just a plan reviewed while life is calm, so nobody has to figure it out in a hard moment."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Want to grab a quick 15-minute call today or tomorrow? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote, next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. I'd like to make this easy: a short, no-pressure conversation to understand your family's situation and show you a few options.
Reply with a time that works, or use my booking link: [BOOKING LINK].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a short message exchange be easier? Either is fine.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days`.

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post today's PAHS-tied Facebook/GBP post with the tracked QR link, and send a QR-reminder to 10 existing PAHS-connected contacts with the Ethos postcard image.
2. **Why it matters:** Connects the physical postcard or direct-mail touchpoint to digital capture (awareness → interest → capture).
3. **Tracking:** Confirm the QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_oct26`. Use a separate UTM for each channel. Log scans, form submits, and DM "PROTECT" keywords in Supabase.
4. **Follow-up trigger:** Any new capture is contacted within 1 business hour (follow-up stage), and any reply or booking moves to conversion.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, DMs with "PROTECT", and calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], hope you're doing well. I'm helping local families get their protection plans reviewed before they need them. If someone in your circle comes to mind, a friend or fellow PAHS parent, I'd be glad to help. They can scan the QR code or DM "PROTECT". Thanks for trusting me.

**Social:** Know a family that's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT". Helping one family protect what matters helps our whole community. 💙

**In-person:** "If you know another family who'd like a simple, no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or would you rather pass along my card?"

**Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT". We'll take great care of them.*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** Post the PAHS community post | Visible local proof builds authority | Publish FB + GBP post by 9 AM | Engagement + QR scans | Jackson / marketing |
| 2 | **Leads:** Same-day follow-up on every new capture | Speed-to-lead drives booking | Send SMS/email/DM within 1 hour | Booked conversations | Jackson |
| 3 | **Authority system:** Verify QR/UTM tracking end to end | Unmeasured campaigns can't be improved | Test scan → lead → Supabase row | Clean attribution data | Ops / Jackson |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Pipeline stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Tag every record with source + campaign + stage. Stop messaging on booking, reply (pause for manual), or opt-out.

## 8. Tomorrow's Review Questions

1. How many QR scans and form submits came from PAHS materials?
2. How many new leads were contacted within 1 hour?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads need a manual call (no reply by Day 10)?
5. Did any referral conversations start?

---

# Addendum: Email Drip Campaign System (Latimore OS), Condensed

**Why:** One follow-up rarely earns trust. Six spaced touches over 30 days keep Latimore helpful, local, and top of mind with no pressure.

**Cadence:** Day 0 Welcome · Day 2 Education · Day 5 Social Proof · Day 10 Soft Ask · Day 17 Urgency Nudge · Day 30 Re-engagement

| Source | Sequence | Tags | Exit |
|---|---|---|---|
| PAHS QR code | Family Protection / Community Trust | `src_pahs_qr`, `seq_family_protection`, `stage_new` | Booked / replied / opted out |
| Website consult form | General Protection Review | `src_website`, `seq_general_review` | same |
| Ethos quote request | Fast Term / Living Benefits | `src_ethos`, `seq_fast_term` | same |
| Retirement inquiry | Annuity / Safe Money | `src_retirement`, `seq_safe_money` | same |
| Facebook DM "PROTECT" | Life Insurance Education | `src_fb_dm`, `seq_life_ed` | same |
| Google Business Profile | Local Trust / Policy Review | `src_gbp`, `seq_local_review` | same |

**Touch themes:** D0 confirm receipt and set expectations · D2 simple coverage-need framework (income, debts, years of support, final costs) · D5 local and community credibility (PAHS support) · D10 invite a low-pressure review · D17 explain the risk of waiting without fear · D30 fresh value and reopen the loop.

**Automation rules:** (1) New lead + source → apply tags, send Day 0, schedule remaining touches. (2) Books → stop sequence, stage Booked, reminder task. (3) Replies → pause automation, stage Engaged. (4) Opts out → stop all messaging, tag Opted Out. (5) No reply or booking after Day 10 → manual call task for Jackson. (6) Day 30 with no engagement → tag Cold, move to long-term nurture.

**KPI targets:** Open 35%+ · CTR 3–8% · Reply 5%+ · Booking 10–20% · Completion 80%+ · Cold revival 5–10%. Weekly: review the numbers, A/B test subject lines and CTA phrasing.

**Compliance:** Include opt-out language and the business address footer (CAN-SPAM / TCPA).

> ⚠️ **Open items before launch:** `phone_number` (`(###) ###-####`), `booking_link` (`https://your-booking-link.com`), and `crm_name` are still placeholders. Full email and SMS copy for all six touches has not been drafted here. Say the word and I'll write it.
