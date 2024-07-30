"use client";

import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";

export function SubmitButton({
  btnLabel = "Submit",
  TWclasses = "",
  formDataModified,
  setFormDataModified,
  submitSaveMsg = "Data saved.",
}: {
  btnLabel?: string;
  TWclasses?: string;
  formDataModified: boolean;
  setFormDataModified: (formDataModified: boolean) => void;
  submitSaveMsg?: string;
}) {
  const { pending } = useFormStatus();
  const [submitInvokedOnce, setSubmitInvokedOnce] = useState(false);

  useEffect(() => {
    submitInvokedOnce && !pending && setFormDataModified(false);
  }, [pending]);

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className={
          TWclasses +
          (pending
            ? " disabled:bg-slate-700 pointer-events-none"
            : " pointer-events-auto")
        }
        onClick={() => setSubmitInvokedOnce(true)}
      >
        {btnLabel}
      </button>
      {submitInvokedOnce && !formDataModified && !pending && (
        <span className="ml-4"> {submitSaveMsg} </span>
      )}
    </>
  );
}
