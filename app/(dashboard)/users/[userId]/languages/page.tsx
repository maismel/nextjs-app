import { UserTabs } from "@/features/users/components/UserTabs";
import { UserLanguages } from "@/features/users/languages/components/UserLanguages";

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  return (
    <>
      <UserTabs />

      <div className="mt-8">
        <UserLanguages userId={userId} />
      </div>
    </>
  );
}
