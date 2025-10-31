'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { getAllSkills } from '@/lib/services/skills-factory';
import { Copy, Sparkles, Loader2 } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  description?: string;
  type: string;
  tags?: string[];
}

export default function CursorPromptsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Set<number>>(new Set());
  const [prompt, setPrompt] = useState('');
  const [customContext, setCustomContext] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await getAllSkills();
      setSkills(response.skills || []);
    } catch (err) {
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skillId: number) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skillId)) {
      newSelected.delete(skillId);
    } else {
      newSelected.add(skillId);
    }
    setSelectedSkills(newSelected);
  };

  const generatePrompt = async () => {
    if (selectedSkills.size === 0 && !customContext.trim()) {
      alert('Please select at least one skill or provide custom context');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/cursor-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillIds: Array.from(selectedSkills),
          customContext: customContext.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt');
      }

      const data = await response.json();
      setPrompt(data.prompt);
    } catch (err: any) {
      alert(err.message || 'Failed to generate prompt');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Cursor Prompt Generator</h1>
          <p className="text-sm text-slate-600 mt-1">Generate Cursor prompts using your Skills Factory skills</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Skill Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Skills</CardTitle>
                <CardDescription>
                  Choose skills from your Skills Factory to include in the prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-slate-600 text-center py-4">Loading skills...</p>
                ) : skills.length === 0 ? (
                  <p className="text-slate-600 text-center py-4">
                    No skills available. Create skills in the Skills Factory first.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedSkills.has(skill.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{skill.name}</p>
                            {skill.description && (
                              <p className="text-sm text-slate-600 mt-1">{skill.description}</p>
                            )}
                            {skill.tags && skill.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {skill.tags.map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {skill.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {selectedSkills.size > 0 && (
                  <p className="text-sm text-slate-600 mt-4">
                    {selectedSkills.size} skill{selectedSkills.size !== 1 ? 's' : ''} selected
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Context (Optional)</CardTitle>
                <CardDescription>
                  Add additional context or requirements for your Cursor prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="E.g., 'Focus on error handling and TypeScript types...'"
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            <Button
              onClick={generatePrompt}
              disabled={generating || (selectedSkills.size === 0 && !customContext.trim())}
              className="w-full"
              size="lg"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Cursor Prompt
                </>
              )}
            </Button>
          </div>

          {/* Right Column: Generated Prompt */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Prompt</CardTitle>
                {prompt && (
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <>Copied!</>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
              <CardDescription>
                Use this prompt in Cursor to leverage your selected skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              {prompt ? (
                <div className="space-y-4">
                  <Textarea
                    value={prompt}
                    readOnly
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={copyToClipboard} className="flex-1">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Link href="/skills" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Browse More Skills
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>Select skills and click "Generate Cursor Prompt" to create your prompt</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

