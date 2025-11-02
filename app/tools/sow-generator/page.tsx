'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { analyzeContent } from '@/lib/services/skills-factory';
import { FileCheck, Loader2, Download, Sparkles, Save } from 'lucide-react';

export default function SOWGeneratorPage() {
  const [sowData, setSowData] = useState({
    projectName: '',
    clientName: '',
    startDate: '',
    endDate: '',
    scope: '',
    deliverables: '',
    milestones: '',
    assumptions: '',
    risks: '',
    budget: '',
    paymentTerms: '',
  });

  const [sow, setSow] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setSow(null);

    try {
      // Build SOW content
      const sowContent = `
PROJECT: ${sowData.projectName}
CLIENT: ${sowData.clientName}
TIMELINE: ${sowData.startDate} to ${sowData.endDate}

SCOPE:
${sowData.scope}

DELIVERABLES:
${sowData.deliverables}

MILESTONES:
${sowData.milestones}

ASSUMPTIONS:
${sowData.assumptions}

RISKS:
${sowData.risks}

BUDGET: ${sowData.budget}
PAYMENT TERMS: ${sowData.paymentTerms}

Generate a comprehensive Statement of Work document.
      `.trim();

      // Analyze content
      const analysis = await analyzeContent({
        content: sowContent,
        contentType: 'process',
      });

      // Generate SOW
      const response = await fetch('/api/generate-sow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sowData,
          analysisId: analysis.analysisId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate SOW');
      }

      const data = await response.json();
      setSow(data.sow);
    } catch (error: any) {
      console.error('Error generating SOW:', error);
      alert(error.message || 'Failed to generate SOW');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">SOW Document Generator</h1>
          <p className="text-slate-400">
            Create detailed Statements of Work with scope, deliverables, and timelines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Project Information</CardTitle>
              <CardDescription className="text-slate-400">
                Enter project details to generate a comprehensive SOW
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Project Name</label>
                <Input
                  value={sowData.projectName}
                  onChange={(e) => setSowData({ ...sowData, projectName: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Agency Optimization Engagement"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Client Name</label>
                <Input
                  value={sowData.clientName}
                  onChange={(e) => setSowData({ ...sowData, clientName: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Acme Corporation"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={sowData.startDate}
                    onChange={(e) => setSowData({ ...sowData, startDate: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={sowData.endDate}
                    onChange={(e) => setSowData({ ...sowData, endDate: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Project Scope</label>
                <Textarea
                  value={sowData.scope}
                  onChange={(e) => setSowData({ ...sowData, scope: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                  placeholder="Describe the project scope in detail..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Deliverables</label>
                <Textarea
                  value={sowData.deliverables}
                  onChange={(e) => setSowData({ ...sowData, deliverables: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                  placeholder="List all project deliverables..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Milestones</label>
                <Textarea
                  value={sowData.milestones}
                  onChange={(e) => setSowData({ ...sowData, milestones: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
                  placeholder="Key project milestones and dates..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Assumptions</label>
                <Textarea
                  value={sowData.assumptions}
                  onChange={(e) => setSowData({ ...sowData, assumptions: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
                  placeholder="Project assumptions and dependencies..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Risks</label>
                <Textarea
                  value={sowData.risks}
                  onChange={(e) => setSowData({ ...sowData, risks: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
                  placeholder="Identified risks and mitigation strategies..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Budget</label>
                  <Input
                    value={sowData.budget}
                    onChange={(e) => setSowData({ ...sowData, budget: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="$50,000"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Payment Terms</label>
                  <Input
                    value={sowData.paymentTerms}
                    onChange={(e) => setSowData({ ...sowData, paymentTerms: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="Net 30"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !sowData.projectName}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating SOW...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate SOW
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated SOW */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Generated SOW</span>
                {sow && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const blob = new Blob([sow], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `sow-${sowData.projectName || 'project'}.txt`;
                      a.click();
                    }}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sow ? (
                <div className="bg-slate-800 rounded-md p-4 max-h-[600px] overflow-y-auto">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                    {sow}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <FileCheck className="h-12 w-12 mx-auto mb-4 text-slate-700" />
                  <p>Generated SOW will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

