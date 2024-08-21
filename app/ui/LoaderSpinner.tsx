"use client";
import { Circles } from "react-loader-spinner";
function LoaderSpinner() {
  return (
    <div className="flex min-h-[calc(100vh-45px)] min-w-full justify-center items-center ">
      <Circles
        height="200"
        width="200"
        color="rgb(251 146 60)" //bg-orange-400
        ariaLabel="circles-loading"
      />
    </div>
  );
}
export default LoaderSpinner;
