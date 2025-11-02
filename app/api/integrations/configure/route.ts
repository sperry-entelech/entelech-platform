import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/services/logging';

// Store integration configs (in production, use a database)
// For now, store in environment variables or a config file
const integrationConfigs: Record<string, any> = {};

export async function POST(req: NextRequest) {
  try {
    const { integrationId, config } = await req.json();

    if (!integrationId || !config) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Validate Google Sheets config
    if (integrationId === 'google-sheets') {
      if (!config.spreadsheetId) {
        return NextResponse.json(
          { error: 'Spreadsheet ID is required' },
          { status: 400 }
        );
      }

      // Store in integration configs (in production, save to database/env vars)
      integrationConfigs[integrationId] = config;

      // Log integration configuration
      logger.info('integration', `Google Sheets configured: ${config.spreadsheetId}`, {
        integrationId,
        spreadsheetId: config.spreadsheetId,
      });
    }

    // Store configuration
    integrationConfigs[integrationId] = config;

    return NextResponse.json({
      success: true,
      message: 'Configuration saved',
    });
  } catch (error: any) {
    logger.error('integration', 'Error saving integration config', { error: error.message });
    return NextResponse.json(
      { error: error.message || 'Failed to save configuration' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const integrationId = searchParams.get('id');

  if (integrationId && integrationConfigs[integrationId]) {
    return NextResponse.json({
      config: integrationConfigs[integrationId],
    });
  }

  return NextResponse.json({
    configs: integrationConfigs,
  });
}

