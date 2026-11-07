# Email Drip Campaign System (Addendum) - Latimore Life & Legacy LLC / Latimore OS
**Status: draft. Placeholders to fill before launch: phone number, booking link, CRM name, business address/footer.**

## Overview
One follow-up rarely earns trust. Six spaced touches over 30 days (Day 0, 2, 5, 10, 17, 30) let families get to know Latimore Life & Legacy at their own pace across the Coal Region and surrounding communities. Plain English, no pressure.

## Six-Stage Framework
Welcome (D0) · Education (D2) · Social proof (D5) · Soft ask (D10) · Urgency nudge (D17) · Re-engagement (D30)

## Trigger Sources and Sequence Assignment
| Source | Sequence | Tags | Entry | Exit |
|---|---|---|---|---|
| PAHS QR code | Family Protection / Community Trust | src_pahs_qr, seq_family_trust, stage_new | Form/scan captured | Booked, replied, opted out |
| Website consultation form | General Protection Review | src_web_form, seq_gen_review, stage_new | Form submit | Same |
| Ethos quote request | Fast Term / Living Benefits | src_ethos, seq_fast_term, stage_new | Quote request | Same |
| Retirement inquiry | Annuity / Safe Money | src_retirement, seq_safe_money, stage_new | Inquiry | Same |
| Facebook DM "PROTECT" | Life Insurance Education | src_fb_dm, seq_life_edu, stage_new | Keyword DM | Same |
| Google Business Profile | Local Trust / Policy Review | src_gbp, seq_local_trust, stage_new | Call/message/form | Same |

## 30-Day Nurture Table
| Day | Stage | Channel | Theme | CTA |
|---|---|---|---|---|
| 0 | Welcome | Email+text | "We got your request" + what happens next | Reply or book |
| 2 | Education | Email | Simple coverage-needs framework (income years, debts, final costs) | Reply with questions |
| 5 | Social proof | Email+text | Local/PAHS community credibility | Book review |
| 10 | Soft ask | Email+text | Low-pressure policy/plan review | Book |
| 17 | Urgency nudge | Email | Cost of waiting (age/health change), no fear | Book |
| 30 | Re-engagement | Email+text | Fresh value: checklist, reopen the loop | Reply or book |
Timing: reply -> pause and handle manually; booking -> exit sequence.

## Email Drafts
Common footer: Jackson Latimore · Founder | Protection & Retirement Advisor · Latimore Life & Legacy LLC · (###) ###-#### · [business address] · Unsubscribe link.

**Day 0** Subject: Got your request, {{first_name}}
Hi {{first_name}}, thanks for reaching out to Latimore Life & Legacy. I received your request and will personally follow up within one business day. In the meantime, you can pick a time that works here: https://your-booking-link.com. No pressure. Just clear answers.

**Day 2** Subject: A simple way to estimate what your family needs
Hi {{first_name}}, a quick framework: (1) how many years of income would your family need replaced, (2) debts such as mortgage, (3) final expenses and goals like education. Add those up for a starting number. Want help with yours? Book here: https://your-booking-link.com

**Day 5** Subject: Families right here in our community
Hi {{first_name}}, we're proud to support PAHS and local families, and we work with neighbors across the Coal Region. Real conversations, plain English. If a review would help, grab a time: https://your-booking-link.com

**Day 10** Subject: Want a second set of eyes?
Hi {{first_name}}, if you'd like, I'll walk through your options in about 15 minutes with no obligation. Pick a time: https://your-booking-link.com

**Day 17** Subject: Why timing matters (without the pressure)
Hi {{first_name}}, coverage is generally easier and more affordable to arrange when you're younger and healthy, and circumstances can change. There's no rush, but there's value in starting. Book here: https://your-booking-link.com

**Day 30** Subject: Still thinking about it?
Hi {{first_name}}, here's a short protection checklist you can use on your own [attach]. If your situation has changed, I'm glad to help. Reply anytime or book: https://your-booking-link.com

## Text Companions (<=240 chars; add "Reply STOP to opt out")
- D0: Hi {{first_name}}, Jackson at Latimore Life & Legacy. Got your request! Book a time: https://your-booking-link.com
- D2: {{first_name}}, I emailed a simple way to estimate coverage needs. Questions? Just reply.
- D5: Hi {{first_name}}, we're proud to serve local families. Want a quick review? https://your-booking-link.com
- D10: {{first_name}}, happy to do a no-pressure 15-min review. Reply YES and I'll send times.
- D17: Hi {{first_name}}, checking in. Starting sooner usually keeps options open. Book: https://your-booking-link.com
- D30: {{first_name}}, still here if you need me. Reply HELP or book: https://your-booking-link.com

## Automation Rules
1. New lead + source captured -> apply tags, send D0, schedule D2/5/10/17/30.
2. Books -> stop sequence, stage Booked, create reminder task.
3. Replies -> pause automation, stage Engaged, manual follow-up.
4. Opts out -> stop all messaging, tag Opted Out.
5. No reply/booking after D10 -> task for Jackson Latimore with short call script.
6. D30 with no engagement -> tag Cold, optional long-term nurture.
Flow: Lead -> tags -> drip -> (reply/book/opt-out branch) -> task -> pipeline move.

## KPIs
| KPI | Target | Weekly fix if low |
|---|---|---|
| Open rate | 35%+ | Test subject lines |
| CTR | 3-8% | Single clearer CTA |
| Reply rate | 5%+ | Add a direct question |
| Booking conversion | 10-20% | Shorten booking friction |
| Sequence completion | 80%+ | Check opt-out/bounce causes |
| Cold revival | 5-10% | Refresh D30 value offer |
A/B tests: subject (question vs. statement); CTA ("Book a review" vs. "Reply YES"). 10-minute weekly review: opens, clicks, replies, bookings, stuck leads.

## Bottom Line
Lead -> source tag -> six-touch drip -> booking -> manual task -> pipeline move, with automatic stops on booking, reply, or opt-out.
