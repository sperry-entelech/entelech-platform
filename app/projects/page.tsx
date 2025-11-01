'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProjectRegistry } from '@/lib/services/project-registry';
import { EntelechProject, SystemCategory } from '@/lib/types/project';
import { ExternalLink, Github, Globe, Settings, BookOpen } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'beta' | 'archived'>('all');

  const allProjects = ProjectRegistry.getAllProjects();
  const categories = Object.keys(ProjectRegistry.getProjectsGroupedByCategory());
  const stats = ProjectRegistry.getStats();

  const filteredProjects = useMemo(() => {
    let filtered: EntelechProject[] = allProjects;

    // Filter by search
    if (searchQuery) {
      filtered = ProjectRegistry.searchProjects(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus]);

  const groupedProjects = useMemo(() => {
    const grouped: Record<string, EntelechProject[]> = {};
    filteredProjects.forEach((project) => {
      const category = project.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(project);
    });
    return grouped;
  }, [filteredProjects]);

  const getIcon = (iconName?: string) => {
    if (!iconName) return Settings;
    const IconComponent = (Icons as any)[iconName] || Settings;
    return IconComponent;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'beta':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects Hub</h1>
          <p className="text-slate-600">
            All Entelech business systems, tools, and projects in one place
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Native Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.nativeIntegrations}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as SystemCategory | 'all')}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {ProjectRegistry.getCategoryName(cat as SystemCategory)}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="beta">Beta</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Projects by Category */}
        {Object.keys(groupedProjects).length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">No projects found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedProjects).map(([category, projects]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {ProjectRegistry.getCategoryName(category as SystemCategory)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => {
                  const Icon = getIcon(project.icon);
                  return (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                          </div>
                          <Badge variant={getStatusVariant(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {project.githubRepo && (
                            <Link href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Github className="h-4 w-4" />
                                Repo
                              </Button>
                            </Link>
                          )}
                          {project.metadata?.deploymentUrl && (
                            <Link
                              href={project.metadata.deploymentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" size="sm" className="gap-2">
                                <Globe className="h-4 w-4" />
                                View
                              </Button>
                            </Link>
                          )}
                          {project.metadata?.documentationUrl && (
                            <Link
                              href={project.metadata.documentationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" size="sm" className="gap-2">
                                <BookOpen className="h-4 w-4" />
                                Docs
                              </Button>
                            </Link>
                          )}
                        </div>
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="mt-3 text-xs text-slate-500">
                            <strong>Tech:</strong> {project.techStack.join(', ')}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

