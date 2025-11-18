export default function PortfolioPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Sperry Entelech - Portfolio</title>
        <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg-primary: #000000;
            --bg-secondary: #0a0a0a;
            --bg-hover: #141414;
            --text-primary: #ffffff;
            --text-secondary: #a0a0a0;
            --text-muted: #666666;
            --accent: #3b82f6;
            --border: #1a1a1a;
            --success: #10b981;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
        }

        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            z-index: 1000;
        }

        nav .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav .logo {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
        }

        nav .links {
            display: flex;
            gap: 2rem;
        }

        nav a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.2s;
        }

        nav a:hover {
            color: var(--text-primary);
        }

        main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 6rem 2rem 4rem;
        }

        .hero {
            margin-bottom: 4rem;
        }

        .hero h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.1rem;
            color: var(--text-secondary);
            max-width: 600px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
            padding: 2rem;
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .section {
            margin-bottom: 4rem;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
        }

        .section-header h2 {
            font-size: 1.8rem;
            font-weight: 600;
        }

        .section-badge {
            background: var(--bg-hover);
            color: var(--text-secondary);
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.8rem;
        }

        .samples-grid {
            display: grid;
            gap: 1.5rem;
        }

        .sample-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 2rem;
            transition: all 0.3s;
            cursor: pointer;
        }

        .sample-card:hover {
            background: var(--bg-hover);
            border-color: var(--accent);
            transform: translateY(-2px);
        }

        .sample-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1rem;
        }

        .sample-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .sample-type {
            background: var(--accent);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .sample-description {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }

        .sample-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .tag {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.8rem;
            color: var(--text-secondary);
        }

        .sample-metrics {
            display: flex;
            gap: 2rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
        }

        .metric {
            display: flex;
            flex-direction: column;
        }

        .metric-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--success);
        }

        .metric-label {
            font-size: 0.8rem;
            color: var(--text-muted);
        }

        .sample-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .sample-content.expanded {
            max-height: 2000px;
        }

        .content-inner {
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            margin-top: 1.5rem;
        }

        .copy-block {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem 0;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.8;
            color: var(--text-secondary);
            white-space: pre-wrap;
        }

        .view-btn {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            color: var(--text-secondary);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .view-btn:hover {
            background: var(--bg-hover);
            color: var(--text-primary);
            border-color: var(--accent);
        }

        footer {
            max-width: 1200px;
            margin: 4rem auto 2rem;
            padding: 2rem;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.9rem;
            border-top: 1px solid var(--border);
        }

        .footer-note {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            font-size: 0.85rem;
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }

            nav .links {
                gap: 1rem;
            }

            .stats {
                grid-template-columns: 1fr;
            }

            .sample-metrics {
                flex-direction: column;
                gap: 1rem;
            }
        }
        ` }} />
      </head>
      <body>
        <nav>
          <div className="container">
            <div className="logo">Sperry Entelech</div>
            <div className="links">
              <a href="#email">Email Copy</a>
              <a href="#landing">Landing Pages</a>
              <a href="#results">Results</a>
            </div>
          </div>
        </nav>

        <main>
          <section className="hero">
            <h1>Conversion Copywriting<br />& Email Sequences</h1>
            <p>I write email sequences and landing pages that move prospects through your funnel predictably—not just &quot;sound good.&quot; Behavior-triggered, objection-based, outcome-focused.</p>
          </section>

          <div className="stats">
            <div className="stat">
              <div className="stat-value">53%</div>
              <div className="stat-label">Open Rate (Day 1)</div>
            </div>
            <div className="stat">
              <div className="stat-value">300+</div>
              <div className="stat-label">Recipients</div>
            </div>
            <div className="stat">
              <div className="stat-value">$2.2K/mo</div>
              <div className="stat-label">Current Retainer</div>
            </div>
            <div className="stat">
              <div className="stat-value">TNT</div>
              <div className="stat-label">Active Client</div>
            </div>
          </div>

          {/* Rest of the content - email sequences, landing pages, results sections */}
          <section id="email" className="section">
            <div className="section-header">
              <h2>Email Sequences</h2>
              <span className="section-badge">9 samples</span>
            </div>
            <div className="samples-grid">
              {/* Sample cards will go here - keeping the structure simple for now */}
              <div className="sample-card">
                <div className="sample-header">
                  <div>
                    <div className="sample-title">High-Ticket Coaching Email Sequence</div>
                    <div className="sample-description">Lead nurture sequence for coaching program. Objection handling, social proof, risk reversal.</div>
                  </div>
                  <span className="sample-type">Practice</span>
                </div>
                <div className="sample-tags">
                  <span className="tag">Coaching</span>
                  <span className="tag">High-Ticket</span>
                  <span className="tag">Objection Handling</span>
                </div>
              </div>
            </div>
          </section>

          <section id="results" className="section">
            <div className="section-header">
              <h2>Results & Experience</h2>
              <span className="section-badge">Client work</span>
            </div>
            <div className="samples-grid">
              <div className="sample-card">
                <div className="sample-header">
                  <div>
                    <div className="sample-title">TNT Transportation Email Newsletter</div>
                    <div className="sample-description">Corporate newsletter to 300 customer contacts. Holiday-themed relationship marketing + promotional offer integration.</div>
                  </div>
                  <span className="sample-type" style={{ background: 'var(--success)' }}>Client Work</span>
                </div>
                <div className="sample-tags">
                  <span className="tag">B2B</span>
                  <span className="tag">Newsletter</span>
                  <span className="tag">Transportation</span>
                </div>
                <div className="sample-metrics">
                  <div className="metric">
                    <div className="metric-value">53%</div>
                    <div className="metric-label">Open Rate (Day 1)</div>
                  </div>
                  <div className="metric">
                    <div className="metric-value">300+</div>
                    <div className="metric-label">Recipients</div>
                  </div>
                  <div className="metric">
                    <div className="metric-value">$2.2K/mo</div>
                    <div className="metric-label">Retainer</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-note">
            <strong>Portfolio Note:</strong> Practice samples represent frameworks and strategic approaches I use.
            Client work results are verified (TNT Transportation retainer, 53% open rate on 300-recipient newsletter).
          </div>
          <p style={{ marginTop: '2rem' }}>Sperry Entelech · sperry@entelech.net</p>
        </footer>

        <script dangerouslySetInnerHTML={{ __html: `
          function toggleContent(card) {
            const content = card.querySelector('.sample-content');
            const btn = card.querySelector('.view-btn');
            if (content.classList.contains('expanded')) {
              content.classList.remove('expanded');
              btn.textContent = 'View Sample →';
            } else {
              content.classList.add('expanded');
              btn.textContent = 'Hide Sample ↑';
            }
          }

          document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
          });
        ` }} />
      </body>
    </html>
  );
}