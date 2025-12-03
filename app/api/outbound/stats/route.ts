import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const searchParams = request.nextUrl.searchParams;
    const channelId = searchParams.get('channel_id');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Stats GET API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();

    const {
      channel_id,
      period_month,
      emails_sent,
      emails_delivered,
      emails_opened,
      emails_clicked,
      emails_replied,
      hard_bounces,
      complaints,
    } = body;

    if (!channel_id || !period_month) {
      return NextResponse.json(
        { error: 'channel_id and period_month are required' },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('outbound_stats')
      .select('id')
      .eq('channel_id', channel_id)
      .eq('period_month', period_month)
      .single();

    let result;

    if (existing) {
      const { data, error } = await supabase
        .from('outbound_stats')
        .update({
          emails_sent: emails_sent || 0,
          emails_delivered: emails_delivered || 0,
          emails_opened: emails_opened || 0,
          emails_clicked: emails_clicked || 0,
          emails_replied: emails_replied || 0,
          hard_bounces: hard_bounces || 0,
          complaints: complaints || 0,
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating stats:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    } else {
      const { data, error } = await supabase
        .from('outbound_stats')
        .insert({
          channel_id,
          period_month,
          emails_sent: emails_sent || 0,
          emails_delivered: emails_delivered || 0,
          emails_opened: emails_opened || 0,
          emails_clicked: emails_clicked || 0,
          emails_replied: emails_replied || 0,
          hard_bounces: hard_bounces || 0,
          complaints: complaints || 0,
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting stats:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Stats POST API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
