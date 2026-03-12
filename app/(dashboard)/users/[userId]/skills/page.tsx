import { UserTabs } from "@/features/users/components/UserTabs";
import { UserSkills } from "@/features/users/skills/components/UserSkills";

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  return (
    <>
      <UserTabs />

      <div className="mt-8">
        <UserSkills userId={userId} />
      </div>
    </>
  );
}
