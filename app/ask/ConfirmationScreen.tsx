"use client";

import { useState } from "react";
import { askConfig, type DateTypeOption } from "./ask-config";

function formatDateLong(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric",
  }).format(d);
}

function buildMessage(date: Date, type: DateTypeOption, note: string): string {
  const dateStr = formatDateLong(date);
  const typeStr = `${type.emoji} ${type.label}`;
  let msg = askConfig.confirmation.messageTemplate
    .replace("{date}", dateStr)
    .replace("{type}", typeStr);
  if (note) {
    msg = msg.replace("{note}", note);
  } else {
    msg = msg.replace("\n💌 {note}", "");
  }
  return msg;
}

interface Props {
  date: Date;
  type: DateTypeOption;
  note: string;
}

export function ConfirmationScreen({ date, type, note }: Props) {
  const [copied, setCopied] = useState(false);
  const message = buildMessage(date, type, note);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  async function handleShare() {
    if (typeof navigator.share === "function") {
      try { await navigator.share({ text: message }); }
      catch { /* user cancelled */ }
    } else {
      await handleCopy();
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-6 text-center ask-fade-in">
      <img src={askConfig.confirmation.gif} alt="celebration!" className="w-48 h-48 object-cover rounded-2xl mb-4" />

      <h1 className="text-3xl font-bold text-pink-500 mb-6">{askConfig.confirmation.heading}</h1>

      <div className="bg-white rounded-2xl shadow-sm p-5 w-full max-w-xs text-left mb-6 space-y-2">
        <p className="text-sm text-gray-700">📅 <strong>{formatDateLong(date)}</strong></p>
        <p className="text-sm text-gray-700">{type.emoji} <strong>{type.label}</strong></p>
        {note && <p className="text-sm text-gray-600 italic">💌 &ldquo;{note}&rdquo;</p>}
      </div>

      <button
        onClick={handleCopy}
        className="w-full max-w-xs bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold py-3 px-6 rounded-full transition-all mb-3"
      >
        {copied ? "Copied! ✓" : askConfig.confirmation.copyLabel}
      </button>

      <button
        onClick={handleShare}
        className="w-full max-w-xs bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-50 active:scale-95 font-bold py-3 px-6 rounded-full transition-all"
      >
        {askConfig.confirmation.shareLabel}
      </button>
    </div>
  );
}
