import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/services/logging';

// Webhook endpoints for n8n and other automation tools
// This allows external services to trigger actions or receive platform events

export async function POST(req: NextRequest) {
  try {
    const { webhookType, data } = await req.json();

    // Log webhook received
    logger.info('integration', `Webhook received: ${webhookType}`, { webhookType, data });

    switch (webhookType) {
      case 'audit-request':
        // Handle audit request webhook
        // Could trigger n8n workflow, send to Google Sheets, etc.
        break;

      case 'proposal-generated':
        // Handle proposal generation webhook
        break;

      case 'sow-generated':
        // Handle SOW generation webhook
        break;

      case 'client-created':
        // Handle client creation webhook
        break;

      default:
        return NextResponse.json({ error: 'Unknown webhook type' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    logger.error('integration', 'Webhook processing error', { error: error.message });
    return NextResponse.json(
      { error: error.message || 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve webhook events (for n8n polling)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventType = searchParams.get('eventType');
  const since = searchParams.get('since');

  // In production, query from database
  // For now, return empty array
  return NextResponse.json({
    events: [],
    message: 'Webhook events endpoint (database integration needed)',
  });
}

