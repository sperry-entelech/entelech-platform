'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'John Smith',
      company: 'Acme Marketing',
      email: 'john@acme.com',
      industry: 'Marketing Agency',
      currentRevenue: 2500000,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'TechCorp Agency',
      email: 'sarah@techcorp.com',
      industry: 'Tech Consulting',
      currentRevenue: 4500000,
    },
  ]);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    primaryPain: '',
    goals: '',
  });

  const handleAddClient = () => {
    const client = {
      id: Date.now().toString(),
      ...newClient,
      currentRevenue: 0,
    };
    setClients([...clients, client]);
    setNewClient({ name: '', email: '', company: '', industry: '', primaryPain: '', goals: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your client relationships</p>
        </div>
        {/* Add Client Dialog */}
        <div className="mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button>+ Add New Client</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                />
                <Input
                  placeholder="Company"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                />
                <Input
                  placeholder="Industry"
                  value={newClient.industry}
                  onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                />
                <Textarea
                  placeholder="Primary Pain Point"
                  value={newClient.primaryPain}
                  onChange={(e) => setNewClient({ ...newClient, primaryPain: e.target.value })}
                />
                <Textarea
                  placeholder="Goals"
                  value={newClient.goals}
                  onChange={(e) => setNewClient({ ...newClient, goals: e.target.value })}
                />
                <Button onClick={handleAddClient} className="w-full">
                  Add Client
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{client.company}</CardTitle>
                <p className="text-sm text-slate-600">{client.industry}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Contact:</strong> {client.name}</p>
                  <p><strong>Email:</strong> {client.email}</p>
                  <p><strong>Revenue:</strong> ${client.currentRevenue.toLocaleString()}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <Link href={`/clients/${client.id}`} className="block">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/engagements/new?clientId=${client.id}`} className="block">
                    <Button className="w-full">
                      Start Engagement
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No clients yet</p>
            <Button>Add Your First Client</Button>
          </div>
        )}
      </main>
    </div>
  );
}
