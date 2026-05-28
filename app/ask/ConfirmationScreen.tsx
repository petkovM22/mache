"use client";

import { useState } from "react";
import { askConfig, type DateTypeOption } from "./ask-config";
import { popPink, popSub } from "./ask-styles";

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

type SendState = "idle" | "sending" | "sent" | "error";

interface Props {
  date: Date;
  type: DateTypeOption;
  note: string;
}

export function ConfirmationScreen({ date, type, note }: Props) {
  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const message = buildMessage(date, type, note);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  async function handleConfirm() {
    if (sendState === "sending" || sendState === "sent") return;
    setSendState("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setSendState("sent");
    } catch (err) {
      setSendState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  const confirmLabel =
    sendState === "sending" ? "Sending… ⏳"
      : sendState === "sent" ? "✓ Mail sent!"
      : sendState === "error" ? "Failed — tap to retry"
      : askConfig.confirmation.confirmLabel;

  const confirmClass =
    sendState === "sent"
      ? "bg-green-500 cursor-default"
      : sendState === "sending"
      ? "bg-pink-400 cursor-wait"
      : sendState === "error"
      ? "bg-red-500 hover:bg-red-600 active:scale-95"
      : "bg-pink-500 hover:bg-pink-600 active:scale-95";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 ask-fade-in">
      <div className="w-full max-w-xs flex flex-col items-center text-center">
        <img src={askConfig.confirmation.gif} alt="celebration!" className="w-full rounded-2xl shadow-xl mb-5" />

        <h1 className="text-3xl mb-2" style={popPink}>{askConfig.confirmation.heading}</h1>
        <p className="text-sm mb-5" style={popSub}>{askConfig.confirmation.subheading}</p>

        <div className="bg-white border border-pink-100 rounded-2xl p-4 w-full text-left mb-5 space-y-2 shadow-lg">
          <p className="text-sm text-gray-700">📅 <strong>{formatDateLong(date)}</strong></p>
          <p className="text-sm text-gray-700">{type.emoji} <strong>{type.label}</strong></p>
          {note && <p className="text-sm text-gray-600 italic">💌 &ldquo;{note}&rdquo;</p>}
        </div>

        <button
          onClick={handleConfirm}
          disabled={sendState === "sending" || sendState === "sent"}
          className={`w-full text-white py-3 px-6 rounded-full shadow-lg transition-all mb-3 disabled:opacity-100 ${confirmClass}`}
          style={{ fontWeight: 700 }}
        >
          {confirmLabel}
        </button>

        {errorMsg && (
          <p className="text-xs text-red-600 mb-3 max-w-full break-words" style={{ fontWeight: 600 }}>
            {errorMsg}
          </p>
        )}

        <button
          onClick={handleCopy}
          className="w-full bg-white border-2 border-pink-400 text-pink-500 hover:bg-pink-50 active:scale-95 py-3 px-6 rounded-full shadow-md transition-all"
          style={{ fontWeight: 700 }}
        >
          {copied ? "Copied! ✓" : askConfig.confirmation.copyLabel}
        </button>
      </div>
    </div>
  );
}
