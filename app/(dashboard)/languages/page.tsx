import { UserTabs } from "@/features/users/components/UserTabs";
import { UserBreadcrumbs } from "@/features/users/components/UserBreadcrubs";
import { UserLanguages } from "@/features/users/languages/components/UserLanguages";
export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  return (
    <div className="p-6">
      {/* <UserBreadcrumbs />
      <UserTabs />

      <div className="mt-8">
        <UserLanguages userId={userId} />
      </div> */}
    </div>
  );
}
