import { LucideMessageSquareWarning } from "lucide-react";
import React, { cloneElement, ReactElement, ReactNode } from "react";

type PlaceholderProps = {
  label: string;
  icon?: ReactElement;
  button?: ReactNode;
};
export default function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div className='h-10' />,
}: PlaceholderProps) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-2'>
      {cloneElement(icon, {
        className: "w-16 h-16 text-muted-foreground",
      })}
      <h2 className='text-center text-lg'>{label}</h2>
      {button}
    </div>
  );
}
