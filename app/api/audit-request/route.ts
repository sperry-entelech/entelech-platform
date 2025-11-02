import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SKILLS_FACTORY_URL = process.env.NEXT_PUBLIC_SKILLS_FACTORY_URL || 'http://localhost:3001/api';

export async function POST(req: NextRequest) {
  try {
    const {
      auditLevel,
      companyName,
      contactName,
      email,
      phone,
      industry,
      companySize,
      currentRevenue,
      primaryPainPoints,
      mainGoals,
      specificAreas,
    } = await req.json();

    if (!companyName || !email || !primaryPainPoints || !mainGoals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build comprehensive content for analysis
    const auditContent = `
COMPANY: ${companyName}
INDUSTRY: ${industry || 'Not specified'}
COMPANY SIZE: ${companySize || 'Not specified'}
ANNUAL REVENUE: ${currentRevenue || 'Not specified'}

PRIMARY PAIN POINTS:
${primaryPainPoints}

MAIN GOALS & OBJECTIVES:
${mainGoals}

${specificAreas ? `SPECIFIC AREAS TO FOCUS ON:\n${specificAreas}` : ''}

AUDIT LEVEL: ${auditLevel}
    `.trim();

    // Step 1: Analyze using Skills Factory (if available)
    let analysis;
    try {
      const skillsFactoryUrl = process.env.NEXT_PUBLIC_SKILLS_FACTORY_URL || 'http://localhost:3001/api';
      const response = await fetch(`${skillsFactoryUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: auditContent,
          contentType: 'process',
        }),
      });
      if (response.ok) {
        analysis = await response.json();
      }
    } catch (error) {
      console.error('Skills Factory analysis error:', error);
      // Continue without analysis if Skills Factory fails
    }

    // Step 2: Generate audit report using Claude
    const levelDetails = {
      basic: {
        depth: 'high-level',
        sections: ['Executive Summary', 'Top 3 Improvement Opportunities', 'Quick Wins'],
        wordCount: '500-800',
      },
      standard: {
        depth: 'detailed',
        sections: ['Executive Summary', 'Detailed Findings', 'Top 5-7 Improvement Opportunities', 'Priority Recommendations', 'Action Items'],
        wordCount: '1500-2000',
      },
      comprehensive: {
        depth: 'comprehensive',
        sections: ['Executive Summary', 'Full Business Analysis', '10+ Improvement Opportunities', 'Detailed Action Plans', 'Prioritized Roadmap', 'Value Projections', 'Risk Assessment'],
        wordCount: '3000-4000',
      },
    };

    const level = levelDetails[auditLevel as keyof typeof levelDetails];

    const systemPrompt = `You are an expert business consultant at Entelech, a RevOps consulting firm. Your task is to generate a ${level.depth} business audit report.

Guidelines:
- Use professional, actionable language
- Be specific and provide concrete recommendations
- Include data-driven insights where possible
- Format clearly with section headers
- Focus on practical, implementable solutions
- Highlight quick wins and high-impact opportunities
- Include ROI/value projections when relevant
- Aim for ${level.wordCount} words
- Structure with: ${level.sections.join(', ')}`;

    const userPrompt = `Generate a ${auditLevel} business audit report for:

COMPANY: ${companyName}
INDUSTRY: ${industry || 'Not specified'}
SIZE: ${companySize || 'Not specified'}
REVENUE: ${currentRevenue || 'Not specified'}

PRIMARY PAIN POINTS:
${primaryPainPoints}

GOALS & OBJECTIVES:
${mainGoals}

${specificAreas ? `AREAS TO FOCUS:\n${specificAreas}` : ''}

Create a ${level.depth} audit report that:
1. Summarizes current business state
2. Identifies specific improvement opportunities
3. Provides actionable recommendations
4. Prioritizes opportunities by impact/ease
5. Includes value projections where applicable
6. Provides clear next steps

Make it professional, insightful, and immediately actionable.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: auditLevel === 'comprehensive' ? 4096 : auditLevel === 'standard' ? 2048 : 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const auditReport = response.content[0].type === 'text' ? response.content[0].text : 'Failed to generate audit';

    // TODO: Store audit request in database and send email
    // For now, return success with report (in production, you'd email it)

    return NextResponse.json({
      success: true,
      auditRequestId: `audit-${Date.now()}`,
      message: `Your ${auditLevel} audit has been submitted. Report will be delivered within ${auditLevel === 'basic' ? '24' : auditLevel === 'standard' ? '48' : '72'} hours.`,
      reportPreview: auditReport.substring(0, 500), // Preview only
      analysisId: analysis?.analysisId,
    });
  } catch (error: any) {
    console.error('Error processing audit request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process audit request' },
      { status: 500 }
    );
  }
}

