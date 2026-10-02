import React, { useState } from 'react';
import { useAppStore } from '@/lib/store/eventStore';
import { SEED_LOCATIONS } from '@/lib/seed/data';
import { ArrowLeft, User, MapPin, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HelperNewSession: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { appendEvent, setRole, setSunitaStep } = useAppStore();
  const [firstName, setFirstName] = useState('Sunita');
  const [initial, setInitial] = useState('D');
  const [clusterId, setClusterId] = useState('devgaon_cluster');
  const [language, setLanguage] = useState('hi');
  const [saved, setSaved] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    appendEvent('HELPER_START_NEW_SESSION', `${firstName}_${initial}`, {
      clusterId,
      language,
    });
    setSaved(true);
    setTimeout(() => {
      setRole('beneficiary');
      setSunitaStep('V1');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg border border-rule bg-surface text-ink hover:bg-paper"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-ink">H2: Helper New Session</h1>
          <p className="text-2xs text-ink-soft">Register new beneficiary for voice diagnosis</p>
        </div>
      </div>

      <form onSubmit={handleStart} className="bg-surface p-5 rounded-2xl border border-rule space-y-4 shadow-sm">
        {/* Strict Privacy Notice */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-2xs text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Strict Privacy Directive:</strong>
            Do NOT enter surnames, caste, religion, or exact addresses. Phone and WhatsApp entries are permanently disabled.
          </div>
        </div>

        {/* Name Fields (First Name & Initial Only) */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <label className="text-2xs font-bold text-ink uppercase tracking-wide block mb-1">
              First Name:
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-lg border border-rule bg-paper text-ink focus:outline-indigo"
              placeholder="e.g. Sunita"
            />
          </div>
          <div>
            <label className="text-2xs font-bold text-ink uppercase tracking-wide block mb-1">
              Initial:
            </label>
            <input
              type="text"
              maxLength={1}
              value={initial}
              onChange={(e) => setInitial(e.target.value.toUpperCase())}
              required
              className="w-full text-xs p-2.5 rounded-lg border border-rule bg-paper text-ink uppercase font-mono text-center focus:outline-indigo"
              placeholder="D"
            />
          </div>
        </div>

        {/* Cluster Selection */}
        <div>
          <label className="text-2xs font-bold text-ink uppercase tracking-wide block mb-1">
            Village Cluster:
          </label>
          <select
            value={clusterId}
            onChange={(e) => setClusterId(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-rule bg-paper text-ink focus:outline-indigo"
          >
            {SEED_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.block} Block)
              </option>
            ))}
          </select>
        </div>

        {/* Language Selection */}
        <div>
          <label className="text-2xs font-bold text-ink uppercase tracking-wide block mb-1">
            Preferred Spoken Dialect:
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-rule bg-paper text-ink focus:outline-indigo"
          >
            <option value="hi">हिंदी (Chandauli Hindi)</option>
            <option value="bho">भोजपुरी (Bhojpuri)</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Disabled Fields (Per Spec Constraints) */}
        <div className="space-y-2 opacity-50 select-none">
          <div>
            <label className="text-2xs font-bold text-ink-soft block">
              Phone Number (Disabled by Privacy Rule):
            </label>
            <input
              type="text"
              disabled
              value="XXXXX-98214 (Masked)"
              className="w-full text-xs p-2 rounded border border-rule bg-paper text-ink-soft cursor-not-allowed font-mono"
            />
          </div>
          <div>
            <label className="text-2xs font-bold text-ink-soft block">
              WhatsApp Integration (Disabled - Offline Only):
            </label>
            <input
              type="text"
              disabled
              value="Disabled / Air-gapped"
              className="w-full text-xs p-2 rounded border border-rule bg-paper text-ink-soft cursor-not-allowed font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full min-h-[56px] bg-indigo hover:bg-indigo/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm transition-all"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Session Created · Launching Voice...</span>
            </>
          ) : (
            <span>Save & Start Spoken Voice Session →</span>
          )}
        </button>
      </form>
    </div>
  );
};
