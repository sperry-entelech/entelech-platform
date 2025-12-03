'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, Eye, Star } from 'lucide-react';
import type { ChannelSummary } from '@/lib/types/outbound';

interface ChannelCardProps {
  data: ChannelSummary;
  isBestEngagement?: boolean;
  isHighestVolume?: boolean;
}

export function ChannelCard({
  data,
  isBestEngagement,
  isHighestVolume,
}: ChannelCardProps) {
  return (
    <Card
      className={`bg-slate-900 border-slate-800 transition-all hover:border-slate-700 ${
        isBestEngagement ? 'ring-2 ring-green-500/50' : ''
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.channel.color }}
            />
            {data.channel.name}
          </CardTitle>
          <div className="flex gap-2">
            {isBestEngagement && (
              <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                <Star className="h-3 w-3 mr-1" />
                Best Engagement
              </Badge>
            )}
            {isHighestVolume && (
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                Highest Volume
              </Badge>
            )}
          </div>
        </div>
        {data.channel.description && (
          <p className="text-sm text-slate-500">{data.channel.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sent */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Sent</span>
            </div>
            <span className="text-lg font-semibold text-white">
              {data.total_sent.toLocaleString()}
            </span>
          </div>

          {/* Delivery Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Delivery</span>
            </div>
            <span
              className={`text-lg font-semibold ${
                data.delivery_rate >= 95
                  ? 'text-green-400'
                  : data.delivery_rate >= 90
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {data.delivery_rate.toFixed(1)}%
            </span>
          </div>

          {/* Open Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Opens</span>
            </div>
            <span
              className={`text-lg font-semibold ${
                data.open_rate >= 40
                  ? 'text-green-400'
                  : data.open_rate >= 20
                  ? 'text-blue-400'
                  : 'text-slate-400'
              }`}
            >
              {data.open_rate.toFixed(1)}%
            </span>
          </div>

          {/* Progress bar for open rate */}
          <div className="pt-2">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  data.open_rate >= 40
                    ? 'bg-green-500'
                    : data.open_rate >= 20
                    ? 'bg-blue-500'
                    : 'bg-slate-600'
                }`}
                style={{ width: `${Math.min(data.open_rate, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ChannelCardsProps {
  channels: ChannelSummary[];
}

export function ChannelCards({ channels }: ChannelCardsProps) {
  if (channels.length === 0) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="py-12 text-center">
          <p className="text-slate-500">No channels found. Add channels in Supabase.</p>
        </CardContent>
      </Card>
    );
  }

  // Find best engagement (highest open rate) and highest volume
  const bestEngagement = channels.reduce((best, ch) =>
    ch.open_rate > best.open_rate ? ch : best
  );
  const highestVolume = channels.reduce((best, ch) =>
    ch.total_sent > best.total_sent ? ch : best
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {channels.map((channel) => (
        <ChannelCard
          key={channel.channel.id}
          data={channel}
          isBestEngagement={
            channel.channel.id === bestEngagement.channel.id &&
            bestEngagement.open_rate > 0
          }
          isHighestVolume={
            channel.channel.id === highestVolume.channel.id &&
            highestVolume.total_sent > 0 &&
            channel.channel.id !== bestEngagement.channel.id
          }
        />
      ))}
    </div>
  );
}
