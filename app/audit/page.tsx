'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2, Sparkles, ArrowRight, FileText, Target, Zap } from 'lucide-react';

type AuditLevel = 'basic' | 'standard' | 'comprehensive';

interface AuditLevelInfo {
  id: AuditLevel;
  name: string;
  description: string;
  duration: string;
  features: string[];
  price: string;
}

const auditLevels: AuditLevelInfo[] = [
  {
    id: 'basic',
    name: 'Basic Audit',
    description: 'Quick assessment of your business operations',
    duration: '30 minutes',
    features: [
      'High-level process review',
      'Top 3 improvement opportunities',
      'Executive summary report',
      'Email delivery within 24 hours',
    ],
    price: 'FREE',
  },
  {
    id: 'standard',
    name: 'Standard Audit',
    description: 'Detailed analysis of your key business systems',
    duration: '60 minutes',
    features: [
      'Comprehensive process analysis',
      'Top 5-7 improvement opportunities',
      'Detailed findings report',
      'Priority recommendations',
      'Email delivery within 48 hours',
    ],
    price: 'FREE',
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Audit',
    description: 'Deep-dive analysis across all business areas',
    duration: '90 minutes',
    features: [
      'Full business systems review',
      '10+ improvement opportunities',
      'Detailed analysis report with action plans',
      'Prioritized roadmap',
      'Value projections for each opportunity',
      'Email delivery within 72 hours',
    ],
    price: 'FREE',
  },
];

export default function AuditRequestPage() {
  const [selectedLevel, setSelectedLevel] = useState<AuditLevel>('basic');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    currentRevenue: '',
    primaryPainPoints: '',
    mainGoals: '',
    specificAreas: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditLevel: selectedLevel,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit audit request');
      }

      const data = await response.json();
      setSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting audit:', error);
      alert('Failed to submit audit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <Card className="bg-slate-900 border-slate-800 max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Audit Request Submitted!</CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              We've received your request for a {auditLevels.find(l => l.id === selectedLevel)?.name.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-800 rounded-md p-4">
              <p className="text-sm text-slate-300 mb-2">
                <strong className="text-white">What happens next:</strong>
              </p>
              <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                <li>We'll review your submission within 24 hours</li>
                <li>Our team will analyze your business information</li>
                <li>You'll receive your audit report via email within {auditLevels.find(l => l.id === selectedLevel)?.duration}</li>
                <li>We'll schedule a follow-up call to discuss findings</li>
              </ul>
            </div>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  companyName: '',
                  contactName: '',
                  email: '',
                  phone: '',
                  industry: '',
                  companySize: '',
                  currentRevenue: '',
                  primaryPainPoints: '',
                  mainGoals: '',
                  specificAreas: '',
                });
              }}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedLevelInfo = auditLevels.find((l) => l.id === selectedLevel);

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Free Business Audit</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Get a professional assessment of your business operations, processes, and opportunities
            </p>
          </div>

          {/* Audit Level Selection */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Select Audit Level</CardTitle>
              <CardDescription className="text-slate-400">
                Choose the depth of analysis that fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as AuditLevel)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {auditLevels.map((level) => (
                    <div key={level.id}>
                      <RadioGroupItem
                        value={level.id}
                        id={level.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={level.id}
                        className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedLevel === level.id
                            ? 'border-blue-600 bg-blue-950/20'
                            : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{level.name}</span>
                          <Badge className="bg-green-600 text-white">{level.price}</Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{level.description}</p>
                        <p className="text-xs text-slate-500 mb-3">
                          <FileText className="h-3 w-3 inline mr-1" />
                          {level.duration}
                        </p>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {level.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Request Form */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
              <CardDescription className="text-slate-400">
                Help us understand your business so we can provide the most valuable audit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Company Name *</label>
                      <Input
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Your Name *</label>
                      <Input
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Email Address *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="john@acme.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    Business Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Industry *</label>
                      <Input
                        required
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="Marketing Agency"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Company Size</label>
                      <Input
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="50 employees"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Annual Revenue</label>
                      <Input
                        value={formData.currentRevenue}
                        onChange={(e) => setFormData({ ...formData, currentRevenue: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="$2.5M"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Challenges */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Tell Us About Your Business</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">
                        Primary Pain Points * {selectedLevel === 'comprehensive' && '(Be as detailed as possible)'}
                      </label>
                      <Textarea
                        required
                        value={formData.primaryPainPoints}
                        onChange={(e) => setFormData({ ...formData, primaryPainPoints: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                        placeholder="What are your biggest operational challenges? What's not working well?"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">
                        Main Goals & Objectives * {selectedLevel === 'comprehensive' && '(Be as detailed as possible)'}
                      </label>
                      <Textarea
                        required
                        value={formData.mainGoals}
                        onChange={(e) => setFormData({ ...formData, mainGoals: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                        placeholder="What are you trying to achieve? What would success look like?"
                      />
                    </div>
                    {selectedLevel !== 'basic' && (
                      <div>
                        <label className="text-sm text-slate-300 mb-1 block">
                          Specific Areas to Focus On {selectedLevel === 'comprehensive' && '(Optional - list any specific processes, systems, or departments)'}
                        </label>
                        <Textarea
                          value={formData.specificAreas}
                          onChange={(e) => setFormData({ ...formData, specificAreas: e.target.value })}
                          className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                          placeholder="E.g., Sales process, Client onboarding, Proposal generation, etc."
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Request Free {selectedLevelInfo?.name}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  By submitting, you agree to receive your audit report and follow-up communications from Entelech.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

