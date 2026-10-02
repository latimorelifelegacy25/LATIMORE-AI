# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Thursday, September 17, 2026

---

## 1. Facebook / Google Business Profile Post

**Facebook post:**

> Coal Region families, listen up 🖤 Every season, PAHS families lean on each other — showing up, pitching in, looking out for one another. That's the same spirit behind Latimore Life & Legacy. Since Jackson survived cardiac arrest on December 7, 2010, he's made it his mission to help Schuylkill, Luzerne, and Northumberland families protect what they've built — before life forces the conversation.
>
> That's why we're proud to stand behind PAHS with sponsorships, postcards, and community outreach that connects local families to real protection planning — not sales pressure.
>
> If your family hasn't reviewed your coverage lately, today's the day. 📱 Scan the QR code on our PAHS materials, or DM "PROTECT" and we'll walk you through it — no pressure, just clarity.
>
> #TheBeatGoesOn

**Google Business Profile post:**

> Latimore Life & Legacy proudly supports PAHS and Coal Region families with life insurance, mortgage protection, final expense, and legacy planning built around your family's real needs. Scan the QR code on our community materials or DM "PROTECT" to schedule a no-pressure protection review. Central PA families deserve a plan that lasts.

**Suggested image/graphic idea:** Split-frame graphic — PAHS community event/sponsorship photo on one side, a warm local family photo on the other, with a QR code overlay and headline "Protect What You're Building."

**Suggested UTM campaign label:** `utm_campaign=pahs-community-2026-09&utm_source=facebook_gbp&utm_medium=organic_social`

*Disclaimer: Life insurance products are subject to underwriting approval. Not available in all states.*

---

## 2. Client Education Tip

**Topic:** Why every family should review their protection plan before they need it.

**Short social caption:**
> You don't wait for a flat tire to check your spare. Same goes for life insurance — the best time to review your family's protection plan is before life throws the curveball, not after. Takes about 15 minutes. 📱 Scan the QR code or DM "PROTECT" and we'll help you check it off your list.

**SMS-friendly version:**
> Quick tip from Latimore Life & Legacy: review your protection plan BEFORE you need it, not after. 15 min could change everything for your family. DM PROTECT to start.

**One-sentence talking point (in-person):**
> "The families who feel the most peace of mind are the ones who reviewed their coverage before an emergency forced the question — let's make sure that's you."

---

## 3. New-Lead Follow-Up Message

*Template — personalize `{FirstName}` from CRM before sending. Built for a lead sourced through the PAHS community campaign, interested in a family protection quote, currently at pipeline stage "New."*

**SMS follow-up:**
> Hi {FirstName}, this is Jackson with Latimore Life & Legacy — saw you reached out through our PAHS community campaign about a family protection quote. I'd love to help. Want me to text a couple of times that work for a quick 10-minute call, or should I just send a few quick questions here first?

**Email follow-up:**
> **Subject:** Following up on your family protection quote request
>
> Hi {FirstName},
>
> Thanks for reaching out through our PAHS community campaign — I wanted to follow up personally rather than let this sit in an inbox.
>
> You mentioned interest in a family protection quote, and I'd love to help you get a clear, no-pressure picture of your options. Two easy ways forward:
>
> 1. **Reply to this email** with a good time for a 10-minute call, or
> 2. **Scan the QR code** from our PAHS materials (or DM "PROTECT" on Facebook) and I'll send over a short set of questions so we can move faster when we do talk.
>
> Either way, no pressure — just clarity on what makes sense for your family.
>
> Jackson Latimore
> Founder & CEO, Latimore Life & Legacy
> #TheBeatGoesOn

**Messenger/DM follow-up:**
> Hey {FirstName}! Thanks for reaching out through the PAHS campaign 🙌 Happy to help with your family protection quote — want to hop on a quick call this week, or should I send a couple quick questions here first to get you a ballpark?

