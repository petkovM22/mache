"use client";

import { useState, useCallback } from "react";
import { askConfig } from "./ask-config";

interface Props {
  showReaction: boolean;
  onYes: () => void;
}

export function LandingScreen({ showReaction, onYes }: Props) {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 ask-fade-in">
        <img
          src={askConfig.yesReactionGif}
          alt="yay!"
          className="w-48 h-48 object-cover rounded-2xl mb-6"
        />
        <p className="text-2xl font-bold text-pink-500">Yayyyy!! 🎉</p>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-6 text-center ask-fade-in">
      <img
        src={askConfig.landing.gif}
        alt="kitten"
        className="w-44 h-44 object-cover rounded-2xl mb-6"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-8 leading-snug">
        {askConfig.landing.question}
      </h1>

      <button
        onClick={onYes}
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold py-3 px-12 rounded-full text-lg shadow-md transition-all mb-6"
      >
        {askConfig.landing.yesLabel}
      </button>

      {attempts < 5 && (
        <button
          onMouseEnter={flee}
          onTouchStart={(e) => {
            e.preventDefault();
            flee();
          }}
          style={noStyle}
          className="text-gray-400 text-sm underline select-none"
        >
          {askConfig.landing.noLabel}
        </button>
      )}
    </div>
  );
}
