# Latimore Life & Legacy Daily Marketing Command Brief
Date: Monday, November 2, 2026

## 1. Facebook / Google Business Profile Post
**Facebook:**
Our PAHS families show up for each other, on the field, in the classroom, and at home. 💙 Here's a quiet question for this Monday: if something unexpected happened, would your family know exactly what to do next? A short protection review now means fewer hard decisions later. Latimore Life & Legacy is proud to support PAHS and the families who make this community strong. Scan the QR code on our postcard or DM "PROTECT" and we'll walk you through it. No pressure, just clarity.

**Google Business Profile:**
Proud to support PAHS and local families. A quick protection review (life insurance, final expense, mortgage protection, or legacy planning) helps your family stay ready. Scan the QR code or message us to get started.

**Graphic idea:** PAHS-colored card with the line "Protect what matters before life forces the conversation," the QR code, and "DM PROTECT."
**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov2026_w1` (GBP: `utm_source=gbp&utm_medium=post`)

## 2. Client Education Tip: Review your plan before you need it
- **Caption:** Think of a protection plan like a spare key. You hope you never need it, but you're glad it's in the drawer. Today's one small step: write down who depends on your income and what they'd need covered (bills, mortgage, final expenses). Then scan the QR code to talk it through.
- **SMS:** Quick tip from Latimore Life & Legacy: list who depends on you and what they'd need covered. That's step one of a protection plan. Want help? Reply PROTECT. Reply STOP to opt out.
- **Talking point:** "Reviewing your coverage now is just making sure the people you love have options later."

## 3. New-Lead Follow-Up (QR / PAHS campaign lead)
- **SMS:** Hi [First Name], this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS code. Would a quick 10-minute call be helpful, or would you rather I text you a few options? Reply STOP to opt out.
- **Email:** Subject: Your family protection request. Short note thanking them, restating their interest (family protection quote), offering two choices (book a call via booking link or reply with best time), signed Jackson Latimore.
- **DM:** Hi [First Name]! Thanks for reaching out. Want me to send a simple overview, or set up a short call?
- **Supabase status:** `new_lead` → `contacted` once the first message is sent; tag `src:pahs_qr`, `seq:family_protection`.

## 4. PAHS / Community Campaign Action
1. **Action:** Post the PAHS-supporter post above, then confirm the Ethos postcard QR code resolves to the tracked lead-capture page and carries UTM `utm_campaign=pahs_postcard`.
2. **Why:** Connects the physical mailer to measurable digital capture (awareness → interest → capture).
3. **Tracking:** Log each QR scan, form submit, and DM "PROTECT" with source, campaign, and timestamp.
4. **Follow-up trigger:** Any new capture gets a text within 1 business hour. Any capture with no reply after 10 days creates a manual call task.
5. **Metric for tomorrow:** Scans → submissions → conversations booked (count and conversion rate).

## 5. Referral Prompt
- **Text:** Hi [Name], if you know a family who's been meaning to get their protection plan in order, I'd be glad to help them, no pressure. They can scan the QR code or DM "PROTECT."
- **Social:** Know a family who could use a stress-free protection review? Send them our way. Scan the QR code or DM "PROTECT."
- **In person:** "Is there a family you care about who might want a simple check-in on their coverage? I'm happy to make it easy."
- **Card:** "Help a family you love protect what matters. Scan or DM PROTECT."

## 6. Top 3 Business Priorities
1. **Build trust:** Publish the PAHS community post. Why: it reinforces local credibility. Action: post to Facebook and GBP by noon. Result: engagement plus first QR scans. Owner: Jackson.
2. **Capture/advance leads:** Respond to every open lead and DM within 1 hour. Action: send follow-ups and update pipeline status. Result: more booked conversations. Owner: Jackson.
3. **Strengthen community authority:** Verify QR and UTM tracking end to end. Action: test-scan the postcard QR and confirm the record lands in Supabase. Result: reliable campaign data. Owner: Jackson or tech support.

## 7. Tracking Notes for Supabase
Fields to log: `source`, `utm_campaign`, `utm_medium`, `lead_stage`, `first_contact_at`, `next_action_due`, `referred_by`. Stages: awareness, interest, capture, follow-up, conversion.

## 8. Tomorrow's Review Questions
- How many QR scans, form submissions, and "PROTECT" DMs came in?
- Were all leads contacted within 1 hour?
- Which post or channel drove the most traffic?
- Any lead stuck without a next action?

---
Compliance reminder: no specific rates, guarantees, or policy-performance claims in posts. Include opt-out language on texts and confirm the booking link and phone number placeholders are filled before sending.
