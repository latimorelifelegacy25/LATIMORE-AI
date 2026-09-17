# Email Drip Campaign System — Addendum to the Business + Marketing Plan
**Latimore Life & Legacy LLC** · Latimore OS
**Owner:** Jackson Latimore, Founder | Protection & Retirement Advisor
**Service area:** Coal Region and surrounding communities (Schuylkill, Luzerne, Northumberland counties)

> ⚠️ **Fill in before launch:** `{{booking_link}}` (real scheduling URL), `{{phone_number}}`, and confirmation of `crm_name` — see **Open Items** at the end.

---

## Overview

A single follow-up message is easy to miss, delay, or forget. A structured sequence of touches — spaced out, each with its own purpose — is what actually builds the trust that turns a lead into a booked conversation. This drip system gives every lead, regardless of how they found Latimore Life & Legacy, a consistent 30-day nurture path that teaches, proves credibility, and invites action without pressure.

## Six-Stage Framework

| Stage | Purpose |
|---|---|
| **Welcome** | Confirm receipt, set expectations, remove uncertainty |
| **Education** | Teach a simple framework for thinking about coverage needs |
| **Social proof** | Establish local/community credibility |
| **Soft ask** | Invite a low-pressure review or call |
| **Urgency nudge** | Explain the real cost of waiting, without fear tactics |
| **Re-engagement** | Add new value and reopen the conversation for anyone who's gone quiet |

**30-day cadence:** Day 0, 2, 5, 10, 17, 30 — one touch per stage, in order.

---

## Trigger Sources and Sequence Assignment

| Lead Source | Assigned Sequence | Primary Intent | CRM Tags | Entry Criteria | Exit Criteria |
|---|---|---|---|---|---|
| PAHS QR code / community event | Family Protection / Community Trust | Convert community trust into a booked review | `source:pahs`, `seq:family-protection`, `stage:welcome` | New contact captured via PAHS QR/postcard | Booked call, replied, opted out, or closed |
| Website consultation form | General Protection Review | Move a self-identified prospect to a review call | `source:website`, `seq:general-review`, `stage:welcome` | Form submitted with valid contact info | Booked call, replied, opted out, or closed |
| Quote request | Fast Term / Living Benefits | Get a fast-moving prospect to a quote conversation | `source:quote-request`, `seq:fast-term`, `stage:welcome` | Quote request submitted | Booked call, replied, opted out, or closed |
| Retirement / annuity inquiry | Annuity / Safe Money | Educate on annuity maximization and safe-money strategy | `source:retirement-inquiry`, `seq:annuity-safe-money`, `stage:welcome` | Inquiry tagged retirement/annuity | Booked call, replied, opted out, or closed |
| Facebook DM "PROTECT" | Life Insurance Education | Warm a social-sourced lead with education before the ask | `source:facebook-dm`, `seq:life-education`, `stage:welcome` | DM keyword "PROTECT" received | Booked call, replied, opted out, or closed |
| Google Business Profile | Local Trust / Policy Review | Convert local-search intent into a policy review | `source:gbp`, `seq:local-trust-review`, `stage:welcome` | Contact initiated via GBP message/call | Booked call, replied, opted out, or closed |

---

## 30-Day Lead Nurture Sequence

