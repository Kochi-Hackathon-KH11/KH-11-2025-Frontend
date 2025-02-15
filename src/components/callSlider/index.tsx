import React from "react";
import RoundButton from "@/components/roundButton"; // Adjust the import path if necessary

interface CallSliderProps {
  toggled: boolean;
  setToggled: (value: boolean) => void;
}

const CallSlider: React.FC<CallSliderProps> = ({ toggled, setToggled }) => {
  return (
    <div
      className={`w-[150px] h-12 flex items-center rounded-full transition cursor-pointer ${
        toggled ? "bg-green-500" : "bg-white border border-gray-300"
      }`}
      onClick={() => setToggled(!toggled)}
    >
      <div
        className={`transition-transform ${
          toggled ? "translate-x-[110%]" : "translate-x-[-10%]"
        }`}
      >
        <RoundButton
          buttonType="activate"
          dimension={75} 
          iconDimension={36} 
          functionToHandle={() => setToggled(!toggled)}
        />
      </div>
    </div>
  );
};

export default CallSlider;
