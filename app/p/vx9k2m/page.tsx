export const metadata = {
  title: 'Ethan Sperry - Portfolio',
  robots: 'noindex, nofollow',
};

export default function PortfolioPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .hero p { font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; }

          .section { margin-bottom: 4rem; }
          .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;
            padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
          .section-header h2 { font-size: 1.8rem; font-weight: 600; }
          .section-badge { background: var(--bg-hover); color: var(--text-secondary);
            padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.8rem; }

          .samples-grid { display: grid; gap: 1.5rem; }
          .sample-card { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 12px; padding: 2rem; transition: all 0.3s; }
          .sample-card:hover { background: var(--bg-hover); border-color: var(--accent); transform: translateY(-2px); }
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

          footer { max-width: 1200px; margin: 4rem auto 2rem; padding: 2rem; text-align: center;
            color: var(--text-muted); font-size: 0.9rem; border-top: 1px solid var(--border); }
          .footer-note { background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: 8px; padding: 1rem; margin-top: 1rem; font-size: 0.85rem; }

          @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            nav .links { gap: 1rem; font-size: 0.85rem; }
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
            <div className="section-header"><h2>Email Copywriting</h2><span className="section-badge">9 samples</span></div>
            <div className="samples-grid">

              <div className="sample-card">
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
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Medical Practice Cold Email</div><div className="sample-description">Professional, consultative tone for sophisticated buyers. Systems-focused positioning.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">B2B</span><span className="tag">Medical</span><span className="tag">Professional</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">B2B Partnership Outreach</div><div className="sample-description">Collaborative positioning for agency partnerships. Clear value prop with specific benefits.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">B2B</span><span className="tag">Partnership</span><span className="tag">Agency</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Growth Operations Email</div><div className="sample-description">Aggressive, results-focused cold email for service businesses stuck at $5-10K/month.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">Growth Ops</span><span className="tag">Aggressive</span><span className="tag">Guarantee</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Client Ascension Email</div><div className="sample-description">Agency owner upsell sequence. Direct, no-BS positioning for scaling revenue.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">Upsell</span><span className="tag">Agency</span><span className="tag">Scaling</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">SaaS Product Email</div><div className="sample-description">AI-powered sales platform positioning. Problem-solution with competitive urgency.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">SaaS</span><span className="tag">B2B</span><span className="tag">Sales Tech</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">High-Ticket Coaching Ads (5 Variations)</div><div className="sample-description">Facebook ad copy for sales coaching program. Multiple iterations with different hooks.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">Coaching</span><span className="tag">High-Ticket</span><span className="tag">FB Ads</span><span className="tag">A/B Testing</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Entelech High-Score Sequence</div><div className="sample-description">High-ticket coaching sequences with behavioral triggers and objection handling.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">Coaching</span><span className="tag">Behavioral</span><span className="tag">High-Ticket</span></div>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Closing Bible Email</div><div className="sample-description">Sales coaching email for remote closers. Performance-based positioning.</div></div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags"><span className="tag">Sales</span><span className="tag">Coaching</span><span className="tag">Remote</span></div>
              </div>

            </div>
          </section>

          <section id="projects" className="section">
            <div className="section-header"><h2>Technical Projects</h2><span className="section-badge">Selected repos</span></div>
            <div className="samples-grid">

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">TNT Transportation Automation</div><div className="sample-description">Consulting on automation and implementation. Documentation, workflow systems, and integrations.</div></div>
                  <span className="sample-type client">Client Work</span>
                </div>
                <div className="sample-tags"><span className="tag">Next.js</span><span className="tag">PostgreSQL</span><span className="tag">n8n</span><span className="tag">QuickBooks API</span></div>
                <a href="https://github.com/sperry-entelech/tnt-documentation" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Fulcrum Landing Page</div><div className="sample-description">Landing page project with modern design system.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">Landing Page</span><span className="tag">Design System</span></div>
                <a href="https://github.com/sperry-entelech/fulcrum" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Echelon Database</div><div className="sample-description">PLpgSQL database architecture and backend systems.</div></div>
                  <span className="sample-type">Internal</span>
                </div>
                <div className="sample-tags"><span className="tag">PostgreSQL</span><span className="tag">PLpgSQL</span><span className="tag">Backend</span></div>
                <a href="https://github.com/sperry-entelech/echelon" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">AI Incubator Aggregator</div><div className="sample-description">TypeScript application for aggregating AI incubator data.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">AI</span><span className="tag">Data</span></div>
                <a href="https://github.com/sperry-entelech/AIIA-AI-Incubator-Aggregator" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Self-Iterating Documentation</div><div className="sample-description">Documentation system that maintains and updates itself.</div></div>
                  <span className="sample-type">Internal</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">Documentation</span><span className="tag">Automation</span></div>
                <a href="https://github.com/sperry-entelech/self-iterating-documentation" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Claude Skills Factory</div><div className="sample-description">Frontend and backend for Claude AI skills development platform.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">JavaScript</span><span className="tag">Claude API</span></div>
                <a href="https://github.com/sperry-entelech/claude-skills-factory-frontend" target="_blank" rel="noopener" className="github-link">View Frontend →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Member Engagement Platform</div><div className="sample-description">Community engagement dashboard and management system.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">Dashboard</span><span className="tag">Community</span></div>
                <a href="https://github.com/sperry-entelech/member-engagement-platform" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">MTT Poker Solver</div><div className="sample-description">Multi-table tournament poker solver with ICM calculations. UI functional, MVP stage.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">TypeScript</span><span className="tag">React</span><span className="tag">PostgreSQL</span></div>
                <a href="https://github.com/sperry-entelech/mtt-solver" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
                <div className="sample-header">
                  <div><div className="sample-title">Proposal Generator</div><div className="sample-description">AI-powered proposal generation system. Claude 3.5 integration.</div></div>
                  <span className="sample-type">Demo</span>
                </div>
                <div className="sample-tags"><span className="tag">HTML</span><span className="tag">Claude API</span><span className="tag">AI</span></div>
                <a href="https://github.com/sperry-entelech/proposal-generator-demo" target="_blank" rel="noopener" className="github-link">View on GitHub →</a>
              </div>

              <div className="sample-card">
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
            <div className="sample-card">
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
      </body>
    </html>
  );
}