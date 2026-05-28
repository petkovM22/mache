"use client";

import { useState } from "react";
import { askConfig } from "../ask-config";
import { popHeading, popSub } from "../ask-styles";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateLong(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(d);
}

interface Props {
  onNext: (date: Date) => void;
}

export function DatePickerStep({ onNext }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 60);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<Date | null>(null);

  function goToPrevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function goToNextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const leadingBlanks = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long", year: "numeric",
  }).format(firstOfMonth);

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl mb-2">📅</p>
      <h2 className="text-2xl mb-1" style={popHeading}>{askConfig.steps.date.heading}</h2>
      <p className="text-sm mb-5" style={popSub}>{askConfig.steps.date.subheading}</p>

      <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <button onClick={goToPrevMonth} className="text-pink-400 font-bold text-xl px-2 hover:text-pink-600 transition-colors" aria-label="Previous month">‹</button>
          <span className="font-semibold text-gray-700 text-sm">{monthLabel}</span>
          <button onClick={goToNextMonth} className="text-pink-400 font-bold text-xl px-2 hover:text-pink-600 transition-colors" aria-label="Next month">›</button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <span key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((date, i) => {
            if (!date) return <span key={`blank-${i}`} />;
            const isPast = date < today;
            const isTooFar = date > maxDate;
            const disabled = isPast || isTooFar;
            const isSelected = selected !== null && sameDay(date, selected);
            const isToday = sameDay(date, today);
            return (
              <button
                key={date.toISOString()}
                disabled={disabled}
                onClick={() => setSelected(new Date(date))}
                className={[
                  "text-sm rounded-full w-8 h-8 mx-auto flex items-center justify-center transition-colors",
                  disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-pink-200 cursor-pointer text-gray-700",
                  isSelected ? "!bg-pink-500 !text-white font-bold" : "",
                  isToday && !isSelected ? "ring-1 ring-pink-400 text-pink-500 font-semibold" : "",
                ].filter(Boolean).join(" ")}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <p className="mt-3 text-xs" style={popSub}>{formatDateLong(selected)} ✓</p>
      )}

      <button
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
        className="mt-5 w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-full shadow-md transition-all"
      >
        Next →
      </button>
    </div>
  );
}
