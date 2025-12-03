'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeroStats } from '@/components/outbound/hero-stats';
import { VolumeChart } from '@/components/outbound/volume-chart';
import { ChannelCards } from '@/components/outbound/channel-card';
import { RefreshCw, Settings, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type {
  OutboundSummary,
  ChannelSummary,
  MonthlyTrend,
} from '@/lib/types/outbound';

// Default empty summary
const emptySummary: OutboundSummary = {
  total_sent: 0,
  total_delivered: 0,
  total_opened: 0,
  total_clicked: 0,
  total_replied: 0,
  total_bounces: 0,
  total_complaints: 0,
  delivery_rate: 0,
  open_rate: 0,
  click_rate: 0,
  reply_rate: 0,
  bounce_rate: 0,
  complaint_rate: 0,
};

export default function OutboundPage() {
  const [summary, setSummary] = useState<OutboundSummary>(emptySummary);
  const [channels, setChannels] = useState<ChannelSummary[]>([]);
  const [trend, setTrend] = useState<MonthlyTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch stats from API
      const statsRes = await fetch('/api/outbound/stats');
      const channelsRes = await fetch('/api/outbound/channels');

      if (!statsRes.ok || !channelsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const statsData = await statsRes.json();
      const channelsData = await channelsRes.json();

      // Calculate summary
      const totals = statsData.reduce(
        (acc: any, stat: any) => ({
          total_sent: acc.total_sent + (stat.emails_sent || 0),
          total_delivered: acc.total_delivered + (stat.emails_delivered || 0),
          total_opened: acc.total_opened + (stat.emails_opened || 0),
          total_clicked: acc.total_clicked + (stat.emails_clicked || 0),
          total_replied: acc.total_replied + (stat.emails_replied || 0),
          total_bounces: acc.total_bounces + (stat.hard_bounces || 0),
          total_complaints: acc.total_complaints + (stat.complaints || 0),
        }),
        {
          total_sent: 0,
          total_delivered: 0,
          total_opened: 0,
          total_clicked: 0,
          total_replied: 0,
          total_bounces: 0,
          total_complaints: 0,
        }
      );

      setSummary({
        ...totals,
        delivery_rate:
          totals.total_sent > 0
            ? (totals.total_delivered / totals.total_sent) * 100
            : 0,
        open_rate:
          totals.total_delivered > 0
            ? (totals.total_opened / totals.total_delivered) * 100
            : 0,
        click_rate:
          totals.total_opened > 0
            ? (totals.total_clicked / totals.total_opened) * 100
            : 0,
        reply_rate:
          totals.total_delivered > 0
            ? (totals.total_replied / totals.total_delivered) * 100
            : 0,
        bounce_rate:
          totals.total_sent > 0
            ? (totals.total_bounces / totals.total_sent) * 100
            : 0,
        complaint_rate:
          totals.total_sent > 0
            ? (totals.total_complaints / totals.total_sent) * 100
            : 0,
      });

      // Calculate channel summaries
      const channelSummaries: ChannelSummary[] = channelsData.map(
        (channel: any) => {
          const channelStats = statsData.filter(
            (s: any) => s.channel_id === channel.id
          );
          const channelTotals = channelStats.reduce(
            (acc: any, stat: any) => ({
              total_sent: acc.total_sent + (stat.emails_sent || 0),
              total_delivered: acc.total_delivered + (stat.emails_delivered || 0),
              total_opened: acc.total_opened + (stat.emails_opened || 0),
            }),
            { total_sent: 0, total_delivered: 0, total_opened: 0 }
          );

          return {
            channel,
            ...channelTotals,
            delivery_rate:
              channelTotals.total_sent > 0
                ? (channelTotals.total_delivered / channelTotals.total_sent) * 100
                : 0,
            open_rate:
              channelTotals.total_delivered > 0
                ? (channelTotals.total_opened / channelTotals.total_delivered) *
                  100
                : 0,
          };
        }
      );
      setChannels(channelSummaries);

      // Calculate monthly trend
      const monthlyMap = new Map<string, MonthlyTrend>();
      statsData.forEach((stat: any) => {
        const month = stat.period_month;
        const existing = monthlyMap.get(month);

        if (existing) {
          existing.total_sent += stat.emails_sent || 0;
          existing.total_delivered += stat.emails_delivered || 0;
          existing.total_opened += stat.emails_opened || 0;
        } else {
          const date = new Date(month);
          monthlyMap.set(month, {
            month,
            label: date.toLocaleDateString('en-US', {
              month: 'short',
              year: '2-digit',
            }),
            total_sent: stat.emails_sent || 0,
            total_delivered: stat.emails_delivered || 0,
            total_opened: stat.emails_opened || 0,
          });
        }
      });

      setTrend(
        Array.from(monthlyMap.values()).sort(
          (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
        )
      );
    } catch (err) {
      console.error('Error fetching outbound data:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load data'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            <span className="ml-3 text-slate-400">Loading outbound data...</span>
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
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Outbound Performance
            </h1>
            <p className="text-slate-400">
              Email campaign metrics and channel analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchData}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/outbound/admin">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="bg-red-900/20 border-red-800 mb-8">
            <CardContent className="py-4">
              <p className="text-red-400">
                {error}. Make sure the database tables are set up in Supabase.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Hero Stats */}
        <div className="mb-8">
          <HeroStats summary={summary} />
        </div>

        {/* Volume Chart */}
        <div className="mb-8">
          <VolumeChart data={trend} />
        </div>

        {/* Channel Performance */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Channel Performance
          </h2>
          <ChannelCards channels={channels} />
        </div>

        {/* Empty State Help */}
        {summary.total_sent === 0 && !error && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="py-8 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                No Data Yet
              </h3>
              <p className="text-slate-400 mb-4">
                Start by adding your email statistics in the admin panel.
              </p>
              <Link href="/outbound/admin">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Go to Admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
