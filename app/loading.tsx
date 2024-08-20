"use client";
import { Circles } from "react-loader-spinner";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      {/* <h2>Loading from loading.tsx ....</h2> */}
      <div className="flex min-h-[calc(100vh-45px)] min-w-full justify-center items-center ">
        <Circles
          height="200"
          width="200"
          //   color="#4fa94d"
          color="rgb(251 146 60)"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      {/* <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
    </>
  );
}
