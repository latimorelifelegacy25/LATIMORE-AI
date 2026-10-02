# Latimore Life & Legacy Daily Marketing Command Brief
Date: Friday, October 2, 2026

## 1. Facebook / Google Business Profile Post

**Facebook**
It's Friday in PAHS country, and the whole community shows up for the people they love. 💙
Protecting your family works the same way: a small step now means your people are covered later. Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and we'd love to help the families behind the Friday-night lights get a plan in place.
It takes a few minutes, with no pressure.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.

**Google Business Profile**
Proud to support PAHS and our neighbors. Latimore Life & Legacy helps local families with life insurance, final expense, mortgage protection, and legacy planning, in plain English and with no pressure. Scan the QR code on our community mailer to start a quick protection review.

**Image idea:** Friday-night-lights style graphic, with the postcard and large QR code in the foreground. Overlay: "Protect what matters. Start with one scan."
**UTM label:** `utm_source=facebook|gbp&utm_medium=social&utm_campaign=pahs_community_2026_10&utm_content=friday_lights_1002`

## 2. Client Education Tip: Know What You Already Have

**Social caption:** Before you buy anything, find out what your family already has. Check any coverage through work, existing policies, and who is named as beneficiary. Beneficiaries that are out of date are one of the most common and fixable gaps. Today's small step: find your beneficiary designations. Then scan the QR code and we'll help you review the rest.

**SMS:** Quick tip from Latimore Life & Legacy: check who's listed as beneficiary on your policies and work benefits. It takes 5 minutes and can matter a lot. Want help? Reply PROTECT.

**Talking point:** "Protection starts with knowing what you already have, so let's look at your beneficiaries first."

## 3. New-Lead Follow-Up (template)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for reaching out through our PAHS community campaign. Would a quick 10-minute call work this week, or should I text a few options? Reply CALL or OPTIONS. Reply STOP to opt out.

**Email:** Subject: Your family protection question. Hi [First Name], thank you for reaching out. There's no pressure. I'd like to hear what you're hoping to protect and answer your questions. Pick a time here: [booking link], or reply with what works for you. Jackson Latimore, Founder | Protection & Retirement Advisor, Latimore Life & Legacy.

**Messenger/DM:** Hi [First Name]! Thanks for messaging PROTECT. What matters most right now: the mortgage, final expenses, or leaving something behind for your family?

**Supabase status:** `New Lead` → `Nurturing` on first message → `Engaged` on reply.

## 4. PAHS / Community Campaign Action

1. **Action:** Post today's PAHS post and pin it. Before the weekend, send a tracked follow-up to every postcard-QR lead from the past 7 days still in `New Lead` or `Nurturing`. Confirm the QR destination is live (Friday is when weekend traffic starts).
2. **Why it matters:** It moves community members from awareness to capture and booked conversations. Leads that sit over a weekend go cold.
3. **Tracking:** `utm_campaign=pahs_community_2026_10`. Log each scan, form submit, and DM keyword in Supabase with source and timestamp.
4. **Follow-up trigger:** New lead gets a same-day touch. No reply after 48 hours gets a second touch. Monday's task list gets any Friday lead not reached.
5. **Review Monday:** weekend QR scans, DM "PROTECT" count, and conversations booked.

## 5. Referral Prompt

**Text:** Hi [Name], thank you for trusting me with your family's protection. If you know a parent or neighbor who's been meaning to get this sorted, I'm glad to help, no pressure. They can scan the QR code or DM PROTECT.

**Social:** Know a family who's been putting off the protection conversation? Send them our way. Scan the QR code or DM "PROTECT."

**In person:** "Who's one family in your circle who'd feel better with a plan in place? I'd be glad to help them the way I helped you."

**Referral card:** Help another family protect what matters. Scan the QR code or DM "PROTECT."

## 6. Top 3 Business Priorities

1. **Clear the lead queue before the weekend (captures/advances leads).** Why: speed of follow-up drives booked calls. Action: contact every lead in `New Lead`. Result: more booked conversations Monday. Owner: Jackson.
2. **Publish and pin the PAHS Friday post (creates trust).** Why: it reinforces community authority at peak local attention. Action: post to Facebook and GBP. Result: QR scans and DM "PROTECT" replies. Owner: Marketing/Jackson.
3. **Verify QR/UTM tracking end to end (strengthens the authority system).** Why: unmeasured campaigns can't be improved. Action: scan a live postcard QR and confirm the record lands in Supabase with its source. Result: clean attribution. Owner: Ops/Jackson.

## 7. Tracking Notes for Supabase
- `source`: qr_pahs_postcard | facebook | gbp | referral | direct_mail
- `campaign`: pahs_community_2026_10
- `pipeline_stage`: New Lead → Nurturing → Engaged → Booked → Closed Won/Lost (Opted Out, Cold, No Response as needed)
- Log first-contact timestamps to measure response time.

## 8. Monday's Review Questions
- QR scans and DM "PROTECT" messages this week vs. last?
- How many leads were contacted within 24 hours?
- How many conversations were booked?
- Which channel (Facebook, GBP, postcard, referral) drove the best leads?
- What one change should next week's posts make?

*Note: the Email Drip Campaign Engine is a one-time build and still has unfilled placeholders (phone, booking link, CRM), so it was not run in this daily brief.*
