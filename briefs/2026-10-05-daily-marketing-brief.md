# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Monday, October 5, 2026

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Monday reset: who in your house is counting on your paycheck? 💙
Families around PAHS and our surrounding community look out for each other. Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and we want the families behind the school to feel covered too.
A short protection review takes a few minutes and comes with zero pressure.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.

**Google Business Profile**
Proud to support PAHS and local families. Life insurance, mortgage protection, and final expense planning made simple and pressure-free. Scan the QR code on our community mailer or message us to start a quick protection review.

**Image idea:** Clean PAHS-colors graphic: postcard mock-up, large QR code, headline "Protect what matters, before life forces the conversation."

**UTM labels:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_oct26_d05` / GBP: `utm_source=gbp&utm_medium=post&utm_campaign=pahs_protect_oct26_d05`

---

## 2. Client Education Tip: Beneficiaries Are Part of the Plan

**Social caption:** A policy only works the way you intend if the paperwork matches your life. Marriages, new kids, and moves can all change who should be listed. Today's small step: write down who your beneficiaries are on each policy or work benefit, and check that they're still right. Want a second set of eyes? Scan the QR code or DM "PROTECT."

**SMS:** Quick tip from Latimore Life & Legacy: check that your beneficiaries still match your family today. It takes 5 minutes. Want help? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "Having coverage is step one; making sure it goes to the right people is what makes it work."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard about a family protection quote. Want a quick 15-minute call today or tomorrow? Reply "CALL" or "EMAIL." Reply STOP to opt out.

**Email**
Subject: Your family protection quote: next step
Hi [First Name],
Thanks for reaching out through the PAHS community campaign. Let's keep this easy: a short, no-pressure conversation to understand your family's situation and walk through options.
Reply with a time that works, or use my booking link: [BOOKING LINK].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a message exchange be easier? Either works.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days`.

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post today's PAHS-tied Facebook/GBP post with the tracked QR link; send the Ethos postcard image plus QR reminder to 10 PAHS-connected contacts.
2. **Why it matters:** Links the physical postcard/direct-mail touchpoint to digital capture (awareness → interest → capture).
3. **Tracking:** QR destination uses `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_oct26`; separate UTM per channel. Log scans, form submits, and "PROTECT" DMs in Supabase.
4. **Follow-up trigger:** Any new capture is contacted within 1 business hour; any reply/booking advances the stage.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], it's Jackson. If you know a family who's been meaning to sort out their protection plan, I'd be glad to help them, no pressure. They can scan the QR code on our PAHS postcard or DM me "PROTECT."

**Social:** Know a family that's been putting off the protection conversation? Send them our way. Scan the QR code or DM "PROTECT" and we'll keep it simple and pressure-free.

**In person:** "Is there someone you know who'd feel better with a quick review? I'm happy to make it easy for them."

**Referral card:** *Help a family protect what matters. Scan the QR code or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

1. **Trust: publish the PAHS post and tip.** Why: consistent community presence. Action: post by 10 AM. Result: engagement + scans. Owner: Jackson.
2. **Capture: contact every new lead within 1 hour.** Why: speed drives booked calls. Action: send SMS/email/DM from section 3; set Supabase status. Result: booked conversations. Owner: Jackson / lead intake.
3. **Authority: send the 10-contact PAHS QR reminder.** Why: converts the postcard touchpoint to measurable capture. Action: send reminders with tracked link. Result: scans and referrals. Owner: Jackson.

---

## 7. Tracking Notes for Supabase

- Confirm every lead row has `source`, `utm_campaign`, `stage`, `last_touch_at`, `next_followup_at`.
- Tag today's leads `pahs_protect_oct26`; log "PROTECT" DMs as `source=facebook_dm`.
- Flag leads with no touch in 48h.

## 8. Tomorrow's Review Questions

- How many QR scans vs. captured leads (scan-to-lead rate)?
- Time from capture to first contact?
- Which channel (Facebook, GBP, text, mail) drove the most scans?
- Which leads need a second touch or a booking nudge?

---
*Compliance reminder: no guarantees or specific rates/returns; include opt-out language on SMS; replace [BOOKING LINK] and [PHONE] placeholders before sending.*
