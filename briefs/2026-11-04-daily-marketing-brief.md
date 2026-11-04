# Latimore Life & Legacy Daily Marketing Command Brief
Date: Wednesday, November 4, 2026

## 1. Facebook / Google Business Profile Post
**Facebook:**
Some conversations are easier to have before life forces them. 💙
Here in our PAHS community, families look out for each other, and a quick protection review is one more way to do it. Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach. Whether it's covering the mortgage, final expenses, or leaving something behind for the people you love, a 15-minute review today can bring peace of mind.
👉 Scan the QR code on your PAHS postcard, or DM "PROTECT" and we'll take it from there. No pressure, just clarity.

**Google Business Profile:**
Proud to support PAHS and local families. If you've never reviewed your life insurance, mortgage protection, or final expense plan, now is a good time to start. Scan the QR code from our community mailer or message us "PROTECT" to book a no-pressure review.

**Image idea:** Photo of the PAHS postcard with the QR code, with the headline "Protect what matters, before you need to."
**UTM label:** `utm_source=facebook|gbp&utm_medium=social&utm_campaign=pahs_community_nov2026&utm_content=protect_review_1104`

## 2. Client Education Tip: Review Your Plan Before You Need It
**Social caption:** Insurance works best when it's in place before you need it. Coverage costs less and is easier to qualify for while you're healthy. Today's one small step: write down who depends on you and what they'd need to keep their home and routine. Then scan the QR code or DM "PROTECT" for a free walkthrough.
**SMS:** Hi {{first_name}}, quick tip: the best time to review family protection is before you need it. Take 5 min today to list who depends on you. Want help? Reply PROTECT. Reply STOP to opt out.
**In-person talking point:** "A plan is easiest to set up when life is calm, so let's look at what your family would need and make one small step today."

## 3. New-Lead Follow-Up (QR / PAHS campaign, Stage: New Lead)
**SMS:** Hi {{first_name}}, this is Jackson at Latimore Life & Legacy. Thanks for scanning the PAHS postcard! I'd love to help you look at family protection. Does a quick call today or tomorrow work better? Reply STOP to opt out.
**Email:** Subject: Your family protection quote, next steps
Hi {{first_name}}, thank you for reaching out through the PAHS community mailer. I'll review what you shared and can walk you through simple options in about 15 minutes. Reply with a time that works, or book here: [booking link]. No pressure, just clear answers.
Jackson Latimore | Latimore Life & Legacy
**Messenger/DM:** Hi {{first_name}}! Thanks for reaching out. Want me to send a couple of quick options for protecting your family? Reply "yes" or tell me a good time to talk.
**Supabase next status:** `new_lead` → `nurturing` after first contact is sent (move to `engaged` on reply).

## 4. PAHS / Community Campaign Action
1. **Today's action:** Post the Section 1 content and send a reminder to the last 7 days of postcard/direct-mail recipients to scan the QR code. Confirm the QR code points to the tracked lead-capture page.
2. **Why it matters:** It links the physical PAHS touchpoint (awareness) to digital capture, and your sponsorship builds trust (interest).
3. **Tracking:** Use `utm_campaign=pahs_community_nov2026` with `utm_source` set to postcard, facebook, or gbp. Log each scan and submission in Supabase `leads.source_campaign`.
4. **Follow-up trigger:** Any new lead gets contacted within 1 business hour (SMS plus email), and is moved to `nurturing`.
5. **Metric for tomorrow:** QR scans, form submissions, scan-to-lead rate, contacts made, and conversations booked.

## 5. Referral Prompt
**Text:** Hi [Name], I'm grateful for you. If you know a family who hasn't looked at their protection plan, I'd be glad to help them with a no-pressure review. They can scan the QR code or DM "PROTECT" on Facebook.
**Social:** Know a family that would benefit from a protection check-in? Tag or share this post. Helping one family protect what matters can make a lasting difference. Scan the QR code or DM "PROTECT."
**In person:** "Is there another parent or family you care about who might want a simple look at their coverage? I'm happy to help, and no pressure on them."
**Referral card:** Help a family you love protect what matters. Scan the QR code or DM "PROTECT."

## 6. Top 3 Business Priorities
1. **Build trust:** Post the PAHS community message. Action: publish to Facebook and GBP by 10 AM. Result: visibility and trust. Owner: Jackson.
2. **Capture and advance leads:** Contact every new lead within 1 hour. Action: send SMS and email follow-ups and update Supabase stages. Result: more booked conversations. Owner: Jackson.
3. **Strengthen community authority:** Verify the QR code, UTM links, and Supabase tracking for the PAHS mailer. Action: test a scan end to end. Result: clean campaign data. Owner: Jackson or ops support.

## 7. Tracking Notes for Supabase
- Tag fields: `source`, `source_campaign=pahs_community_nov2026`, `utm_*`, `pipeline_stage`, `first_contact_at`, `next_action_at`.
- Stages: awareness → interest → capture → follow-up → conversion (map to New Lead, Nurturing, Engaged, Booked, Closed Won).
- Log the post time and platform so reach can be tied to scans.

## 8. Tomorrow's Review Questions
- How many QR scans and form submissions came in, and from which source?
- Was every new lead contacted within 1 hour?
- Which post got the most engagement or DMs ("PROTECT")?
- How many conversations were booked, and what is the next best action for stalled leads?
- Which referral asks went out, and who needs a follow-up?

*Compliance note: no guarantees of coverage, pricing, or approval; include opt-out language on all SMS and email; this is educational content, not individualized advice.*
