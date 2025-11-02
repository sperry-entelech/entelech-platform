import { NextRequest, NextResponse } from 'next/server';
import { analyzeContent } from '@/lib/services/skills-factory';

export async function POST(req: NextRequest) {
  try {
    const { content, contentType } = await req.json();

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { error: 'Content must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (!contentType || !['copywriting', 'process', 'technical'].includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid content type. Must be: copywriting, process, or technical' },
        { status: 400 }
      );
    }

    const analysis = await analyzeContent({
      content: content.trim(),
      contentType,
    });

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Error analyzing content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze content' },
      { status: 500 }
    );
  }
}

