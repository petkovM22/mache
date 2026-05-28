"use client";

import { useState, useCallback } from "react";
import { askConfig } from "./ask-config";
import { popHeading, popPink } from "./ask-styles";

interface Props {
  showReaction: boolean;
  onYes: () => void;
  onNext: () => void;
}

export function LandingScreen({ showReaction, onYes, onNext }: Props) {
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);

  const flee = useCallback(() => {
    if (attempts >= 4) {
      setAttempts(5);
      return;
    }
    const padding = 70;
    const x = padding + Math.random() * (window.innerWidth - padding * 2);
    const y = padding + Math.random() * (window.innerHeight - padding * 2);
    setNoPos({ x, y });
    setAttempts((prev) => prev + 1);
  }, [attempts]);

  if (showReaction) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 ask-fade-in">
        <div className="w-full max-w-xs flex flex-col items-center text-center">
          <img src={askConfig.yesReactionGif} alt="yay!" className="w-full rounded-2xl shadow-xl mb-5" />
          <p className="text-2xl mb-6" style={popPink}>Yayyyy!! 🎉</p>
          <button
            onClick={onNext}
            className="w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white py-3 px-12 rounded-full text-lg shadow-lg transition-all"
            style={{ fontWeight: 700 }}
          >
            Let&apos;s pick a date! 📅
          </button>
        </div>
      </div>
    );
  }

  const noStyle: React.CSSProperties =
    noPos != null
      ? {
          position: "fixed",
          left: noPos.x,
          top: noPos.y,
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          transition: "left 0s, top 0s",
        }
      : {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 ask-fade-in">
      <div className="w-full max-w-xs flex flex-col items-center text-center">
        <img src={askConfig.landing.gif} alt="kitten" className="w-full rounded-2xl shadow-xl mb-5" />

        <h1 className="text-2xl mb-7 leading-snug" style={popHeading}>
          {askConfig.landing.question}
        </h1>

        <button
          onClick={onYes}
          className="w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white py-3 rounded-full text-lg shadow-lg transition-all mb-3"
          style={{ fontWeight: 700 }}
        >
          {askConfig.landing.yesLabel}
        </button>

        {attempts < 5 && (
          <button
            onMouseEnter={flee}
            onTouchStart={(e) => { e.preventDefault(); flee(); }}
            style={{ ...noStyle, fontWeight: 700 }}
            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2 px-8 rounded-lg shadow-md transition-all select-none"
          >
            {askConfig.landing.noLabel}
          </button>
        )}
      </div>
    </div>
  );
}
