import React from "react";
type DoubleContainerProps = {
    className?: string;
    children: React.ReactNode;
}
export default function DoubleContainer({className, children}: DoubleContainerProps) {
    <div className="w-full h-full border-2 rounded-xl border-neutral-600 p-[3px]">
        {children}       
    </div>
}