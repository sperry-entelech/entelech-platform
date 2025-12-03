'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import type { MonthlyTrend } from '@/lib/types/outbound';

interface VolumeChartProps {
  data: MonthlyTrend[];
}

export function VolumeChart({ data }: VolumeChartProps) {
  if (data.length === 0) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Monthly Volume Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available. Add stats to see the trend.
          </div>
        </CardContent>
      </Card>
    );
  }

  // Find the max value for scaling
  const maxSent = Math.max(...data.map((d) => d.total_sent));

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Monthly Volume Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end gap-2">
          {data.map((month, index) => {
            const height = maxSent > 0 ? (month.total_sent / maxSent) * 100 : 0;
            const isHighest = month.total_sent === maxSent;

            return (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Value label */}
                <span className="text-xs text-slate-400 font-medium">
                  {(month.total_sent / 1000).toFixed(0)}k
                </span>

                {/* Bar */}
                <div className="w-full flex flex-col items-center relative">
                  <div
                    className={`w-full rounded-t transition-all duration-500 ${
                      isHighest
                        ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                        : 'bg-gradient-to-t from-slate-700 to-slate-600'
                    }`}
                    style={{
                      height: `${Math.max(height * 1.8, 8)}px`,
                      minHeight: '8px',
                    }}
                  />
                  {isHighest && (
                    <div className="absolute -top-6 text-xs text-blue-400 font-semibold">
                      Peak
                    </div>
                  )}
                </div>

                {/* Month label */}
                <span className="text-xs text-slate-500 mt-1">
                  {month.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-slate-400">Peak Month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-600" />
              <span className="text-slate-400">Other Months</span>
            </div>
          </div>
          <div className="text-slate-500">
            Total:{' '}
            <span className="text-white font-semibold">
              {data.reduce((sum, d) => sum + d.total_sent, 0).toLocaleString()}
            </span>{' '}
            emails
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
