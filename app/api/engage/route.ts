import { NextRequest, NextResponse } from 'next/server';
import { agentOrchestrator } from '@/lib/services/agent-orchestrator';

/**
 * POST /api/engage
 * Execute full engagement with all agents
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientData, engagementType } = body;

    // Validate required fields
    if (!clientData || !engagementType) {
      return NextResponse.json(
        { error: 'Missing required fields: clientData, engagementType' },
        { status: 400 }
      );
    }

    // Execute full 30-minute engagement
    const result = await agentOrchestrator.executeEngagement(clientData, engagementType);

    return NextResponse.json({
      success: true,
      totalTime: result.totalTime,
      agents: {
        discovery: result.discovery,
        implementation: result.implementation,
        training: result.training,
      },
      estimatedValue: 'To be calculated',
      nextSteps: [
        'Review recommendations',
        'Customize as needed',
        'Deliver to client',
        'Track value delivery',
      ],
    });

  } catch (error: any) {
    console.error('Engagement error:', error);
    return NextResponse.json(
      { error: 'Engagement execution failed', details: error.message },
      { status: 500 }
    );
  }
}
