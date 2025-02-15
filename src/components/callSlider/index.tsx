import React from "react";

interface CallSliderProps {
  toggled: boolean;
  setToggled: (value: boolean) => void;
}

const CallSlider: React.FC<CallSliderProps> = ({ toggled, setToggled }) => {
  return (
    <div
      className={`w-40 h-12 flex items-center rounded-full p-1 transition cursor-pointer ${
        toggled ? "bg-green-500" : "bg-white border border-gray-300"
      }`}
      onClick={() => setToggled(!toggled)}
    >
      <div
        className={`w-10 h-10 bg-gray-300 rounded-full transition-transform ${
          toggled ? "translate-x-24 bg-green-800" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default CallSlider;
