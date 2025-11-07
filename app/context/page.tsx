'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  createCommit,
  getCurrentContext,
  getClaudeContext,
  getContextHistory,
  type ContextChange,
} from '@/lib/services/context-version-control';
import { useAuth } from '@/lib/contexts/auth-context';
import { GitBranch, History, Copy, Plus, Save, RefreshCw } from 'lucide-react';

export default function ContextVersionControlPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [userId, setUserId] = useState<string>('');
  const [currentContext, setCurrentContext] = useState<any>(null);
  const [claudeContext, setClaudeContext] = useState<string>('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Commit form state
  const [commitMessage, setCommitMessage] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [fieldType, setFieldType] = useState<'text' | 'json' | 'number' | 'array' | 'boolean' | 'date'>('text');
  const [showCommitForm, setShowCommitForm] = useState(false);

  // Get user ID from auth system
  useEffect(() => {
    if (!authLoading && user) {
      setUserId(user.id);
    } else if (!authLoading && !user) {
      setError('Please log in to access Context Version Control');
    }
  }, [user, authLoading]);

  const loadCurrentContext = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const context = await getCurrentContext(userId);
      setCurrentContext(context);
    } catch (err: any) {
      setError(err.message || 'Failed to load context');
      console.error('Error loading context:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadClaudeContext = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const context = await getClaudeContext(userId, 'markdown');
      setClaudeContext(context);
    } catch (err: any) {
      setError(err.message || 'Failed to load Claude context');
      console.error('Error loading Claude context:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadHistory = useCallback(async () => {
    if (!userId) return;
    try {
      const historyData = await getContextHistory(userId, 20);
      setHistory(historyData.versions || []);
    } catch (err: any) {
      console.error('Error loading history:', err);
    }
  }, [userId]);

  // Load context when userId is set
  useEffect(() => {
    if (userId) {
      loadCurrentContext();
      loadHistory();
    }
  }, [userId, loadCurrentContext, loadHistory]);

  const handleCommit = async () => {
    if (!userId || !commitMessage || !fieldName || !fieldValue) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let parsedValue: any = fieldValue;
      if (fieldType === 'json') {
        parsedValue = JSON.parse(fieldValue);
      } else if (fieldType === 'number') {
        parsedValue = Number(fieldValue);
      } else if (fieldType === 'boolean') {
        parsedValue = fieldValue === 'true';
      } else if (fieldType === 'array') {
        parsedValue = fieldValue.split(',').map(s => s.trim());
      }

      const changes: ContextChange[] = [{
        field_name: fieldName,
        field_value: parsedValue,
        field_type: fieldType,
        source: 'manual',
      }];

      await createCommit({
        user_id: userId,
        commit_message: commitMessage,
        changes,
        author: user?.email || (user?.user_metadata?.name as string) || 'user',
      });

      // Reset form
      setCommitMessage('');
      setFieldName('');
      setFieldValue('');
      setShowCommitForm(false);

      // Reload data
      await loadCurrentContext();
      await loadHistory();
    } catch (err: any) {
      setError(err.message || 'Failed to create commit');
      console.error('Error creating commit:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (authLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-white mb-4">Context Version Control</h1>
          <p className="text-slate-400 mb-6">Please log in to access your business context</p>
          <a href="/auth">
            <Button>Go to Login</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Context Version Control</h1>
          <p className="text-slate-400">Git for your business context - track changes over time</p>
        </div>
        <Button
          onClick={() => setShowCommitForm(!showCommitForm)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Commit
        </Button>
      </div>

      {user && (
        <div className="text-sm text-slate-400">
          Logged in as: <code className="bg-slate-800 px-2 py-1 rounded">{user.email || (user.user_metadata?.name as string) || userId}</code>
        </div>
      )}

      {authLoading && (
        <div className="text-slate-400 text-center py-4">Loading...</div>
      )}

      {!authLoading && !user && (
        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-200 px-4 py-3 rounded">
          Please <a href="/auth" className="underline">log in</a> to access Context Version Control
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showCommitForm && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Create New Commit</CardTitle>
            <CardDescription>Track a change to your business context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="commit-message">Commit Message *</Label>
              <Input
                id="commit-message"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="e.g., Updated ICP to focus on SMB manufacturers"
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="field-name">Field Name *</Label>
                <Input
                  id="field-name"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="e.g., icp, positioning, current_focus"
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="field-type">Field Type *</Label>
                <select
                  id="field-type"
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white"
                >
                  <option value="text">Text</option>
                  <option value="json">JSON</option>
                  <option value="number">Number</option>
                  <option value="array">Array</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="field-value">Field Value *</Label>
              <Textarea
                id="field-value"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                placeholder={fieldType === 'json' ? '{"key": "value"}' : fieldType === 'array' ? 'item1, item2, item3' : 'Enter value'}
                rows={fieldType === 'json' ? 6 : 3}
                className="bg-slate-900 border-slate-700 font-mono"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCommit} disabled={loading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {loading ? 'Creating...' : 'Create Commit'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCommitForm(false)}
                className="border-slate-700"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Current Context
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadCurrentContext}
                disabled={loading}
                className="text-slate-400 hover:text-white"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <CardDescription>Your current business state</CardDescription>
          </CardHeader>
          <CardContent>
            {currentContext ? (
              <div className="space-y-4">
                {currentContext.version && (
                  <div className="text-sm">
                    <div className="text-slate-400 mb-2">Version: {currentContext.version.hash?.substring(0, 7) || 'N/A'}</div>
                    <div className="text-slate-300">{currentContext.version.message}</div>
                  </div>
                )}
                {Object.keys(currentContext.state || {}).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(currentContext.state).map(([key, value]: [string, any]) => (
                      <div key={key} className="bg-slate-900 p-3 rounded border border-slate-700">
                        <div className="font-semibold text-white mb-1">{key}</div>
                        <div className="text-sm text-slate-400">
                          {typeof value.value === 'object' ? (
                            <pre className="text-xs">{JSON.stringify(value.value, null, 2)}</pre>
                          ) : (
                            String(value.value)
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {value.type} • {value.source} • {new Date(value.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-400 text-center py-8">
                    No context yet. Create your first commit!
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-400 text-center py-8">
                {loading ? 'Loading...' : 'Click refresh to load context'}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Claude Context</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadClaudeContext}
                  disabled={loading}
                  className="text-slate-400 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                {claudeContext && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(claudeContext)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>Formatted context for Claude conversations</CardDescription>
          </CardHeader>
          <CardContent>
            {claudeContext ? (
              <div className="bg-slate-900 p-4 rounded border border-slate-700">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                  {claudeContext}
                </pre>
              </div>
            ) : (
              <div className="text-slate-400 text-center py-8">
                {loading ? 'Generating...' : 'Click refresh to generate Claude context'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Version History
          </CardTitle>
          <CardDescription>All commits to your business context</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.map((version) => (
                <div
                  key={version.id}
                  className="bg-slate-900 p-4 rounded border border-slate-700 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-xs bg-slate-800 px-2 py-1 rounded text-blue-400">
                        {version.hash?.substring(0, 7) || 'N/A'}
                      </code>
                      {version.is_current && (
                        <Badge className="bg-green-600">Current</Badge>
                      )}
                      {version.tags && version.tags.length > 0 && (
                        <div className="flex gap-1">
                          {version.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="border-slate-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-white font-medium mb-1">{version.message}</div>
                    <div className="text-xs text-slate-400">
                      {version.author || 'system'} • {new Date(version.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 text-center py-8">
              No history yet. Create your first commit!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

