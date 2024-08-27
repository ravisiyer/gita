"use client";

import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";

export function SubmitButton({
  btnLabel = "Submit",
  TWclasses = "",
  formDataModified,
  setFormDataModified,
  submitSaveMsg = "Data saved.",
  onSubmitButtonClick = null,
}: {
  btnLabel?: string;
  TWclasses?: string;
  formDataModified: boolean;
  setFormDataModified: (formDataModified: boolean) => void;
  submitSaveMsg?: string;
  onSubmitButtonClick?: null | (() => boolean);
}) {
  const { pending } = useFormStatus();
  const [submitInvokedOnce, setSubmitInvokedOnce] = useState(false);
  const [proceedWithSave, setProceedWithSave] = useState(true);

  useEffect(() => {
    if (submitInvokedOnce && !pending) {
      console.log("In SB useEffect: calling setFormDataModified(false)");
      setFormDataModified(false);
    }
    // submitInvokedOnce && !pending && setFormDataModified(false);
  }, [pending, submitInvokedOnce, setFormDataModified]);

  function handleSubmitButtonClick(e: React.MouseEvent) {
    let tmpProceedWithSave = false;
    if (onSubmitButtonClick) {
      tmpProceedWithSave = onSubmitButtonClick();
      setProceedWithSave(tmpProceedWithSave);
    }
    if (!tmpProceedWithSave) {
      e.preventDefault();
    }
    setSubmitInvokedOnce(true);
  }
  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className={
          TWclasses +
          (pending
            ? " disabled:bg-slate-500 pointer-events-none"
            : " pointer-events-auto")
        }
        onClick={handleSubmitButtonClick}
      >
        {btnLabel}
      </button>
      {submitInvokedOnce && !formDataModified && !pending && (
        <span className="ml-4"> {submitSaveMsg} </span>
      )}
    </>
  );
}
