'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Users,
  Building2,
  FolderKanban,
  Settings,
  Activity,
  Link2,
  TrendingUp,
  GitBranch,
  Mail,
  Search,
  ArrowRight,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  keywords?: string[];
}

const commands: CommandItem[] = [
  // Core
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, category: 'Core', keywords: ['home', 'main'] },
  { id: 'projects', label: 'Projects', href: '/projects', icon: FolderKanban, category: 'Core', keywords: ['work', 'tasks'] },

  // Operations
  { id: 'systems', label: 'Systems Hub', href: '/systems', icon: Building2, category: 'Operations', keywords: ['business', 'hub'] },
  { id: 'campaigns', label: 'Campaigns', href: '/campaigns', icon: TrendingUp, category: 'Operations', keywords: ['marketing', 'growth'] },
  { id: 'outbound', label: 'Outbound', href: '/outbound', icon: Mail, category: 'Operations', keywords: ['email', 'cold', 'prospect'] },
  { id: 'clients', label: 'Clients', href: '/clients', icon: Users, category: 'Operations', keywords: ['customers', 'accounts'] },

  // Tools
  { id: 'tools', label: 'Tools', href: '/tools', icon: Settings, category: 'Tools', keywords: ['proposal', 'sow', 'generator'] },
  { id: 'context', label: 'Temporal Intelligence', href: '/context', icon: GitBranch, category: 'Tools', keywords: ['version', 'history', 'context'] },
  { id: 'integrations', label: 'Integrations', href: '/integrations', icon: Link2, category: 'Tools', keywords: ['connect', 'api'] },

  // Resources
  { id: 'skills', label: 'Skills Library', href: '/skills', icon: BookOpen, category: 'Resources', keywords: ['learn', 'docs'] },
  { id: 'prompts', label: 'Cursor Prompts', href: '/cursor-prompts', icon: Sparkles, category: 'Resources', keywords: ['ai', 'templates'] },
  { id: 'logs', label: 'Activity Logs', href: '/logs', icon: Activity, category: 'Resources', keywords: ['history', 'audit'] },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.category.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some((k) => k.includes(searchLower))
    );
  });

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const handleSelect = useCallback((href: string) => {
    setOpen(false);
    setSearch('');
    router.push(href);
  }, [router]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredCommands[selectedIndex].href);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, filteredCommands, selectedIndex, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-slate-300 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-slate-700 rounded text-slate-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 max-w-xl bg-slate-900 border-slate-700">
          <div className="flex items-center border-b border-slate-700 px-4">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages..."
              className="flex-1 bg-transparent px-3 py-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs bg-slate-800 rounded text-slate-500 border border-slate-700">
              ESC
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {Object.entries(groupedCommands).length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-500">
                No results found.
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((cmd) => {
                    const Icon = cmd.icon;
                    const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd.href)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span className="flex-1 text-left">{cmd.label}</span>
                        {isSelected && <ArrowRight className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-700 px-4 py-2 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↵</kbd>
                select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">esc</kbd>
              close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
