"use client";

import { useState } from "react";
import { askConfig, type DateTypeOption } from "../ask-config";
import { popHeading, popSub } from "../ask-styles";

interface Props {
  onNext: (type: DateTypeOption) => void;
}

export function DateTypeStep({ onNext }: Props) {
  const [selected, setSelected] = useState<DateTypeOption | null>(null);

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl mb-2">💑</p>
      <h2 className="text-2xl mb-1" style={popHeading}>{askConfig.steps.type.heading}</h2>
      <p className="text-sm mb-5" style={popSub}>{askConfig.steps.type.subheading}</p>

      <div className="grid grid-cols-2 gap-3 w-full">
        {askConfig.steps.type.options.map((option) => {
          const isSelected = selected?.label === option.label;
          return (
            <button
              key={option.label}
              onClick={() => setSelected(option)}
              className={[
                "flex flex-col items-center py-4 px-2 rounded-2xl border-2 transition-all font-semibold text-gray-700",
                isSelected
                  ? "border-pink-500 bg-pink-50 text-pink-700 scale-105 shadow-md"
                  : "border-gray-100 bg-white hover:border-pink-300 hover:bg-pink-50 hover:scale-105",
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
        className="mt-6 w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-full shadow-md transition-all"
      >
        Next →
      </button>
    </div>
  );
}
