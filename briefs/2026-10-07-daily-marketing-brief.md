# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Wednesday, October 7, 2026

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Midweek check-in for our PAHS families. 💙
Between practices, homework, and work schedules, protection is usually the thing that gets pushed to "later." Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and we'd love to help your family take one small step today.
A quick, no-pressure protection review can confirm your family is covered the way you intend.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.

**Google Business Profile**
Proud to support PAHS and the families of our community. Life insurance, mortgage protection, and final expense planning, explained in plain English with no pressure. Scan the QR code on our community mailer or message us to start a quick protection review.

**Image idea:** Clean PAHS-colored graphic: a family at a kitchen table with a calendar, large QR code, and the line "One small step for the people who count on you."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_oct26_d07` (GBP: `utm_source=gbp&utm_medium=post`)

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** A protection plan works best when it is reviewed while life is calm. Three quick questions: Who depends on your income? Does your coverage still match your home, family, and budget? Are your beneficiaries current? Answer those today, then scan the QR code or DM "PROTECT" and we'll walk through it together.

**SMS:** Latimore Life & Legacy tip: review your family's protection plan before you need it. Small step today: check that your beneficiaries are current. Want a hand? Reply PROTECT. Reply STOP to opt out.

**Talking point:** "A review now is just a conversation; waiting until later is when it becomes a scramble for your family."

---

## 3. New-Lead Follow-Up (Source: QR / PAHS community campaign, Stage: New Lead)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS postcard and asking about a family protection quote. Would a quick 15-minute call today or tomorrow work? Reply "CALL" or "EMAIL" and I'll take it from there. Reply STOP to opt out.

**Email**
Subject: Your family protection quote, next step
Hi [First Name],
Thank you for reaching out through the PAHS community campaign. I'd like to keep this easy: a short, no-pressure conversation to understand your family's situation and walk through your options.
Reply with a time that works, or use my booking link: [BOOKING LINK].
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | [PHONE]

**Messenger/DM:** Hi [First Name]! Thanks for your interest in a family protection quote through the PAHS campaign. Would a quick call or a few messages here be easier? Either works for me.

**Supabase next status:** `contacted` (attempt 1), `last_touch_at = now()`, `next_followup_at = +2 days`.

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post today's PAHS-tied Facebook/GBP post with the tracked QR link, then text the QR-reminder (postcard image attached) to 10 PAHS-connected contacts who have not yet scanned.
2. **Why it matters:** Connects the physical postcard/direct-mail touchpoint to digital capture (awareness → interest → capture).
3. **Tracking:** Confirm the QR destination carries `utm_source=pahs_postcard&utm_medium=qr&utm_campaign=pahs_protect_oct26`. Use a distinct `utm_medium` per channel (social, sms, gbp). Log scans, form submits, and DM "PROTECT" keywords in Supabase.
4. **Follow-up trigger:** Any new capture is contacted within 1 business hour (follow-up stage); any reply or booking moves to conversion.
5. **Metric for tomorrow:** QR scans, form submits, scan-to-lead rate, "PROTECT" DMs, and calls booked.

---

## 5. Referral Prompt

**Text:** Hi [Name], thank you for trusting me with your family's protection. If you know another family who has been meaning to review theirs, I'd be glad to help them the same way. They can scan the QR code on our PAHS postcard or DM me "PROTECT."

**Social post:** The best compliment we get is when a family sends someone they care about our way. If you know a parent, homeowner, or neighbor who has been putting off a protection conversation, share this post or send them our way. Scan the QR code or DM "PROTECT."

**In-person script:** "Who's one family you know that would feel better having this conversation before life forces it? I'm happy to keep it simple and pressure-free for them."

**Referral card copy:** *Help another family protect what matters. Scan the QR code or DM "PROTECT."*

---

## 6. Top 3 Business Priorities

1. **Capture and contact every new QR/PAHS lead fast**
   - Why: Speed builds trust and lifts conversion. Action: Contact all new leads within 1 business hour using today's SMS/email. Result: Higher contact and booking rate. Owner: Jackson.
2. **Publish the PAHS trust post and QR reminder**
   - Why: Keeps the community authority system visible. Action: Post Facebook/GBP and text 10 contacts. Result: More tracked scans and DMs. Owner: Jackson / marketing support.
3. **Ask for 3 referrals**
   - Why: Referrals come with built-in trust. Action: Send the referral text to 3 satisfied clients or PAHS contacts. Result: At least one warm introduction. Owner: Jackson.

---

## 7. Tracking Notes for Supabase
- `source`: qr_pahs_postcard | facebook | gbp | referral | direct_mail
- `campaign`: pahs_community_2026_10 (UTM campaign `pahs_protect_oct26_d07`)
- `pipeline_stage`: New Lead → Nurturing → Engaged → Booked → Closed Won/Lost (Opted Out, Cold, No Response as needed)
- Log first-contact timestamps to measure response time; log `referral_requests_sent`.

## 8. Tomorrow's Review Questions
- How many QR scans and "PROTECT" DMs came in today?
- Were all new leads contacted within 1 business hour?
- How many conversations were booked?
- Which channel (Facebook, GBP, SMS, postcard) drove the most captures?
- How many referral asks were sent and how many replied?

*Notes: Placeholders remain for phone, booking link, and CRM, so fill those before sending. The Email Drip Campaign Engine is a one-time build with unfilled placeholders (phone, booking link, CRM) and was not run in this daily brief. Review SMS/email for TCPA/CAN-SPAM opt-out language before sending.*
