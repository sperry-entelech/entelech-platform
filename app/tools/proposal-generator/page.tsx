'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { analyzeContent, generateSkill } from '@/lib/services/skills-factory';
import { FileText, Loader2, Download, Sparkles, Save } from 'lucide-react';

export default function ProposalGeneratorPage() {
  const [clientData, setClientData] = useState({
    companyName: '',
    industry: '',
    currentRevenue: '',
    employees: '',
    painPoints: '',
    goals: '',
    budget: '',
    timeline: '',
  });

  const [proposal, setProposal] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setProposal(null);

    try {
      // Build proposal content from client data
      const proposalContent = `
COMPANY: ${clientData.companyName}
INDUSTRY: ${clientData.industry}
CURRENT REVENUE: ${clientData.currentRevenue}
EMPLOYEES: ${clientData.employees}

PAIN POINTS:
${clientData.painPoints}

GOALS:
${clientData.goals}

BUDGET: ${clientData.budget}
TIMELINE: ${clientData.timeline}

Generate a comprehensive enterprise proposal that addresses the pain points, aligns with goals, fits the budget and timeline, and follows Entelech's proven proposal framework.
      `.trim();

      // Step 1: Analyze the content using Skills Factory
      const analysis = await analyzeContent({
        content: proposalContent,
        contentType: 'process',
      });

      // Step 2: Generate proposal using Claude
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientData,
          analysisId: analysis.analysisId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate proposal');
      }

      const data = await response.json();
      setProposal(data.proposal);

      // Optionally save as a skill for reuse
      if (data.skillId) {
        console.log('Proposal saved as skill:', data.skillId);
      }
    } catch (error: any) {
      console.error('Error generating proposal:', error);
      alert(error.message || 'Failed to generate proposal');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveAsSkill = async () => {
    if (!proposal) return;

    setSaving(true);
    try {
      // Analyze the generated proposal
      const analysis = await analyzeContent({
        content: proposal,
        contentType: 'process',
      });

      // Generate a reusable skill from it
      const skill = await generateSkill({
        analysisId: analysis.analysisId,
        skillName: `proposal-${clientData.companyName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        skillType: 'process',
        description: `Proposal template for ${clientData.companyName} - ${clientData.industry}`,
        tags: ['proposal', 'sales', clientData.industry.toLowerCase(), 'template'],
      });

      alert(`Proposal saved as skill! Skill ID: ${skill.skillId}`);
    } catch (error: any) {
      console.error('Error saving proposal as skill:', error);
      alert('Failed to save as skill: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Proposal Generator</h1>
          <p className="text-slate-400">
            Generate enterprise proposals in 30 minutes using AI-powered analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Client Information</CardTitle>
              <CardDescription className="text-slate-400">
                Enter client details to generate a customized proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">Company Name</label>
                <Input
                  value={clientData.companyName}
                  onChange={(e) => setClientData({ ...clientData, companyName: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Acme Corporation"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Industry</label>
                <Input
                  value={clientData.industry}
                  onChange={(e) => setClientData({ ...clientData, industry: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Marketing Agency"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Current Revenue</label>
                  <Input
                    value={clientData.currentRevenue}
                    onChange={(e) => setClientData({ ...clientData, currentRevenue: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="$2.5M"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Employees</label>
                  <Input
                    value={clientData.employees}
                    onChange={(e) => setClientData({ ...clientData, employees: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Pain Points</label>
                <Textarea
                  value={clientData.painPoints}
                  onChange={(e) => setClientData({ ...clientData, painPoints: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                  placeholder="Describe the client's main challenges and pain points..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Goals & Objectives</label>
                <Textarea
                  value={clientData.goals}
                  onChange={(e) => setClientData({ ...clientData, goals: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                  placeholder="What are the client's primary goals and objectives?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Budget</label>
                  <Input
                    value={clientData.budget}
                    onChange={(e) => setClientData({ ...clientData, budget: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="$50K-$75K"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1 block">Timeline</label>
                  <Input
                    value={clientData.timeline}
                    onChange={(e) => setClientData({ ...clientData, timeline: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="3-6 months"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !clientData.companyName}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Proposal...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Proposal
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Proposal */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Generated Proposal</span>
                {proposal && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSaveAsSkill}
                      disabled={saving}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      {saving ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Save className="h-3 w-3" />
                      )}
                      Save as Skill
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const blob = new Blob([proposal], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `proposal-${clientData.companyName || 'client'}.txt`;
                        a.click();
                      }}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {proposal ? (
                <div className="bg-slate-800 rounded-md p-4 max-h-[600px] overflow-y-auto">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                    {proposal}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-slate-700" />
                  <p>Generated proposal will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

