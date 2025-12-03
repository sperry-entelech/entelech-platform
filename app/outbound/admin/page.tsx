'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsForm } from '@/components/outbound/stats-form';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { OutboundChannel, OutboundStatsWithChannel, StatsFormData } from '@/lib/types/outbound';

export default function OutboundAdminPage() {
  const [channels, setChannels] = useState<OutboundChannel[]>([]);
  const [stats, setStats] = useState<OutboundStatsWithChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [channelsRes, statsRes] = await Promise.all([
        fetch('/api/outbound/channels'),
        fetch('/api/outbound/stats'),
      ]);

      if (!channelsRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch data. Make sure database tables exist.');
      }

      const channelsData = await channelsRes.json();
      const statsData = await statsRes.json();

      setChannels(channelsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (data: StatsFormData) => {
    const response = await fetch('/api/outbound/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save stats');
    }

    // Refresh data
    await fetchData();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            <span className="ml-3 text-slate-400">Loading...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/outbound">
              <Button
                variant="outline"
                size="icon"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Outbound Admin
              </h1>
              <p className="text-slate-400">
                Add and manage email campaign statistics
              </p>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="bg-red-900/20 border-red-800 mb-8">
            <CardContent className="py-4">
              <p className="text-red-400 mb-2">{error}</p>
              <p className="text-sm text-red-300/70">
                Make sure you've created the <code className="bg-red-900/50 px-1 rounded">outbound_channels</code> and{' '}
                <code className="bg-red-900/50 px-1 rounded">outbound_stats</code> tables in Supabase.
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Channels Warning */}
        {!error && channels.length === 0 && (
          <Card className="bg-yellow-900/20 border-yellow-800 mb-8">
            <CardContent className="py-4">
              <p className="text-yellow-400 mb-2">No channels found</p>
              <p className="text-sm text-yellow-300/70">
                Run the SQL seed script in Supabase to create channels before adding stats.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats Form */}
        {channels.length > 0 && (
          <div className="mb-8">
            <StatsForm channels={channels} onSubmit={handleSubmit} />
          </div>
        )}

        {/* Existing Stats Table */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Existing Stats</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                No stats recorded yet. Use the form above to add data.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">
                        Channel
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">
                        Month
                      </th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">
                        Sent
                      </th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">
                        Delivered
                      </th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">
                        Opened
                      </th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">
                        Delivery %
                      </th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">
                        Open %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((stat) => {
                      const deliveryRate =
                        stat.emails_sent > 0
                          ? (stat.emails_delivered / stat.emails_sent) * 100
                          : 0;
                      const openRate =
                        stat.emails_delivered > 0
                          ? (stat.emails_opened / stat.emails_delivered) * 100
                          : 0;

                      return (
                        <tr
                          key={stat.id}
                          className="border-b border-slate-800/50 hover:bg-slate-800/30"
                        >
                          <td className="py-3 px-4 text-white">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: stat.channel?.color || '#3B82F6',
                                }}
                              />
                              {stat.channel?.name || 'Unknown'}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {formatDate(stat.period_month)}
                          </td>
                          <td className="py-3 px-4 text-right text-white">
                            {stat.emails_sent.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-slate-300">
                            {stat.emails_delivered.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-slate-300">
                            {stat.emails_opened.toLocaleString()}
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-medium ${
                              deliveryRate >= 95
                                ? 'text-green-400'
                                : deliveryRate >= 90
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}
                          >
                            {deliveryRate.toFixed(1)}%
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-medium ${
                              openRate >= 40
                                ? 'text-green-400'
                                : openRate >= 20
                                ? 'text-blue-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {openRate.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SQL Setup Instructions */}
        <Card className="bg-slate-900 border-slate-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Database Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 mb-4">
              Run this SQL in your Supabase SQL Editor to create the required tables:
            </p>
            <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 border border-slate-800">
{`-- Create tables
CREATE TABLE outbound_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(20) DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE outbound_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES outbound_channels(id) ON DELETE CASCADE,
  period_month DATE NOT NULL,
  emails_sent INTEGER DEFAULT 0,
  emails_delivered INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  emails_replied INTEGER DEFAULT 0,
  hard_bounces INTEGER DEFAULT 0,
  complaints INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(channel_id, period_month)
);

-- Enable RLS
ALTER TABLE outbound_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE outbound_stats ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read channels" ON outbound_channels FOR SELECT USING (true);
CREATE POLICY "Anyone can read stats" ON outbound_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can write channels" ON outbound_channels FOR ALL USING (true);
CREATE POLICY "Anyone can write stats" ON outbound_stats FOR ALL USING (true);

-- Seed channels
INSERT INTO outbound_channels (name, description, color) VALUES
  ('Channel 1', 'Primary outreach', '#3B82F6'),
  ('Channel 2', 'Secondary campaigns', '#8B5CF6'),
  ('Channel 3', 'High-engagement list', '#10B981'),
  ('Channel 4', 'Volume driver', '#F59E0B');`}
            </pre>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
