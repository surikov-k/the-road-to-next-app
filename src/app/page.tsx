import Link from "next/link";

import Heading from "@/components/Heading";
import { ticketsPath } from "@/paths";

export default function HomePage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Home' description='Your home place to start' />
      <div className='flex flex-1 flex-col items-center'>
        <Link href={ticketsPath()} className='underline'>
          Go to tickets
        </Link>
      </div>
    </div>
  );
}
