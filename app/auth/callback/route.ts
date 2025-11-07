import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');

  console.log('[Auth Callback] Received:', { code: !!code, token_hash: !!token_hash, type });

  if (code) {
    // Handle OAuth callback (code exchange) - new PKCE flow
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('[Auth Callback] Error exchanging code for session:', error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth?error=${encodeURIComponent(error.message)}`
        );
      }
      
      console.log('[Auth Callback] Code exchange successful, redirecting to /context');
      return NextResponse.redirect(`${requestUrl.origin}/context`);
    } catch (err: any) {
      console.error('[Auth Callback] Exception during code exchange:', err);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth?error=${encodeURIComponent(err.message || 'Authentication failed')}`
      );
    }
  }

  if (token_hash && type) {
    // Handle email confirmation (token verification) - legacy flow
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as 'email',
      });

      if (error) {
        console.error('[Auth Callback] Error verifying token:', error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth?error=${encodeURIComponent(error.message)}`
        );
      }

      console.log('[Auth Callback] Token verified successfully');
      // Success - redirect to login page with confirmation message
      return NextResponse.redirect(`${requestUrl.origin}/auth?confirmed=true`);
    } catch (err: any) {
      console.error('[Auth Callback] Exception during token verification:', err);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth?error=${encodeURIComponent(err.message || 'Verification failed')}`
      );
    }
  }

  // If no code or token_hash, log and redirect to auth page
  console.warn('[Auth Callback] No code or token_hash found, redirecting to /auth');
  return NextResponse.redirect(`${requestUrl.origin}/auth`);
}

