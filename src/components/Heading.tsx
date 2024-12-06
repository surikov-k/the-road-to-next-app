import { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  tabs?: ReactNode;
};

export default function Heading({ title, description, tabs }: HeadingProps) {
  return (
    <>
      {tabs}
      <div className='px-8'>
        <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      <Separator />
    </>
  );
}
