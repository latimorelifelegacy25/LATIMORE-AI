# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Saturday, October 31, 2026 (Halloween; weekend, so lighter cadence)

---

## 1. Facebook / Google Business Profile Post

**Facebook:**
Tonight the kids are out collecting candy, and for a lot of PAHS families that means a full house and a busy night. 🎃
Between the costumes and the chaos, here's one small thing worth doing this weekend: take 10 minutes to ask, "If something happened, would my family be okay?"
A protection plan isn't about fear. It's about making sure the people you love are covered, whatever tonight's weather brings. We're proud to support PAHS and the families who make our community strong.
Want a simple, no-pressure look at your options? **Scan the QR code** or **DM "PROTECT"** and we'll take it from there.
Happy Halloween, neighbors. 💙

**Google Business Profile:**
Proud to support PAHS and local families. A protection review takes about 10 minutes and carries no obligation. Scan the QR code on our PAHS materials or message us "PROTECT" to get started.

**Graphic idea:** Warm orange-and-navy "Protect what matters" card, with the PAHS partnership line and a QR code in the corner.
**UTM:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_oct26_halloween` (GBP: `utm_source=gbp&utm_medium=post`)

---

## 2. Client Education Tip: Review your plan before you need it

- **Caption:** The best time to review your protection plan is before you need it. This weekend, write down 3 things: who depends on you, what bills would continue without you, and what you'd want to leave behind. That's the start of a plan. Scan the QR code or DM "PROTECT" and we'll walk through it together.
- **SMS:** Hi, it's Jackson at Latimore Life & Legacy. Quick tip: list who depends on you and which bills would continue without you. That's step one of a protection plan. Want help with it? Reply PROTECT. Reply STOP to opt out.
- **Talking point:** "A plan made before you need it costs less and means your family never has to guess what you wanted."

---

## 3. New-Lead Follow-Up (QR, Facebook, GBP, referral, postcard)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for requesting a family protection quote. Would a quick call or a text exchange be easier for you? Reply STOP to opt out.

**Email:** Subject: Your family protection quote
Hi [First Name], thank you for your interest in a family protection quote through our PAHS community campaign. I'd like to understand what matters most to your family before suggesting anything. Would a 15-minute call work this week, or would you rather reply with a few details? Either works.
Jackson Latimore | Latimore Life & Legacy LLC

**Messenger/DM:** Hi [First Name]! Thanks for reaching out. Would a quick call or a short message exchange be easier? Either is fine.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at` = next business morning (Monday).

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post the above with the tracked QR link. If any PAHS families or Halloween events are nearby, hand out or text the Ethos postcard image with its QR code to 10 contacts.
2. **Why it matters:** It connects the physical postcard touchpoint to digital capture (awareness, interest, capture).
3. **Tracking:** `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_oct26`, plus a separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Weekend captures get a first touch the same day if possible, otherwise Monday morning.
5. **Metric for Monday:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

- **Text:** Hi [Name], hope your Halloween is fun! If a friend or fellow PAHS family comes to mind who'd like a simple look at their protection, I'd be glad to help. They can scan the QR code or DM "PROTECT." Thank you for trusting me.
- **Social:** Know a family who's been meaning to review their protection plan? Send them our way. Scan the QR code or DM "PROTECT." 💙
- **In person:** "If you know another family who'd like a no-pressure look at their protection, I'd be honored to help. Want me to send them a note, or pass along my card?"
- **Referral card:** *Know a family who should have a plan? Scan, or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

| # | Priority | Why | Action | Expected result | Owner |
|---|---|---|---|---|---|
| 1 | **Trust:** publish the PAHS community post | Visible local proof builds authority | Approve and post FB + GBP today | Engagement and QR scans | Jackson |
| 2 | **Leads:** clear the weekend capture queue | Speed-to-lead drives booking | Contact unworked leads today or Monday AM; set `next_followup_at` | Booked conversations | Jackson |
| 3 | **Authority system:** close launch blockers | Placeholders block the drip and follow-ups | Replace phone, booking link, and CRM name; test scan to lead to Supabase row | Clean attribution, live drip | Jackson / Ops |

---

## 7. Tracking Notes for Supabase

- Fields: `source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_touch_at`, `last_touch_at`, `next_followup_at`, `owner`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Stop messaging on booking, pause on reply, stop all on opt-out.
- Live Supabase data was not queried in this run. Pull lead counts manually.

## 8. Tomorrow's / Monday's Review Questions

1. How many QR scans and form submits came from PAHS materials over the weekend?
2. How many new leads were contacted within 1 business hour?
3. Which channel (FB, GBP, DM, postcard) produced the most captures?
4. Which leads reached Day 10 with no reply and need a manual call?
5. Did any referral conversations start?

---

## Addendum: Email Drip Campaign System (Latimore OS)
The six-stage, 30-day drip (Day 0, 2, 5, 10, 17, 30), source tags, automation rules, and KPI targets are unchanged from `daily-brief-2026-10-01.md` and `public/workflow-presets/latimore-email-drip-campaign.json`.

**Still blocking launch:** `phone_number`, `booking_link`, and `crm_name` remain placeholders. Full six-email and six-SMS copy is not drafted.

*Compliance: insurance products are subject to underwriting approval. Nothing here is a guarantee of rates, benefits, or coverage.*
