import Heading from "@/components/Heading";
import AccountTabs from "@/features/account/components/account-tabs";

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
