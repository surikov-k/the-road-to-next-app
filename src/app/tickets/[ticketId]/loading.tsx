import Spinner from "@/components/spinner";

export default function TicketLoading() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-y-8'>
      <Spinner />
    </div>
  );
}
