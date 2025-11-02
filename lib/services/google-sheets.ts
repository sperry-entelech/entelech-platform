// Google Sheets Integration Service
// For CRM and data management

export interface SheetRow {
  [key: string]: string | number | Date | null;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  apiKey?: string; // For public sheets
  credentials?: {
    clientEmail: string;
    privateKey: string;
  }; // For service account
}

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;
  private baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  /**
   * Append a row to Google Sheets
   */
  async appendRow(data: SheetRow): Promise<void> {
    try {
      // Convert data to array format (assuming headers exist)
      const values = [Object.values(data)];

      // URL-encode the sheet name to handle spaces and special characters
      const encodedSheetName = encodeURIComponent(this.config.sheetName);

      // Build URL with authentication
      let url = `${this.baseUrl}/${this.config.spreadsheetId}/values/${encodedSheetName}:append?valueInputOption=RAW`;
      
      // Use API key if available (for public sheets)
      if (this.config.apiKey) {
        url += `&key=${this.config.apiKey}`;
      }

      // For service account, we'd need to use googleapis library
      // For now, this works with public sheets or API key authentication
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Google Sheets API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error appending to Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Read data from Google Sheets
   */
  async readData(range?: string): Promise<any[][]> {
    try {
      const sheetRange = range || encodeURIComponent(this.config.sheetName);
      const url = `${this.baseUrl}/${this.config.spreadsheetId}/values/${sheetRange}${this.config.apiKey ? `?key=${this.config.apiKey}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status}`);
      }

      const data = await response.json();
      return data.values || [];
    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Update a specific row
   */
  async updateRow(rowIndex: number, data: SheetRow): Promise<void> {
    try {
      const values = [Object.values(data)];
      const encodedSheetName = encodeURIComponent(this.config.sheetName);
      const range = `${encodedSheetName}!${rowIndex}:${rowIndex}`;

      const url = `${this.baseUrl}/${this.config.spreadsheetId}/values/${range}?valueInputOption=RAW${this.config.apiKey ? `&key=${this.config.apiKey}` : ''}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values }),
      });

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Get sheet configuration from environment or storage
   */
  static async getConfig(): Promise<GoogleSheetsConfig | null> {
    // First check environment variables (server-side)
    if (typeof process !== 'undefined' && process.env) {
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1';
      const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
      
      // Check for service account credentials
      const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

      if (spreadsheetId) {
        const config: GoogleSheetsConfig = {
          spreadsheetId,
          sheetName,
          apiKey,
        };

        // Add service account credentials if available
        if (clientEmail && privateKey) {
          config.credentials = {
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'), // Handle escaped newlines
          };
        }

        return config;
      }
    }

    // If in browser, try to fetch from API
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/integrations/configure?id=google-sheets');
        const data = await response.json();
        if (data.config) {
          return {
            spreadsheetId: data.config.spreadsheetId,
            sheetName: data.config.sheetName || 'Sheet1',
            apiKey: data.config.apiKey,
            credentials: data.config.credentials,
          };
        }
      } catch (error) {
        // Silently fail
      }
    }

    return null;
  }
}

export default GoogleSheetsService;

