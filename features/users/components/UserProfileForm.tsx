"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  if (!createdAt) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toDateString();
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
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[852px] flex-col items-center pb-10"
    >
      <div className="flex w-full justify-center">
        <AvatarUploadBlock
          avatar={avatar}
          fullName={fullName}
          userEmail={userEmail}
          disabled={readOnly || loading}
          onUpload={onUploadAvatar}
        />
      </div>

      <div className="mt-6 text-center">
        <div className="text-[22px] font-semibold text-foreground leading-tight">
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

      <div className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-6">
        <Input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) =>
            setForm((p) => ({ ...p, first_name: e.target.value }))
          }
          disabled={readOnly}
          className="h-12 w-full"
        />

        <Input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) =>
            setForm((p) => ({ ...p, last_name: e.target.value }))
          }
          disabled={readOnly}
          className="h-12 w-full"
        />

        <Select
          value={form.departmentId || undefined}
          onValueChange={(value) =>
            setForm((p) => ({ ...p, departmentId: value }))
          }
          disabled={readOnly}
        >
          <SelectTrigger className="!h-12 w-full bg-transparent text-sm">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            <SelectGroup>
              {departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={form.positionId || undefined}
          onValueChange={(value) =>
            setForm((p) => ({ ...p, positionId: value }))
          }
          disabled={readOnly}
        >
          <SelectTrigger className="!h-12 w-full bg-transparent text-sm">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            <SelectGroup>
              {positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  {position.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
  );
};
