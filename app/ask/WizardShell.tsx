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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-xs mb-5">
        <div className="bg-white rounded-full shadow-md px-5 py-2">
          <p className="text-xs text-pink-500 font-bold text-center mb-1.5 tracking-wide uppercase">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {showTransition ? (
        <div className="w-full max-w-xs flex flex-col items-center">
          <img src={askConfig.transitionGif} alt="" className="w-full rounded-2xl shadow-xl opacity-95" />
        </div>
      ) : (
        <div key={currentStep} className="w-full max-w-xs ask-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
