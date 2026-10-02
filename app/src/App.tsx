import React from 'react';
import { StoreProvider, useAppStore } from './lib/store/eventStore';
import { TopBar } from './components/shell/TopBar';
import { StoryBar } from './components/shell/StoryBar';
import { BeneficiaryView } from './components/beneficiary/BeneficiaryView';
import { HelperView } from './components/helper/HelperView';
import { OfficerConsole } from './components/officer/OfficerConsole';
import { ProviderDesk } from './components/provider/ProviderDesk';

const AppContent: React.FC = () => {
  const { state } = useAppStore();

  // Story Mode Beat 8 WOW Moment Split Screen: Phone on left, Officer Console on right!
  const isSplitScreen = state.storyMode && state.storyBeat === 8;

  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-marigold selection:text-ink">
      <TopBar />
      <StoryBar />

      <main className="flex-1 overflow-x-hidden">
        {isSplitScreen ? (
          <div className="max-w-[1500px] mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Beneficiary Phone */}
            <div className="lg:col-span-4 flex justify-center">
              <BeneficiaryView />
            </div>

            {/* Right: District Console Map & Allocation */}
            <div className="lg:col-span-8 bg-surface rounded-2xl border border-rule shadow-sm overflow-hidden">
              <OfficerConsole />
            </div>
          </div>
        ) : (
          <>
            {state.currentRole === 'beneficiary' && <BeneficiaryView />}
            {state.currentRole === 'helper' && <HelperView />}
            {state.currentRole === 'officer' && <OfficerConsole />}
            {state.currentRole === 'provider' && <ProviderDesk />}
          </>
        )}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
