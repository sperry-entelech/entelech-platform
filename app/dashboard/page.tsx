'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllSkills } from '@/lib/services/skills-factory';
import { ProjectRegistry } from '@/lib/services/project-registry';

export default function DashboardPage() {
  const [skillsCount, setSkillsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await getAllSkills();
      setSkillsCount(response.skills?.length || 0);
    } catch (err) {
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const projectStats = ProjectRegistry.getStats();

  const stats = {
    activeEngagements: 3,
    avgDeliveryTime: 28,
    valueDelivered: 45000,
    clientSatisfaction: 4.8,
    skillsCount: loading ? '...' : skillsCount,
    totalProjects: projectStats.total,
    activeProjects: projectStats.active,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <Link href="/clients">
            <Button>+ New Engagement</Button>
          </Link>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Active Engagements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.activeEngagements}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Avg. Delivery Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.avgDeliveryTime} min</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Value Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">${stats.valueDelivered.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Client Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.clientSatisfaction}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Skills Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.skillsCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.activeProjects}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Engagements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Engagements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Acme Marketing', type: 'Lead Conversion', status: 'delivery', time: '18 min ago' },
                  { name: 'TechCorp Agency', type: 'Proposal System', status: 'analysis', time: '35 min ago' },
                  { name: 'GrowthCo', type: 'Client Retention', status: 'discovery', time: '1 hour ago' },
                ].map((engagement, i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{engagement.name}</h3>
                        <p className="text-sm text-slate-600">{engagement.type}</p>
                      </div>
                      <Badge variant={
                        engagement.status === 'discovery' ? 'default' :
                        engagement.status === 'analysis' ? 'secondary' : 'destructive'
                      }>
                        {engagement.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">{engagement.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/systems" className="block">
                  <Button className="w-full" variant="outline">
                    View Business Systems
                  </Button>
                </Link>
                <Link href="/projects" className="block">
                  <Button className="w-full" variant="outline">
                    Browse All Projects
                  </Button>
                </Link>
                <Link href="/skills" className="block">
                  <Button className="w-full" variant="outline">
                    Browse Skills Library
                  </Button>
                </Link>
                <Link href="/cursor-prompts" className="block">
                  <Button className="w-full" variant="outline">
                    Generate Cursor Prompts
                  </Button>
                </Link>
                <Link href="/clients" className="block">
                  <Button className="w-full" variant="outline">
                    View All Clients
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
