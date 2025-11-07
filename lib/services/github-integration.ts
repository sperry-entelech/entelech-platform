// GitHub Integration Service
// For discovering and syncing Entelech projects from GitHub

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  topics: string[];
  archived: boolean;
  private: boolean;
}

export interface GitHubIntegrationOptions {
  org?: string;
  token?: string; // GitHub personal access token
}

export class GitHubIntegration {
  private org: string;
  private token?: string;
  private baseUrl = 'https://api.github.com';

  constructor(options: GitHubIntegrationOptions = {}) {
    this.org = options.org || 'sperry-entelech';
    this.token = options.token;
  }

  /**
   * Get all repositories for the organization
   */
  async getAllRepositories(): Promise<GitHubRepo[]> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const url = `${this.baseUrl}/orgs/${this.org}/repos?per_page=100&sort=updated`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repos: GitHubRepo[] = await response.json();
      return repos.filter((repo) => !repo.archived && !repo.private);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw error;
    }
  }

  /**
   * Get repository details
   */
  async getRepository(repoName: string): Promise<GitHubRepo> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const url = `${this.baseUrl}/repos/${this.org}/${repoName}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching repository ${repoName}:`, error);
      throw error;
    }
  }

  /**
   * Filter out ignored repositories
   */
  filterIgnoredRepos(repos: GitHubRepo[]): GitHubRepo[] {
    const ignoredPatterns = [
      /entelech-developers/i,
      /entelech-coaches/i,
      /entelech-agencies/i,
    ];

    return repos.filter((repo) => {
      return !ignoredPatterns.some((pattern) => pattern.test(repo.name));
    });
  }

  /**
   * Discover new projects from GitHub
   */
  async discoverProjects(): Promise<GitHubRepo[]> {
    const repos = await this.getAllRepositories();
    return this.filterIgnoredRepos(repos);
  }

  /**
   * Get repository README content
   */
  async getRepositoryReadme(repoName: string): Promise<string | null> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const url = `${this.baseUrl}/repos/${this.org}/${repoName}/readme`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      // Decode base64 content
      const content = atob(data.content.replace(/\n/g, ''));
      return content;
    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error);
      return null;
    }
  }
}

export default GitHubIntegration;


