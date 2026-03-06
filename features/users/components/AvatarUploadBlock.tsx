"use client";

import { useId, useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  avatar: string | null;
  fullName: string;
  userEmail: string;
  disabled?: boolean;
  onUpload?: (file: File) => Promise<void> | void;
};

const MAX_SIZE = 500 * 1024; // 500KB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif"];

export const AvatarUploadBlock = ({
  avatar,
  fullName,
  userEmail,
  disabled = false,
  onUpload,
}: Props) => {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  const fallbackLetter = (fullName?.[0] || userEmail?.[0] || "U").toUpperCase();

  const validateFile = (file: File) => {
    if (file.size > MAX_SIZE) {
      alert("File is too large. Max size is 500KB.");
      return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Unsupported file type. Use png/jpg/jpeg/gif.");
      return false;
    }
    return true;
  };

  const handleFile = async (file: File) => {
    if (disabled) return;
    if (!validateFile(file)) return;
    await onUpload?.(file);
  };

  return (
    <div className="flex items-center gap-10">
      <Input
        id={inputId}
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/gif"
        className="hidden"
        disabled={disabled}
        onChange={async (e) => {
          const input = e.currentTarget;
          const file = e.target.files?.[0];
          if (!file) return;

          try {
            await handleFile(file);
          } finally {
            input.value = "";
          }
        }}
      />

      {/* Dropzone */}
      <div
        className={[
          "rounded-full p-1 transition-colors",
          disabled ? "cursor-not-allowed opacity-60" : "",
          isDragging ? "ring-2 ring-foreground/30 bg-foreground/5" : "ring-0",
        ].join(" ")}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragEnter={(e) => {
          if (disabled) return;
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={async (e) => {
          if (disabled) return;
          e.preventDefault();
          setIsDragging(false);

          const file = e.dataTransfer.files?.[0];
          if (!file) return;

          await handleFile(file);
        }}
        title={disabled ? "Read-only" : "Click to upload / Drop file"}
      >
        <label
          htmlFor={inputId}
          className={disabled ? "pointer-events-none" : "cursor-pointer"}
        >
          <Avatar className="h-28 w-28 bg-gray-200">
            <AvatarImage src={avatar ?? undefined} alt="User avatar" />
            <AvatarFallback className="text-3xl font-semibold text-gray-600">
              {fallbackLetter}
            </AvatarFallback>
          </Avatar>
        </label>
      </div>

      <label
        htmlFor={inputId}
        className={[
          "flex items-start gap-3 select-none",
          disabled ? "pointer-events-none opacity-60" : "cursor-pointer",
        ].join(" ")}
        title={disabled ? "Read-only" : "Upload avatar"}
      >
        <Upload className="mt-1 h-6 w-6 text-foreground/80" />

        <div className="leading-tight">
          <div className="text-base font-semibold text-foreground">
            Upload avatar image
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            png, jpg or gif no more than 0.5MB
          </div>

          {isDragging && !disabled && (
            <div className="mt-2 text-sm text-destructive">
              Drop the image here
            </div>
          )}
        </div>
      </label>
    </div>
  );
};
