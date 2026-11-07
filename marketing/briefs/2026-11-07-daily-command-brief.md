# Latimore Life & Legacy Daily Marketing Command Brief
Date: Saturday, November 7, 2026

## 1. Facebook / Google Business Profile Post
**Facebook:**
Some of the best conversations about family happen before anything goes wrong. 💙
This weekend, take 5 minutes to ask: if something changed tomorrow, would my family know what to do and have what they need? Latimore Life & Legacy is proud to support PAHS and the families around us, and we're here to help you review your protection plan: life insurance, final expense, mortgage protection, and legacy planning. No pressure, just clarity.
👉 Scan the QR code on your PAHS postcard, or DM "PROTECT" and we'll reach out.

**Google Business Profile:**
Protecting your family starts with a simple review. Latimore Life & Legacy supports PAHS and local families with plain-English guidance on life insurance, final expense, mortgage protection, and legacy planning. Scan the QR code or message us "PROTECT" to get started.

**Graphic idea:** Warm photo of a family at a kitchen table, PAHS colors accent, QR code bottom-right, headline "Review it before you need it."
**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_community_nov2026&utm_content=review_before_need` (GBP: `utm_source=google_business&utm_medium=gbp_post`)

## 2. Client Education Tip: Review your plan before you need it
- **Caption:** Life changes: a new home, a new baby, a new job. Your protection should keep up. Once a year, check three things: who depends on you, what they'd need to cover (mortgage, bills, final expenses), and whether your coverage matches. One small step today: write down those three answers. Scan the QR code or DM "PROTECT" when you want a second set of eyes.
- **SMS:** Hi {{first_name}}, quick tip: once a year, list who depends on you and what they'd need covered. Want help reviewing it? Reply PROTECT. Reply STOP to opt out.
- **Talking point:** "A 15-minute review now means your family isn't making big decisions in a hard moment later."

## 3. New-Lead Follow-Up (QR / PAHS campaign, stage: New Lead)
- **SMS:** Hi {{first_name}}, this is Jackson from Latimore Life & Legacy. Thanks for scanning the PAHS code. Want a quick, no-pressure look at family protection options? Reply YES for a call or TEXT for details here. Reply STOP to opt out.
- **Email:** Subject: Your family protection request. Short note thanking them for scanning, restating the interest (family protection quote), two options (15-min call, or info by email), booking link, signature.
- **DM:** Hi {{first_name}}, thanks for reaching out! Would a quick call or a few options by message be easier?
- **Supabase status:** `new_lead` -> `contacted` on send; `engaged` on reply; `booked` on appointment.

## 4. PAHS / Community Campaign Action
1. **Action:** Post today's PAHS post with the tracked QR/UTM link; log how many Ethos postcards/direct-mail pieces are in homes this week.
2. **Why:** Connects the physical touchpoint to measurable digital capture.
3. **Tracking:** Confirm QR destination carries `utm_campaign=pahs_community_nov2026`; verify a test scan lands in Supabase with source tag.
4. **Follow-up trigger:** Any new scan/DM -> contact within 1 business day (Monday AM for weekend leads).
5. **Metric for tomorrow:** Scans, form completions, scan-to-lead rate, DMs with "PROTECT".
Pipeline mapping: awareness (post/postcard) -> interest (scan) -> capture (form) -> follow-up (SMS/email) -> conversion (booked review).

## 5. Referral Prompt
- **Text:** Hi [Name], thank you for trusting me with your family's plan. Do you know a parent or neighbor who'd benefit from a quick protection review? They can scan the QR code or DM "PROTECT". No pressure at all.
- **Social:** Know a family who's been meaning to review their protection? Tag them or send them our way. Helping one family protect what matters helps our whole community.
- **In-person:** "If someone came to mind while we talked, I'd be glad to offer them the same no-pressure review."
- **Card line:** "Know a family who should review their protection? Scan or DM PROTECT."

## 6. Top 3 Business Priorities
1. **Build trust:** Publish the PAHS community post. Why: visible local presence. Action: post by 10 AM. Result: engagement and QR scans. Owner: Jackson/marketing.
2. **Advance leads:** Clear every open lead in New Lead status. Action: send the follow-up above. Result: more replies/bookings. Owner: Jackson.
3. **Strengthen the system:** Verify QR/UTM tracking end to end. Action: test scan + Supabase row. Result: reliable campaign data. Owner: ops/Jackson.

## 7. Tracking Notes for Supabase
Fields: `lead_source`, `utm_campaign`, `utm_medium`, `pipeline_stage`, `first_contact_at`, `last_touch_at`, `referral_flag`. Stages: new_lead, contacted, engaged, booked, closed_won, closed_lost, opted_out.

## 8. Tomorrow's Review Questions
- How many scans/DMs came in, and from which asset?
- Did every new lead get a first touch within 24 hours?
- Which post/hook earned the most engagement?
- Any tracking gaps (missing UTM, unlogged leads)?

*Compliance note: general education only, no guarantees of coverage, rates, or approval. Include opt-out language on texts.*
