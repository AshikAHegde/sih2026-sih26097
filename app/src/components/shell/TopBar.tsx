import React from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import { Role } from '@/types';
import { RotateCcw, BookOpen, User, Users, ShieldAlert, Building2 } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { state, setRole, setStoryMode, resetDemo } = useAppStore();

  const roleTabs: { role: Role; label: string; icon: React.ReactNode }[] = [
    { role: 'beneficiary', label: 'Beneficiary (Voice)', icon: <User className="w-3.5 h-3.5" /> },
    { role: 'helper', label: 'Local Helper', icon: <Users className="w-3.5 h-3.5" /> },
    { role: 'officer', label: 'District Officer', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { role: 'provider', label: 'Provider Desk', icon: <Building2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="bg-surface border-b border-rule sticky top-0 z-40 select-none">
      {/* Honest Provenance Banner */}
      <div className="bg-amber-100/80 border-b border-amber-200 text-amber-900 px-4 py-1 text-2xs flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-marigold animate-pulse" />
          <span className="font-semibold tracking-wide">SIMULATED DISTRICT PROTOTYPE</span>
          <span className="text-amber-700">|</span>
          <span>100% Synthetic Demographics (~600 beneficiaries) · NQR Official Standards Only</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-700">Data Date: <strong className="tabular-nums">Oct 2, 2026</strong></span>
          <span className="bg-amber-200/70 text-amber-800 px-1.5 py-0.5 rounded text-[10px]">Strict Rule-Based · Zero LLM Logic</span>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-console mx-auto px-4 h-12 flex items-center justify-between">
        {/* District & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-ink text-base tracking-tight">Hunar Line</span>
            <span className="text-xs text-ink-soft">/ Livelihood Evidence Loop</span>
          </div>
          <span className="text-rule text-sm">|</span>
          <div className="flex items-center gap-1.5 bg-paper px-2 py-0.5 rounded border border-rule text-xs">
            <span className="text-ink-soft">District:</span>
            <strong className="text-ink font-medium">Chandauli</strong>
            <span className="text-[10px] text-marigold bg-amber-50 px-1 rounded border border-amber-200 uppercase font-mono">Simulated</span>
          </div>
        </div>

        {/* Center: Role Switcher */}
        <nav className="flex items-center bg-paper p-0.5 rounded-lg border border-rule" aria-label="Role Switcher">
          {roleTabs.map(({ role, label, icon }) => {
            const isActive = state.currentRole === role;
            return (
              <button
                key={role}
                onClick={() => setRole(role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-surface text-indigo shadow-sm font-semibold border border-rule/50'
                    : 'text-ink-soft hover:text-ink hover:bg-surface/50'
                }`}
                title={`Switch to ${label}`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Story Mode & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStoryMode(!state.storyMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
              state.storyMode
                ? 'bg-indigo text-white border-indigo hover:bg-indigo/90'
                : 'bg-paper text-ink-soft border-rule hover:bg-surface'
            }`}
            title="Toggle Presenter 12-Beat Story Mode"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Story Mode</span>
            {state.storyMode && (
              <span className="bg-white/20 text-white px-1 rounded text-[10px] tabular-nums">
                {state.storyBeat}/12
              </span>
            )}
          </button>

          <button
            onClick={resetDemo}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-soft hover:text-ink bg-paper hover:bg-surface border border-rule transition-colors"
            title="Reset prototype state to initial demo seed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
