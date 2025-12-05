'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PortfolioPage() {
  const [modalContent, setModalContent] = useState<{title: string, content: string, type: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'cases' | 'copy' | 'projects'>('cases');

  const caseStudies = {
    tnt2026: {
      title: "TNT Transportation: 2026 Corporate Outreach System",
      type: "Active Client",
      status: "System Design Complete",
      description: "B2B cold email system targeting corporate fleet accounts with $5-30K+ lifetime value.",
      tags: ["Cold Email", "B2B", "Corporate Accounts", "Automation"],
      metrics: [
        { label: "Monthly Email Volume", value: "500-1,000", sublabel: "Corporate targets" },
        { label: "Account LTV", value: "$5-30K+", sublabel: "Per corporate account" },
        { label: "Current Retainer", value: "$2.2K/mo", sublabel: "Consulting + implementation" }
      ],
      content: `## Project Overview

Building a comprehensive B2B cold email system for TNT Transportation to acquire corporate fleet accounts and rental partnerships.

### The Opportunity

TNT Transportation currently relies on referrals and existing relationships for corporate business. The 2026 initiative changes this with systematic outreach to:

- **Corporate fleet managers** at mid-size companies needing transportation for events, retreats, and regular employee transport
- **Event planners** at hotels, convention centers, and corporate campuses
- **HR departments** coordinating employee transportation programs
- **Construction companies** needing crew transportation to job sites

### System Architecture

**Targeting & Segmentation:**
- Industry-specific lists (construction, corporate events, hospitality)
- Geographic targeting (DC metro, Richmond, Hampton Roads corridors)
- Company size filtering ($5M-$500M revenue sweet spot)

**Email Infrastructure:**
- Warmed sending domains with proper authentication (SPF, DKIM, DMARC)
- Rotation across multiple domains for volume
- Deliverability monitoring and reputation management

**Sequence Strategy:**
- 4-touch sequences with behavioral triggers
- Industry-specific value propositions
- Relationship-first positioning (not hard sell)
- Direct booking calendar integration

### Projected Impact

At 500-1,000 emails/month with conservative 2% positive response rate:
- **10-20 qualified conversations/month**
- **2-4 new corporate accounts/month** (20% close rate on qualified)
- **$10K-$120K new annual revenue** (at $5-30K LTV)

This builds a predictable pipeline that compounds—each corporate account generates referrals and repeat business.

### Current Status

- ✅ Email infrastructure setup complete
- ✅ Initial targeting criteria defined
- 🔄 Sequence copy in development
- 🔄 CRM integration (n8n + Supabase)
- ⏳ Launch: Q1 2026`
    },
    constructionBids: {
      title: "Construction Bids AI: Cold Email System",
      type: "Dev Partner",
      status: "Production",
      description: "Built the cold email automation system generating 12 new conversions/month for construction lead gen platform.",
      tags: ["AI", "Cold Email", "Construction", "Lead Gen"],
      metrics: [
        { label: "Conversions", value: "12/mo", sublabel: "New paying customers" },
        { label: "Ticket Range", value: "$45-$450", sublabel: "Per conversion" },
        { label: "Revenue Impact", value: "$540-$5.4K", sublabel: "Monthly from email system" }
      ],
      content: `## Technical Implementation

Developed the cold email automation infrastructure for Construction Bids AI, an AI-powered platform helping contractors find and win more bids.

### Results

**12 new conversions per month** directly attributed to the cold email system I built.

- Ticket range: **$45-$450** per conversion
- Monthly revenue impact: **$540-$5,400** from email channel alone
- System runs autonomously with minimal maintenance

### What I Built

**Email Automation Engine:**
- Multi-domain sending infrastructure with rotation
- Deliverability optimization (warming, authentication, reputation)
- Behavioral trigger sequences based on engagement
- A/B testing framework for subject lines and copy

**Integration Layer:**
- Connected AI lead scoring to email sequencing
- Real-time webhook processing for engagement events
- CRM sync for sales team handoff
- Analytics dashboard for campaign performance

**Sequence Architecture:**
- Industry-specific templates (GCs, subcontractors, specialty trades)
- Geographic personalization
- Project-type targeting
- Follow-up automation based on open/click behavior

### Tech Stack

- n8n for workflow automation
- Instantly/Smartlead for sending infrastructure
- Supabase for data layer
- Custom analytics dashboard`
    },
    tntNewsletter: {
      title: "TNT Transportation: Corporate Newsletter",
      type: "Active Client",
      status: "Delivered",
      description: "B2B relationship marketing newsletter achieving 53% open rate on Day 1.",
      tags: ["B2B", "Newsletter", "Transportation", "Retention"],
      metrics: [
        { label: "Open Rate", value: "53%", sublabel: "Day 1" },
        { label: "Recipients", value: "300+", sublabel: "Corporate contacts" },
        { label: "Campaign Type", value: "Retention", sublabel: "Relationship marketing" }
      ],
      content: `## Campaign Overview

Holiday-themed B2B newsletter sent to TNT Transportation's existing corporate customer base.

### Objective

Strengthen relationships with existing corporate accounts through value-add content and seasonal touchpoints. Not a sales push—pure relationship marketing.

### Strategy

**Audience Segmentation:**
- Active corporate accounts (past 12 months)
- Lapsed accounts with reactivation potential
- VIP accounts with high lifetime value

**Content Approach:**
- Holiday greetings with personal touch
- Company updates and fleet news
- Appreciation messaging for continued partnership
- Soft mention of seasonal services

### Results

**53% open rate on Day 1**—significantly above industry average (21% for transportation/logistics).

This validates:
- Clean, engaged email list
- Strong sender reputation
- Compelling subject line copy
- Genuine relationship with customer base

### Takeaways

The high engagement rate demonstrates that TNT's corporate customers are receptive to email communication. This creates the foundation for the 2026 cold email system—if warm contacts engage at 53%, cold outreach with proper targeting should perform well above industry benchmarks.`
    }
  };

  const emailSamples = {
    medical: {
      title: "Medical Practice Cold Email",
      type: "Practice",
      description: "Professional, consultative tone for sophisticated buyers. Systems-focused positioning.",
      tags: ["B2B", "Medical", "Professional"],
      content: `**Subject Line:** A common practice management challenge most clinics face

Hello [First Name],

I understand that practicing medicine should be your focus — not spending excessive time on patient acquisition.

If your schedule is consistently full with the right kind of patients, you can safely disregard this message.

What I've observed working with numerous medical practices is that reliable patient flow rarely happens automatically in today's healthcare landscape.

Recently, I spoke with a physician who had invested over $90,000 in various marketing efforts over 18 months with disappointing results. Despite the substantial investment, they weren't seeing the patient growth they anticipated.

The challenge? They maintained the same operational approach they'd always used—relying primarily on referrals, traditional advertising, and manual processes managed by an already busy staff.

This is precisely why we developed 7FigureDocs.

Our system helps private practices establish a sustainable patient acquisition framework that delivers consistent appointments without requiring excessive advertising budgets or extended working hours.

**What makes our approach effective:**

- Streamlining your intake processes and follow-up communications
- Creating predictable lead generation with comprehensive tracking
- Training your team to convert inquiries efficiently without constant oversight

This isn't simply another marketing package—it's a comprehensive system designed to help scale your practice while giving you back valuable time.

I believe you chose medicine to make an impact, not to struggle with business operations. We'd like to help address these challenges.

[Click here to learn more about our approach]

Warm regards,
[Your Name]

**P.S.** Many practices we support see meaningful improvements within 30 days, including a significant increase in qualified patients without additional work hours. If practice growth is a priority for you, we'd welcome a conversation.`
    },
    growth: {
      title: "Growth Operations Email",
      type: "Practice",
      description: "Aggressive, results-focused cold email for service businesses stuck at $5-10K/month.",
      tags: ["Growth Ops", "Aggressive", "Guarantee"],
      content: `**Subject Line:** If you're stuck at $5-10K/month, this is for you

Hey [name],

Let me cut through the BS...

If you're a service business owner bringing in $5-10K per month and feeling like you're treading water - this will be the most important email you read all year.

I've seen it hundreds of times.

- You're burnt out doing everything alone
- You've tried "everything" to get consistent leads
- Your personal life is suffering while you're glued to your laptop trying to keep the business alive
- Wondering why you haven't scaled more and it's killing you day by day

Let's be real: **what got you to $5-10K won't get you to $20K+ consistently.**

That's why we created Imperium Acquisition.

It's not for beginners.

It's for serious service business owners who are ready to:

✓ Book 30-100+ qualified calls EVERY month (predictably)
✓ Close high-ticket clients with confidence
✓ Automate your client acquisition (breathing room)
✓ Step into being a real CEO, not a glorified freelancer

**The results speak for themselves:**

"$5K to $25K/month in weeks."
"Booked 34 appointments in 1 month."
"No fluff, just results."

These are all from students that took a bet on themselves and never looked back.

And here's what makes us different: **if you don't get clients, you don't pay.**

Yes, it's yet another crazy guarantee.

But we're so confident in our system that we'll take on the risk.

Plus, you get access to 30+ live support calls every week. This isn't some course you buy and figure out alone. We're in the trenches with you.

If you're ready to break through that $10K ceiling and build a business that runs without you spending every waking second on it, click here now.

Stop treading water. Start scaling.

[CLICK HERE]

To your freedom,
Charlie

**P.S.** Ask yourself this: Where will you be 90 days from now if nothing changes? Still overwhelmed, still inconsistent? Or booking 30+ calls per month with a clear path to $20K+? The choice is yours. But don't wait - this guaranteed offer won't be around forever.`
    },
    coaching: {
      title: "High-Ticket Coaching Ads (5 Variations)",
      type: "Practice",
      description: "Facebook ad copy for sales coaching program. Multiple hooks and angles.",
      tags: ["Coaching", "High-Ticket", "FB Ads", "A/B Testing"],
      content: `**Ad Copy (V1)**
**Headline:** "Zero to Sales Pro: Risk-Free Career Launch"
**Description:** "90-Day Guarantee. Real Results."

From zero experience to closing $10K deals in 90 days. That's what Jake (22) achieved after joining our Elite Sales Coaching Program.

"I was working retail making $15/hr when I found this program. Within 3 months, I landed a sales job and earned more in commissions than my old monthly salary in just ONE WEEK!" - Jake M.

Not sure if sales is for you? Our **90-DAY MONEY BACK GUARANTEE** means zero risk.

---

**Ad Copy (V2)**
**Headline:** "From Rejected to Top Earner: Your Path"

"I applied to 50+ sales jobs with ZERO callbacks… until I joined this program. Now I'm the top performer at my company and made $8,500 last month." - Mike R. (23)

Average first-year income of our graduates: **$75,000+**

---

**Ad Copy (V3)**
**Headline:** "No Experience to $9K/Month: Your Turn"

At 19, Tyler had no degree and no connections. At 20, he's earning $9,200/month in tech sales after our coaching program.

"I was skeptical about spending money on coaching, but the 90-day guarantee convinced me to try. Best decision ever. I made back my investment in my first month on the job." - Tyler S.

---

**Ad Copy (V4)**
**Headline:** "How to make $10k/mo without starting a business or going to college"

"I was delivering pizzas last year. Now I close $30K deals and made $12,500 last month alone." - Alex J. (24)

Our clients average a **3.5X income increase** within 6 months of completing our program.

---

**Ad Copy (V5)**
**Headline:** "$35K vs $78K: Your Career Choice"

Looking at entry-level jobs with $35K salaries? Our sales coaching graduates average $78K in their FIRST YEAR.

"I had zero sales experience and was working at a warehouse. After this program, I landed a SaaS sales role and made $96K my first year." - David L. (21)`
    },
    highscore: {
      title: "Lead Scoring Email Sequence",
      type: "Practice",
      description: "Behavioral trigger sequences based on lead score. 4-email nurture flow.",
      tags: ["Lead Scoring", "Behavioral", "Automation"],
      content: `**Email 1**
**Subject:** Your automation readiness score: 8/9
**Preview:** You're not broken—but you're leaking thousands every month. Here's proof.

Just reviewed your form responses.

Score: **8 out of 9.**

Translation: You're bleeding money on manual processes and ready to fix it.

The good news? You're exactly the type of business we love working with.

The bad news? Every day you wait costs you more than our entire program.

**Here's what your responses told me:**

✓ $100K-$1M revenue (you have money to invest)
✓ 10+ hours weekly on admin (massive time leak)
✓ Operations can't keep up with demand (losing deals)
✓ Ready to invest $1K-$5K monthly (serious about solutions)

You're not a small business with small problems.

You're a real business with real revenue being strangled by amateur operations.

Let's fix that.

[BOOK DISCOVERY CALL]

---

**Email 2**
**Subject:** Case study: How Marcus plugged his revenue leak
**Preview:** He lost $312K before calling us. You might be next.

You scored 8/9.

That means you're sitting on massive potential — and probably bleeding time and revenue while trying to scale manually.

This isn't a scare tactic. It's a signal.

The businesses that move fast? They win.

[START DISCOVERY]

---

**Email 3**
**Subject:** Your competitor just booked a growth assessment
**Preview:** Same score. Same market. Only one of you is moving.

You're not the only one who scored 8/9.

Another business in your industry did too. They booked their discovery call already.

This is the difference between operators who win and those who wait.

---

**Email 4**
**Subject:** Closing your file Wednesday
**Preview:** Fear is expensive. Math isn't. Your clock's ticking.

5 days since your assessment.

Radio silence.

Totally fine — but just so you know, I'll be closing your file Wednesday at 5 PM.

You scored 8/9. That means every week you wait is costing you serious money and time.

The discovery call is 45 minutes. We map your top 3 bottlenecks and show you what automation could look like — in your business.

[LAST CHANCE]

After Wednesday, the link expires and we prioritize others ready to act.

Clock's ticking.`
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ethan Sperry - Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }

          :root {
            --bg-primary: #000000; --bg-secondary: #0a0a0a; --bg-tertiary: #111111; --bg-hover: #141414;
            --text-primary: #ffffff; --text-secondary: #a0a0a0; --text-muted: #666666;
            --accent: #3b82f6; --accent-hover: #2563eb; --border: #1a1a1a; --success: #10b981; --warning: #f59e0b;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: var(--bg-primary); color: var(--text-primary); line-height: 1.6; overflow-x: hidden;
          }

          nav { position: fixed; top: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); z-index: 1000; }
          nav .container { max-width: 1200px; margin: 0 auto; padding: 1rem 2rem;
            display: flex; justify-content: space-between; align-items: center; }
          nav .logo { font-size: 1.1rem; font-weight: 600; }
          nav .links { display: flex; gap: 2rem; }
          nav a { color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; cursor: pointer; }
          nav a:hover { color: var(--text-primary); }

          main { max-width: 1200px; margin: 0 auto; padding: 6rem 2rem 4rem; }

          .hero { margin-bottom: 3rem; }
          .hero h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; }
          .hero p { font-size: 1.1rem; color: var(--text-secondary); max-width: 700px; }

          .tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
          .tab { padding: 0.75rem 1.5rem; background: transparent; border: 1px solid var(--border);
            border-radius: 8px; color: var(--text-secondary); cursor: pointer; font-size: 0.95rem;
            transition: all 0.2s; }
          .tab:hover { background: var(--bg-hover); color: var(--text-primary); }
          .tab.active { background: var(--accent); border-color: var(--accent); color: white; }

          .section { margin-bottom: 4rem; }
          .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;
            padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
          .section-header h2 { font-size: 1.8rem; font-weight: 600; }
          .section-badge { background: var(--bg-hover); color: var(--text-secondary);
            padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.8rem; }

          .case-grid { display: grid; gap: 2rem; }
          .case-card { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 16px; overflow: hidden; transition: all 0.3s; cursor: pointer; }
          .case-card:hover { border-color: var(--accent); transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

          .case-screenshot { width: 100%; height: 180px; background: var(--bg-tertiary); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 0.85rem; }

          .case-header { padding: 2rem 2rem 1rem; }
          .case-meta { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
          .case-type { background: var(--success); color: white; padding: 0.25rem 0.75rem;
            border-radius: 6px; font-size: 0.75rem; font-weight: 500; }
          .case-type.dev { background: var(--accent); }
          .case-status { background: var(--bg-hover); color: var(--text-secondary); padding: 0.25rem 0.75rem;
            border-radius: 6px; font-size: 0.75rem; }
          .case-status.active { background: rgba(16, 185, 129, 0.2); color: var(--success); }
          .case-title { font-size: 1.4rem; font-weight: 600; margin-bottom: 0.75rem; }
          .case-description { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem; }
          .case-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
          .tag { background: var(--bg-primary); border: 1px solid var(--border); padding: 0.25rem 0.75rem;
            border-radius: 6px; font-size: 0.8rem; color: var(--text-secondary); }

          .case-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
            background: var(--border); border-top: 1px solid var(--border); }
          .metric { background: var(--bg-tertiary); padding: 1.25rem; text-align: center; }
          .metric-value { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
          .metric-label { font-size: 0.8rem; color: var(--text-muted); }
          .metric-sublabel { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem; }

          .case-cta { padding: 1.25rem 2rem; background: var(--bg-tertiary); border-top: 1px solid var(--border);
            display: flex; justify-content: space-between; align-items: center; }
          .view-case { color: var(--accent); font-size: 0.9rem; font-weight: 500; }

          .platform-preview { margin-top: 3rem; }
          .platform-preview h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 1.5rem; color: var(--text-primary); }
          .preview-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .preview-card { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px;
            overflow: hidden; transition: all 0.3s; }
          .preview-card:hover { border-color: var(--accent); }
          .preview-frame { width: 100%; height: 300px; border: none; background: var(--bg-tertiary); }
          .preview-label { padding: 1rem; border-top: 1px solid var(--border); }
          .preview-label h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem; }
          .preview-label p { font-size: 0.8rem; color: var(--text-muted); }

          .samples-grid { display: grid; gap: 1.5rem; }
          .sample-card { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 12px; padding: 2rem; transition: all 0.3s; cursor: pointer; }
          .sample-card:hover { background: var(--bg-hover); border-color: var(--accent); transform: translateY(-2px); }
          .sample-card .view-btn { display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem;
            background: var(--accent); color: white; border-radius: 6px; font-size: 0.9rem;
            transition: all 0.2s; }
          .sample-card:hover .view-btn { background: var(--accent-hover); }
          .sample-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
          .sample-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
          .sample-type { background: var(--accent); color: white; padding: 0.25rem 0.75rem;
            border-radius: 6px; font-size: 0.75rem; font-weight: 500; white-space: nowrap; }
          .sample-type.client { background: var(--success); }
          .sample-description { color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem; }

          .project-links { display: flex; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap; }
          .demo-link { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--accent); color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
          .demo-link:hover { background: var(--accent-hover); }
          .github-link-secondary { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.85rem; border: 1px solid var(--border); transition: all 0.2s; }
          .github-link-secondary:hover { color: var(--text-primary); border-color: var(--text-muted); }

          .github-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--accent);
            text-decoration: none; font-size: 0.9rem; margin-top: 1rem; }
          .github-link:hover { text-decoration: underline; }

          .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.92); z-index: 2000; display: flex; align-items: center;
            justify-content: center; padding: 2rem; opacity: 0; animation: fadeIn 0.3s forwards; }
          .modal-content { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 16px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto;
            padding: 3rem; position: relative; transform: scale(0.95); opacity: 0;
            animation: slideIn 0.3s 0.1s forwards; }
          .modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: var(--bg-hover);
            border: 1px solid var(--border); color: var(--text-primary); width: 40px; height: 40px;
            border-radius: 8px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; font-size: 1.5rem; transition: all 0.2s; }
          .modal-close:hover { background: var(--border); }
          .modal-title { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
          .modal-body { color: var(--text-secondary); line-height: 1.8; }
          .modal-body strong { color: var(--text-primary); font-weight: 600; }
          .modal-body p { margin-bottom: 1rem; }
          .modal-body ul, .modal-body ol { margin-left: 1.5rem; margin-bottom: 1rem; }
          .modal-body li { margin-bottom: 0.5rem; }
          .modal-body h2 { color: var(--text-primary); font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
          .modal-body h3 { color: var(--text-primary); font-size: 1.2rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
          .modal-body hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
          .modal-body code { background: var(--bg-hover); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 0.9em; }

          @keyframes fadeIn { to { opacity: 1; } }
          @keyframes slideIn { to { transform: scale(1); opacity: 1; } }

          .cta-section { background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%); border: 1px solid var(--border); border-radius: 16px; padding: 3rem; text-align: center; margin: 3rem 0; }
          .cta-section h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; }
          .cta-section p { color: var(--text-secondary); margin-bottom: 1.5rem; }
          .cta-button { display: inline-block; background: var(--accent); color: white; padding: 0.875rem 2rem; border-radius: 8px; text-decoration: none; font-size: 1rem; font-weight: 600; transition: all 0.2s; }
          .cta-button:hover { background: var(--accent-hover); transform: translateY(-2px); }

          footer { max-width: 1200px; margin: 4rem auto 2rem; padding: 2rem; text-align: center;
            color: var(--text-muted); font-size: 0.9rem; border-top: 1px solid var(--border); }

          @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            nav .links { gap: 1rem; font-size: 0.85rem; }
            .modal-content { padding: 2rem; }
            .modal-title { font-size: 1.5rem; }
            .tabs { flex-wrap: wrap; }
            .case-metrics { grid-template-columns: 1fr; }
            .preview-grid { grid-template-columns: 1fr; }
          }
        ` }} />
      </head>
      <body>
        <nav>
          <div className="container">
            <div className="logo">Ethan Sperry</div>
            <div className="links">
              <a onClick={() => setActiveTab('cases')}>Case Studies</a>
              <a onClick={() => setActiveTab('copy')}>Email Copy</a>
              <a onClick={() => setActiveTab('projects')}>Projects</a>
            </div>
          </div>
        </nav>

        <main>
          <section className="hero">
            <h1>Growth Systems &<br />Technical Implementation</h1>
            <p>I build cold email infrastructure, automation systems, and growth operations for B2B companies. Currently consulting for TNT Transportation on corporate outreach and automation.</p>
          </section>

          <div className="tabs">
            <button className={`tab ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => setActiveTab('cases')}>
              Case Studies
            </button>
            <button className={`tab ${activeTab === 'copy' ? 'active' : ''}`} onClick={() => setActiveTab('copy')}>
              Email Copy
            </button>
            <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
              Technical Projects
            </button>
          </div>

          {activeTab === 'cases' && (
            <section className="section">
              <div className="case-grid">
                {Object.entries(caseStudies).map(([key, study]) => (
                  <div key={key} className="case-card" onClick={() => setModalContent({
                    title: study.title,
                    type: study.type,
                    content: study.content
                  })}>
                    <div className="case-screenshot" data-case={key}>Screenshot placeholder</div>
                    <div className="case-header">
                      <div className="case-meta">
                        <span className={`case-type ${study.type === 'Dev Partner' ? 'dev' : ''}`}>{study.type}</span>
                        <span className={`case-status ${study.status === 'System Design Complete' || study.status === 'Production' ? 'active' : ''}`}>{study.status}</span>
                      </div>
                      <div className="case-title">{study.title}</div>
                      <div className="case-description">{study.description}</div>
                      <div className="case-tags">
                        {study.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                      </div>
                    </div>
                    <div className="case-metrics">
                      {study.metrics.map((metric, i) => (
                        <div key={i} className="metric">
                          <div className="metric-value">{metric.value}</div>
                          <div className="metric-label">{metric.label}</div>
                          <div className="metric-sublabel">{metric.sublabel}</div>
                        </div>
                      ))}
                    </div>
                    <div className="case-cta">
                      <span className="view-case">View Full Case Study →</span>
                    </div>
                  </div>
                ))}
              </div>

              </section>
          )}

          {activeTab === 'copy' && (
            <section className="section">
              <div className="section-header">
                <h2>Email Copywriting Samples</h2>
                <span className="section-badge">Practice + Client Work</span>
              </div>
              <div className="samples-grid">
                {Object.entries(emailSamples).map(([key, sample]) => (
                  <div key={key} className="sample-card" onClick={() => setModalContent({
                    title: sample.title,
                    type: sample.type,
                    content: sample.content
                  })}>
                    <div className="sample-header">
                      <div>
                        <div className="sample-title">{sample.title}</div>
                        <div className="sample-description">{sample.description}</div>
                      </div>
                      <span className="sample-type">{sample.type}</span>
                    </div>
                    <div className="case-tags">{sample.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
                    <div className="view-btn">View Email →</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'projects' && (
            <section className="section">
              <div className="section-header">
                <h2>Technical Projects</h2>
                <span className="section-badge">GitHub</span>
              </div>
              <div className="samples-grid">
                <div className="sample-card" style={{cursor: 'default'}}>
                  <div className="sample-header">
                    <div>
                      <div className="sample-title">TNT Transportation Platform</div>
                      <div className="sample-description">Full-stack automation, documentation, and workflow systems.</div>
                    </div>
                    <span className="sample-type client">Client Work</span>
                  </div>
                  <div className="case-tags">
                    <span className="tag">Next.js</span>
                    <span className="tag">PostgreSQL</span>
                    <span className="tag">n8n</span>
                    <span className="tag">QuickBooks API</span>
                  </div>
                  <div className="project-links"><a href="https://github.com/sperry-entelech/tnt-documentation" target="_blank" rel="noopener" className="github-link-secondary">GitHub →</a></div>
                </div>

                <div className="sample-card" style={{cursor: 'default'}}>
                  <div className="sample-header">
                    <div>
                      <div className="sample-title">Entelech Platform</div>
                      <div className="sample-description">Internal operations platform with dashboard, outbound management, and client tools.</div>
                    </div>
                    <span className="sample-type">Internal</span>
                  </div>
                  <div className="case-tags">
                    <span className="tag">Next.js</span>
                    <span className="tag">TypeScript</span>
                    <span className="tag">Vercel</span>
                  </div>
                  <div className="project-links"><a href="https://entelech-platform.vercel.app" target="_blank" rel="noopener" className="demo-link">Live Demo →</a><a href="https://github.com/sperry-entelech/entelech-platform" target="_blank" rel="noopener" className="github-link-secondary">GitHub</a></div>
                </div>

                <div className="sample-card" style={{cursor: 'default'}}>
                  <div className="sample-header">
                    <div>
                      <div className="sample-title">Claude Skills Factory</div>
                      <div className="sample-description">AI skills development platform with Claude API integration.</div>
                    </div>
                    <span className="sample-type">Demo</span>
                  </div>
                  <div className="case-tags">
                    <span className="tag">TypeScript</span>
                    <span className="tag">Claude API</span>
                    <span className="tag">React</span>
                  </div>
                  <div className="project-links"><a href="https://github.com/sperry-entelech/claude-skills-factory-frontend" target="_blank" rel="noopener" className="github-link-secondary">GitHub →</a></div>
                </div>

                <div className="sample-card" style={{cursor: 'default'}}>
                  <div className="sample-header">
                    <div>
                      <div className="sample-title">MTT Poker Solver</div>
                      <div className="sample-description">Multi-table tournament solver with ICM calculations. Functional UI.</div>
                    </div>
                    <span className="sample-type">Demo</span>
                  </div>
                  <div className="case-tags">
                    <span className="tag">TypeScript</span>
                    <span className="tag">React</span>
                    <span className="tag">PostgreSQL</span>
                  </div>
                  <div className="project-links"><a href="https://github.com/sperry-entelech/mtt-solver" target="_blank" rel="noopener" className="github-link-secondary">GitHub →</a></div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>View all 40+ repositories:</strong>
                </p>
                <a href="https://github.com/sperry-entelech?tab=repositories" target="_blank" rel="noopener" className="github-link">github.com/sperry-entelech →</a>
              </div>
            </section>
          )}
        </main>

        <footer>
          <p>Ethan Sperry · sperry@entelech.net</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <a href="https://github.com/sperry-entelech" target="_blank" rel="noopener" style={{ color: 'var(--accent)', textDecoration: 'none' }}>GitHub</a>
          </p>
        </footer>

        {modalContent && (
          <div className="modal-overlay" onClick={() => setModalContent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-close" onClick={() => setModalContent(null)}>×</div>
              <div className="modal-title">{modalContent.title}</div>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className={`sample-type ${modalContent.type === 'Active Client' || modalContent.type === 'Client Work' ? 'client' : ''}`}>{modalContent.type}</span>
              </div>
              <div className="modal-body">
                <ReactMarkdown>{modalContent.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
