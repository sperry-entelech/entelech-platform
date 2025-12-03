export interface OutboundChannel {
  id: string;
  name: string;
  description?: string;
  color: string;
  is_active: boolean;
  created_at?: string;
}

export interface OutboundStats {
  id: string;
  channel_id: string;
  period_month: string;
  emails_sent: number;
  emails_delivered: number;
  emails_opened: number;
  emails_clicked: number;
  emails_replied: number;
  hard_bounces: number;
  complaints: number;
  created_at?: string;
}

export interface OutboundStatsWithChannel extends OutboundStats {
  channel?: OutboundChannel;
}

export interface OutboundSummary {
  total_sent: number;
  total_delivered: number;
  total_opened: number;
  total_clicked: number;
  total_replied: number;
  total_bounces: number;
  total_complaints: number;
  delivery_rate: number;
  open_rate: number;
  click_rate: number;
  reply_rate: number;
  bounce_rate: number;
  complaint_rate: number;
}

export interface ChannelSummary {
  channel: OutboundChannel;
  total_sent: number;
  total_delivered: number;
  total_opened: number;
  delivery_rate: number;
  open_rate: number;
}

export interface MonthlyTrend {
  month: string;
  label: string;
  total_sent: number;
  total_delivered: number;
  total_opened: number;
}

export interface StatsFormData {
  channel_id: string;
  period_month: string;
  emails_sent: number;
  emails_delivered: number;
  emails_opened: number;
  emails_clicked: number;
  emails_replied: number;
  hard_bounces: number;
  complaints: number;
}
