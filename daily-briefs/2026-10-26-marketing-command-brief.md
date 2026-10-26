# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Monday, October 26, 2026

## 1. Facebook / Google Business Profile Post

**Facebook**
Monday reminder for our PAHS families: the best time to talk about protection is before you need it. 💙

A short, calm conversation today can mean your family never has to guess about tomorrow. Mortgage protection, final expense planning, and legacy planning don't have to be complicated. We're proud to support PAHS and our neighbors through sponsorship, outreach, and the postcards many of you have seen in your mailbox.

Got our postcard? Scan the QR code to see where your family stands. Prefer a message? DM "PROTECT" and we'll reach out. No pressure, just clarity.

**Google Business Profile**
Supporting PAHS and our local families is why we do this work. If you've received our postcard, scan the QR code for a no-pressure look at life insurance, mortgage protection, or final expense planning. Prefer to talk first? Message us and we'll help.

**Image idea:** Photo of the PAHS community/sponsorship moment with the postcard QR code beside it and the text "Protection starts with a conversation."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_oct26_protect` (GBP: `utm_source=google_business&utm_medium=gbp_post&utm_campaign=pahs_oct26_protect`)

## 2. Client Education Tip
**Topic:** Review your protection plan before you need it.

- **Caption:** Life changes: a new home, a new baby, a new job. Your protection should keep up. Take 10 minutes this week to ask: if something happened tomorrow, would my family know what to do and have what they need? One small step today beats a hard conversation later. Scan the QR code or DM "PROTECT" to start.
- **SMS:** Quick tip from Latimore Life & Legacy: review your family's protection plan before you need it. 10 minutes can bring peace of mind. Want a simple walkthrough? Reply PROTECT. Reply STOP to opt out.
- **In-person talking point:** "Reviewing your coverage now, while things are calm, is just like checking smoke detector batteries: it's easier before you need it."

## 3. New-Lead Follow-Up Message
Template for a new lead (QR/postcard, PAHS community campaign; stage: New Lead).

- **SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the QR code. I'd be glad to walk you through family protection options, no pressure. Would a quick call today or tomorrow work? Reply STOP to opt out.
- **Email:** Subject: Thanks for reaching out, [First Name]. Hi [First Name], thank you for taking a step toward protecting your family. I saw your request come in through the PAHS community campaign. A short 15-minute conversation can help us understand what matters most to you and what fits your budget. Two options: reply with a time that works, or use my booking link. Warmly, Jackson Latimore, Latimore Life & Legacy.
- **Messenger/DM:** Hi [First Name]! Thanks for reaching out. Happy to answer questions about protecting your family. Want me to call, or send a few quick options here?
- **Supabase status:** `New Lead` → `Nurturing` once the first message is sent. Move to `Engaged` on reply.

## 4. PAHS / Community Campaign Action
1. **Action:** Audit and refresh the Ethos postcard QR destination. Confirm the QR opens the tracked lead-capture page with `utm_campaign=pahs_oct26_postcard`, and test it on two phones. Then publish today's FB/GBP post, which points to the same page.
2. **Why it matters:** A broken or untracked QR wastes campaign spend and loses the link between community trust and captured leads.
3. **Tracking:** Log scans, form submissions, and DMs containing "PROTECT" by source (`qr_postcard`, `facebook`, `gbp`) in Supabase.
4. **Follow-up trigger:** Any new lead gets a response within 1 business hour.
5. **Metric for tomorrow:** QR scans vs. form completions (capture rate), plus the number of booked conversations.

Pipeline mapping: awareness (post) → interest (QR scan) → capture (form/DM) → follow-up (1-hour response) → conversion (booked call).

## 5. Referral Prompt
- **Text:** Hi [Name], hope you're well. If you know a family who has been meaning to get their protection plan sorted, I'd be glad to help, no pressure. They can scan the QR code or DM "PROTECT" to us. Thanks for thinking of them.
- **Social:** Know a family that's been putting off the protection conversation? Tag or send them our way. We'll keep it simple and pressure-free. DM "PROTECT" to get started.
- **In person:** "If someone in your circle ever wonders about protecting their family, I'd be glad to talk with them. Would you feel comfortable passing along my info?"
- **Referral card:** *Know a family who should protect what matters? Scan the QR code or DM "PROTECT."*

## 6. Top 3 Business Priorities
1. **Verify the QR/UTM tracking path** (trust + capture): test the QR and form end to end. *Owner:* Jackson. *Result:* every scan is attributable.
2. **Respond to every open lead within 1 hour** (advance leads): clear the new-lead queue, send follow-ups from section 3. *Owner:* Jackson. *Result:* more booked conversations.
3. **Publish the PAHS-anchored post and ask for 3 referrals** (community authority): post section 1, send section 5 to three existing clients. *Owner:* Jackson. *Result:* visible local proof plus warm intros.

## 7. Tracking Notes for Supabase
- Tag every lead with `source`, `utm_campaign`, `pipeline_stage`, and `created_at`.
- Stages: New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold.
- Record first-response time and any opt-outs. Honor TCPA/CAN-SPAM requirements on all texts and emails.

## 8. Tomorrow's Review Questions
- How many QR scans, form submissions, and "PROTECT" DMs came in, and from which channel?
- Was every new lead contacted within an hour?
- Which post earned the most engagement or clicks?
- How many referrals were requested and received?
- What one change would improve capture rate tomorrow?

---
*Notes: placeholders ([First Name], booking link, phone) need your real values. The same-day lead's name and source were not provided, so section 3 is a template. Compliance: avoid income, return, or guarantee claims in any public post. The Email Drip Campaign Engine workflow in the same prompt is a one-time build, not a daily brief, so it was not run today.*
