"use client";

import { useState } from "react";
import { askConfig, type DateTypeOption } from "../ask-config";

interface Props {
  onNext: (type: DateTypeOption) => void;
}

export function DateTypeStep({ onNext }: Props) {
  const [selected, setSelected] = useState<DateTypeOption | null>(null);

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl mb-2">💑</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{askConfig.steps.type.heading}</h2>
      <p className="text-pink-400 text-sm mb-6">{askConfig.steps.type.subheading}</p>

      <div className="grid grid-cols-2 gap-3 w-full">
        {askConfig.steps.type.options.map((option) => {
          const isSelected = selected?.label === option.label;
          return (
            <button
              key={option.label}
              onClick={() => setSelected(option)}
              className={[
                "flex flex-col items-center py-5 px-2 rounded-2xl border-2 transition-all font-semibold text-gray-700",
                isSelected
                  ? "border-pink-500 bg-pink-50 text-pink-700 scale-105 shadow-sm"
                  : "border-gray-100 bg-white hover:border-pink-200 hover:bg-pink-50",
              ].join(" ")}
            >
              <span className="text-3xl mb-1">{option.emoji}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          );
        })}
      </div>

      <button
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
        className="mt-6 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-full transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
