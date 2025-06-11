import React from "react";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

export const Main_loader: React.FC = () => {
  return (
    <div className="flex m-auto h-screen justify-center items-center">
      <UseAnimations animation={loading2} size={95} fillColor="blue" />
    </div>
  );
};

