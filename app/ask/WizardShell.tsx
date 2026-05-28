"use client";

import { useEffect, useState } from "react";
import { askConfig } from "./ask-config";

const TOTAL_STEPS = 3;

interface Props {
  currentStep: 1 | 2 | 3;
  children: React.ReactNode;
}

export function WizardShell({ currentStep, children }: Props) {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    setShowTransition(true);
    const id = setTimeout(() => setShowTransition(false), 800);
    return () => clearTimeout(id);
  }, [currentStep]);

  const pct = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-xs mb-8">
        <p className="text-xs text-pink-400 font-semibold text-center mb-2 tracking-wide uppercase">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
          <div
            className="h-2 bg-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {showTransition ? (
        <div className="flex flex-col items-center">
          <img
            src={askConfig.transitionGif}
            alt=""
            className="w-24 h-24 object-cover rounded-xl opacity-80"
          />
        </div>
      ) : (
        <div key={currentStep} className="w-full max-w-xs ask-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
