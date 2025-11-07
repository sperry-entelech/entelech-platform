'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Plus,
  Upload,
} from 'lucide-react';

type ContentType = 'copywriting' | 'process' | 'technical';
type Step = 'input' | 'analyzing' | 'preview' | 'generating' | 'complete';

interface AnalysisResult {
  analysisId: string;
  contentType: string;
  extractedData: any;
  confidence: number;
  processingTime: number;
  timestamp: string;
}

interface GeneratedSkill {
  skillId: number;
  skillName: string;
  version: number;
  downloadUrl: string;
  createdAt: string;
  metadata: {
    tags: string[];
    fileCount: number;
    totalSize: number;
  };
}

export default function CreateSkillPage() {
  const [step, setStep] = useState<Step>('input');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('process');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [skillName, setSkillName] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [generatedSkill, setGeneratedSkill] = useState<GeneratedSkill | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<Array<{ name: string; content: string; type: ContentType }>>([]);

  // Content type helper descriptions
  const contentTypeHelpers = {
    copywriting: 'Sales copy, email sequences, marketing frameworks',
    process: 'Business processes, workflows, step-by-step procedures',
    technical: 'Code patterns, technical specifications, development guides',
  };

  const getContentTypeDescription = (type: ContentType) => {
    return contentTypeHelpers[type];
  };

  // Format skill name to lowercase with hyphens
  const formatSkillName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Validation functions
  const validateSkillName = (name: string): string | null => {
    if (!name.trim()) {
      return 'Skill name is required';
    }
    if (name.trim().length < 3) {
      return 'Skill name must be at least 3 characters';
    }
    const validFormat = /^[a-z0-9-]+$/.test(name.trim());
    if (!validFormat) {
      return 'Skill name must be lowercase with hyphens only (e.g., self-iterating-documentation-agent)';
    }
    return null;
  };

  const validateContent = (content: string): string | null => {
    if (!content.trim()) {
      return 'Content is required';
    }
    if (content.trim().length < 100) {
      return `Content must be at least 100 characters (currently ${content.trim().length})`;
    }
    return null;
  };

  const validateTags = (tags: string): string | null => {
    if (!tags.trim()) return null;
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const invalidTags = tagArray.filter(t => !/^[a-z0-9-]+$/i.test(t));
    if (invalidTags.length > 0) {
      return `Invalid tags: ${invalidTags.join(', ')}. Use alphanumeric characters and hyphens only.`;
    }
    return null;
  };

  // Real-time validation handlers
  const handleSkillNameChange = (value: string) => {
    setSkillName(value);
    const error = validateSkillName(value);
    setValidationErrors(prev => ({
      ...prev,
      skillName: error || '',
    }));
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    const error = validateContent(value);
    setValidationErrors(prev => ({
      ...prev,
      content: error || '',
    }));
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const error = validateTags(value);
    setValidationErrors(prev => ({
      ...prev,
      tags: error || '',
    }));
  };

  const handleAnalyze = async () => {
    const contentError = validateContent(content);
    if (contentError) {
      setError(contentError);
      setValidationErrors(prev => ({ ...prev, content: contentError }));
      return;
    }

    setError(null);
    setValidationErrors({});
    setStep('analyzing');

    try {
      const response = await fetch('/api/skills/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          contentType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to analyze content');
      }

      const result = await response.json();
      setAnalysisResult(result);
      setStep('preview');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze content');
      setStep('input');
    }
  };

  const handleGenerateSkill = async () => {
    if (!analysisResult) return;
    
    const skillNameError = validateSkillName(skillName);
    if (skillNameError) {
      setError(skillNameError);
      setValidationErrors(prev => ({ ...prev, skillName: skillNameError }));
      return;
    }

    const tagsError = validateTags(tagsInput);
    if (tagsError) {
      setError(tagsError);
      setValidationErrors(prev => ({ ...prev, tags: tagsError }));
      return;
    }

    setError(null);
    setValidationErrors({});
    setStep('generating');

    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const response = await fetch('/api/skills/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisId: analysisResult.analysisId,
          skillName: skillName.trim(),
          skillType: contentType,
          description: description.trim() || undefined,
          tags: tags.length > 0 ? tags : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate skill');
      }

      const result = await response.json();
      setGeneratedSkill(result);
      setStep('complete');
    } catch (err: any) {
      setError(err.message || 'Failed to generate skill');
      setStep('preview');
    }
  };

  const handleDownload = () => {
    if (!generatedSkill) return;
    const url = `${process.env.NEXT_PUBLIC_SKILLS_FACTORY_URL || 'http://localhost:3001/api'}${generatedSkill.downloadUrl}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setContent('');
    setContentType('process');
    setAnalysisResult(null);
    setSkillName('');
    setDescription('');
    setTagsInput('');
    setGeneratedSkill(null);
    setError(null);
    setValidationErrors({});
    setStep('input');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/skills">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">Create New Skill</h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate Claude skills from your business content, processes, and documentation
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            {[
              { step: 'input', label: 'Configure' },
              { step: 'preview', label: 'Analyze' },
              { step: 'generating', label: 'Generate' },
              { step: 'complete', label: 'Download' },
            ].map((s, idx) => {
              const stepOrder = ['input', 'preview', 'generating', 'complete'];
              const currentIdx = stepOrder.indexOf(step);
              const isComplete = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={s.step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isComplete
                        ? 'bg-green-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isCurrent ? 'text-white font-medium' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {idx < 3 && (
                    <div
                      className={`w-12 h-0.5 ${
                        isComplete ? 'bg-green-600' : 'bg-slate-800'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-800 bg-red-950/20">
            <CardContent className="pt-6">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Input */}
        {step === 'input' && (
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Step 1: Provide Content</CardTitle>
              <CardDescription className="text-slate-400">
                Paste the content you want to convert into a Claude skill
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="contentType" className="text-slate-300 mb-2 block">
                  Content Type
                </Label>
                <Select
                  value={contentType}
                  onValueChange={(value) => setContentType(value as ContentType)}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="copywriting" className="text-white">
                      Copywriting
                    </SelectItem>
                    <SelectItem value="process" className="text-white">
                      Process
                    </SelectItem>
                    <SelectItem value="technical" className="text-white">
                      Technical
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-2">
                  {getContentTypeDescription(contentType)}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="content" className="text-slate-300">
                    Content *
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setBulkMode(!bulkMode)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    {bulkMode ? (
                      <>
                        <FileText className="h-3 w-3 mr-1" />
                        Single Mode
                      </>
                    ) : (
                      <>
                        <Upload className="h-3 w-3 mr-1" />
                        Bulk Mode
                      </>
                    )}
                  </Button>
                </div>
                
                {!bulkMode ? (
                  <>
                    <Textarea
                      id="content"
                      placeholder="Paste your process documentation, copywriting framework, or technical specification here..."
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      rows={12}
                      className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 font-mono text-sm ${
                        validationErrors.content ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        content.trim().length < 100 
                          ? 'text-yellow-500' 
                          : validationErrors.content 
                          ? 'text-red-400' 
                          : 'text-slate-500'
                      }`}>
                        {content.trim().length} / 100 characters (minimum recommended)
                        {validationErrors.content && ` • ${validationErrors.content}`}
                      </p>
                      {content.trim().length >= 100 && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                      <p className="text-sm text-slate-400 mb-2">
                        Paste multiple documents separated by "---DOCUMENT---"
                      </p>
                      <Textarea
                        placeholder="Document 1 content...&#10;&#10;---DOCUMENT---&#10;&#10;Document 2 content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-2">
                        Each document will be processed separately into its own skill
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!content.trim() || content.trim().length < 100 || !!validationErrors.content}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze Content
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Analyzing */}
        {step === 'analyzing' && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 mx-auto mb-4 text-blue-400 animate-spin" />
                <h3 className="text-xl font-semibold text-white mb-2">Analyzing Content</h3>
                <p className="text-slate-400">
                  Extracting patterns, frameworks, and knowledge from your content...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preview & Generate */}
        {step === 'preview' && analysisResult && (
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Step 2: Analysis Complete</CardTitle>
                <CardDescription className="text-slate-400">
                  Review the extracted data and configure your skill
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-white">
                      {(analysisResult.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Processing Time</p>
                    <p className="text-2xl font-bold text-white">
                      {analysisResult.processingTime}ms
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">Extracted Data Preview</Label>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <pre className="text-xs text-slate-300 overflow-auto max-h-64">
                      {JSON.stringify(analysisResult.extractedData, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Step 3: Configure Skill</CardTitle>
                <CardDescription className="text-slate-400">
                  Set the name, description, and tags for your new skill
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="skillName" className="text-slate-300 mb-2 block">
                    Skill Name *
                  </Label>
                  <Input
                    id="skillName"
                    placeholder="e.g., self-iterating-documentation-agent"
                    value={skillName}
                    onChange={(e) => {
                      const formatted = formatSkillName(e.target.value);
                      handleSkillNameChange(formatted);
                    }}
                    className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                      validationErrors.skillName ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${
                      validationErrors.skillName ? 'text-red-400' : 'text-slate-500'
                    }`}>
                      {validationErrors.skillName || 'Use lowercase with hyphens (auto-formatted)'}
                    </p>
                    {skillName && !validationErrors.skillName && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300 mb-2 block">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of what this skill does..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-slate-300 mb-2 block">
                    Tags (Optional)
                  </Label>
                  <Input
                    id="tags"
                    placeholder="documentation, automation, process (comma-separated)"
                    value={tagsInput}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                      validationErrors.tags ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${
                      validationErrors.tags ? 'text-red-400' : 'text-slate-500'
                    }`}>
                      {validationErrors.tags || 'Comma-separated tags for organization and search'}
                    </p>
                    {tagsInput && !validationErrors.tags && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep('input')}
                    className="flex-1 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerateSkill}
                    disabled={!skillName.trim() || !!validationErrors.skillName || !!validationErrors.tags}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Skill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Generating */}
        {step === 'generating' && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 mx-auto mb-4 text-blue-400 animate-spin" />
                <h3 className="text-xl font-semibold text-white mb-2">Generating Skill</h3>
                <p className="text-slate-400">
                  Creating SKILL.md, references, and packaging your skill...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Complete */}
        {step === 'complete' && generatedSkill && (
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <CardTitle className="text-white">Skill Created Successfully!</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Your skill has been generated and is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {generatedSkill.skillName}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Version</p>
                    <p className="text-lg font-medium text-white">v{generatedSkill.version}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Files</p>
                    <p className="text-lg font-medium text-white">
                      {generatedSkill.metadata.fileCount}
                    </p>
                  </div>
                </div>
                {generatedSkill.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {generatedSkill.metadata.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-slate-700 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download ZIP
                </Button>
                <Link href="/skills" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                    size="lg"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View in Library
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Another Skill
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

