'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Users,
  Zap,
  Building2,
  FolderKanban,
  FileText,
  Settings,
} from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const corePlatformItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/skills', label: 'Skills Library', icon: BookOpen },
    { href: '/cursor-prompts', label: 'Cursor Prompts', icon: Sparkles },
  ];

  const businessSystemsItems = [
    { href: '/systems', label: 'Systems Hub', icon: Building2 },
    { href: '/systems/marketing', label: 'Marketing', icon: FileText },
    { href: '/systems/sales', label: 'Sales Intelligence', icon: FileText },
    { href: '/systems/service-delivery', label: 'Service Delivery', icon: FileText },
    { href: '/systems/multi-agent', label: 'Multi-Agent System', icon: FileText },
    { href: '/systems/client-success', label: 'Client Success', icon: FileText },
  ];

  const projectsItems = [
    { href: '/projects', label: 'All Projects', icon: FolderKanban },
    { href: '/projects?category=client-project', label: 'Client Projects', icon: Users },
    { href: '/projects?category=tool', label: 'Tools', icon: Settings },
  ];

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/systems', label: 'Systems', icon: Building2 },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/skills', label: 'Skills', icon: BookOpen },
    { href: '/cursor-prompts', label: 'Prompts', icon: Sparkles },
    { href: '/clients', label: 'Clients', icon: Users },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">Entelech Platform</span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
