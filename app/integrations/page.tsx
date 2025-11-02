'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Settings, CheckCircle2, XCircle, ExternalLink, Database, Link2, Zap } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'configuring';
  category: 'crm' | 'automation' | 'analytics' | 'storage';
  config?: {
    [key: string]: string;
  };
}

const integrations: Integration[] = [
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Use Google Sheets as your temporary CRM and data storage',
    icon: Database,
    status: 'disconnected',
    category: 'crm',
  },
  {
    id: 'n8n',
    name: 'n8n Workflows',
    description: 'Connect to n8n for workflow automation (coming soon)',
    icon: Zap,
    status: 'disconnected',
    category: 'automation',
  },
  {
    id: 'logging',
    name: 'Platform Logging',
    description: 'Track and monitor all platform activity and events',
    icon: Link2,
    status: 'connected',
    category: 'analytics',
  },
];

export default function IntegrationsPage() {
  const [integrationsState, setIntegrationsState] = useState<Integration[]>(integrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, string>>({});

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigValues(integration.config || {});
  };

  const handleSaveConfig = async (integrationId: string) => {
    try {
      // Save configuration
      const response = await fetch('/api/integrations/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          integrationId,
          config: configValues,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      // Update integration status
      setIntegrationsState((prev) =>
        prev.map((int) =>
          int.id === integrationId
            ? { ...int, status: 'connected' as const, config: configValues }
            : int
        )
      );

      alert('Configuration saved successfully!');
    } catch (error: any) {
      console.error('Error saving configuration:', error);
      alert('Failed to save configuration: ' + error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-600 text-white">Connected</Badge>;
      case 'configuring':
        return <Badge className="bg-yellow-600 text-white">Configuring</Badge>;
      default:
        return <Badge className="bg-slate-700 text-slate-300">Disconnected</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
          <p className="text-slate-400">
            Connect external services and automate workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationsState.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-blue-400" />
                      <CardTitle className="text-white">{integration.name}</CardTitle>
                    </div>
                    {getStatusBadge(integration.status)}
                  </div>
                  <CardDescription className="text-slate-400">{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => handleConfigure(integration)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-800 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-white">Configure {integration.name}</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          {integration.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        {integration.id === 'google-sheets' && (
                          <>
                            <div>
                              <Label htmlFor="spreadsheet-id" className="text-slate-300">
                                Spreadsheet ID
                              </Label>
                              <Input
                                id="spreadsheet-id"
                                value={configValues.spreadsheetId || ''}
                                onChange={(e) =>
                                  setConfigValues({ ...configValues, spreadsheetId: e.target.value })
                                }
                                className="bg-slate-800 border-slate-700 text-white mt-1"
                                placeholder="Enter Google Sheets ID from URL"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                Found in the Sheets URL: docs.google.com/spreadsheets/d/[ID]/edit
                              </p>
                            </div>
                            <div>
                              <Label htmlFor="sheet-name" className="text-slate-300">
                                Sheet Name
                              </Label>
                              <Input
                                id="sheet-name"
                                value={configValues.sheetName || 'Sheet1'}
                                onChange={(e) =>
                                  setConfigValues({ ...configValues, sheetName: e.target.value })
                                }
                                className="bg-slate-800 border-slate-700 text-white mt-1"
                                placeholder="Sheet1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="api-key" className="text-slate-300">
                                API Key (Optional)
                              </Label>
                              <Input
                                id="api-key"
                                type="password"
                                value={configValues.apiKey || ''}
                                onChange={(e) =>
                                  setConfigValues({ ...configValues, apiKey: e.target.value })
                                }
                                className="bg-slate-800 border-slate-700 text-white mt-1"
                                placeholder="Google Sheets API Key"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                For public sheets, API key is optional
                              </p>
                            </div>
                          </>
                        )}
                        {integration.id === 'n8n' && (
                          <div className="bg-slate-800 rounded-md p-4 text-slate-400">
                            <p className="text-sm">
                              n8n integration coming soon. This will allow you to trigger workflows from the platform and receive webhooks.
                            </p>
                          </div>
                        )}
                        {integration.id === 'logging' && (
                          <div className="bg-slate-800 rounded-md p-4">
                            <p className="text-sm text-slate-300 mb-2">
                              Platform logging is automatically enabled and tracks:
                            </p>
                            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                              <li>All audit requests</li>
                              <li>Proposal and SOW generation</li>
                              <li>Client interactions</li>
                              <li>System events</li>
                              <li>Integration activity</li>
                            </ul>
                          </div>
                        )}
                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={() => handleSaveConfig(integration.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            Save Configuration
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links */}
        <Card className="mt-8 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Integration Guide</CardTitle>
            <CardDescription className="text-slate-400">
              Learn how to set up and use integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Google Sheets Setup</h4>
                <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                  <li>Create a new Google Sheet</li>
                  <li>Copy the Spreadsheet ID from the URL</li>
                  <li>Share sheet publicly or use API key</li>
                  <li>Configure in platform</li>
                </ol>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Coming Soon</h4>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                  <li>n8n workflow triggers</li>
                  <li>Webhook endpoints</li>
                  <li>Multi-platform posting</li>
                  <li>Advanced automation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

