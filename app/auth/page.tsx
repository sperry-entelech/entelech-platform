'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const router = useRouter();

  // Note: We can't check env vars directly in the browser, but we'll catch errors when trying to use Supabase

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        await signup(email, password, name);
        // Supabase sends confirmation email - show message
        setError('Check your email to confirm your account!');
        setTimeout(() => {
          setIsSignup(false);
          setError('');
        }, 3000);
      } else {
        await login(email, password);
        router.push('/context');
      }
    } catch (err: any) {
      let errorMessage = err.message || 'Authentication failed';
      
      // Provide helpful error messages for common issues
      if (errorMessage.includes('Supabase client not initialized') || 
          errorMessage.includes('Supabase configuration missing')) {
        errorMessage = 'Supabase is not configured. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in Vercel environment variables and redeploy.';
      } else if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (errorMessage.includes('User already registered')) {
        errorMessage = 'An account with this email already exists. Please log in instead.';
      } else if (errorMessage.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and click the confirmation link before logging in.';
      }
      
      setError(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>{isSignup ? 'Sign Up' : 'Log In'}</CardTitle>
          <CardDescription>
            {isSignup ? 'Create an account' : 'Access your Entelech Platform'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900 border-slate-700"
              />
            </div>
            {error && (
              <div className={`text-sm p-3 rounded ${error.includes('Check your email') ? 'bg-green-900/50 text-green-200 border border-green-700' : 'text-red-400 bg-red-900/50 border border-red-700'}`}>
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignup(!isSignup)}
              className="w-full text-slate-400"
            >
              {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

