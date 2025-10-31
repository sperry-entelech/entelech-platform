// Agent Orchestrator Service
import Anthropic from '@anthropic-ai/sdk';
import { Engagement, AgentOutput, SkillReference } from '../types';
import { analyzeContent, generateSkill } from './skills-factory';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AgentOrchestrator {
  private claude = anthropic;

  /**
   * Master Coordinator - Analyzes discovery and creates engagement plan
   */
  async analyzeDiscovery(clientData: any): Promise<AgentOutput> {
    const startTime = Date.now();
    
    const systemPrompt = `You are Entelech's Master Coordinator Agent. Your role is to analyze client discovery data and map needs to solutions.

Context:
- Entelech is a RevOps consulting firm specializing in AI-driven solutions
- We offer: Lead Conversion, Proposal Systems, Client Retention, Agency Optimization
- Our unique value: 30-minute delivery of custom solutions
- Risk-free model: Clients only pay if they see value

Your task:
1. Identify primary pain points from discovery
2. Map those pains to Entelech solutions
3. Identify quick wins and high-impact opportunities
4. Estimate potential value
5. Create engagement outline

Output format:
- painPoints: [array of specific issues]
- opportunities: [specific improvements possible]
- processGaps: [what's missing in current setup]
- quickWins: [fast improvements we can deliver]
- estimatedValue: [specific, measurable value]
- confidence: [0-1 score]
- notes: [any observations]`;

    const userPrompt = `Analyze this client discovery:

**Company:** ${clientData.company}
**Industry:** ${clientData.industry}
**Revenue:** $${clientData.currentRevenue}
**Primary Pain:** ${clientData.primaryPain}
**Goals:** ${clientData.goals.join(', ')}

Return analysis in JSON format matching the output specification above.`;

    const response = await this.claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const processingTime = (Date.now() - startTime) / 1000;
    const analysis = JSON.parse(response.content[0].text);

    return {
      agentName: 'Master Coordinator',
      analysis: analysis.notes,
      recommendations: [
        ...analysis.quickWins,
        ...analysis.opportunities.map((opp: string) => `Opportunity: ${opp}`)
      ],
      confidence: analysis.confidence,
      processingTime,
      skillsUsed: [], // Will be populated when we generate skills
    };
  }

  /**
   * Solution Design Agent - Creates implementation plan
   */
  async designSolution(discoveryAnalysis: AgentOutput, engagementType: string): Promise<AgentOutput> {
    const startTime = Date.now();

    const systemPrompt = `You are Entelech's Solution Design Agent. Your role is to create custom RevOps implementation plans.

Context:
- Based on discovery analysis
- Type: ${engagementType}
- Goal: Deliver measurable value in 30 minutes
- Client needs: Custom, hands-on solutions

Your task:
1. Break down solution into phases
2. Define specific deliverables per phase
3. Set success criteria
4. Estimate timeline and resources
5. Identify skills/templates needed from Skills Factory`;

    const userPrompt = `Based on this analysis:
${JSON.stringify(discoveryAnalysis, null, 2)}

Create implementation plan for ${engagementType}:

Return JSON with:
- phases: [{ phase, duration, deliverables[], successCriteria[] }]
- timeline: "estimated timeframe"
- expectedValue: "specific measurable value"
- resources: ["skill1", "skill2", "template1"]
- skillsNeeded: ["description of skills to generate"]`;

    const response = await this.claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const processingTime = (Date.now() - startTime) / 1000;
    const recommendations = JSON.parse(response.content[0].text);

    return {
      agentName: 'Solution Design',
      analysis: `Implementation plan for ${engagementType}`,
      recommendations: [
        ...recommendations.phases.map((p: any) => `Phase: ${p.phase}`),
        `Expected Value: ${recommendations.expectedValue}`,
        `Timeline: ${recommendations.timeline}`
      ],
      confidence: 0.9,
      processingTime,
      skillsUsed: recommendations.skillsNeeded || [],
    };
  }

  /**
   * Client Enablement Agent - Generates training materials
   */
  async generateTrainingMaterials(
    implementationPlan: AgentOutput,
    clientData: any
  ): Promise<AgentOutput> {
    const startTime = Date.now();

    const systemPrompt = `You are Entelech's Client Enablement Agent. Your role is to create custom training materials for clients.

Context:
- Custom training specific to client needs
- Includes: Assessment templates, process guides, implementation checklists
- Goal: Enable client to implement successfully

Output format:
- assessment: "custom assessment template"
- recommendations: "executive summary of recommendations"
- training: "step-by-step implementation guide"
- templates: [{ name, type, content }]`;

    const userPrompt = `Create training materials for:
**Client:** ${clientData.company}
**Solution:** ${implementationPlan.analysis}

Based on this implementation plan:
${JSON.stringify(implementationPlan, null, 2)}

Generate all training materials.`;

    const response = await this.claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const processingTime = (Date.now() - startTime) / 1000;
    const materials = JSON.parse(response.content[0].text);

    return {
      agentName: 'Client Enablement',
      analysis: 'Training materials generated',
      recommendations: [
        materials.assessment ? 'Assessment template created' : '',
        materials.training ? 'Implementation guide created' : '',
        `${materials.templates?.length || 0} templates created`
      ].filter(Boolean),
      confidence: 0.95,
      processingTime,
      skillsUsed: [],
    };
  }

  /**
   * Execute full 30-minute engagement
   */
  async executeEngagement(clientData: any, engagementType: string): Promise<{
    discovery: AgentOutput;
    implementation: AgentOutput;
    training: AgentOutput;
    totalTime: number;
  }> {
    const startTime = Date.now();

    // Step 1: Discovery Analysis (5-10 min)
    const discovery = await this.analyzeDiscovery(clientData);
    
    // Step 2: Solution Design (10-15 min)
    const implementation = await this.designSolution(discovery, engagementType);
    
    // Step 3: Training Materials (10-15 min)
    const training = await this.generateTrainingMaterials(implementation, clientData);

    const totalTime = (Date.now() - startTime) / 1000;

    return {
      discovery,
      implementation,
      training,
      totalTime,
    };
  }
}

export const agentOrchestrator = new AgentOrchestrator();
