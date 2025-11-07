'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { TrendingUp, Plus, ExternalLink, Calendar, Target, BarChart3 } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  type: 'rotational' | 'ongoing' | 'time-limited';
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  platforms: string[];
  performance?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    conversionRate?: number;
  };
  notes?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: 'audit-website-rotation-1',
    name: 'Audit Form - Website Homepage Rotation',
    projectId: 'audit-request-form',
    projectName: 'Free Audit Request Form',
    type: 'rotational',
    status: 'active',
    startDate: '2025-01-15',
    platforms: ['Website'],
    performance: {
      impressions: 12500,
      clicks: 320,
      conversions: 45,
      conversionRate: 14.06,
    },
    notes: 'Rotating CTA on homepage, changes weekly',
  },
  {
    id: 'audit-social-q1',
    name: 'Free Audit Q1 Social Campaign',
    projectId: 'audit-request-form',
    projectName: 'Free Audit Request Form',
    type: 'time-limited',
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    platforms: ['LinkedIn', 'Twitter'],
    performance: {
      impressions: 8500,
      clicks: 180,
      conversions: 22,
      conversionRate: 12.22,
    },
  },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === 'all' || campaign.projectId === selectedProject;
    return matchesSearch && matchesProject;
  });

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.performance?.conversions || 0), 0);
  const avgConversionRate = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + (c.performance?.conversionRate || 0), 0) / campaigns.length
    : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-600 text-white">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-slate-600 text-white">Completed</Badge>;
      default:
        return <Badge className="bg-slate-700 text-white">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'rotational':
        return <Badge variant="outline" className="border-blue-600 text-blue-400">Rotational</Badge>;
      case 'ongoing':
        return <Badge variant="outline" className="border-green-600 text-green-400">Ongoing</Badge>;
      case 'time-limited':
        return <Badge variant="outline" className="border-yellow-600 text-yellow-400">Time-Limited</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Campaigns Hub</h1>
            <p className="text-slate-400">
              Track marketing campaigns and promotions for projects
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Campaign</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Set up a new marketing campaign for a project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="campaign-name" className="text-slate-300">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    className="bg-slate-800 border-slate-700 text-white mt-1"
                    placeholder="e.g., Audit Form Q1 Promotion"
                  />
                </div>
                <div>
                  <Label htmlFor="project" className="text-slate-300">Project</Label>
                  <select
                    id="project"
                    className="w-full px-4 py-2 border border-slate-800 rounded-md bg-slate-800 text-white mt-1"
                  >
                    <option value="">Select a project</option>
                    <option value="audit-request-form">Free Audit Request Form</option>
                    <option value="entelech-website">Entelech Website</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="campaign-type" className="text-slate-300">Campaign Type</Label>
                  <select
                    id="campaign-type"
                    className="w-full px-4 py-2 border border-slate-800 rounded-md bg-slate-800 text-white mt-1"
                  >
                    <option value="rotational">Rotational</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="time-limited">Time-Limited</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Create Campaign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{campaigns.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{activeCampaigns}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{totalConversions}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Avg. Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{avgConversionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900 border-slate-800 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-4 py-2 border border-slate-800 rounded-md bg-slate-800 text-white"
              >
                <option value="all">All Projects</option>
                <option value="audit-request-form">Audit Request Form</option>
                <option value="entelech-website">Entelech Website</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">No campaigns found matching your filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-white">{campaign.name}</CardTitle>
                        {getStatusBadge(campaign.status)}
                        {getTypeBadge(campaign.type)}
                      </div>
                      <CardDescription className="text-slate-400">
                        Promoting: <span className="text-slate-300">{campaign.projectName}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Form
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-400">Schedule</span>
                      </div>
                      <p className="text-sm text-slate-300">
                        Started: {new Date(campaign.startDate).toLocaleDateString()}
                      </p>
                      {campaign.endDate && (
                        <p className="text-sm text-slate-300">
                          Ends: {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-400">Platforms</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {campaign.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="border-slate-700 text-slate-300">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {campaign.performance && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-400">Performance</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-300">
                            <span className="text-slate-500">Impressions:</span> {campaign.performance.impressions?.toLocaleString()}
                          </p>
                          <p className="text-slate-300">
                            <span className="text-slate-500">Clicks:</span> {campaign.performance.clicks?.toLocaleString()}
                          </p>
                          <p className="text-slate-300">
                            <span className="text-slate-500">Conversions:</span>{' '}
                            <span className="text-green-400 font-semibold">{campaign.performance.conversions}</span>
                            {' '}({campaign.performance.conversionRate?.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {campaign.notes && (
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <p className="text-sm text-slate-400">
                        <span className="font-medium">Notes:</span> {campaign.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}


