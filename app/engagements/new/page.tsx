'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function NewEngagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');

  const [engagementType, setEngagementType] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const engagementTypes = [
    { value: 'agency-optimization', label: 'Agency Optimization', description: 'Complete RevOps optimization for agencies' },
    { value: 'lead-conversion', label: 'Lead Conversion', description: 'Convert 40-60% more inbound leads' },
    { value: 'proposal-system', label: 'Proposal System', description: 'Cut sales cycle by 50-70%' },
    { value: 'client-retention', label: 'Client Retention', description: 'Reduce churn by half' },
  ];

  const handleExecute = async () => {
    if (!engagementType) return;

    setIsExecuting(true);
    
    // Simulate 30-minute engagement
    setTimeout(() => {
      setResults({
        totalTime: 28.5,
        agents: {
          discovery: { agentName: 'Master Coordinator', processingTime: 8.2 },
          implementation: { agentName: 'Solution Design', processingTime: 12.1 },
          training: { agentName: 'Client Enablement', processingTime: 8.2 },
        },
        estimatedValue: '$45,000 in additional revenue',
        nextSteps: [
          'Review discovery analysis',
          'Customize recommendations',
          'Prepare client presentation',
          'Schedule delivery meeting',
        ],
      });
      setIsExecuting(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Start New Engagement</h1>
            <Link href="/dashboard">
              <Button variant="outline">← Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!results ? (
          <Card>
            <CardHeader>
              <CardTitle>Select Engagement Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Engagement Type
                </label>
                <Select value={engagementType} onValueChange={setEngagementType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select engagement type" />
                  </SelectTrigger>
                  <SelectContent>
                    {engagementTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-slate-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {engagementType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">What to Expect</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Discovery analysis in 5-10 minutes</li>
                    <li>✓ Implementation plan in 10-15 minutes</li>
                    <li>✓ Training materials in 10-15 minutes</li>
                    <li>✓ Total delivery time: ~30 minutes</li>
                  </ul>
                </div>
              )}

              <Button
                onClick={handleExecute}
                disabled={!engagementType || isExecuting}
                className="w-full"
                size="lg"
              >
                {isExecuting ? 'Executing Engagement...' : 'Start 30-Minute Engagement'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Engagement Complete!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">
                  Delivered in {results.totalTime.toFixed(1)} minutes
                </p>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Master Coordinator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {results.agents.discovery.processingTime.toFixed(1)}s
                  </div>
                  <p className="text-xs text-slate-600">Discovery complete</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Solution Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {results.agents.implementation.processingTime.toFixed(1)}s
                  </div>
                  <p className="text-xs text-slate-600">Plan ready</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Client Enablement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {results.agents.training.processingTime.toFixed(1)}s
                  </div>
                  <p className="text-xs text-slate-600">Materials generated</p>
                </CardContent>
              </Card>
            </div>

            {/* Estimated Value */}
            <Card>
              <CardHeader>
                <CardTitle>Estimated Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {results.estimatedValue}
                </p>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1" onClick={() => router.push('/dashboard')}>
                View in Dashboard
              </Button>
              <Button className="flex-1" variant="outline" onClick={() => setResults(null)}>
                Create Another
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
