-- Outbound Marketing Tracker - Database Setup

CREATE TABLE IF NOT EXISTS outbound_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(20) DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS outbound_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES outbound_channels(id) ON DELETE CASCADE,
  period_month DATE NOT NULL,
  emails_sent INTEGER DEFAULT 0,
  emails_delivered INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  emails_replied INTEGER DEFAULT 0,
  hard_bounces INTEGER DEFAULT 0,
  complaints INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(channel_id, period_month)
);

ALTER TABLE outbound_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE outbound_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read channels" ON outbound_channels;
DROP POLICY IF EXISTS "Anyone can read stats" ON outbound_stats;
DROP POLICY IF EXISTS "Anyone can write channels" ON outbound_channels;
DROP POLICY IF EXISTS "Anyone can write stats" ON outbound_stats;

CREATE POLICY "Anyone can read channels" ON outbound_channels FOR SELECT USING (true);
CREATE POLICY "Anyone can read stats" ON outbound_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can write channels" ON outbound_channels FOR ALL USING (true);
CREATE POLICY "Anyone can write stats" ON outbound_stats FOR ALL USING (true);

INSERT INTO outbound_channels (name, description, color) VALUES
  ('Channel 1', 'Primary outreach - highest volume', '#3B82F6'),
  ('Channel 2', 'Secondary campaigns', '#8B5CF6'),
  ('Channel 3', 'High-engagement list - best open rates', '#10B981'),
  ('Channel 4', 'Volume driver - construction bids', '#F59E0B')
ON CONFLICT DO NOTHING;

DO $$
DECLARE
  ch1_id UUID;
  ch2_id UUID;
  ch3_id UUID;
  ch4_id UUID;
BEGIN
  SELECT id INTO ch1_id FROM outbound_channels WHERE name = 'Channel 1';
  SELECT id INTO ch2_id FROM outbound_channels WHERE name = 'Channel 2';
  SELECT id INTO ch3_id FROM outbound_channels WHERE name = 'Channel 3';
  SELECT id INTO ch4_id FROM outbound_channels WHERE name = 'Channel 4';

  INSERT INTO outbound_stats (channel_id, period_month, emails_sent, emails_delivered, emails_opened, emails_clicked, emails_replied, hard_bounces, complaints)
  VALUES
    (ch1_id, '2025-09-01', 15000, 14700, 1500, 45, 22, 126, 2),
    (ch2_id, '2025-09-01', 8500, 7350, 3366, 85, 15, 1133, 1),
    (ch3_id, '2025-09-01', 4500, 4430, 2030, 112, 45, 36, 0),
    (ch4_id, '2025-09-01', 22000, 21670, 1210, 704, 18, 308, 2)
  ON CONFLICT (channel_id, period_month) DO UPDATE SET
    emails_sent = EXCLUDED.emails_sent,
    emails_delivered = EXCLUDED.emails_delivered,
    emails_opened = EXCLUDED.emails_opened,
    emails_clicked = EXCLUDED.emails_clicked,
    emails_replied = EXCLUDED.emails_replied,
    hard_bounces = EXCLUDED.hard_bounces,
    complaints = EXCLUDED.complaints;

  INSERT INTO outbound_stats (channel_id, period_month, emails_sent, emails_delivered, emails_opened, emails_clicked, emails_replied, hard_bounces, complaints)
  VALUES
    (ch1_id, '2025-10-01', 35000, 34475, 3517, 105, 52, 294, 4),
    (ch2_id, '2025-10-01', 12000, 10380, 4757, 120, 28, 1602, 1),
    (ch3_id, '2025-10-01', 8000, 7888, 3616, 200, 92, 64, 1),
    (ch4_id, '2025-10-01', 32000, 31520, 1762, 1024, 35, 448, 3)
  ON CONFLICT (channel_id, period_month) DO UPDATE SET
    emails_sent = EXCLUDED.emails_sent,
    emails_delivered = EXCLUDED.emails_delivered,
    emails_opened = EXCLUDED.emails_opened,
    emails_clicked = EXCLUDED.emails_clicked,
    emails_replied = EXCLUDED.emails_replied,
    hard_bounces = EXCLUDED.hard_bounces,
    complaints = EXCLUDED.complaints;

  INSERT INTO outbound_stats (channel_id, period_month, emails_sent, emails_delivered, emails_opened, emails_clicked, emails_replied, hard_bounces, complaints)
  VALUES
    (ch1_id, '2025-11-01', 25000, 24575, 2507, 75, 38, 210, 3),
    (ch2_id, '2025-11-01', 9000, 7785, 3565, 90, 21, 1201, 1),
    (ch3_id, '2025-11-01', 6000, 5916, 2712, 150, 68, 48, 0),
    (ch4_id, '2025-11-01', 25000, 24625, 1377, 800, 28, 350, 3)
  ON CONFLICT (channel_id, period_month) DO UPDATE SET
    emails_sent = EXCLUDED.emails_sent,
    emails_delivered = EXCLUDED.emails_delivered,
    emails_opened = EXCLUDED.emails_opened,
    emails_clicked = EXCLUDED.emails_clicked,
    emails_replied = EXCLUDED.emails_replied,
    hard_bounces = EXCLUDED.hard_bounces,
    complaints = EXCLUDED.complaints;

  INSERT INTO outbound_stats (channel_id, period_month, emails_sent, emails_delivered, emails_opened, emails_clicked, emails_replied, hard_bounces, complaints)
  VALUES
    (ch1_id, '2025-12-01', 18000, 17694, 1805, 54, 27, 151, 2),
    (ch2_id, '2025-12-01', 5210, 4507, 2064, 52, 12, 696, 1),
    (ch3_id, '2025-12-01', 3500, 3451, 1582, 87, 40, 28, 0),
    (ch4_id, '2025-12-01', 16582, 16341, 913, 531, 18, 232, 2)
  ON CONFLICT (channel_id, period_month) DO UPDATE SET
    emails_sent = EXCLUDED.emails_sent,
    emails_delivered = EXCLUDED.emails_delivered,
    emails_opened = EXCLUDED.emails_opened,
    emails_clicked = EXCLUDED.emails_clicked,
    emails_replied = EXCLUDED.emails_replied,
    hard_bounces = EXCLUDED.hard_bounces,
    complaints = EXCLUDED.complaints;
END $$;
