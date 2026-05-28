"use client";

import { useState } from "react";
import { type DateTypeOption } from "./ask-config";
import { LandingScreen } from "./LandingScreen";
import { WizardShell } from "./WizardShell";
import { DatePickerStep } from "./steps/DatePickerStep";
import { DateTypeStep } from "./steps/DateTypeStep";
import { NoteStep } from "./steps/NoteStep";
import { ConfirmationScreen } from "./ConfirmationScreen";

type Step = "landing" | "yes-reaction" | "date" | "type" | "note" | "confirmation";

interface Answers {
  selectedDate: Date | null;
  selectedType: DateTypeOption | null;
  note: string;
}

export function AskClient() {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Answers>({
    selectedDate: null,
    selectedType: null,
    note: "",
  });

  function handleYes() {
    setStep("yes-reaction");
  }

  if (step === "landing" || step === "yes-reaction") {
    return (
      <LandingScreen
        showReaction={step === "yes-reaction"}
        onYes={handleYes}
        onNext={() => setStep("date")}
      />
    );
  }

  if (step === "confirmation") {
    return (
      <ConfirmationScreen
        date={answers.selectedDate!}
        type={answers.selectedType!}
        note={answers.note}
      />
    );
  }

  const stepNumber: Record<"date" | "type" | "note", 1 | 2 | 3> = {
    date: 1, type: 2, note: 3,
  };

  return (
    <WizardShell currentStep={stepNumber[step as "date" | "type" | "note"]}>
      {step === "date" && (
        <DatePickerStep onNext={(date) => { setAnswers((a) => ({ ...a, selectedDate: date })); setStep("type"); }} />
      )}
      {step === "type" && (
        <DateTypeStep onNext={(type) => { setAnswers((a) => ({ ...a, selectedType: type })); setStep("note"); }} />
      )}
      {step === "note" && (
        <NoteStep onNext={(note) => { setAnswers((a) => ({ ...a, note })); setStep("confirmation"); }} />
      )}
    </WizardShell>
  );
}
