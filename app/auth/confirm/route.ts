// Alternative confirmation route - redirects to callback handler
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  
  // Redirect to the callback route with the same parameters
  const callbackUrl = new URL('/auth/callback', requestUrl.origin);
  if (token_hash) callbackUrl.searchParams.set('token_hash', token_hash);
  if (type) callbackUrl.searchParams.set('type', type);
  
  return NextResponse.redirect(callbackUrl.toString());
}

