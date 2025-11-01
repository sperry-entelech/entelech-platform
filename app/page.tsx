import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Internal Consulting Platform
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Accelerate RevOps consulting delivery with AI-powered agents and automation. 
            Generate custom solutions in 30 minutes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Client Management</CardTitle>
              <CardDescription className="text-slate-400">
                Track all consulting engagements and client progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ View all active engagements</li>
                <li>✓ Track value delivery metrics</li>
                <li>✓ Monitor client satisfaction</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Agent Orchestration</CardTitle>
              <CardDescription className="text-slate-400">
                Master, Technical, and Documentation agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ 30-minute automated delivery</li>
                <li>✓ Custom recommendations</li>
                <li>✓ Training materials generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Skills Library</CardTitle>
              <CardDescription className="text-slate-400">
                Integrated with Skills Factory API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✓ Search reusable prompts</li>
                <li>✓ Generate new skills from clients</li>
                <li>✓ Build knowledge base over time</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700">
              Open Dashboard →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
