import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/services/logging';

// In-memory log storage for server-side logs
// In production, this should be stored in a database
let serverLogs: Array<{
  id: string;
  timestamp: Date;
  level: string;
  category: string;
  message: string;
  metadata?: any;
}> = [];

// Helper to combine logger service logs with server logs
function getAllLogs() {
  // Get logs from logger service (includes both client and server logs stored in memory)
  const loggerLogs = logger.getLogs({ limit: 1000 });
  
  // Convert to consistent format
  const formattedLoggerLogs = loggerLogs.map((log) => ({
    id: log.id,
    timestamp: log.timestamp instanceof Date ? log.timestamp : new Date(log.timestamp),
    level: log.level,
    category: log.category,
    message: log.message,
    metadata: log.metadata,
  }));

  // Combine with server logs (deduplicate by ID)
  const logMap = new Map<string, any>();
  
  // Add logger logs first
  formattedLoggerLogs.forEach((log) => {
    logMap.set(log.id, log);
  });
  
  // Add server logs (will overwrite duplicates)
  serverLogs.forEach((log) => {
    logMap.set(log.id, {
      ...log,
      timestamp: log.timestamp instanceof Date ? log.timestamp : new Date(log.timestamp),
    });
  });

  return Array.from(logMap.values());
}

// Forward client-side logs to server storage
export async function POST(req: NextRequest) {
  try {
    const logEntry = await req.json();
    
    // Store log entry
    serverLogs.push({
      ...logEntry,
      timestamp: new Date(logEntry.timestamp || Date.now()),
    });

    // Keep only last 1000 logs
    if (serverLogs.length > 1000) {
      serverLogs = serverLogs.slice(-1000);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to store log' },
      { status: 500 }
    );
  }
}

// Get logs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get('level');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '500');

    // Get all logs (combines logger service logs and server logs)
    let allLogs = getAllLogs();

    // Sort by timestamp (most recent first)
    allLogs.sort((a, b) => {
      const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime();
      const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    // Apply filters
    if (level) {
      allLogs = allLogs.filter((log) => log.level === level);
    }

    if (category) {
      allLogs = allLogs.filter((log) => log.category === category);
    }

    // Apply limit
    allLogs = allLogs.slice(0, limit);

    // Calculate stats
    const stats = {
      total: allLogs.length,
      byLevel: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
    };

    allLogs.forEach((log) => {
      stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
      stats.byCategory[log.category] = (stats.byCategory[log.category] || 0) + 1;
    });

    return NextResponse.json({
      logs: allLogs,
      stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve logs' },
      { status: 500 }
    );
  }
}

// Clear logs
export async function DELETE(req: NextRequest) {
  try {
    serverLogs = [];
    logger.clearLogs();
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to clear logs' },
      { status: 500 }
    );
  }
}

