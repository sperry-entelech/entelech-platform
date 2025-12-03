'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import type { OutboundChannel, StatsFormData } from '@/lib/types/outbound';

interface StatsFormProps {
  channels: OutboundChannel[];
  onSubmit: (data: StatsFormData) => Promise<void>;
}

export function StatsForm({ channels, onSubmit }: StatsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<StatsFormData>({
    channel_id: channels[0]?.id || '',
    period_month: new Date().toISOString().slice(0, 7) + '-01',
    emails_sent: 0,
    emails_delivered: 0,
    emails_opened: 0,
    emails_clicked: 0,
    emails_replied: 0,
    hard_bounces: 0,
    complaints: 0,
  });

  const handleChange = (field: keyof StatsFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save stats');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate month options for the last 12 months
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
    const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return { value, label };
  });

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Add/Update Stats</CardTitle>
        <CardDescription className="text-slate-400">
          Enter monthly statistics for a channel. If data already exists for this
          channel/month, it will be updated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Channel and Month Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="channel" className="text-slate-300">
                Channel
              </Label>
              <select
                id="channel"
                value={formData.channel_id}
                onChange={(e) => handleChange('channel_id', e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-slate-700 rounded-md bg-slate-800 text-white"
                required
              >
                {channels.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="month" className="text-slate-300">
                Month
              </Label>
              <select
                id="month"
                value={formData.period_month}
                onChange={(e) => handleChange('period_month', e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-slate-700 rounded-md bg-slate-800 text-white"
                required
              >
                {monthOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="sent" className="text-slate-300">
                Emails Sent
              </Label>
              <Input
                id="sent"
                type="number"
                min="0"
                value={formData.emails_sent}
                onChange={(e) => handleChange('emails_sent', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="delivered" className="text-slate-300">
                Delivered
              </Label>
              <Input
                id="delivered"
                type="number"
                min="0"
                value={formData.emails_delivered}
                onChange={(e) => handleChange('emails_delivered', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="opened" className="text-slate-300">
                Opened
              </Label>
              <Input
                id="opened"
                type="number"
                min="0"
                value={formData.emails_opened}
                onChange={(e) => handleChange('emails_opened', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="clicked" className="text-slate-300">
                Clicked
              </Label>
              <Input
                id="clicked"
                type="number"
                min="0"
                value={formData.emails_clicked}
                onChange={(e) => handleChange('emails_clicked', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="replied" className="text-slate-300">
                Replied
              </Label>
              <Input
                id="replied"
                type="number"
                min="0"
                value={formData.emails_replied}
                onChange={(e) => handleChange('emails_replied', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bounces" className="text-slate-300">
                Hard Bounces
              </Label>
              <Input
                id="bounces"
                type="number"
                min="0"
                value={formData.hard_bounces}
                onChange={(e) => handleChange('hard_bounces', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="complaints" className="text-slate-300">
                Complaints
              </Label>
              <Input
                id="complaints"
                type="number"
                min="0"
                value={formData.complaints}
                onChange={(e) => handleChange('complaints', parseInt(e.target.value) || 0)}
                className="mt-1 bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Calculated Rates Preview */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-medium text-slate-400 mb-3">Preview (Calculated)</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Delivery Rate:</span>{' '}
                <span className="text-white font-semibold">
                  {formData.emails_sent > 0
                    ? ((formData.emails_delivered / formData.emails_sent) * 100).toFixed(2)
                    : 0}
                  %
                </span>
              </div>
              <div>
                <span className="text-slate-500">Open Rate:</span>{' '}
                <span className="text-white font-semibold">
                  {formData.emails_delivered > 0
                    ? ((formData.emails_opened / formData.emails_delivered) * 100).toFixed(2)
                    : 0}
                  %
                </span>
              </div>
              <div>
                <span className="text-slate-500">Bounce Rate:</span>{' '}
                <span className="text-white font-semibold">
                  {formData.emails_sent > 0
                    ? ((formData.hard_bounces / formData.emails_sent) * 100).toFixed(2)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.channel_id}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Stats
                </>
              )}
            </Button>
            {success && (
              <span className="text-green-400 text-sm">Stats saved successfully!</span>
            )}
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
