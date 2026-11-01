# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Sunday, November 1, 2026

## 1. Facebook / Google Business Profile Post
**Facebook:**
Some of the best things we do for our kids and neighbors start with showing up. Here in the PAHS community, families lean on each other, and a little planning now helps protect what matters most later. 💙
Latimore Life & Legacy is proud to support PAHS, and we'd love to help your family take one simple step this week: a no-pressure look at your protection plan.
👉 Scan the QR code on our postcard, or DM "PROTECT" and we'll reach out.

**Google Business Profile:**
Proud to support PAHS and the families around it. Life insurance, final expense, mortgage protection, and legacy planning explained in plain English, with no pressure. Scan the QR code on our mailer or message us to start a conversation about protecting your family.

**Graphic idea:** Photo of the PAHS sponsorship banner or a local scene, with the QR code and the line "Protect what matters. Start with one conversation."
**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_community_nov2026&utm_content=sun_1101_post` (GBP: `utm_source=gbp&utm_medium=post`)

## 2. Client Education Tip
**Topic:** Review your protection plan before you need it.
**Social caption:** Life changes: a new baby, a home, a new job. A quick yearly check-in makes sure your coverage still fits your family. It takes about 15 minutes. Today's small step: write down who depends on your income. Scan the QR code to talk it through.
**SMS:** Hi, quick tip from Latimore Life & Legacy: once a year, check that your coverage still matches your family's needs. Takes 15 min. Want help? Reply PROTECT. Reply STOP to opt out.
**In-person talking point:** "A protection plan works best when it's reviewed before life forces the conversation. Let's take 15 minutes and see if it still fits."

## 3. New-Lead Follow-Up Message (template; lead name/source from CRM)
**SMS:** Hi [First name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS QR code! I'd be glad to help with your family protection quote. Easier by call or text? Reply STOP to opt out.
**Email:** Subject: Your family protection quote. Hi [First name], thank you for reaching out through the PAHS community campaign. I'll keep this simple: a short call to learn about your family, then clear options with no pressure. Reply with a good time or use my booking link. - Jackson Latimore
**Messenger/DM:** Hi [First name]! Thanks for your interest. Want to chat here, or would a quick call be better?
**Supabase next status:** `new_lead` → `contacted` (set `nurturing` after first reply or Day 2 touch)

## 4. PAHS / Community Campaign Action
1. **Today's action:** Post the Section 1 content with a unique UTM link and a QR-linked image; confirm the Ethos postcard QR points to the tracked lead-capture page.
2. **Why it matters:** Ties the physical mailer to measurable digital capture (awareness → interest → capture).
3. **Tracking:** Log utm_source/medium/campaign/content per post; check QR scans vs. form submissions.
4. **Follow-up trigger:** Any new submission gets contact within 1 business hour (Monday AM for weekend leads).
5. **Review tomorrow:** QR scans, form completions, DMs with "PROTECT", booked conversations.

## 5. Referral Prompt
**Text:** Hi [Name], hope you're well. If you know a family who'd benefit from a no-pressure look at their protection plan, I'd be honored to help. Scan the QR code or have them DM "PROTECT." Thank you!
**Social:** Know a family who hasn't reviewed their protection plan? Send them our way. Scan the QR code or DM "PROTECT."
**In-person script:** "Is there a family you care about who might want a simple review of their coverage? I'm happy to make it easy and pressure-free."
**Card copy:** Protect another family. Scan the QR code or DM "PROTECT."

## 6. Top 3 Business Priorities
1. **Build trust:** Publish the PAHS community post. Why: visible local support anchors credibility. Result: engagement + QR scans. Owner: Jackson/marketing.
2. **Capture & advance leads:** Clear all open leads and send follow-ups. Result: bookings from weekend submissions. Owner: Jackson.
3. **Strengthen community authority:** Verify QR/UTM tracking end to end. Result: clean attribution data in Supabase. Owner: Ops/marketing.

## 7. Tracking Notes for Supabase
Fields: lead_source, utm_source, utm_medium, utm_campaign, utm_content, pipeline_stage, first_contact_at, next_action_at. Tag all today's traffic `pahs_community_nov2026`.

## 8. Tomorrow's Review Questions
- How many QR scans and form submissions came in, and from which asset?
- How fast was first contact on each lead?
- Which post/UTM drove the most DMs?
- Which leads need a Day 2 follow-up?

*Compliance reminders: no coverage/rate guarantees; include opt-out language on texts; have licensed-agent review before publishing.*

---

# Appendix — Email Drip Campaign System (Latimore OS) — condensed
**Open items before launch:** phone number `(###) ###-####`, booking link `https://your-booking-link.com`, and CRM name are still placeholders. Fill them in before any message goes out.

**Cadence:** Day 0 Welcome · Day 2 Education · Day 5 Social proof · Day 10 Soft ask · Day 17 Urgency nudge · Day 30 Re-engagement.

| Source | Sequence | Tags |
|---|---|---|
| PAHS QR code | Family Protection / Community Trust | src_pahs_qr, seq_family_protection |
| Website form | General Protection Review | src_web_form, seq_general_review |
| Ethos quote request | Fast Term / Living Benefits | src_ethos, seq_fast_term |
| Retirement inquiry | Annuity / Safe Money | src_retirement, seq_safe_money |
| Facebook DM "PROTECT" | Life Insurance Education | src_fb_dm, seq_life_edu |
| Google Business Profile | Local Trust / Policy Review | src_gbp, seq_local_review |

**Emails (all signed Jackson Latimore, Founder | Protection & Retirement Advisor, Latimore Life & Legacy LLC; CTA = booking link; footer = unsubscribe + business address):**
- **Day 0** "Got your request, here's what happens next": confirms receipt, sets expectations (short call, plain English, no pressure).
- **Day 2** "A simple way to estimate coverage": income-years + debts + final expenses + goals framework.
- **Day 5** "Families in the Coal Region we've helped": local/community credibility (PAHS support); no guarantees or unverified testimonials.
- **Day 10** "Want a second set of eyes?": invites a low-pressure 15-minute review.
- **Day 17** "Why timing matters": health and rates can change; plain explanation, no fear.
- **Day 30** "Still thinking it over?": fresh value (checklist) and reopens the loop.

**SMS companions (<240 chars, each with STOP opt-out):** e.g., Day 0 "Hi {{first_name}}, Jackson at Latimore Life & Legacy. Got your request and will be in touch shortly. Reply STOP to opt out."

**Automation:** On entry apply tags, send Day 0, schedule remaining touches. Books → stop, stage Booked, reminder task. Replies → pause, stage Engaged. Opts out → stop all, tag Opted Out. No reply/booking after Day 10 → manual call task for Jackson. Day 30 no engagement → tag Cold, long-term nurture.
Flow: Lead → tags → drip → (reply/book/task) → pipeline move.

**KPIs:** open 35%+, CTR 3–8%, reply 5%+, booking 10–20%, completion 80%+, cold revival 5–10%. Weekly 10-min review; A/B test subject lines and CTA phrasing.
