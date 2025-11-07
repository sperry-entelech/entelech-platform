// Entelech Project & System Types
// Based on agency repository structure: https://github.com/sperry-entelech/agency

export type SystemCategory =
  | 'marketing'
  | 'sales'
  | 'service-delivery'
  | 'multi-agent'
  | 'client-success'
  | 'backend-infrastructure'
  | 'ai-intelligence'
  | 'data-analytics'
  | 'finance'
  | 'hr'
  | 'legal'
  | 'internal-enablement'
  | 'echelon-platform'
  | 'client-project'
  | 'tool'
  | 'documentation';

export type ProjectStatus = 'active' | 'beta' | 'archived' | 'inactive';

export type IntegrationType = 'native' | 'embedded' | 'external' | 'link';

export interface EntelechProject {
  id: string;
  name: string;
  description: string;
  category: SystemCategory;
  status: ProjectStatus;
  integrationType: IntegrationType;
  url?: string; // For external/embedded systems
  githubRepo?: string; // Full GitHub URL
  githubRepoPath?: string; // Just the repo name
  techStack?: string[]; // e.g., ['TypeScript', 'Next.js', 'Python']
  icon?: string; // Icon name from lucide-react
  tags: string[];
  metadata?: {
    deploymentUrl?: string;
    documentationUrl?: string;
    internalUrl?: string;
    lastUpdated?: string;
    maintainer?: string;
    notes?: string;
  };
}

export interface BusinessSystem {
  id: string;
  name: string;
  description: string;
  category: SystemCategory;
  purpose: string;
  keyComponents: string[];
  successMetrics?: string[];
  relatedProjects: string[]; // Project IDs
  documentationUrl?: string;
}

// Agency repo structure mapping
export const AGENCY_SYSTEM_CATEGORIES: Record<SystemCategory, string> = {
  marketing: 'Marketing & Top of Funnel',
  sales: 'Sales Intelligence & Process',
  'service-delivery': 'Service Delivery & Operations',
  'multi-agent': 'Multi-Agent Automation System',
  'client-success': 'Client Success & Journey',
  'backend-infrastructure': 'Backend Implementation (Tech Infrastructure)',
  'ai-intelligence': 'AI/Intelligence Layer',
  'data-analytics': 'Data & Analytics',
  finance: 'Finance System',
  hr: 'Human Resources',
  legal: 'Legal & Compliance',
  'internal-enablement': 'Internal Enablement',
  'echelon-platform': 'Echelon SaaS Platform',
  'client-project': 'Client Projects',
  tool: 'Tools & Utilities',
  documentation: 'Documentation & Knowledge Base',
};


