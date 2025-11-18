'use client';

import { useState } from 'react';

export default function PortfolioPage() {
  const [modalContent, setModalContent] = useState<{title: string, content: string, type: string} | null>(null);

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

• Streamlining your intake processes and follow-up communications
• Creating predictable lead generation with comprehensive tracking
• Training your team to convert inquiries efficiently without constant oversight

This isn't simply another marketing package—it's a comprehensive system designed to help scale your practice while giving you back valuable time.

I believe you chose medicine to make an impact, not to struggle with business operations. We'd like to help address these challenges.

[Click here to learn more about our approach]

Warm regards,
[Your Name]

**P.S.** Many practices we support see meaningful improvements within 30 days, including a significant increase in qualified patients without additional work hours. If practice growth is a priority for you, we'd welcome a conversation.`
    },
    partnership: {
      title: "B2B Partnership Outreach",
      type: "Practice",
      description: "Collaborative positioning for agency partnerships. Clear value prop with specific benefits.",
      tags: ["B2B", "Partnership", "Agency"],
      content: `**Subject Line:** Organic lead gen + paid ads: Partnership opportunity

Hi [Name],

Your impressive [specific campaign] caught my attention, particularly how you [specific achievement with paid ads]. Your paid expertise perfectly complements our organic lead generation focus at [Your Agency Name].

We help B2B companies in [industry] build sustainable organic pipelines, and partnerships with specialized paid agencies have delivered powerful results for shared clients:

• Expanded service offerings without additional overhead
• Complete solutions combining paid + organic strategies
• Mutual referral opportunities for ideal-fit clients

Our recent collaboration with a company like yours increased qualified leads by 30% for shared clients through aligned paid and organic strategies.

Could we discuss potential synergies in a 15-minute call next week?

Book here: [Calendar link] or suggest a time that works for you.

Looking forward to exploring collaboration,

[Your Name]
[Your Agency Name]
[Contact Information]`
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

• You're burnt out doing everything alone
• You've tried "everything" to get consistent leads
• Your personal life is suffering while you're glued to your laptop trying to keep the business alive
• Wondering why you haven't scaled more and it's killing you day by day

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
    ascension: {
      title: "Client Ascension Email",
      type: "Practice",
      description: "Agency owner upsell sequence. Direct, no-BS positioning for scaling revenue.",
      tags: ["Upsell", "Agency", "Scaling"],
      content: `**Subject Line:** [name]! You're not stuck… You're just one system away.

Let's be real

You don't need more hustle.

Past a certain point, you need to use the leverage you've built in a creative way.

**You're the boss now, so act like it.**

As a successful business owner that wants to scale more than anything…

You need a machine that actually works.

And that's exactly what you'll find inside **Client Ascension.**

We give agency owners the exact systems, mentorship, and accountability to go from unreliable to consistent $20k, $50k, even $100k+ revenue every month without burning out.

**You'll have unlimited access to:**

✓ A plug-and-play client acquisition system so you never have to rely on referrals again
✓ An offer so compelling your ideal clients feel stupid not to buy
✓ Scalable fulfillment systems and automation so you stop being the bottleneck
✓ Weekly access to top-tier coaches and a community of hungry agency owners pushing you forward
✓ Templates, SOPs, and frameworks for sales, onboarding, delivery, and scaling

No fluff. No recycled guru advice.

Just a straight path to the results you've been grinding for.

Do yourself a favor (name).

Make this the last program you'll ever need in your entire life.

**(LINK)**

**P.S.** – You've already done the hard part — realizing your agency deserves more. Now it's just a matter of plugging into a system that's PROVEN to work.

Click here to see how Client Ascension can help you scale to $100k/month — without guessing, grinding insane hours, or swimming upstream, alone.`
    },
    sales: {
      title: "SaaS Product Email",
      type: "Practice",
      description: "AI-powered sales platform positioning. Problem-solution with competitive urgency.",
      tags: ["SaaS", "B2B", "Sales Tech"],
      content: `**Subject Line:** Your best sales reps are hoarding their secrets (and it's silently costing you deals every week)

Hey there,

Your top sales performer is keeping their best tactics to themselves.

It's how they stay valuable. It's how they outperform everyone else. And it's silently bleeding your company dry of revenue that should be yours.

This isn't a hypothetical - I see it in nearly every sales team I consult with.

Your reps are all working in silos. No collaboration. Zero visibility between team members. Every deal feels like reinventing the wheel.

Every sales leader thinks their problem is more leads. It's not.

**It's that every rep is doing their own thing. No consistency. No visibility. No control.**

And you're bleeding deals because of it.

I call it "sales isolation syndrome" - when your team has talent but they're trapped in their own individual bubbles.

It's burning out your team, stalling deals at the finish line, and worst of all, it's completely fixable.

Which is why I'm so excited about what the team at **SalesMomentum.io** has built.

Their AI-powered sales platform is the first one I've seen that actually solves the collaboration problem while supercharging your entire pipeline.

**Here's what makes it different:**

• Their AI sales assistant analyzes conversations and suggests proven responses in real-time (no more guessing what works)
• Every rep's best tactics get shared automatically across the team (no more knowledge hoarding)
• The pipeline automation eliminates the boring admin work that steals 37% of your team's selling time
• And their custom playbooks let you clone your top performers' strategies with one click

One client implemented it last quarter and saw their close rate jump 24% in the first 30 days. Another cut their sales cycle in half.

If you're ready to stop the revenue leaks and give your team the tools they actually need, check it out here:

**[LINK]**

I rarely recommend software, but when something solves a problem this big, this effectively, I have to share it.

Best,
[Your Name]

**P.S.** If you book a demo this week, their team will personally set everything up for you — so your reps are running the new system in days, not months. Normally $5K. Yours free: [LINK]`
    },
    coaching: {
      title: "High-Ticket Coaching Ads (5 Variations)",
      type: "Practice",
      description: "Facebook ad copy for sales coaching program. Multiple iterations with different hooks.",
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
      title: "Entelech High-Score Sequence",
      type: "Practice",
      description: "High-ticket coaching sequences with behavioral triggers and objection handling.",
      tags: ["Coaching", "Behavioral", "High-Ticket"],
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
    },
    closing: {
      title: "Closing Bible Email",
      type: "Practice",
      description: "Sales coaching email for remote closers. Performance-based positioning.",
      tags: ["Sales", "Coaching", "Remote"],
      content: `**Subject Line:** Why you're not hitting 5-figure months

Hey [First Name],

If you're reading this, you're already making decent money in a sales role (unless you lied in the typeform)

BUT…

You're tired of chasing unqualified leads, being stuck at low commissions, and watching others hit 5-figure months while you know you're capable of more.

You have the skills to have 5-figure months, but you don't know why it hasn't happened yet…

**Here's the truth:**

Life-changing income from sales is right around the corner.

The leap from setter to remote closer isn't about talent. It's about having the right system and mentorship. We've helped over 118 students make that leap to a higher earning potential with less headache.

That's exactly what you'll find inside **The Closing Bible**. It's a proven process designed to help you:

✓ Master high-ticket closing
✓ Land remote offers
✓ Earn 5-figure months — consistently

If you're serious about making sales your vehicle for freedom, this is your next step.

Book your free strategy call here. ←- link

We'll break down where you're at, where you want to go, and how to bridge the gap — fast.

You've got the drive.

Let's build the skillset to match it.

Talk soon,
[Your Name]`
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
            --bg-primary: #000000; --bg-secondary: #0a0a0a; --bg-hover: #141414;
            --text-primary: #ffffff; --text-secondary: #a0a0a0; --text-muted: #666666;
            --accent: #3b82f6; --border: #1a1a1a; --success: #10b981;
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
          nav a { color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
          nav a:hover { color: var(--text-primary); }

          main { max-width: 1200px; margin: 0 auto; padding: 6rem 2rem 4rem; }
          .hero { margin-bottom: 4rem; }
          .hero h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; }
          .hero p { font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; }

          .section { margin-bottom: 4rem; }
          .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;
            padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
          .section-header h2 { font-size: 1.8rem; font-weight: 600; }
          .section-badge { background: var(--bg-hover); color: var(--text-secondary);
            padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.8rem; }

          .samples-grid { display: grid; gap: 1.5rem; }
          .sample-card { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 12px; padding: 2rem; transition: all 0.3s; cursor: pointer; }
          .sample-card:hover { background: var(--bg-hover); border-color: var(--accent); transform: translateY(-2px); }
          .sample-card .view-btn { display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem;
            background: var(--accent); color: white; border-radius: 6px; font-size: 0.9rem;
            transition: all 0.2s; }
          .sample-card:hover .view-btn { background: #2563eb; }
          .sample-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
          .sample-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
          .sample-type { background: var(--accent); color: white; padding: 0.25rem 0.75rem;
            border-radius: 6px; font-size: 0.75rem; font-weight: 500; white-space: nowrap; }
          .sample-type.client { background: var(--success); }
          .sample-description { color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem; }
          .sample-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
          .tag { background: var(--bg-primary); border: 1px solid var(--border); padding: 0.25rem 0.75rem;
            border-radius: 6px; font-size: 0.8rem; color: var(--text-secondary); }
          .github-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--accent);
            text-decoration: none; font-size: 0.9rem; margin-top: 1rem; }
          .github-link:hover { text-decoration: underline; }

          .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.92); z-index: 2000; display: flex; align-items: center;
            justify-content: center; padding: 2rem; opacity: 0; animation: fadeIn 0.3s forwards; }
          .modal-content { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 16px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto;
            padding: 3rem; position: relative; transform: scale(0.95); opacity: 0;
            animation: slideIn 0.3s 0.1s forwards; }
          .modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: var(--bg-hover);
            border: 1px solid var(--border); color: var(--text-primary); width: 40px; height: 40px;
            border-radius: 8px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; font-size: 1.5rem; transition: all 0.2s; }
          .modal-close:hover { background: var(--border); }
          .modal-title { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
          .modal-body { color: var(--text-secondary); line-height: 1.8; white-space: pre-wrap; }
          .modal-body strong { color: var(--text-primary); }
          .modal-body p { margin-bottom: 1rem; }

          @keyframes fadeIn { to { opacity: 1; } }
          @keyframes slideIn { to { transform: scale(1); opacity: 1; } }

          footer { max-width: 1200px; margin: 4rem auto 2rem; padding: 2rem; text-align: center;
            color: var(--text-muted); font-size: 0.9rem; border-top: 1px solid var(--border); }
          .footer-note { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 8px; padding: 1rem; margin-top: 1rem; font-size: 0.85rem; }

          @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            nav .links { gap: 1rem; font-size: 0.85rem; }
            .modal-content { padding: 2rem; }
            .modal-title { font-size: 1.5rem; }
          }
        ` }} />
      </head>
      <body>
        <nav>
          <div className="container">
            <div className="logo">Ethan Sperry</div>
            <div className="links">
              <a href="#email">Email Copy</a>
              <a href="#projects">Projects</a>
              <a href="#about">About</a>
            </div>
          </div>
        </nav>

        <main>
          <section className="hero">
            <h1>Frontend Development<br />Growth Ops Consulting<br />Copywriting</h1>
            <p>Technical implementation, growth operations, and conversion-focused copy. Consulting for TNT Transportation on automation and full-stack systems.</p>
          </section>

          <section id="email" className="section">
            <div className="section-header"><h2>Email Copywriting</h2><span className="section-badge">8 samples</span></div>
            <div className="samples-grid">

              <div className="sample-card" onClick={() => setModalContent({
                title: "TNT Transportation Newsletter",
                type: "Client Work",
                content: "B2B corporate newsletter sent to 300 customer contacts. Holiday-themed relationship marketing.\n\n**Results:**\n• 53% open rate (Day 1)\n• 300+ recipients\n• B2B transportation industry\n\nThis was part of ongoing consulting work for TNT Transportation, focusing on customer relationship marketing and retention strategies."
              })}>
                <div className="sample-header">
                  <div>
                    <div className="sample-title">TNT Transportation Newsletter</div>
                    <div className="sample-description">B2B corporate newsletter to 300 customer contacts. Holiday-themed relationship marketing.</div>
                  </div>
                  <span className="sample-type client">Client Work</span>
                </div>
                <div className="sample-tags"><span className="tag">B2B</span><span className="tag">Newsletter</span><span className="tag">Transportation</span></div>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '2rem' }}>
                  <div><div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--success)' }}>53%</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Open Rate (Day 1)</div></div>
                  <div><div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--success)' }}>300+</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recipients</div></div>
                </div>
                <div className="view-btn">View Email →</div>
              </div>

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
                  <div className="sample-tags">{sample.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
                  <div className="view-btn">View Email →</div>
                </div>
              ))}

            </div>
          </section>

          <section id="projects" className="section">
            <div className="section-header"><h2>Technical Projects</h2><span className="section-badge">Selected repos</span></div>
            <div className="samples-grid">

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">TNT Transportation Automation</div><div className="sample-description">Consulting on automation and implementation. Documentation, workflow systems, and integrations.</div></div>
                  <span className="sample-type client">Client Work</span>
                </div>
                <div className="sample-tags"><span className="tag">Next.js</span><span className="tag">PostgreSQL</span><span className="tag">n8n</span><span className="tag">QuickBooks API</span></div>
                <a href="https://github.com/sperry-entelech/tnt-documentation" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Fulcrum Landing Page</div><div className="sample-description">Landing page project with modern design system.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">Landing Page</span><span className="tag">Design System</span></div>
                <a href="https://github.com/sperry-entelech/fulcrum" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Echelon Database</div><div className="sample-description">PLpgSQL database architecture and backend systems.</div></div>
                  <span className="sample-type">Internal</span>
                </div>
                <div className="sample-tags"><span className="tag">PostgreSQL</span><span className="tag">PLpgSQL</span><span className="tag">Backend</span></div>
                <a href="https://github.com/sperry-entelech/echelon" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">AI Incubator Aggregator</div><div className="sample-description">TypeScript application for aggregating AI incubator data.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">AI</span><span className="tag">Data</span></div>
                <a href="https://github.com/sperry-entelech/AIIA-AI-Incubator-Aggregator" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Self-Iterating Documentation</div><div className="sample-description">Documentation system that maintains and updates itself.</div></div>
                  <span className="sample-type">Internal</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">Documentation</span><span className="tag">Automation</span></div>
                <a href="https://github.com/sperry-entelech/self-iterating-documentation" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Claude Skills Factory</div><div className="sample-description">Frontend and backend for Claude AI skills development platform.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">JavaScript</span><span className="tag">Claude API</span></div>
                <a href="https://github.com/sperry-entelech/claude-skills-factory-frontend" target="_blank" rel="noopener" className="github-link">View Frontend →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Member Engagement Platform</div><div className="sample-description">Community engagement dashboard and management system.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">Dashboard</span><span className="tag">Community</span></div>
                <a href="https://github.com/sperry-entelech/member-engagement-platform" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">MTT Poker Solver</div><div className="sample-description">Multi-table tournament poker solver with ICM calculations. UI functional, MVP stage.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">React</span><span className="tag">PostgreSQL</span></div>
                <a href="https://github.com/sperry-entelech/mtt-solver" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Proposal Generator</div><div className="sample-description">AI-powered proposal generation system. Claude 3.5 integration.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">HTML</span><span className="tag">Claude API</span><span className="tag">AI</span></div>
                <a href="https://github.com/sperry-entelech/proposal-generator-demo" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card" style={{cursor: 'default'}}>
                <div className="sample-header">
                  <div><div className="sample-title">Matrix Daily Brief</div><div className="sample-description">Daily briefing system with automated intelligence gathering.</div></div>
                  <span className="sample-type">Internal</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">Automation</span></div>
                <a href="https://github.com/sperry-entelech/matrix-daily-brief" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>View all 40+ repositories:</strong>
              </p>
              <a href="https://github.com/sperry-entelech?tab=repositories" target="_blank" rel="noopener" className="github-link">github.com/sperry-entelech →</a>
            </div>
          </section>

          <section id="about" className="section">
            <div className="section-header"><h2>About</h2></div>
            <div className="sample-card" style={{cursor: 'default'}}>
              <div className="sample-title" style={{ marginBottom: '1.5rem' }}>Services</div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text-primary)' }}>Email Copywriting</strong></p>
                <p style={{ marginBottom: '2rem' }}>Behavior-triggered sequences, landing pages, and conversion-focused messaging. I write copy that addresses objections and moves prospects through funnels predictably.</p>
                <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text-primary)' }}>Technical Development</strong></p>
                <p style={{ marginBottom: '2rem' }}>Full-stack applications, automation systems, and database architecture. TypeScript, React, Next.js, PostgreSQL, and Claude API integrations.</p>
                <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text-primary)' }}>Consulting</strong></p>
                <p>Currently consulting for TNT Transportation on automation and implementation projects. Available for similar engagements.</p>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-note">
            <strong>Portfolio Note:</strong> Practice email samples demonstrate frameworks and strategic approaches.
            Client work results are verified (TNT Transportation consulting, 53% open rate on 300-recipient newsletter).
            Technical projects range from production code to MVPs and demos. Some projects are works in progress.
          </div>
          <p style={{ marginTop: '2rem' }}>Ethan Sperry · sperry@entelech.net</p>
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
                <span className={`sample-type ${modalContent.type === 'Client Work' ? 'client' : ''}`}>{modalContent.type}</span>
              </div>
              <div className="modal-body">{modalContent.content}</div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
