import { UserTabs } from "@/features/users/components/UserTabs";
import { UserProfile } from "@/features/users/components/UserProfile";

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  return (
    <>
      <UserTabs />
      <div className="mt-8">
        <UserProfile userId={userId} />
      </div>
    </>
  );
}
