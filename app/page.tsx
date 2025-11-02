import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectRegistry } from '@/lib/services/project-registry';
import { Zap, Building2, FolderKanban, TrendingUp, Link2, Activity } from 'lucide-react';

export default function Home() {
  const stats = ProjectRegistry.getStats();
  const activeProjects = ProjectRegistry.getAllProjects().filter(p => p.status === 'active').slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-10 w-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Entelech Internal Command Center
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Unified hub for all business systems, projects, and operations
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/dashboard">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Dashboard
                </CardTitle>
                <CardDescription className="text-slate-400">
                  View metrics, engagements, and platform activity
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-blue-400" />
                  Projects Hub
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {stats.total} projects tracked • {stats.active} active
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/systems">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-400" />
                  Systems Hub
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Business system categories and architecture
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/campaigns">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Campaigns
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Track marketing campaigns and promotions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/tools">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Business Tools
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Proposal generators, SOW creators, and more
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/integrations">
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-blue-400" />
                  Integrations
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Google Sheets, n8n, and external services
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Active Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Active Projects</h2>
            <Link href="/projects">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                View All →
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProjects.map((project) => (
              <Card key={project.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{project.category}</span>
                    {project.metadata?.internalUrl && (
                      <Link 
                        href={project.metadata.internalUrl}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Open →
                      </Link>
                    )}
                    {project.metadata?.deploymentUrl && (
                      <a 
                        href={project.metadata.deploymentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
