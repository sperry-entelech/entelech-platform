import { NextRequest, NextResponse } from 'next/server';
import { generateSkill } from '@/lib/services/skills-factory';

export async function POST(req: NextRequest) {
  try {
    const { analysisId, skillName, skillType, description, tags } = await req.json();

    if (!analysisId) {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      );
    }

    if (!skillName || skillName.trim().length < 3) {
      return NextResponse.json(
        { error: 'Skill name must be at least 3 characters long' },
        { status: 400 }
      );
    }

    if (!skillType || !['copywriting', 'process', 'technical'].includes(skillType)) {
      return NextResponse.json(
        { error: 'Invalid skill type. Must be: copywriting, process, or technical' },
        { status: 400 }
      );
    }

    const skill = await generateSkill({
      analysisId,
      skillName: skillName.trim(),
      skillType,
      description: description?.trim() || undefined,
      tags: tags && Array.isArray(tags) ? tags : undefined,
    });

    return NextResponse.json(skill);
  } catch (error: any) {
    console.error('Error generating skill:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate skill' },
      { status: 500 }
    );
  }
}


