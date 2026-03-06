"use client";

import { useParams } from "next/navigation";
import { useGetUser } from "@/features/users/api/getUser";

export const UserBreadcrumbs = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data } = useGetUser(userId);

  const name = data?.user?.profile?.full_name ?? data?.user?.email ?? userId;

  return (
    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
      <span>Employees</span>
      <span>{">"}</span>
      <span className="text-foreground font-medium">{name}</span>
    </div>
  );
};
