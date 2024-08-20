"use client";
import { Circles } from "react-loader-spinner";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      {/* <h2>Loading from mainapp loading.tsx ....</h2> */}
      <div className="flex min-h-[calc(100vh-45px)] min-w-full justify-center items-center">
        <Circles
          height="200"
          width="200"
          color="rgb(251 146 60)"
          // color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      {/* <Audio
        height="200"
        width="200"
        // radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
      /> */}
      {/* <Audio
        height="80"
        width="80"
        // radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
      /> */}
    </>
  );
}
