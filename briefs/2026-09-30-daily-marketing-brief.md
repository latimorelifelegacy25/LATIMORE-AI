# Latimore Life & Legacy Daily Marketing Command Brief
Date: Wednesday, September 30, 2026

## 1. Facebook / Google Business Profile Post

**Facebook**
Most families don't plan for the hard days — they plan for the good ones. But the families we admire most in our PAHS community did one small thing early: they made sure the people they love would be okay no matter what.

Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach. If you've seen our postcard, you already have the easiest first step in your hands. It takes a couple of minutes, with no pressure.

👉 Scan the QR code, or DM "PROTECT" and we'll walk you through it.

**Google Business Profile**
Protecting your family shouldn't be complicated. Latimore Life & Legacy helps local families with life insurance, final expense, mortgage protection, and legacy planning, and we're proud to support PAHS and our neighbors. Scan the QR code on our postcard to start a no-pressure conversation today.

**Image idea:** Postcard with QR code beside a photo of a family at the kitchen table. Overlay: "One small step. Protect what matters."
**UTM label:** `utm_source=facebook|gbp&utm_medium=social&utm_campaign=pahs_community_2026_09&utm_content=protect_post_0930`

## 2. Client Education Tip: Review Your Plan Before You Need It

**Social caption:** Insurance is easiest to set up when nothing is wrong. A quick review now can show you what your family already has, what's missing, and what it might cost. Today's one small step: write down who depends on your income. Then scan the QR code to talk it through.

**SMS:** Quick tip from Latimore Life & Legacy: reviewing your family's protection plan early keeps your options open. Today, jot down who depends on you. Want help? Reply PROTECT.

**Talking point:** "A protection review is like checking your smoke detector: it takes five minutes now, and you'll be glad you did it."

## 3. New-Lead Follow-Up (template)

**SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning our PAHS community QR code. Would a quick 10-minute call this week work, or would you rather I text a few options? Reply CALL or OPTIONS.

**Email:** Subject: Your family protection question. Hi [First Name], thank you for reaching out through our PAHS community campaign. There's no pressure. I'd like to understand what you're hoping to protect and answer your questions. Here's my booking link: [booking link]. Or reply with a good time and I'll work around you. Jackson Latimore, Latimore Life & Legacy.

**Messenger/DM:** Hi [First Name]! Thanks for messaging PROTECT. What matters most to you right now: covering the mortgage, final expenses, or leaving something behind for your family?

**Supabase status:** `New Lead` → `Nurturing` once the first message is sent; → `Engaged` on reply.

## 4. PAHS / Community Campaign Action

1. **Action:** Post today's PAHS post and pin it. Send 10 tracked follow-ups to any postcard QR scans from the past 7 days. Confirm every postcard QR points to the UTM-tagged lead-capture page.
2. **Why it matters:** It connects the physical mailer (awareness) to captured leads (capture) and booked conversations (conversion).
3. **Tracking:** Use `utm_campaign=pahs_community_2026_09`. Log each scan, form submit, and DM keyword in Supabase with its source.
4. **Follow-up trigger:** Any new lead gets a same-day text or call. Any lead with no reply after 48 hours gets a second touch.
5. **Review tomorrow:** QR scans → leads captured → conversations booked (counts and conversion rates).

## 5. Referral Prompt

**Text:** Hi [Name], thank you for trusting me with your family's protection. If you know a parent or neighbor who has been meaning to get this sorted, I'm happy to help, no pressure. They can scan the QR code or DM PROTECT.

**Social:** Know a family who's been putting off the protection conversation? Send them our way. It takes minutes and could mean everything later. Scan the QR code or DM "PROTECT."

**In person:** "Who's one family in your circle who'd feel better with a plan in place? I'd be glad to help them the way I helped you."

**Referral card:** Help another family protect what matters. Scan the QR code or DM "PROTECT."

## 6. Top 3 Business Priorities

1. **Advance open leads (trust and capture).** Why: speed of follow-up drives booked calls. Action: contact every lead still in `New Lead` stage. Result: more booked conversations. Owner: Jackson.
2. **Publish the PAHS trust post.** Why: it reinforces community authority. Action: post to Facebook and GBP, and pin. Result: QR scans and DM "PROTECT" replies. Owner: Marketing/Jackson.
3. **Verify QR/UTM tracking end to end.** Why: unmeasured campaigns can't be improved. Action: scan a live postcard QR and confirm the record lands in Supabase with its source. Result: clean attribution. Owner: Ops/Jackson.

## 7. Tracking Notes for Supabase
- `source`: qr_pahs_postcard | facebook | gbp | referral | direct_mail
- `campaign`: pahs_community_2026_09
- `pipeline_stage`: New Lead → Nurturing → Engaged → Booked → Closed Won/Lost (Opted Out, Cold, No Response as needed)
- Log follow-up timestamps to measure response time.

## 8. Tomorrow's Review Questions
- How many QR scans and DM "PROTECT" messages came in vs. yesterday?
- How many leads were contacted within 24 hours?
- How many conversations were booked?
- Which channel (Facebook, GBP, postcard, referral) drove the best leads?
- What one adjustment should we make to tomorrow's post?

*Note: the Email Drip Campaign Engine workflow is a one-time build (placeholders for phone, booking link, and CRM are still unfilled), so it was not run in this daily brief.*
