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

  const maxSent = Math.max(...data.map((d) => d.total_sent));
  const totalEmails = data.reduce((sum, d) => sum + d.total_sent, 0);

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Monthly Send Volume
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{totalEmails.toLocaleString()}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Total Emails</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-slate-500 pr-2">
            <span className="text-right">{(maxSent / 1000).toFixed(0)}k</span>
            <span className="text-right">{(maxSent / 2000).toFixed(0)}k</span>
            <span className="text-right">0</span>
          </div>

          {/* Chart area */}
          <div className="ml-14">
            {/* Grid lines */}
            <div className="absolute left-14 right-0 top-0 h-[180px] flex flex-col justify-between pointer-events-none">
              <div className="border-t border-slate-800/50" />
              <div className="border-t border-slate-800/50" />
              <div className="border-t border-slate-800/50" />
            </div>

            {/* Bars */}
            <div className="h-[180px] flex items-end gap-3 relative">
              {data.map((month) => {
                const height = maxSent > 0 ? (month.total_sent / maxSent) * 100 : 0;
                const isHighest = month.total_sent === maxSent;

                return (
                  <div
                    key={month.month}
                    className="flex-1 flex flex-col items-center group"
                  >
                    {/* Bar container */}
                    <div className="w-full h-full flex flex-col justify-end items-center relative">
                      {/* Hover tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap z-10 shadow-lg">
                        {month.total_sent.toLocaleString()} emails
                      </div>

                      {/* Bar */}
                      <div
                        className={`w-full max-w-[60px] rounded-t-sm transition-all duration-300 ${
                          isHighest
                            ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex gap-3 mt-3 border-t border-slate-800 pt-3">
              {data.map((month) => {
                const isHighest = month.total_sent === maxSent;
                return (
                  <div key={month.month} className="flex-1 text-center">
                    <span className={`text-xs font-medium ${isHighest ? 'text-blue-400' : 'text-slate-500'}`}>
                      {month.label}
                    </span>
                    {isHighest && (
                      <div className="text-[10px] text-blue-400/70 mt-0.5">PEAK</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
