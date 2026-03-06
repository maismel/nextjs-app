import { UserTabs } from "@/features/users/components/UserTabs";
import { UserBreadcrumbs } from "@/features/users/components/UserBreadcrubs";
import { UserProfile } from "@/features/users/components/UserProfile";

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  return (
    <div className="p-6">
      <UserBreadcrumbs />
      <UserTabs />
      <div className="mt-8">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
}
