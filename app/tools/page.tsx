'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Briefcase, FileCheck, Settings, Zap } from 'lucide-react';

const businessTools = [
  {
    id: 'proposal-generator',
    name: 'Proposal Generator',
    description: 'Generate enterprise proposals in minutes using AI-powered templates and client data',
    icon: FileText,
    href: '/tools/proposal-generator',
    category: 'Sales',
    status: 'active',
    features: ['Client data integration', 'Customizable templates', 'AI-powered content', 'Multi-format export'],
  },
  {
    id: 'sow-generator',
    name: 'SOW Document Generator',
    description: 'Create detailed Statements of Work with scope, deliverables, and timelines',
    icon: FileCheck,
    href: '/tools/sow-generator',
    category: 'Operations',
    status: 'active',
    features: ['Scope definition', 'Timeline generation', 'Deliverables tracking', 'Risk assessment'],
  },
  {
    id: 'contract-generator',
    name: 'Contract Generator',
    description: 'Generate MSA, SOW, and NDA templates with legal compliance',
    icon: Briefcase,
    href: '/tools/contract-generator',
    category: 'Legal',
    status: 'coming-soon',
    features: ['Legal templates', 'Compliance check', 'Auto-population', 'Digital signatures'],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Business Tools Hub</h1>
          <p className="text-slate-400">
            AI-powered generators for proposals, SOWs, contracts, and business documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {businessTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                className={`bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors ${
                  tool.status === 'coming-soon' ? 'opacity-75' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-6 w-6 text-blue-400" />
                    <CardTitle className="text-white">{tool.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="border-slate-700 text-slate-300 text-xs"
                    >
                      {tool.category}
                    </Badge>
                    {tool.status === 'coming-soon' && (
                      <Badge variant="secondary" className="bg-yellow-600 text-white text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-slate-400">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase mb-2">Features</p>
                      <ul className="space-y-1">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                            <Zap className="h-3 w-3 text-blue-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {tool.status === 'active' ? (
                      <Link href={tool.href}>
                        <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                          Use Tool
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full mt-4 px-4 py-2 bg-slate-800 text-slate-500 rounded-md cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Powered by Skills Factory
            </CardTitle>
            <CardDescription className="text-slate-400">
              All tools use the Skills Factory API to analyze content, generate documents, and create reusable business assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/skills">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md border border-slate-700 transition-colors">
                View Skills Library
              </button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


