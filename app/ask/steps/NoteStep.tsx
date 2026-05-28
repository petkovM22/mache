"use client";

import { useState } from "react";
import { askConfig } from "../ask-config";

const MAX_CHARS = 200;

interface Props {
  onNext: (note: string) => void;
}

export function NoteStep({ onNext }: Props) {
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl mb-2">💌</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{askConfig.steps.note.heading}</h2>
      <p className="text-pink-400 text-sm mb-6">{askConfig.steps.note.subheading}</p>

      <div className="w-full">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, MAX_CHARS))}
          placeholder={askConfig.steps.note.placeholder}
          rows={4}
          className="w-full border border-pink-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white"
        />
        <p className="text-right text-xs text-gray-400 mt-1">{note.length}/{MAX_CHARS}</p>
      </div>

      <button
        onClick={() => onNext(note.trim())}
        className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full transition-colors"
      >
        Confirm! 🎉
      </button>

      <button
        onClick={() => onNext("")}
        className="mt-2 text-xs text-gray-400 underline underline-offset-2"
      >
        skip →
      </button>
    </div>
  );
}
