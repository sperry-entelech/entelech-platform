'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText, Github, BookOpen, Link2 } from 'lucide-react';

const documentationLinks = [
  {
    title: 'Agency System Map',
    description: 'Complete business system architecture documentation',
    url: 'https://github.com/sperry-entelech/agency',
    category: 'Architecture',
    icon: FileText,
  },
  {
    title: 'Marketing System Documentation',
    description: 'Top of funnel lead generation and marketing automation',
    url: 'https://github.com/sperry-entelech/agency/tree/main/marketing',
    category: 'Marketing',
    icon: BookOpen,
  },
  {
    title: 'Sales Intelligence',
    description: 'Sales process, CRM, and proposal generation systems',
    url: 'https://github.com/sperry-entelech/agency/tree/main/sales-intelligence',
    category: 'Sales',
    icon: BookOpen,
  },
  {
    title: 'Multi-Agent System',
    description: 'Automation system architecture and implementation',
    url: 'https://github.com/sperry-entelech/agency/tree/main/multi-agent-system',
    category: 'AI/Systems',
    icon: FileText,
  },
  {
    title: 'Service Delivery',
    description: 'Operations, workflow automation, and delivery processes',
    url: 'https://github.com/sperry-entelech/agency/tree/main/operations',
    category: 'Operations',
    icon: BookOpen,
  },
  {
    title: 'Client Success',
    description: 'Client engagement, onboarding, and success management',
    url: 'https://github.com/sperry-entelech/agency/tree/main/client-success',
    category: 'Client Management',
    icon: BookOpen,
  },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-slate-400">
            Complete system documentation and knowledge base
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentationLinks.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white">{doc.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit border-slate-700 text-slate-300">
                    {doc.category}
                  </Badge>
                  <CardDescription className="text-slate-400 mt-2">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={doc.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Github className="h-5 w-5 text-blue-400" />
              Agency Repository
            </CardTitle>
            <CardDescription className="text-slate-400">
              Complete source of truth for Entelech business system architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="https://github.com/sperry-entelech/agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Github className="h-4 w-4" />
                View Agency Repository
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


