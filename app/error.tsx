"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Sorry! Something went wrong!</h2>
      <p>{`Details: ${error.message}`}</p>
      {/* Below Try again button does not work in case of network connection to data source being down initially and
      after this error is shown, Try again button being clicked. However, refresh of the page works (gets data
      from data source). Don't know if I need to pass a reset function when throwing the data source error. For now,
      have simply commented out the Try again button code. */}
      {/* <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  );
}
