"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarUploadBlock } from "@/features/users/components/AvatarUploadBlock";

export type UserProfileFormState = {
  first_name: string;
  last_name: string;
  departmentId: string;
  positionId: string;
};

type Option = { id: string; name: string };

interface Props {
  userEmail: string;
  avatar: string | null;
  fullName: string;
  createdAt: string;
  departments: Option[];
  positions: Option[];
  initialValues: UserProfileFormState;
  readOnly?: boolean;
  loading?: boolean;
  onSubmit: (values: UserProfileFormState) => void | Promise<void>;
  onUploadAvatar?: (file: File) => Promise<void> | void;
}

const formatMemberSince = (createdAt: string) => {
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return "";
  return d.toDateString();
};

export const UserProfileForm = ({
  userEmail,
  avatar,
  fullName,
  createdAt,
  departments,
  positions,
  initialValues,
  readOnly = false,
  loading = false,
  onSubmit,
  onUploadAvatar,
}: Props) => {
  const [form, setForm] = useState<UserProfileFormState>(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const isChanged = useMemo(() => {
    return (
      form.first_name !== initialValues.first_name ||
      form.last_name !== initialValues.last_name ||
      form.departmentId !== initialValues.departmentId ||
      form.positionId !== initialValues.positionId
    );
  }, [form, initialValues]);

  const isValid = Boolean(form.first_name.trim() && form.last_name.trim());
  const disabled = readOnly || loading || !isChanged || !isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    await onSubmit({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      departmentId: form.departmentId,
      positionId: form.positionId,
    });
  };

  const memberSince = formatMemberSince(createdAt);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-[852px] flex-col items-center"
        >
          {/* Top: avatar + upload */}
          <div className="mt-2 flex w-full justify-center">
            <AvatarUploadBlock
              avatar={avatar}
              fullName={fullName}
              userEmail={userEmail}
              disabled={readOnly || loading}
              onUpload={onUploadAvatar}
            />
          </div>

          {/* Name block */}
          <div className="mt-6 text-center">
            <div className="text-[22px] font-semibold text-foreground">
              {fullName || "—"}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {userEmail || "—"}
            </div>
            {memberSince && (
              <div className="mt-2 text-xs text-muted-foreground">
                A member since {memberSince}
              </div>
            )}
          </div>

          {/* Form grid (410x48 inputs in figma) */}
          <div className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-6">
            <Input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) =>
                setForm((p) => ({ ...p, first_name: e.target.value }))
              }
              disabled={readOnly}
              className="h-12 w-[410px]"
            />

            <Input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) =>
                setForm((p) => ({ ...p, last_name: e.target.value }))
              }
              disabled={readOnly}
              className="h-12 w-[410px]"
            />

            <select
              value={form.departmentId}
              onChange={(e) =>
                setForm((p) => ({ ...p, departmentId: e.target.value }))
              }
              disabled={readOnly}
              className="h-12 w-[410px] rounded-md border bg-background px-3 text-sm"
            >
              <option value="">Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>

            <select
              value={form.positionId}
              onChange={(e) =>
                setForm((p) => ({ ...p, positionId: e.target.value }))
              }
              disabled={readOnly}
              className="h-12 w-[410px] rounded-md border bg-background px-3 text-sm"
            >
              <option value="">Position</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button (right, 410px wide like in mock) */}
          <div className="mt-10 flex w-full justify-end">
            <Button
              type="submit"
              variant="destructive"
              size="lg"
              disabled={disabled}
              className="h-12 w-[410px] rounded-full"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
