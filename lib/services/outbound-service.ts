import { createClient } from '@/lib/supabase/client';
import type {
  OutboundChannel,
  OutboundStats,
  OutboundStatsWithChannel,
  OutboundSummary,
  ChannelSummary,
  MonthlyTrend,
  StatsFormData,
} from '@/lib/types/outbound';

export async function getChannels(): Promise<OutboundChannel[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('outbound_channels')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching channels:', error);
    return [];
  }

  return data || [];
}

export async function getStats(
  channelId?: string,
  startDate?: string,
  endDate?: string
): Promise<OutboundStatsWithChannel[]> {
  const supabase = createClient();
  let query = supabase
    .from('outbound_stats')
    .select(`
      *,
      channel:outbound_channels(*)
    `)
    .order('period_month', { ascending: false });

  if (channelId) {
    query = query.eq('channel_id', channelId);
  }

  if (startDate) {
    query = query.gte('period_month', startDate);
  }

  if (endDate) {
    query = query.lte('period_month', endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching stats:', error);
    return [];
  }

  return data || [];
}

export async function getSummary(): Promise<OutboundSummary> {
  const stats = await getStats();

  const totals = stats.reduce(
    (acc, stat) => ({
      total_sent: acc.total_sent + stat.emails_sent,
      total_delivered: acc.total_delivered + stat.emails_delivered,
      total_opened: acc.total_opened + stat.emails_opened,
      total_clicked: acc.total_clicked + stat.emails_clicked,
      total_replied: acc.total_replied + stat.emails_replied,
      total_bounces: acc.total_bounces + stat.hard_bounces,
      total_complaints: acc.total_complaints + stat.complaints,
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

  return {
    ...totals,
    delivery_rate: totals.total_sent > 0 ? (totals.total_delivered / totals.total_sent) * 100 : 0,
    open_rate: totals.total_delivered > 0 ? (totals.total_opened / totals.total_delivered) * 100 : 0,
    click_rate: totals.total_opened > 0 ? (totals.total_clicked / totals.total_opened) * 100 : 0,
    reply_rate: totals.total_delivered > 0 ? (totals.total_replied / totals.total_delivered) * 100 : 0,
    bounce_rate: totals.total_sent > 0 ? (totals.total_bounces / totals.total_sent) * 100 : 0,
    complaint_rate: totals.total_sent > 0 ? (totals.total_complaints / totals.total_sent) * 100 : 0,
  };
}

export async function getChannelSummaries(): Promise<ChannelSummary[]> {
  const channels = await getChannels();
  const stats = await getStats();

  return channels.map((channel) => {
    const channelStats = stats.filter((s) => s.channel_id === channel.id);
    const totals = channelStats.reduce(
      (acc, stat) => ({
        total_sent: acc.total_sent + stat.emails_sent,
        total_delivered: acc.total_delivered + stat.emails_delivered,
        total_opened: acc.total_opened + stat.emails_opened,
      }),
      { total_sent: 0, total_delivered: 0, total_opened: 0 }
    );

    return {
      channel,
      ...totals,
      delivery_rate: totals.total_sent > 0 ? (totals.total_delivered / totals.total_sent) * 100 : 0,
      open_rate: totals.total_delivered > 0 ? (totals.total_opened / totals.total_delivered) * 100 : 0,
    };
  });
}

export async function getMonthlyTrend(): Promise<MonthlyTrend[]> {
  const stats = await getStats();
  const monthlyMap = new Map<string, MonthlyTrend>();

  stats.forEach((stat) => {
    const month = stat.period_month;
    const existing = monthlyMap.get(month);

    if (existing) {
      existing.total_sent += stat.emails_sent;
      existing.total_delivered += stat.emails_delivered;
      existing.total_opened += stat.emails_opened;
    } else {
      const date = new Date(month);
      monthlyMap.set(month, {
        month,
        label: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        total_sent: stat.emails_sent,
        total_delivered: stat.emails_delivered,
        total_opened: stat.emails_opened,
      });
    }
  });

  return Array.from(monthlyMap.values()).sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
  );
}

export async function upsertStats(data: StatsFormData): Promise<OutboundStats | null> {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from('outbound_stats')
    .select('id')
    .eq('channel_id', data.channel_id)
    .eq('period_month', data.period_month)
    .single();

  if (existing) {
    const { data: updated, error } = await supabase
      .from('outbound_stats')
      .update({
        emails_sent: data.emails_sent,
        emails_delivered: data.emails_delivered,
        emails_opened: data.emails_opened,
        emails_clicked: data.emails_clicked,
        emails_replied: data.emails_replied,
        hard_bounces: data.hard_bounces,
        complaints: data.complaints,
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating stats:', error);
      return null;
    }
    return updated;
  }

  const { data: inserted, error } = await supabase
    .from('outbound_stats')
    .insert({
      channel_id: data.channel_id,
      period_month: data.period_month,
      emails_sent: data.emails_sent,
      emails_delivered: data.emails_delivered,
      emails_opened: data.emails_opened,
      emails_clicked: data.emails_clicked,
      emails_replied: data.emails_replied,
      hard_bounces: data.hard_bounces,
      complaints: data.complaints,
    })
    .select()
    .single();

  if (error) {
    console.error('Error inserting stats:', error);
    return null;
  }
  return inserted;
}

export async function deleteStats(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('outbound_stats').delete().eq('id', id);

  if (error) {
    console.error('Error deleting stats:', error);
    return false;
  }

  return true;
}
