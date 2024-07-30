"use client";

import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";

export function SubmitButton({
  btnLabel = "Submit",
  TWclasses = "",
  formDataModified,
  setFormDataModified,
  // checkedState = [],
  submitSaveMsg = "Data saved.",
}: {
  btnLabel?: string;
  TWclasses?: string;
  formDataModified: boolean;
  setFormDataModified: (formDataModified: boolean) => void;
  // checkedState?: boolean[];
  submitSaveMsg?: string;
}) {
  const { pending } = useFormStatus();
  const [submitInvokedOnce, setSubmitInvokedOnce] = useState(false);
  // const [formDataModified, setFormDataModified] = useState(false);

  // useEffect(() => {
  //   submitInvokedOnce && setFormDataModified(true);
  // }, [checkedState, submitInvokedOnce]);

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
            : // ? " disabled:bg-red-800 pointer-events-none"
              " pointer-events-auto")
        }
        onClick={() => setSubmitInvokedOnce(true)}
      >
        {btnLabel}
      </button>
      {submitInvokedOnce && !formDataModified && !pending && (
        <p className="mt-4"> {submitSaveMsg} </p>
      )}
    </>
  );
}
