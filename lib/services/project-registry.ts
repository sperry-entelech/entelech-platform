// Project Registry Service
// Manages all Entelech projects and systems

import { entelechProjects, getProjectsByCategory, getActiveProjects, getProjectById, searchProjects } from '@/lib/data/projects';
import { EntelechProject, SystemCategory, ProjectStatus } from '@/lib/types/project';
import { AGENCY_SYSTEM_CATEGORIES } from '@/lib/types/project';

export class ProjectRegistry {
  /**
   * Get all projects
   */
  static getAllProjects(): EntelechProject[] {
    return entelechProjects;
  }

  /**
   * Get projects by category
   */
  static getProjectsByCategory(category: SystemCategory): EntelechProject[] {
    return getProjectsByCategory(category);
  }

  /**
   * Get active projects only
   */
  static getActiveProjects(): EntelechProject[] {
    return getActiveProjects();
  }

  /**
   * Get project by ID
   */
  static getProjectById(id: string): EntelechProject | undefined {
    return getProjectById(id);
  }

  /**
   * Search projects
   */
  static searchProjects(query: string): EntelechProject[] {
    return searchProjects(query);
  }

  /**
   * Get projects grouped by category
   */
  static getProjectsGroupedByCategory(): Record<string, EntelechProject[]> {
    const grouped: Record<string, EntelechProject[]> = {};
    
    entelechProjects.forEach((project) => {
      const category = project.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(project);
    });

    return grouped;
  }

  /**
   * Get projects by status
   */
  static getProjectsByStatus(status: ProjectStatus): EntelechProject[] {
    return entelechProjects.filter((p) => p.status === status);
  }

  /**
   * Get category display name
   */
  static getCategoryName(category: SystemCategory): string {
    return AGENCY_SYSTEM_CATEGORIES[category] || category;
  }

  /**
   * Get projects by integration type
   */
  static getProjectsByIntegrationType(type: 'native' | 'embedded' | 'external' | 'link'): EntelechProject[] {
    return entelechProjects.filter((p) => p.integrationType === type);
  }

  /**
   * Get statistics
   */
  static getStats() {
    const total = entelechProjects.length;
    const active = entelechProjects.filter((p) => p.status === 'active').length;
    const categories = new Set(entelechProjects.map((p) => p.category)).size;
    const native = entelechProjects.filter((p) => p.integrationType === 'native').length;

    return {
      total,
      active,
      archived: total - active,
      categories,
      nativeIntegrations: native,
    };
  }
}

export default ProjectRegistry;


