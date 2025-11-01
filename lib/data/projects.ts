// Entelech Projects Registry
// Based on discovered repositories and agency repo structure

import { EntelechProject } from '@/lib/types/project';

export const entelechProjects: EntelechProject[] = [
  // Core Platform Systems
  {
    id: 'entelech-platform',
    name: 'Entelech Platform',
    description: 'Unified internal HQ platform for all Entelech business systems',
    category: 'internal-enablement',
    status: 'active',
    integrationType: 'native',
    githubRepo: 'https://github.com/sperry-entelech/entelech-platform',
    githubRepoPath: 'entelech-platform',
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    icon: 'Zap',
    tags: ['platform', 'dashboard', 'internal'],
    metadata: {
      deploymentUrl: 'https://entelech-platform-fzq31nyeu-sperry-entelechs-projects.vercel.app',
      lastUpdated: '2025-01-29',
    },
  },
  {
    id: 'skills-factory',
    name: 'Skills Factory',
    description: 'Claude Skills generation and management system',
    category: 'ai-intelligence',
    status: 'active',
    integrationType: 'native',
    githubRepo: 'https://github.com/sperry-entelech/claude-skills-factory-backend',
    githubRepoPath: 'claude-skills-factory-backend',
    techStack: ['JavaScript', 'Express', 'SQLite', 'React'],
    icon: 'BookOpen',
    tags: ['skills', 'claude', 'ai', 'automation'],
    metadata: {
      deploymentUrl: 'https://claude-skills-factory-backend-production.up.railway.app',
      lastUpdated: '2025-01-29',
    },
  },
  {
    id: 'cold-email-infrastructure',
    name: 'Cold Email Infrastructure',
    description: 'Lead generation and email automation system',
    category: 'marketing',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/cold-email-infrastructure',
    githubRepoPath: 'cold-email-infrastructure',
    techStack: ['Python'],
    icon: 'Mail',
    tags: ['email', 'marketing', 'automation', 'lead-generation'],
    metadata: {
      lastUpdated: '2025-01-29',
    },
  },
  {
    id: 'member-engagement-platform',
    name: 'Member Engagement Platform',
    description: 'Member and client engagement management system',
    category: 'client-success',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/member-engagement-platform',
    githubRepoPath: 'member-engagement-platform',
    techStack: ['TypeScript'],
    icon: 'Users',
    tags: ['engagement', 'clients', 'member-management'],
    metadata: {
      lastUpdated: '2025-01-29',
    },
  },
  {
    id: 'agency-system-map',
    name: 'Agency System Map',
    description: 'Complete business system architecture documentation',
    category: 'documentation',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/agency',
    githubRepoPath: 'agency',
    techStack: ['HTML', 'Markdown'],
    icon: 'Map',
    tags: ['documentation', 'architecture', 'systems'],
    metadata: {
      documentationUrl: 'https://github.com/sperry-entelech/agency',
      lastUpdated: '2025-01-29',
    },
  },
  // Client Projects
  {
    id: 'hilb-demo',
    name: 'HILB Custom Software Demo',
    description: 'Custom software demo for HILB client',
    category: 'client-project',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/hilb-custom-software-demo',
    githubRepoPath: 'hilb-custom-software-demo',
    techStack: ['JavaScript'],
    icon: 'Presentation',
    tags: ['client', 'demo', 'software'],
    metadata: {
      lastUpdated: '2025-01-29',
    },
  },
  {
    id: 'tnt-groundspan-pricing',
    name: 'TNT Groundspan Pricing Tool',
    description: 'Pricing calculation tool for TNT client',
    category: 'client-project',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/tnt-groundspan-pricing-tool',
    githubRepoPath: 'tnt-groundspan-pricing-tool',
    techStack: ['TypeScript'],
    icon: 'Calculator',
    tags: ['client', 'tnt', 'pricing'],
    metadata: {
      lastUpdated: '2025-01-27',
    },
  },
  {
    id: 'tnt-holiday-website',
    name: 'TNT Holiday Website',
    description: 'Holiday website update for TNT client',
    category: 'client-project',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/tnt-holiday-website-update-jtz',
    githubRepoPath: 'tnt-holiday-website-update-jtz',
    techStack: ['HTML'],
    icon: 'Globe',
    tags: ['client', 'tnt', 'website'],
    metadata: {
      lastUpdated: '2025-01-27',
    },
  },
  {
    id: 'tnt-tacky-lights',
    name: 'TNT Tacky Lights Quote Tool',
    description: 'Quote tool for TNT Tacky Lights',
    category: 'client-project',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/tnt-tacky-lights-quote-tool',
    githubRepoPath: 'tnt-tacky-lights-quote-tool',
    techStack: ['HTML'],
    icon: 'FileText',
    tags: ['client', 'tnt', 'quotes'],
    metadata: {
      lastUpdated: '2025-01-22',
    },
  },
  {
    id: 'proposal-generator',
    name: 'Proposal Generator Demo',
    description: 'Enterprise proposal generation demo',
    category: 'multi-agent',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/proposal-generator-demo',
    githubRepoPath: 'proposal-generator-demo',
    techStack: ['HTML'],
    icon: 'FileCheck',
    tags: ['proposals', 'automation', 'demo'],
    metadata: {
      lastUpdated: '2025-09-30',
    },
  },
  {
    id: 'mtt-solver',
    name: 'MTT Solver',
    description: 'Technical solver tool',
    category: 'tool',
    status: 'active',
    integrationType: 'external',
    githubRepo: 'https://github.com/sperry-entelech/mtt-solver',
    githubRepoPath: 'mtt-solver',
    techStack: ['TypeScript'],
    icon: 'Settings',
    tags: ['tool', 'solver'],
    metadata: {
      lastUpdated: '2025-09-24',
    },
  },
];

// Helper functions
export function getProjectsByCategory(category: string) {
  return entelechProjects.filter((p) => p.category === category);
}

export function getActiveProjects() {
  return entelechProjects.filter((p) => p.status === 'active');
}

export function getProjectById(id: string) {
  return entelechProjects.find((p) => p.id === id);
}

export function searchProjects(query: string) {
  const lowerQuery = query.toLowerCase();
  return entelechProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

