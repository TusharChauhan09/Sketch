import React from "react";
type DoubleContainerProps = {
  className?: string;
  w?: number;
  h?: number;
  children?: React.ReactNode;
};
export default function DoubleContainer({
  className,
  w = 60,
  h = 100,
  children,
}: DoubleContainerProps) {
  return (
    <div
      className={` w-${w} h-${h} border-2 border-neutral-600 rounded-2xl p-[2px] ${className || ""}`}
    >
      <div className="w-full h-full border-2 border-neutral-700 rounded-xl ">
        {children}
      </div>
    </div>
  );
}
