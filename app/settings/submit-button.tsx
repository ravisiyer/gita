"use client";

import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";

export function SubmitButton({
  btnLabel = "Submit",
  TWclasses = "",
  checkedState = [],
  submitSaveMsg = "Data saved.",
}: {
  btnLabel?: string;
  TWclasses?: string;
  checkedState?: boolean[];
  submitSaveMsg?: string;
}) {
  const { pending } = useFormStatus();
  const [submitInvokedOnce, setSubmitInvokedOnce] = useState(false);
  const [formDataModified, setFormDataModified] = useState(false);

  useEffect(() => {
    submitInvokedOnce && setFormDataModified(true);
  }, [checkedState, submitInvokedOnce]);

  useEffect(() => {
    !pending && setFormDataModified(false);
  }, [pending]);

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className={
          TWclasses +
          (pending
            ? " disabled:bg-red-800 pointer-events-none"
            : " pointer-events-auto")
        }
        onClick={() => setSubmitInvokedOnce(true)}
      >
        {btnLabel}
      </button>
      <p className="mt-4">
        {submitInvokedOnce && !formDataModified && !pending && submitSaveMsg}
      </p>
    </>
  );
}
