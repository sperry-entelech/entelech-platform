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

  // For Google Sheets, also check environment variables
  if (integrationId === 'google-sheets') {
    const envConfig: any = {};
    
    if (process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      envConfig.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      envConfig.sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1';
      
      if (process.env.GOOGLE_SHEETS_API_KEY) {
        envConfig.apiKey = process.env.GOOGLE_SHEETS_API_KEY;
      }
      
      if (process.env.GOOGLE_SHEETS_CLIENT_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
        envConfig.credentials = {
          clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        };
        envConfig.serviceAccountConfigured = true;
      }
      
      // Merge with any UI-configured values
      const mergedConfig = { ...envConfig, ...integrationConfigs[integrationId] };
      
      return NextResponse.json({
        config: mergedConfig,
        configured: true,
      });
    }
  }

  if (integrationId && integrationConfigs[integrationId]) {
    return NextResponse.json({
      config: integrationConfigs[integrationId],
      configured: true,
    });
  }

  return NextResponse.json({
    configs: integrationConfigs,
  });
}

