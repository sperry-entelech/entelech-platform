'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, Eye, AlertTriangle } from 'lucide-react';
import type { OutboundSummary } from '@/lib/types/outbound';

interface HeroStatsProps {
  summary: OutboundSummary;
}

export function HeroStats({ summary }: HeroStatsProps) {
  const stats = [
    {
      label: 'Emails Sent',
      value: summary.total_sent.toLocaleString(),
      subtext: 'YTD 2025',
      icon: Mail,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Delivery Rate',
      value: `${summary.delivery_rate.toFixed(2)}%`,
      subtext: `${summary.total_delivered.toLocaleString()} delivered`,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Open Rate',
      value: `${summary.open_rate.toFixed(1)}%`,
      subtext: `${summary.total_opened.toLocaleString()} opened`,
      icon: Eye,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Bounce Rate',
      value: `${summary.bounce_rate.toFixed(2)}%`,
      subtext: `${summary.total_bounces.toLocaleString()} bounced`,
      icon: AlertTriangle,
      color: summary.bounce_rate < 2 ? 'text-green-400' : 'text-yellow-400',
      bgColor: summary.bounce_rate < 2 ? 'bg-green-500/10' : 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-sm text-slate-500 mt-1">{stat.subtext}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
