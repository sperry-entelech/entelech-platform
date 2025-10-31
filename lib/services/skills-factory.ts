// Skills Factory API Client
import axios from 'axios';
import { SkillReference } from '../types';

const SKILLS_FACTORY_API = process.env.NEXT_PUBLIC_SKILLS_FACTORY_URL || 'http://localhost:3001/api';

const skillsFactoryClient = axios.create({
  baseURL: SKILLS_FACTORY_API,
  timeout: 60000,
});

export interface AnalyzeRequest {
  content: string;
  contentType: 'copywriting' | 'process' | 'technical';
}

export interface GenerateSkillRequest {
  analysisId: string;
  skillName: string;
  skillType: 'copywriting' | 'process' | 'technical';
  description?: string;
  tags?: string[];
}

export interface SkillResponse {
  skillId: number;
  skillName: string;
  version: number;
  downloadUrl: string;
  createdAt: string;
  metadata: {
    tags: string[];
    fileCount: number;
    totalSize: number;
  };
}

export interface AnalysisResponse {
  analysisId: string;
  contentType: string;
  extractedData: any;
  confidence: number;
  processingTime: number;
  timestamp: string;
}

/**
 * Analyze content using Skills Factory
 */
export async function analyzeContent(request: AnalyzeRequest): Promise<AnalysisResponse> {
  const response = await skillsFactoryClient.post<AnalysisResponse>('/analyze', request);
  return response.data;
}

/**
 * Generate skill from analysis
 */
export async function generateSkill(request: GenerateSkillRequest): Promise<SkillResponse> {
  const response = await skillsFactoryClient.post<SkillResponse>('/generate-skill', request);
  return response.data;
}

/**
 * Get all skills from Skills Factory library
 */
export async function getAllSkills(params?: {
  search?: string;
  type?: string;
}): Promise<{ skills: any[] }> {
  try {
    const response = await skillsFactoryClient.get('/skills', { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    if (error.response) {
      throw new Error(`Skills Factory API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to connect to Skills Factory: ${error.message}`);
  }
}

/**
 * Get a single skill by ID
 */
export async function getSkillById(skillId: number): Promise<any> {
  try {
    const response = await skillsFactoryClient.get(`/skills/${skillId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching skill ${skillId}:`, error);
    if (error.response) {
      throw new Error(`Skills Factory API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    }
    throw new Error(`Failed to fetch skill: ${error.message}`);
  }
}

/**
 * Search skills by tags
 */
export async function searchSkills(tags: string[]): Promise<any[]> {
  const response = await skillsFactoryClient.get('/skills', {
    params: { search: tags.join(',') }
  });
  return response.data.skills;
}

/**
 * Download skill ZIP
 */
export async function downloadSkill(skillId: number, filename: string): Promise<void> {
  const response = await skillsFactoryClient.get(`/skills/${skillId}/download`, {
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.zip`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export default skillsFactoryClient;
