import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { logger } from '@/lib/services/logging';
import { GoogleSheetsService } from '@/lib/services/google-sheets';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { clientData, analysisId } = await req.json();

    if (!clientData?.companyName) {
      return NextResponse.json({ error: 'Client data is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert proposal writer for Entelech, a RevOps consulting firm. Your task is to generate a comprehensive, professional enterprise proposal.

Guidelines:
- Use clear, professional language
- Structure with executive summary, problem statement, solution, deliverables, timeline, and pricing
- Address client pain points directly
- Align with stated goals and objectives
- Include specific value propositions
- Be concise but thorough (aim for 2000-3000 words)
- Use Entelech's proven frameworks: 30-minute discovery, 48-hour implementation, risk-free model
- Include metrics and ROI projections where appropriate
- Format as plain text with clear section headers`;

    const userPrompt = `Generate a comprehensive enterprise proposal for:

COMPANY: ${clientData.companyName}
INDUSTRY: ${clientData.industry || 'Not specified'}
CURRENT REVENUE: ${clientData.currentRevenue || 'Not specified'}
EMPLOYEES: ${clientData.employees || 'Not specified'}

PAIN POINTS:
${clientData.painPoints || 'Not specified'}

GOALS & OBJECTIVES:
${clientData.goals || 'Not specified'}

BUDGET RANGE: ${clientData.budget || 'Not specified'}
TIMELINE: ${clientData.timeline || 'Not specified'}

Create a professional proposal that:
1. Addresses their pain points with specific solutions
2. Aligns deliverables with their stated goals
3. Fits within their budget and timeline
4. Demonstrates clear ROI and value
5. Includes Entelech's risk-free engagement model
6. Provides clear next steps

Format the proposal with clear sections and professional language.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const proposal = response.content[0].type === 'text' ? response.content[0].text : 'Failed to generate proposal';

    // Log proposal generation
    logger.success('proposal', `Proposal generated for ${clientData.companyName}`, {
      companyName: clientData.companyName,
      industry: clientData.industry,
    });

    // Save to Google Sheets if configured
    try {
      const sheetsConfig = await GoogleSheetsService.getConfig();
      if (sheetsConfig) {
        const sheets = new GoogleSheetsService(sheetsConfig);
        await sheets.appendRow({
          'Timestamp': new Date().toISOString(),
          'Type': 'Proposal',
          'Company Name': clientData.companyName,
          'Industry': clientData.industry || '',
          'Revenue': clientData.currentRevenue || '',
          'Status': 'Generated',
        });
        logger.success('integration', 'Proposal saved to Google Sheets', {
          companyName: clientData.companyName,
        });
      }
    } catch (error) {
      logger.error('integration', 'Failed to save proposal to Google Sheets', {
        error: (error as Error).message,
      });
      // Continue even if Sheets fails
    }

    return NextResponse.json({ proposal });
  } catch (error: any) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}

