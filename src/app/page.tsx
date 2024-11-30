import Link from 'next/link';
import { ticketsPath } from '@/paths';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-4xl">Home Page</h2>
      <Link href={ticketsPath()} className="underline">Go to tickets</Link>
    </div>
  );
}
