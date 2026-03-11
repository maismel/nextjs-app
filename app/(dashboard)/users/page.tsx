// src/app/users/page.tsx
import { UsersList } from "@/features/users/components/UsersList";

export const metadata = {
  title: "CRM App - Users",
};

export default function UsersPage() {
  return (
    <>
      <h1 className="text-sm text-muted-foreground mb-2">Employees</h1>
      <UsersList />
    </>
  );
}
