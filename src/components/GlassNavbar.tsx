import React from 'react';
import { Sparkles, Layers, Box, Users, DollarSign, ShieldCheck, Menu, X } from 'lucide-react';

interface GlassNavbarProps {
  activeTab: string;
  setActiveTab: (tab: 'landing' | 'profiling' | 'studio' | 'vote' | 'pricing' | 'dashboard') => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function GlassNavbar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }: GlassNavbarProps) {
  const navItems = [
    { id: 'landing', label: 'صفحه اصلی', icon: Sparkles },
    { id: 'profiling', label: 'پرسشنامه و CAD', icon: Layers },
    { id: 'studio', label: 'موتور AI', icon: Box },
    { id: 'vote', label: 'اتاق تصمیم‌گیری', icon: Users },
    { id: 'pricing', label: 'تعرفه‌ها', icon: DollarSign },
    { id: 'dashboard', label: 'داشبورد پروژه‌ها', icon: ShieldCheck },
  ] as const;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#1E2229]/95 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Right aligned in Persian RTL */}
        <div 
          role="button"
          tabIndex={0}
          onClick={() => setActiveTab('landing')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab('landing'); } }}
          className="flex items-center gap-3 cursor-pointer group text-start shrink-0 focus:outline-none focus:ring-2 focus:ring-[#E0A96D] rounded-xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#E0A96D] to-[#f3cb9b] flex items-center justify-center text-[#1E2229] shadow-xl group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black text-white tracking-wide block">آرک‌فلو <span className="text-[#E0A96D] text-xs font-medium">Archflow</span></span>
            <span className="text-[10px] text-neutral-200 font-medium tracking-wider">هوش مصنوعی معماری</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E0A96D] ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#E0A96D] to-[#d4995c] text-[#1E2229] font-bold shadow-lg shadow-[#E0A96D]/20' 
                    : 'text-neutral-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1E2229]' : 'text-[#E0A96D]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setActiveTab('studio')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 transition-all hover:border-[#E0A96D]/50 focus:outline-none focus:ring-2 focus:ring-[#E0A96D]"
          >
            شروع رندرینگ
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E0A96D]"
          aria-label="منوی ناوبری"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 start-0 end-0 bg-[#1E2229]/98 border-b border-white/10 p-4 shadow-2xl backdrop-blur-2xl animate-fade-in flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#E0A96D] to-[#d4995c] text-[#1E2229] font-bold shadow-md' 
                    : 'text-neutral-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#1E2229]' : 'text-[#E0A96D]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
