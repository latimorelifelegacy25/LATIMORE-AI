# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Tuesday, November 3, 2026

> Note: today is U.S. Election Day. Keep all posts non-political and community-first; avoid timing any promotion around voting or candidates.

---

## 1. Facebook / Google Business Profile Post

**Facebook**
Our community shows up. Today, and every day. 💙
Latimore Life & Legacy is proud to support PAHS through sponsorship and community outreach, and we want the families behind that school spirit to feel ready for whatever comes next. A short protection review is a simple way to look after the people who count on you, with no pressure and no jargon.
👉 Scan the QR code on our PAHS postcard, or DM "PROTECT" and we'll take it from there.

**Google Business Profile**
Proud to support PAHS and the local families around it. Life insurance, mortgage protection, final expense, and legacy planning, explained in plain English. Scan the QR code on our community mailer or message us to start a quick, no-pressure protection review.

**Image idea:** Clean PAHS-colored graphic, postcard mock-up with a large QR code, headline "Protect what matters. Before life forces the conversation."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_protect_nov26_d03` (GBP: `utm_source=gbp&utm_medium=post&utm_campaign=pahs_protect_nov26_d03`)

---

## 2. Client Education Tip: Review Your Plan *Before* You Need It

**Social caption:** Coverage is easiest to set up when life is calm. A 10-minute review can confirm your coverage still fits your family, your beneficiaries are current, and your mortgage and final expenses are accounted for. One small step today: pull out your current policy (or note that you don't have one). Scan the QR code or DM "PROTECT" when you're ready.

**SMS:** Hi, quick tip from Latimore Life & Legacy: a 10-minute protection review now can save your family stress later. Want a simple walkthrough? Reply PROTECT. Reply STOP to opt out.

**In-person talking point:** "The best time to review your protection plan is while nothing is wrong, and it only takes about ten minutes."

---

## 3. New-Lead Follow-Up Message (template; swap in name/source)

**SMS:** Hi [First name], this is Jackson with Latimore Life & Legacy. Thanks for reaching out about family protection through [source]. Would a quick call today or tomorrow work, or would you rather I text over a few options? Reply STOP to opt out.

**Email:** Subject: Your family protection request
Hi [First name], thank you for scanning our PAHS community QR code and asking about family protection. No pressure at all. I'd like to learn what matters most to your family and show you a few simple options. Reply with a good time, or book here: [booking link].
Jackson Latimore | Latimore Life & Legacy

**Messenger/DM:** Hi [First name], thanks for messaging PROTECT. Happy to walk you through the basics. Is a quick call or a message thread easier for you?

**Supabase next status:** `contacted` (set `nurturing` after first reply; `booked` on appointment)

---

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post the section 1 content, then re-share the PAHS postcard QR image in one local Facebook community group where posting is allowed. Confirm today's QR destination is the tracked lead-capture page.
2. **Why it matters:** Connects the physical postcard (awareness) to digital capture and reinforces PAHS sponsorship as the trust anchor.
3. **Tracking:** Use `utm_campaign=pahs_protect_nov26_d03`; log scans, form fills, and DMs by source in Supabase.
4. **Follow-up trigger:** Any new lead gets a response within 1 business hour and moves to `contacted`.
5. **Tomorrow's metric:** QR scans to completed form fills, plus number of booked conversations.

---

## 5. Referral Prompt

**Text:** Hi [Name], hope you're doing well. If you know a family who has been meaning to look at their protection plan, I'd be glad to help them, no pressure. They can scan the QR code on our PAHS mailer or reply PROTECT. Thank you!

**Social post:** Know a family that's been putting off the "what if" conversation? Send them our way. Scan the QR code or DM "PROTECT" and we'll make it easy.

**In-person script:** "If someone comes to mind who'd benefit from a simple coverage review, I'd be honored to help them the way I helped you."

**Referral card line:** Help another family protect what matters. Scan, or text PROTECT.

---

## 6. Top 3 Business Priorities

1. **Trust: publish the PAHS community post.** Why: sponsorship proof builds credibility. Action: post to Facebook and GBP by 10 AM. Result: visible local presence. Owner: Marketing / Jackson.
2. **Leads: clear every open lead and follow up.** Why: speed drives booking. Action: contact all new/uncontacted leads today. Result: more booked conversations. Owner: Jackson.
3. **Authority: verify QR/UTM tracking end to end.** Why: measurable campaigns guide spend. Action: scan the live postcard QR and confirm the record lands in Supabase with the right source. Result: trustworthy data. Owner: Ops / Jackson.

---

## 7. Tracking Notes for Supabase
- Campaign: `pahs_protect_nov26_d03`; sources: facebook, gbp, qr, dm, referral
- Required fields: source, campaign, lead stage, first-contact timestamp, next action date
- Stage flow: awareness, interest, capture, follow-up, conversion

## 8. Tomorrow's Review Questions
- How many scans, form fills, and DMs did we get, and from which source?
- Were all new leads contacted within 1 business hour?
- Which post or channel drew the most engagement?
- Any record missing source/UTM data?

---

# Addendum: Email Drip Campaign Engine (Latimore OS)

Placeholders to fill before launch: phone number, booking link, CRM name (still template values in the config).

**Cadence (Day / stage / goal)**
| Day | Stage | Goal |
|---|---|---|
| 0 | Welcome | Confirm receipt, set expectations |
| 2 | Education | Teach a simple coverage-needs framework (income years + debts + final expenses) |
| 5 | Social proof | Local/community credibility (PAHS, Coal Region) |
| 10 | Soft ask | Invite a low-pressure review |
| 17 | Urgency nudge | Explain the cost of waiting without fear tactics |
| 30 | Re-engagement | Fresh value, reopen the loop |

**Source map (tags: `src_*`, `seq_*`, `stage_*`)**
- PAHS QR -> Family Protection / Community Trust
- Website form -> General Protection Review
- Ethos quote -> Fast Term / Living Benefits
- Retirement inquiry -> Annuity / Safe Money
- Facebook DM "PROTECT" -> Life Insurance Education
- Google Business Profile -> Local Trust / Policy Review

**Day 0 email draft**
Subject: Got your request, here's what happens next
Hi {{first_name}}, thanks for reaching out. I received your request and will follow up personally. Over the next month I'll send a few short, useful notes, with no pressure. If you'd like to talk sooner, book here: {booking_link}. Reply STOP or use the unsubscribe link anytime.
Jackson Latimore | Founder | Protection & Retirement Advisor | Latimore Life & Legacy LLC | {phone_number}

**Automation rules**
1. New lead: apply tags, send Day 0, schedule remaining touches.
2. Lead books: stop sequence, stage Booked, create reminder task.
3. Lead replies: pause automation, stage Engaged, manual follow-up.
4. Opt-out: stop all messaging, tag Opted Out.
5. No reply or booking after Day 10: create a call task for Jackson.
6. Day 30 with no engagement: tag Cold, move to long-term nurture.

**KPI targets:** open 35%+, click 3-8%, reply 5%+, booking 10-20%, completion 80%+, cold revival 5-10%. A/B test subject lines and CTA wording.

*Compliance: include unsubscribe/opt-out and business address; follow TCPA/CAN-SPAM. Do not state guaranteed outcomes; review all copy before sending.*
