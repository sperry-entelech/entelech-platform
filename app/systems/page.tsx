'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectRegistry } from '@/lib/services/project-registry';
import { SystemCategory, AGENCY_SYSTEM_CATEGORIES } from '@/lib/types/project';
import {
  Megaphone,
  TrendingUp,
  Cog,
  Users,
  Brain,
  Server,
  BarChart3,
  DollarSign,
  Briefcase,
  Scale,
  BookOpen,
  Rocket,
  FileText,
  FolderKanban,
} from 'lucide-react';

const SYSTEM_ICONS: Record<SystemCategory, any> = {
  marketing: Megaphone,
  sales: TrendingUp,
  'service-delivery': Cog,
  'multi-agent': Brain,
  'client-success': Users,
  'backend-infrastructure': Server,
  'ai-intelligence': Brain,
  'data-analytics': BarChart3,
  finance: DollarSign,
  hr: Briefcase,
  legal: Scale,
  'internal-enablement': BookOpen,
  'echelon-platform': Rocket,
  'client-project': FolderKanban,
  tool: Cog,
  documentation: FileText,
};

const SYSTEM_DESCRIPTIONS: Record<SystemCategory, string> = {
  marketing: 'Top of funnel lead generation and marketing automation',
  sales: 'Sales intelligence, CRM, and proposal generation',
  'service-delivery': 'Operations, workflow automation, and service delivery',
  'multi-agent': 'Multi-agent automation system for enterprise proposals',
  'client-success': 'Client engagement, onboarding, and success management',
  'backend-infrastructure': 'Technical infrastructure, APIs, and cloud services',
  'ai-intelligence': 'AI/ML systems, agents, and intelligence layer',
  'data-analytics': 'Business intelligence, analytics, and reporting',
  finance: 'Revenue tracking, invoicing, and financial management',
  hr: 'Team management, talent acquisition, and performance',
  legal: 'Contract management, compliance, and legal documentation',
  'internal-enablement': 'Internal tools, documentation, and knowledge base',
  'echelon-platform': 'White-label SaaS platform for partner channels',
  'client-project': 'Client-specific projects and deliverables',
  tool: 'Utilities and standalone tools',
  documentation: 'Documentation, wikis, and knowledge management',
};

export default function SystemsPage() {
  const groupedProjects = ProjectRegistry.getProjectsGroupedByCategory();
  const allCategories = Object.keys(AGENCY_SYSTEM_CATEGORIES) as SystemCategory[];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Systems Hub</h1>
          <p className="text-slate-600">
            Complete business system architecture based on{' '}
            <Link
              href="https://github.com/sperry-entelech/agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              agency repository documentation
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => {
            const Icon = SYSTEM_ICONS[category];
            const projects = groupedProjects[category] || [];
            const categoryName = AGENCY_SYSTEM_CATEGORIES[category];
            const description = SYSTEM_DESCRIPTIONS[category];

            return (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <CardTitle>{categoryName}</CardTitle>
                  </div>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Projects</span>
                      <Badge variant="secondary">{projects.length}</Badge>
                    </div>
                    {projects.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase">Active Projects</p>
                        <ul className="space-y-1">
                          {projects.slice(0, 3).map((project) => (
                            <li key={project.id}>
                              <Link
                                href={`/projects?category=${category}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {project.name}
                              </Link>
                            </li>
                          ))}
                          {projects.length > 3 && (
                            <li className="text-xs text-slate-500">
                              +{projects.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    <Link href={`/projects?category=${category}`}>
                      <Button variant="outline" className="w-full" size="sm">
                        View All Projects
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Agency Repo Link */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Complete System Documentation
            </CardTitle>
            <CardDescription>
              For detailed architecture, workflows, and system specifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="https://github.com/sperry-entelech/agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                View Agency Repository
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

