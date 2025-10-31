// Database client for Entelech Platform
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database schema (run in Supabase SQL editor)
export const schema = `
-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  current_revenue INTEGER,
  employees INTEGER,
  primary_pain TEXT,
  goals TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Engagements table
CREATE TABLE IF NOT EXISTS engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'discovery',
  
  discovery_data JSONB,
  recommendations JSONB,
  training_materials JSONB,
  
  started_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP,
  completed_at TIMESTAMP,
  
  value_delivered JSONB,
  client_satisfaction INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills references (link to Skills Factory)
CREATE TABLE IF NOT EXISTS skill_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES engagements(id) ON DELETE CASCADE,
  skill_id INTEGER NOT NULL,
  skill_name VARCHAR(255),
  skill_type VARCHAR(50),
  usage_context TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_engagements_client_id ON engagements(client_id);
CREATE INDEX IF NOT EXISTS idx_engagements_status ON engagements(status);
CREATE INDEX IF NOT EXISTS idx_skill_refs_engagement ON skill_references(engagement_id);
`;

export default supabase;
