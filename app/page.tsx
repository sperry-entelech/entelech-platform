import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Entelech Platform</h1>
            <p className="text-sm text-slate-600">RevOps Consulting Delivery Platform</p>
          </div>
          <Link href="/dashboard">
            <Button>Enter Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Internal Consulting Platform
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Accelerate RevOps consulting delivery with AI-powered agents and automation. 
            Generate custom solutions in 30 minutes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>
                Track all consulting engagements and client progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ View all active engagements</li>
                <li>✓ Track value delivery metrics</li>
                <li>✓ Monitor client satisfaction</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Orchestration</CardTitle>
              <CardDescription>
                Master, Technical, and Documentation agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ 30-minute automated delivery</li>
                <li>✓ Custom recommendations</li>
                <li>✓ Training materials generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Library</CardTitle>
              <CardDescription>
                Integrated with Skills Factory API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
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
            <Button size="lg" className="text-lg px-8">
              Open Dashboard →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
