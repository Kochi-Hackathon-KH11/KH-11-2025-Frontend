"use client";
import React, { useState } from "react";
import Button from "@/components/Button"; 

const CallSlider = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={`w-40 h-12 flex items-center rounded-full p-1 transition cursor-pointer ${
        toggled ? "bg-green-500" : "bg-white border border-gray-300"
      }`}
      onClick={() => setToggled(!toggled)}
    >
      <div
        className={`transition-transform ${
          toggled ? "translate-x-24" : "translate-x-0"
        }`}
      >
        <Button /> 
      </div>
    </div>
  );
};

export default CallSlider;
