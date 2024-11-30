import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-4xl">Home Page</h2>
      <Link href="/tickets" className="underline">Go to tickets</Link>
    </div>
  );
}
