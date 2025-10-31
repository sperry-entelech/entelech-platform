'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getAllSkills } from '@/lib/services/skills-factory';
import { Search, Download, ExternalLink } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  description?: string;
  type: string;
  tags?: string[];
  createdAt: string;
  version: number;
  github?: {
    repositoryUrl: string;
    installCommand: string;
  };
}

export default function SkillsLibraryPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllSkills();
      setSkills(response.skills || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load skills');
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Skills Library</h1>
          <p className="text-sm text-slate-600 mt-1">Browse and manage your Claude skills</p>
        </div>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search skills by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4 text-sm text-slate-600">
          <span>Total Skills: <strong className="text-slate-900">{skills.length}</strong></span>
          <span>Showing: <strong className="text-slate-900">{filteredSkills.length}</strong></span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading skills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-800">{error}</p>
              <Button onClick={loadSkills} variant="outline" className="mt-4">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Skills Grid */}
        {!loading && !error && (
          <>
            {filteredSkills.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-slate-600">
                    {searchQuery ? 'No skills found matching your search.' : 'No skills available. Create your first skill in the Skills Factory.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                  <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <Badge variant="secondary">{skill.type}</Badge>
                      </div>
                      {skill.description && (
                        <CardDescription className="mt-2">
                          {skill.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {/* Tags */}
                      {skill.tags && skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skill.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* GitHub Info */}
                      {skill.github && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-md">
                          <p className="text-xs text-slate-600 mb-2">Published to GitHub</p>
                          <a
                            href={skill.github.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Repository
                          </a>
                          <p className="text-xs text-slate-500 mt-2 font-mono bg-white p-2 rounded">
                            {skill.github.installCommand}
                          </p>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="text-xs text-slate-500 space-y-1 mb-4">
                        <p>Version: {skill.version}</p>
                        <p>Created: {formatDate(skill.createdAt)}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            const url = `${process.env.NEXT_PUBLIC_SKILLS_FACTORY_URL}/skills/${skill.id}/download`;
                            window.open(url, '_blank');
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        {skill.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(skill.github!.installCommand);
                            }}
                          >
                            Copy Install
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

