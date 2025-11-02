// Platform Logging Service
// Tracks activity, events, and system logs

export type LogLevel = 'info' | 'warning' | 'error' | 'success';
export type LogCategory = 'audit' | 'proposal' | 'sow' | 'client' | 'engagement' | 'system' | 'integration' | 'tool';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: {
    userId?: string;
    clientId?: string;
    projectId?: string;
    [key: string]: any;
  };
}

class LoggingService {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs in memory
  private googleSheetsEnabled = false;
  private googleSheetsConfig: any = null;

  constructor() {
    // Load logs from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('entelech-platform-logs');
      if (stored) {
        try {
          this.logs = JSON.parse(stored).map((log: any) => ({
            ...log,
            timestamp: new Date(log.timestamp),
          }));
        } catch (e) {
          console.error('Error loading logs from storage:', e);
        }
      }
    }
  }

  /**
   * Log an event
   */
  log(level: LogLevel, category: LogCategory, message: string, metadata?: LogEntry['metadata']) {
    const entry: LogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level,
      category,
      message,
      metadata,
    };

    this.logs.push(entry);

    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('entelech-platform-logs', JSON.stringify(this.logs));
      } catch (e) {
        console.error('Error saving logs to storage:', e);
      }
    }

    // Send to Google Sheets if configured
    if (this.googleSheetsEnabled && this.googleSheetsConfig) {
      this.sendToGoogleSheets(entry).catch(console.error);
    }

    // Console output
    const emoji = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      success: '✅',
    }[level];

    console.log(`${emoji} [${category.toUpperCase()}] ${message}`, metadata || '');
  }

  /**
   * Convenience methods
   */
  info(category: LogCategory, message: string, metadata?: LogEntry['metadata']) {
    this.log('info', category, message, metadata);
  }

  success(category: LogCategory, message: string, metadata?: LogEntry['metadata']) {
    this.log('success', category, message, metadata);
  }

  warning(category: LogCategory, message: string, metadata?: LogEntry['metadata']) {
    this.log('warning', category, message, metadata);
  }

  error(category: LogCategory, message: string, metadata?: LogEntry['metadata']) {
    this.log('error', category, message, metadata);
  }

  /**
   * Get logs with filtering
   */
  getLogs(filters?: {
    level?: LogLevel;
    category?: LogCategory;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): LogEntry[] {
    let filtered = [...this.logs].reverse(); // Most recent first

    if (filters?.level) {
      filtered = filtered.filter((log) => log.level === filters.level);
    }

    if (filters?.category) {
      filtered = filtered.filter((log) => log.category === filters.category);
    }

    if (filters?.startDate) {
      filtered = filtered.filter((log) => log.timestamp >= filters.startDate!);
    }

    if (filters?.endDate) {
      filtered = filtered.filter((log) => log.timestamp <= filters.endDate!);
    }

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  /**
   * Clear logs
   */
  clearLogs() {
    this.logs = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('entelech-platform-logs');
    }
  }

  /**
   * Send log to Google Sheets
   */
  private async sendToGoogleSheets(entry: LogEntry) {
    try {
      // This would integrate with Google Sheets service
      // For now, just a placeholder
      console.log('Would send to Google Sheets:', entry);
    } catch (error) {
      console.error('Error sending log to Google Sheets:', error);
    }
  }

  /**
   * Enable Google Sheets logging
   */
  enableGoogleSheets(config: any) {
    this.googleSheetsEnabled = true;
    this.googleSheetsConfig = config;
  }

  /**
   * Get log statistics
   */
  getStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {} as Record<LogLevel, number>,
      byCategory: {} as Record<LogCategory, number>,
      recentErrors: this.logs.filter((log) => log.level === 'error').slice(-10),
    };

    this.logs.forEach((log) => {
      stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
      stats.byCategory[log.category] = (stats.byCategory[log.category] || 0) + 1;
    });

    return stats;
  }
}

// Singleton instance
export const logger = new LoggingService();

// Export convenience functions
export const logInfo = (category: LogCategory, message: string, metadata?: LogEntry['metadata']) =>
  logger.info(category, message, metadata);
export const logSuccess = (category: LogCategory, message: string, metadata?: LogEntry['metadata']) =>
  logger.success(category, message, metadata);
export const logWarning = (category: LogCategory, message: string, metadata?: LogEntry['metadata']) =>
  logger.warning(category, message, metadata);
export const logError = (category: LogCategory, message: string, metadata?: LogEntry['metadata']) =>
  logger.error(category, message, metadata);

