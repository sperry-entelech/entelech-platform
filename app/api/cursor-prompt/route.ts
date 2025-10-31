import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SKILLS_FACTORY_URL = process.env.NEXT_PUBLIC_SKILLS_FACTORY_URL || 'http://localhost:3001/api';

async function getSkillContent(skillId: number): Promise<string> {
  try {
    const response = await fetch(`${SKILLS_FACTORY_URL}/skills/${skillId}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch skill ${skillId}`);
    }
    const skill = await response.json();
    return skill.description || skill.name || `Skill: ${skill.name}`;
  } catch (error) {
    console.error(`Error fetching skill ${skillId}:`, error);
    return `Skill ID ${skillId}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { skillIds, customContext } = await req.json();

    if (!skillIds || skillIds.length === 0) {
      if (!customContext?.trim()) {
        return NextResponse.json(
          { error: 'At least one skill or custom context is required' },
          { status: 400 }
        );
      }
    }

    // Fetch all selected skills
    const skillContents = await Promise.all(
      (skillIds || []).map((id: number) => getSkillContent(id))
    );

    // Build the prompt using Claude
    const systemPrompt = `You are a prompt engineering assistant for Cursor (an AI-powered code editor). Your task is to create effective Cursor prompts that leverage Claude skills.

Cursor prompts should:
- Be clear and specific about what code needs to be written or modified
- Reference the relevant skills being used
- Include context about the current task
- Be formatted for direct use in Cursor's chat interface

Format the prompt as a natural language instruction that a developer would give to Cursor, incorporating the skills and context provided.`;

    const userPrompt = `Create a Cursor prompt that:

${skillContents.length > 0 ? `Uses these Claude skills from my Skills Factory:
${skillContents.map((content: string, idx: number) => `${idx + 1}. ${content}`).join('\n')}` : ''}

${customContext?.trim() ? `Additional context/requirements:
${customContext}` : ''}

Generate a concise, actionable Cursor prompt that I can copy-paste directly into Cursor's chat. The prompt should reference the skills naturally and guide Cursor to use them effectively for the task at hand.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const generatedPrompt = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Failed to generate prompt';

    return NextResponse.json({ prompt: generatedPrompt });
  } catch (error: any) {
    console.error('Error generating cursor prompt:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}