| Day | Stage | Channel | Theme / Subject Angle | Primary Goal | CTA | Personalization Tokens |
|---|---|---|---|---|---|---|
| 0 | Welcome | Email + Text | "You're in good hands — here's what happens next" | Confirm receipt, set expectations | Reply or book a 10-min call | `{{first_name}}`, `{{booking_link}}` |
| 2 | Education | Email | "The one question that decides how much coverage you need" | Teach a simple coverage-estimate framework | Reply with questions or book | `{{first_name}}`, `{{booking_link}}` |
| 5 | Social proof | Email + Text | "Why Coal Region families trust Latimore Life & Legacy" | Build local credibility (PAHS partnership, #TheBeatGoesOn story) | Book a review | `{{first_name}}`, `{{booking_link}}` |
| 10 | Soft ask | Email | "Want a second set of eyes on your plan?" | Invite a no-pressure review | Book a 15-min review | `{{first_name}}`, `{{booking_link}}` |
| 17 | Urgency nudge | Email + Text | "What waiting actually costs" | Explain the real risk of delay (rate/health changes, uncovered gaps) — no fear tactics | Book before circumstances change | `{{first_name}}`, `{{booking_link}}` |
| 30 | Re-engagement | Email | "Still thinking it over? Here's something new" | Re-open the loop with fresh value | Reply, book, or opt to stay on a long-term list | `{{first_name}}`, `{{booking_link}}` |

**Timing adjustment rule:** If a lead replies or books at any point, immediately stop the remaining scheduled sends for that stage sequence — do not let a later automated touch land on top of an active conversation.

---

## Email Drafts (Plug-and-Play)

### Day 0 Email
**Subject:** You're in good hands, {{first_name}} — here's what happens next

Hi {{first_name}},

Thanks for reaching out to Latimore Life & Legacy. I wanted to confirm we received your request and let you know what to expect from here.

Over the next few weeks, I'll send a short note every so often — a quick tip, a bit about how we work with families in the Coal Region, and an easy way to book time if you're ready. No pressure, no hard sell. Just useful information so you can decide what's right for your family on your own timeline.

If you'd rather skip ahead, you can grab 10 minutes on my calendar here: {{booking_link}}

Talk soon,
Jackson Latimore
Founder | Protection & Retirement Advisor
Latimore Life & Legacy
{{phone_number}}

---

### Day 2 Email
**Subject:** The one question that decides how much coverage you need

Hi {{first_name}},

Most people overthink "how much life insurance do I need?" Here's a simple way to start:

Add up what your family would need to cover if your income stopped tomorrow — remaining mortgage, a few years of income replacement, and any future costs like college. That number is your starting point, not a final answer.

We'll walk through the specifics together when you're ready, and adjust it to fit your actual budget and goals — not a one-size-fits-all number.

Questions on your mind already? Just reply to this email, or grab time here: {{booking_link}}

Jackson Latimore
Founder | Protection & Retirement Advisor
Latimore Life & Legacy

---

### Day 5 Email
**Subject:** Why Coal Region families trust Latimore Life & Legacy

Hi {{first_name}},

A little about why we do this work: on December 7, 2010, Jackson survived cardiac arrest — an experience that reshaped how he thinks about protecting a family's future. That's the story behind #TheBeatGoesOn and behind every family we work with across Schuylkill, Luzerne, and Northumberland counties.

We're proud to support PAHS and other local community partners, not as a marketing checkbox, but because we believe protection planning should be rooted in the community it serves.

If you'd like to see how that translates into a plan for your own family, I'm happy to walk through it: {{booking_link}}

Jackson Latimore
Founder | Protection & Retirement Advisor
Latimore Life & Legacy

---

### Day 10 Email
**Subject:** Want a second set of eyes on your plan?

Hi {{first_name}},

No pitch here — just an offer. If you already have some coverage (or none at all), a short review can tell you whether it still fits your life today. Things change: income, mortgage, kids, health. Plans should keep up.

If that sounds useful, grab 15 minutes here: {{booking_link}}. If now's not the right time, that's completely fine — I'll keep sending a helpful note here and there.

Jackson Latimore
Founder | Protection & Retirement Advisor
Latimore Life & Legacy

---

### Day 17 Email
**Subject:** What waiting actually costs

Hi {{first_name}},

I'll keep this simple and honest: the biggest cost of waiting on a protection plan usually isn't dramatic — it's just that rates tend to move in one direction as we age, and health changes can limit your options later. Neither of those is something to panic about, but they're both real reasons "I'll get to it eventually" can end up costing more than acting now.

If you've been meaning to have this conversation, this is a good week for it: {{booking_link}}

Jackson Latimore
Founder | Protection & Retirement Advisor
Latimore Life & Legacy

*Life insurance products are subject to underwriting approval. Rates and eligibility vary by age and health at time of application.*

---

### Day 30 Email
**Subject:** Still thinking it over? Here's something new

Hi {{first_name}},

It's been a few weeks since we first connected, and I know these decisions don't always move fast — that's okay. I wanted to check back in with something new rather than just a repeat ask: [insert current tip, local event, or seasonal angle — e.g., an upcoming PAHS event or a seasonal planning reminder].

If you're ready to talk, I'm here: {{booking_link}}. If not right now, no worries — I'll keep you on our list for occasional updates, and you can always reach out whenever the timing's right.

Jackson Latimore
Founder | Protection & Retirement Advisor
Latimore Life & Legacy

---

## Text Message Companions

**Day 0 Text:**
> Hi {{first_name}}, this is Jackson with Latimore Life & Legacy. Got your info — I'll send a few helpful notes over the next few weeks. Ready sooner? Book here: {{booking_link}}

**Day 2 Text:**
> Quick tip: your coverage need = remaining mortgage + a few years' income + future costs (like college). We'll fine-tune it together. Questions? Just reply. — Jackson

**Day 5 Text:**
> Proud to support PAHS and Coal Region families — that's the "why" behind Latimore Life & Legacy. Want to see what a plan looks like for your family? {{booking_link}}

**Day 10 Text:**
> No pressure — just an offer: want a free 15-min second look at your current coverage? {{booking_link}}

**Day 17 Text:**
> Honest heads-up: rates and eligibility can shift as health/age change. If you've been meaning to lock in a plan, this week's a good time. {{booking_link}}

**Day 30 Text:**
> Checking back in with something new, {{first_name}} — no repeat pitch, promise. Ready to talk anytime: {{booking_link}}. Reply STOP to opt out.

*(All texts: include opt-out language per TCPA/CAN-SPAM requirements — see Automation Rules and Open Items below.)*

---

## Automation Rules + Manual Task Logic

1. **Trigger:** New lead created and source captured (per Trigger Sources table above).
2. **Actions immediately on entry:**
   - Apply source + sequence + stage tags.
   - Send the Day 0 email and text.
   - Schedule the remaining Day 2/5/10/17/30 touches.
3. **Conditional branches:**
   - **Lead books →** stop the sequence, move pipeline stage to **Booked**, create a reminder task to confirm the appointment.
   - **Lead replies →** pause automation for manual follow-up, move pipeline stage to **Engaged**.
   - **Lead opts out →** stop all messaging immediately, tag **Opted Out**.
4. **No-response rule:** If no reply and no booking after Day 10, create a manual task for Jackson with a short call-script outline (use the Section 3 follow-up language from the Daily Brief as a starting point).
5. **Re-engagement:** At Day 30, tag as **Cold** if there's still no engagement; move to a long-term nurture list rather than continuing active drip messaging.

**Pseudo-flow:**
```
Lead comes in
  -> apply source + sequence + stage tags
  -> Day 0 send (email + text)
  -> scheduled Day 2/5/10/17/30 touches
       -> reply?  -> pause automation, stage = Engaged, manual follow-up
       -> books?  -> stop sequence, stage = Booked, create confirmation task
       -> opts out? -> stop all messaging, tag = Opted Out
  -> no response by Day 10 -> manual call task for Jackson
  -> no engagement by Day 30 -> tag = Cold, move to long-term list
```

---

## KPIs to Track

| KPI | Target | How to Measure | Weekly Action if Below Target |
|---|---|---|---|
| Email open rate | 35%+ | CRM/email platform open tracking | Test a different subject line angle (curiosity vs. direct) |
| Click-through rate | 3%–8% | CRM link tracking on `{{booking_link}}` and educational links | Simplify CTA to one clear link per email |
| Reply rate | 5%+ | CRM reply detection / inbox tagging | Add a direct question at the end of the email |
| Booking conversion | 10%–20% | Bookings tagged to sequence vs. leads entered | Shorten the ask — move the soft ask earlier for that segment |
| Sequence completion | 80%+ | % of leads reaching Day 30 without unsubscribing | Review Day 10/17 content for tone — check it isn't too pushy |
| Cold lead revival | 5%–10% | Re-engaged contacts moved out of "Cold" status | Refresh the Day 30 "something new" content monthly |

**Weekly review checklist (10 minutes):**
- [ ] Pull open/click/reply rates for the week's active sequences
- [ ] Check booking conversion by source (PAHS vs. website vs. quote request, etc.)
- [ ] Scan for any opt-outs or compliance flags
- [ ] Review sequence completion rate — flag any stage with a steep drop-off
- [ ] Confirm no-response tasks (Day 10) were actually worked

**Two A/B tests to run:**
1. Subject line style: direct/benefit-led vs. curiosity-led (Day 2 and Day 17 emails)
2. CTA phrasing: "Book a 10-minute call" vs. "See if this fits your family" (Day 10 email)

---

## Bottom Line

A lead comes in from a known source, gets tagged and dropped into the matching six-stage sequence, receives welcome → education → social proof → soft ask → urgency → re-engagement touches over 30 days, and at any point can book (stop sequence, move to Booked), reply (pause for manual follow-up), or opt out (stop everything). No response by Day 10 creates a manual call task; no engagement by Day 30 moves the lead to a long-term Cold list instead of disappearing. The system's job is simple: keep every lead moving, without ever making a family feel chased.

---

## Open Items — Fill In Before Launch

- **`{{booking_link}}`** — replace placeholder `https://your-booking-link.com` with the real scheduling URL.
- **`{{phone_number}}`** — replace placeholder with Jackson's real business line.
- **`crm_name`** — the spec assumed a generic CRM; this app tracks contacts in its own Postgres database (`prisma/schema.prisma`, `Contact` model) with pipeline stages `New, Contacted, Booked_Call, Discovery_Complete, Options_Presented, App_Submitted, Underwriting, Issued_Delivered, In_Force_Review, Lost_Not_Proceeding`. That doesn't match the generic stage set this addendum assumes (`New, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold`) — decide whether to map the drip's stages onto the existing `PipelineStage` enum or extend it, before wiring automation.
- **Consent gating** — `Contact` already tracks `smsConsentStatus` / `emailConsentStatus`; automation must check these are `opted_in` before any Day 0 send, and must set `smsOptOutAt`/`emailOptOutAt` on any opt-out per the Automation Rules above.
- **Compliance footer text** — confirm final unsubscribe/opt-out and business-address language with whoever owns TCPA/CAN-SPAM compliance before this goes live; placeholder language above is directional, not final legal copy.

---

*Generated by the Latimore OS Email Drip Campaign Engine workflow (`public/workflow-presets/latimore-email-drip-campaign.json`).*
