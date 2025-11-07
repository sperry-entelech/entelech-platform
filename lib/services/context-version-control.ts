// Context Version Control API Client
import axios from 'axios';

const CONTEXT_API_URL = process.env.NEXT_PUBLIC_CONTEXT_VERSION_CONTROL_URL || 
  'https://temporal-intelligence.sperryinquiries.workers.dev';

const contextVCClient = axios.create({
  baseURL: CONTEXT_API_URL,
  timeout: 30000,
});

export interface ContextChange {
  field_name: string;
  field_value: any;
  field_type: 'text' | 'number' | 'json' | 'array' | 'boolean' | 'date';
  source: 'manual' | 'api_twitter' | 'api_crm' | 'api_webhook' | 'claude_chat';
}

export interface ContextCommit {
  user_id: string;
  commit_message: string;
  changes: ContextChange[];
  author?: string;
  tags?: string[];
}

export interface ContextVersion {
  id: string;
  hash: string;
  message: string;
  created_at: string;
  author?: string;
  tags?: string[];
  is_current?: boolean;
}

export interface CurrentContext {
  version: ContextVersion;
  state: Record<string, {
    value: any;
    type: string;
    source: string;
    updated_at: string;
  }>;
}

export interface ContextHistory {
  total: number;
  limit: number;
  offset: number;
  versions: ContextVersion[];
}

/**
 * Create a new context commit
 */
export async function createCommit(commit: ContextCommit): Promise<{
  success: boolean;
  version: ContextVersion;
}> {
  try {
    const response = await contextVCClient.post('/api/context/commit', commit);
    return response.data;
  } catch (error: any) {
    console.error('Error creating commit:', error);
    if (error.response) {
      throw new Error(`Context VC API error: ${error.response.status} - ${error.response.data?.details || error.response.data?.error || 'Unknown error'}`);
    }
    throw new Error(`Failed to create commit: ${error.message}`);
  }
}

/**
 * Get current business context
 */
export async function getCurrentContext(userId: string): Promise<CurrentContext> {
  try {
    const response = await contextVCClient.get(`/api/context/current?user_id=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching current context:', error);
    if (error.response?.status === 404) {
      // No context exists yet - return empty state
      return {
        version: {
          id: '',
          hash: '',
          message: 'No context found',
          created_at: new Date().toISOString(),
        },
        state: {},
      };
    }
    if (error.response) {
      throw new Error(`Context VC API error: ${error.response.status} - ${error.response.data?.details || error.response.data?.error || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch context: ${error.message}`);
  }
}

/**
 * Get Claude-formatted context
 */
export async function getClaudeContext(
  userId: string,
  format: 'markdown' | 'json' | 'yaml' = 'markdown'
): Promise<string> {
  try {
    const response = await contextVCClient.get(`/api/context/claude-prompt?user_id=${userId}&format=${format}`, {
      responseType: format === 'json' ? 'json' : 'text',
    });
    return format === 'json' ? JSON.stringify(response.data, null, 2) : response.data;
  } catch (error: any) {
    console.error('Error fetching Claude context:', error);
    if (error.response) {
      throw new Error(`Context VC API error: ${error.response.status} - ${error.response.data?.details || error.response.data?.error || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch Claude context: ${error.message}`);
  }
}

/**
 * Get version history
 */
export async function getContextHistory(
  userId: string,
  limit: number = 50,
  offset: number = 0
): Promise<ContextHistory> {
  try {
    const response = await contextVCClient.get(`/api/context/history?user_id=${userId}&limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching context history:', error);
    if (error.response) {
      throw new Error(`Context VC API error: ${error.response.status} - ${error.response.data?.details || error.response.data?.error || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch history: ${error.message}`);
  }
}

/**
 * Get context at specific date
 */
export async function getContextAtDate(userId: string, date: string): Promise<any> {
  try {
    const response = await contextVCClient.get(`/api/context/at/${date}?user_id=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching context at date:', error);
    if (error.response) {
      throw new Error(`Context VC API error: ${error.response.status} - ${error.response.data?.details || error.response.data?.error || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch context at date: ${error.message}`);
  }
}

/**
 * Get field history
 */
export async function getFieldHistory(
  userId: string,
  fieldName: string,
  startDate?: string,
  endDate?: string
): Promise<any> {
  try {
    const params: any = { user_id: userId };
    if (startDate) params.start = startDate;
    if (endDate) params.end = endDate;
    
    const response = await contextVCClient.get(`/api/context/field/${fieldName}/history`, { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching field history:', error);
    if (error.response) {
      throw new Error(`Context VC API error: ${error.response.status} - ${error.response.data?.details || error.response.data?.error || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch field history: ${error.message}`);
  }
}

export default contextVCClient;

