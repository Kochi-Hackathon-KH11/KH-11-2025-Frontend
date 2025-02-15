import React from "react";
import Navbar from "@/components/Navbar";
import CallSlider from "@/components/callSlider";
import DeclineButton from "@/components/declineButton";

const callerPage = () => {
  return (
    <div className="h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex flex-col flex-grow items-center justify-center px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">Mayank Gupta</h1>
        <p className="text-lg md:text-xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-300">
          Calling...
        </p>
        <div className="mt-20 flex flex-col items-center gap-6 w-full max-w-sm">
          <CallSlider />
          <DeclineButton />
        </div>
      </div>
    </div>
  );
};

export default callerPage;



