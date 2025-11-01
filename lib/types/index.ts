// Core types for Entelech Platform
export * from './project';
export type EngagementType = 'agency-optimization' | 'lead-conversion' | 'proposal-system' | 'client-retention';

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  currentRevenue: number;
  employees: number;
  primaryPain: string;
  goals: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Engagement {
  id: string;
  clientId: string;
  type: EngagementType;
  status: 'discovery' | 'analysis' | 'delivery' | 'complete';
  
  discovery: DiscoveryAnalysis | null;
  recommendations: ImplementationPlan | null;
  trainingMaterials: DocumentSet | null;
  
  startedAt: Date;
  deliveredAt: Date | null;
  completedAt: Date | null;
  
  valueDelivered: ValueMetrics | null;
  clientSatisfaction: number | null;
}

export interface DiscoveryAnalysis {
  painPoints: string[];
  opportunities: string[];
  processGaps: string[];
  quickWins: string[];
  estimatedValue: string;
  confidence: number;
  notes: string;
}

export interface ImplementationPlan {
  phases: ImplementationPhase[];
  timeline: string;
  expectedValue: string;
  resources: string[];
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  deliverables: string[];
  successCriteria: string[];
}

export interface DocumentSet {
  assessment: string | null;
  recommendations: string | null;
  training: string | null;
  templates: Template[];
}

export interface Template {
  id: string;
  name: string;
  type: string;
  content: string;
}

export interface ValueMetrics {
  leadsConverted: number | null;
  salesCycleReduction: string | null;
  churnReduction: string | null;
  hoursSaved: number | null;
  revenueIncrease: number | null;
  roi: number | null;
}

export interface SkillReference {
  skillId: number;
  skillName: string;
  contentType: 'copywriting' | 'process' | 'technical';
  tags: string[];
  usageContext: string;
}

export interface AgentOutput {
  agentName: string;
  analysis: string;
  recommendations: string[];
  confidence: number;
  processingTime: number;
  skillsUsed: SkillReference[];
}

export interface EngagementSummary {
  totalTime: number;
  agentsUsed: string[];
  skillsGenerated: number;
  valueEstimated: string;
  deliveryStatus: 'on-time' | 'late' | 'early';
}
