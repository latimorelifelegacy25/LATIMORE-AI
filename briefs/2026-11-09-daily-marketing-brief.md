# Latimore Life & Legacy Daily Marketing Command Brief
**Date:** Monday, November 9, 2026

## 1. Facebook / Google Business Profile Post

**Facebook**
> Monday morning thought for our PAHS families and neighbors across Schuylkill, Luzerne, and Northumberland counties: the best time to review your family's protection plan is before you need it.
>
> Life moves fast. Between school, work, and the holidays coming up, a plan is easy to put off. But it can take as little as 10 minutes to see where you stand. Is your mortgage covered? Would your family have what they need to keep things steady?
>
> We're proud to support PAHS and this community, and we'd be glad to help your family get clarity. No pressure, just a conversation.
>
> 👉 Scan the QR code on your Latimore postcard, or DM "PROTECT" and we'll reach out.
>
> #TheBeatGoesOn #CentralPA #FamilyProtection
>
> *Life insurance is subject to underwriting approval. Coverage, benefits, and availability vary.*

**Google Business Profile (shorter)**
> Supporting PAHS and local families starts with showing up. This week, we're helping neighbors across Central PA take one small step: review your family protection plan before you need it. Scan the QR code on our postcard or message us "PROTECT" to get started. Subject to underwriting approval.

**Image idea:** Photo of the PAHS sponsorship banner or postcard with the QR code in the foreground. Overlay text: "One small step. 10 minutes. Protect what matters."

**UTM label:** `utm_source=facebook&utm_medium=social&utm_campaign=pahs_nov2026_protect_review` (GBP: `utm_source=gbp&utm_medium=post`)

## 2. Client Education Tip: Review Your Plan Before You Need It

- **Social caption:** A protection plan is like a spare key. You hope you never need it, but you'll be glad it's in place. Today, take one small step: write down who depends on your income and what bills they'd need covered. That list is the start of any good plan. Scan the QR code to talk it through with us. (Subject to underwriting approval.)
- **SMS:** Hi {{first_name}}, quick tip from Latimore Life & Legacy: list who depends on your income and which bills they'd need covered. That's step one of a protection plan. Want help with it? Reply PROTECT. Reply STOP to opt out.
- **In-person talking point:** "Let's start with one question: if your income paused tomorrow, who would feel it first, and what would they need covered?"

## 3. New-Lead Follow-Up (template for today's PAHS QR / Facebook leads)

- **SMS:** Hi {{first_name}}, this is Jackson with Latimore Life & Legacy. Thanks for scanning the PAHS QR code. I'd be glad to walk you through your options, with no pressure. Would a quick call today or tomorrow work better? Reply STOP to opt out.
- **Email:** *Subject: Thanks for reaching out, {{first_name}}.* Thank you for your interest in protecting your family. I'll keep this simple: a short call to understand what matters most to you, then a few clear options. Reply with a time that suits you, or book here: {booking_link}. Jackson Latimore, Founder | Protection & Retirement Advisor, Latimore Life & Legacy LLC
- **Messenger/DM:** Hi {{first_name}}, thanks for messaging "PROTECT". What would you most like to protect: your home, your family's income, or final expenses? I'll point you to the right next step.
- **Supabase status:** `new_lead` → `contacted` once the first touch is sent. Move to `engaged` on reply.

## 4. PAHS / Community Campaign Action

1. **Today's action:** Post the Section 1 post, and send today's QR leads the Section 3 follow-up within 1 hour of capture.
2. **Why it matters:** It links the physical postcard to a digital lead, and speed of follow-up drives conversion.
3. **Tracking:** Confirm the QR code points to the tracked URL with `utm_campaign=pahs_nov2026_protect_review`. Log each lead's source in Supabase.
4. **Follow-up trigger:** Any new lead with `source_campaign = PAHS community campaign` gets a same-day SMS. If there is no reply in 48 hours, send the email.
5. **Metric for tomorrow:** QR scans, leads captured, and first responses sent within 1 hour.

## 5. Referral Prompt

- **Text:** Hi {{first_name}}, thank you for trusting us with your family's protection. If you know a parent or neighbor who'd benefit from a no-pressure plan review, I'd be honored to help them. Just send their name, or have them scan the QR code or DM "PROTECT".
- **Social:** Know a family that's been meaning to review their protection plan? Tag them or send them our way. We're here for the whole community. #TheBeatGoesOn
- **In-person script:** "Who in your circle is raising a family and might not have a plan in place yet? I'm happy to help them, with no pressure."
- **Referral card line:** "Help a neighbor protect what matters. Scan, or DM PROTECT."

## 6. Top 3 Business Priorities

1. **Trust: publish the PAHS community post.** Why: visible local support builds credibility. Action: post to Facebook and GBP by 10 AM. Expected result: engagement and QR scans. Owner: Jackson.
2. **Lead capture: same-day follow-up on every new lead.** Why: speed matters most in the first hour. Action: send the SMS and email templates to all new leads. Expected result: more replies and booked calls. Owner: Jackson.
3. **Authority system: verify QR/UTM tracking end to end.** Why: it makes the campaign measurable. Action: test-scan the postcard QR and confirm the lead lands in Supabase with the correct source. Expected result: clean attribution data. Owner: Jackson or marketing support.

## 7. Tracking Notes for Supabase

- Fields to log: `lead_source`, `utm_campaign`, `utm_source`, `first_contact_at`, `pipeline_stage`, `next_action_at`.
- Pipeline stages: awareness → interest → capture → follow-up → conversion.
- Flag any lead with no first contact within 24 hours.

## 8. Tomorrow's Review Questions

- How many QR scans and captured leads did we get? Which source performed best?
- How quickly did we respond to each lead?
- Which post or message drew the most replies or DMs?
- Which leads need a call or a second touch?
- Is anything in today's copy missing a compliance disclaimer?

*Compliance note: all copy is illustrative. No rates or values are guaranteed. Coverage is subject to underwriting approval.*
