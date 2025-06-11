import React from "react";
import ClickSpark from "./ClickSpark";

interface ClickSparkWrapperProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
}

const ClickSparkWrapper: React.FC<ClickSparkWrapperProps> = ({
  children,
  sparkColor = "#ff0088",
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
}) => {
  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={sparkSize}
      sparkRadius={sparkRadius}
      sparkCount={sparkCount}
      duration={400}
      easing="ease-out"
      extraScale={1.2}
    >
      {children}
    </ClickSpark>
  );
};

export default ClickSparkWrapper;