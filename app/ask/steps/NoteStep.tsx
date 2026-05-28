"use client";

import { useState } from "react";
import { askConfig } from "../ask-config";
import { popHeading, popSub, popMuted } from "../ask-styles";

const MAX_CHARS = 200;

interface Props {
  onNext: (note: string) => void;
}

export function NoteStep({ onNext }: Props) {
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl mb-2">💌</p>
      <h2 className="text-2xl mb-1" style={popHeading}>{askConfig.steps.note.heading}</h2>
      <p className="text-sm mb-5" style={popSub}>{askConfig.steps.note.subheading}</p>

      <div className="w-full">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, MAX_CHARS))}
          placeholder={askConfig.steps.note.placeholder}
          rows={4}
          className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white"
        />
        <p className="text-right text-xs mt-1" style={popMuted}>{note.length}/{MAX_CHARS}</p>
      </div>

      <button
        onClick={() => onNext(note.trim())}
        className="mt-4 w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold py-3 px-10 rounded-full shadow-md transition-all"
      >
        Next →
      </button>

      <button
        onClick={() => onNext("")}
        className="mt-2 text-xs underline underline-offset-2 transition-colors"
        style={popMuted}
      >
        skip →
      </button>
    </div>
  );
}