**Recommended next pipeline status:** Move the Contact from **New → Contacted** once any of the above is sent (per the app's current `PipelineStage` enum in `prisma/schema.prisma`). Note: the app's data model doesn't yet have a dedicated `source`/`campaign` field on `Contact` — log "PAHS community campaign" in `notes` until that field exists.

---

## 4. PAHS / Community Campaign Action

**Community partner:** PAHS
**Campaign asset:** Ethos postcard / direct-mail piece with QR code
**Campaign goal:** Move community members from awareness → captured leads → booked conversations

**Today's action:** Restock and place the Ethos QR postcard at today's PAHS touchpoint (sponsorship table, outreach drop, or mailer batch), and make sure the Facebook/GBP posts from Section 1 are live and pinned so anyone who scans finds matching messaging.

**Why it matters:** This is the pipeline's awareness-to-capture hinge — the PAHS partnership supplies community trust, and the QR code converts that trust into a tracked digital action.

**Tracking instruction:** Confirm the QR code resolves to the tracked quote/lead-capture page with UTM parameters live: `utm_source=pahs&utm_medium=postcard&utm_campaign=pahs-community-2026-09`. Spot-check the landing page and scan count before end of day.

**Follow-up trigger:** Any new contact captured today tagged to the PAHS campaign gets the Section 3 follow-up (SMS/email/DM) within 2 hours of capture.

**Metric to review tomorrow:** New PAHS-tagged leads captured + QR scan count on the tracked link.

---

## 5. Referral Prompt

**Referral audience:** Existing clients, friends, parents, school families, trusted community contacts
**Referral angle:** Help another family protect what matters before life forces the conversation

**Text message version:**
> Hi {FirstName}, quick favor — if you know a family who hasn't looked at their life insurance or protection plan in a while, would you mind sending them my way? I helped you get squared away, and I'd love to do the same for someone you care about. Just have them scan our QR code or DM "PROTECT." Thank you! — Jackson

**Social post version:**
> Know a family who could use a second set of eyes on their protection plan? That's exactly what we do at Latimore Life & Legacy. Send them our way — scan the QR code or DM "PROTECT" and we'll take it from there. #TheBeatGoesOn

**In-person script:**
> "Hey, before you go — if you've got a friend or family member who's never really looked at their life insurance, I'd love an introduction. No pressure on them, I just like helping people from our community get a plan that actually fits."

**One-line referral card copy:**
> "Know a family who needs peace of mind? Scan this QR code or DM 'PROTECT' — we'll take great care of them."

---

## 6. Top 3 Business Priorities

**1. Keep the PAHS trust anchor visible and active**
- *Why it matters:* The PAHS partnership is the credibility engine behind every CTA today — no trust anchor, no conversion.
- *Concrete action:* Confirm postcard/QR materials are stocked at today's PAHS touchpoint and the Facebook/GBP posts are live and pinned.
- *Expected result:* Consistent brand visibility tied to a trusted community partner, increasing QR scan-throughs.
- *Owner:* Jackson / marketing lead

**2. Close the loop on every new lead within 2 hours**
- *Why it matters:* PAHS-sourced leads are warm because of the trust anchor — speed protects that warmth before it cools.
- *Concrete action:* Monitor the lead-capture page and CRM for new PAHS-tagged contacts; send the Section 3 follow-up templates immediately on capture.
- *Expected result:* Higher contact-to-booked-call conversion, fewer cold leads.
- *Owner:* Jackson (or front-office/admin support)

**3. Turn today's content into a referral chain**
- *Why it matters:* Existing clients are the highest-trust source of new families — referral asks compound the PAHS effect.
- *Concrete action:* Send the referral text to 3–5 recent clients today; hand out the referral card at any in-person PAHS interaction.
- *Expected result:* 1–2 warm referral introductions this week.
- *Owner:* Jackson

---

## 7. Tracking Notes for Supabase

- Tag new PAHS-sourced contacts at capture; since `Contact` has no dedicated `source`/`campaign` field yet, record "PAHS community campaign" plus channel (postcard vs. Facebook vs. GBP) in `notes` until that field is added.
- Distinguish QR scans from the postcard vs. any direct-mail piece using separate UTM parameters, so tomorrow's review question (below) can be answered precisely.
- On any follow-up sent, update `stage` from **New → Contacted** in the pipeline.
- Before adding any contact to SMS or email follow-up, confirm `smsConsentStatus` / `emailConsentStatus` is `opted_in` — do not message anyone `unknown` or `opted_out`.

---

## 8. Tomorrow's Review Questions

1. How many QR scans came from the PAHS postcard vs. other channels?
2. How many new leads were tagged to the PAHS campaign, and how many got same-day (≤2 hr) follow-up?
3. Did the Facebook/GBP post outperform or underperform recent baseline engagement?
4. Did yesterday's referral ask produce any mentions or introductions?
5. Any compliance-sensitive comments or DMs from today that still need review?

---

*Generated by the Latimore OS Daily Marketing Command Brief workflow (`public/workflow-presets/latimore-daily-marketing-brief.json`).*
