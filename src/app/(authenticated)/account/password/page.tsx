import AccountTabs from "@/app/(authenticated)/account/_navigation/tabs";
import Heading from "@/components/Heading";

export default function PasswordPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading
        title='Password'
        description='Keep your account secure'
        tabs={<AccountTabs />}
      />
    </div>
  );
}
