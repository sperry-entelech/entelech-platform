import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { logger } from '@/lib/services/logging';
import { GoogleSheetsService } from '@/lib/services/google-sheets';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { sowData, analysisId } = await req.json();

    if (!sowData?.projectName) {
      return NextResponse.json({ error: 'SOW data is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert at creating Statements of Work (SOW) documents for professional services engagements. Your task is to generate a comprehensive, legally-sound SOW.

Guidelines:
- Use clear, professional, and precise language
- Structure with: Executive Summary, Project Overview, Scope of Work, Deliverables, Timeline, Milestones, Budget, Payment Terms, Assumptions, Risks, Success Criteria, and Signatures
- Be specific and detailed in scope definition
- Include measurable deliverables with acceptance criteria
- Clearly define project timeline and milestones
- Outline assumptions and dependencies
- Identify risks and mitigation strategies
- Use Entelech's standard SOW templates as reference
- Format as plain text with clear section headers
- Aim for 2500-3500 words`;

    const userPrompt = `Generate a comprehensive Statement of Work for:

PROJECT NAME: ${sowData.projectName}
CLIENT: ${sowData.clientName || 'Client'}

PROJECT TIMELINE: ${sowData.startDate || 'Start date'} to ${sowData.endDate || 'End date'}

SCOPE OF WORK:
${sowData.scope || 'To be defined'}

DELIVERABLES:
${sowData.deliverables || 'To be defined'}

MILESTONES:
${sowData.milestones || 'To be defined'}

ASSUMPTIONS:
${sowData.assumptions || 'None specified'}

RISKS:
${sowData.risks || 'None specified'}

BUDGET: ${sowData.budget || 'Not specified'}
PAYMENT TERMS: ${sowData.paymentTerms || 'Net 30'}

Create a professional SOW document that:
1. Clearly defines project scope and boundaries
2. Lists all deliverables with acceptance criteria
3. Establishes timeline with key milestones
4. Documents assumptions and dependencies
5. Identifies risks and mitigation plans
6. Includes budget and payment terms
7. Defines success criteria and acceptance
8. Follows professional SOW best practices`;

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

    const sow = response.content[0].type === 'text' ? response.content[0].text : 'Failed to generate SOW';

    // Log SOW generation
    logger.success('sow', `SOW generated for ${sowData.projectName}`, {
      projectName: sowData.projectName,
      clientName: sowData.clientName,
    });

    // Save to Google Sheets if configured
    try {
      const sheetsConfig = await GoogleSheetsService.getConfig();
      if (sheetsConfig) {
        const sheets = new GoogleSheetsService(sheetsConfig);
        await sheets.appendRow({
          'Timestamp': new Date().toISOString(),
          'Type': 'SOW',
          'Project Name': sowData.projectName,
          'Client Name': sowData.clientName || '',
          'Budget': sowData.budget || '',
          'Status': 'Generated',
        });
        logger.success('integration', 'SOW saved to Google Sheets', {
          projectName: sowData.projectName,
        });
      }
    } catch (error) {
      logger.error('integration', 'Failed to save SOW to Google Sheets', {
        error: (error as Error).message,
      });
      // Continue even if Sheets fails
    }

    return NextResponse.json({ sow });
  } catch (error: any) {
    console.error('Error generating SOW:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate SOW' },
      { status: 500 }
    );
  }
}

