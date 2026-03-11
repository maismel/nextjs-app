"use client";

import { useEffect, useMemo, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PROFICIENCY_LEVELS = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
  { label: "C2", value: "C2" },
  { label: "Native", value: "NATIVE" },
];

export type LanguageFormState = {
  name: string;
  proficiency: string;
};

interface LanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "update";
  initialData?: LanguageFormState;
  allLanguages: { name: string }[];
  userLanguages: { name: string }[];
  onSubmit: (values: LanguageFormState) => Promise<void>;
}

export const LanguageDialog = ({
  open,
  onOpenChange,
  mode,
  initialData,
  allLanguages,
  userLanguages,
  onSubmit,
}: LanguageDialogProps) => {
  const [form, setForm] = useState<LanguageFormState>({
    name: "",
    proficiency: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initialData || {
          name: "",
          proficiency: "",
        },
      );
    }
  }, [open, initialData]);

  const availableLanguages = useMemo(() => {
    if (mode === "update") {
      return allLanguages.filter((lang) => lang.name === initialData?.name);
    }

    return allLanguages.filter(
      (lang) => !userLanguages.some((userLang) => userLang.name === lang.name),
    );
  }, [allLanguages, userLanguages, mode, initialData]);

  const isChanged =
    form.name !== initialData?.name ||
    form.proficiency !== initialData?.proficiency;

  const isValid = form.name.trim() && form.proficiency.trim();
  const disabled = loading || !isValid || (mode === "update" && !isChanged);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    setLoading(true);
    try {
      await onSubmit(form);
    } catch (error) {
      console.log("Submit language error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[680px] border border-[#4F4F4F] bg-[#2F2F2F] p-0 text-white shadow-2xl [&>button]:hidden">
        <div className="px-8 pt-7 pb-8">
          <DialogHeader className="mb-8 flex flex-row items-start justify-between space-y-0">
            <DialogTitle className="text-[22px] font-semibold text-white">
              {mode === "add" ? "Add language" : "Update language"}
            </DialogTitle>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-white/90 transition hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-[#BEBEBE]">Language</label>

              <div className="relative">
                <select
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  disabled={mode === "update" || loading}
                  className="h-[56px] w-full appearance-none border border-[#666666] bg-transparent px-4 pr-12 text-[18px] text-white outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="" disabled className="text-black">
                    Select language
                  </option>
                  {availableLanguages.map((lang) => (
                    <option
                      key={lang.name}
                      value={lang.name}
                      className="text-black"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-[#BEBEBE]">
                Language proficiency
              </label>

              <div className="relative">
                <select
                  value={form.proficiency}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      proficiency: e.target.value,
                    }))
                  }
                  disabled={loading}
                  className="h-[56px] w-full appearance-none border border-[#666666] bg-transparent px-4 pr-12 text-[18px] text-white outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="" disabled className="text-black">
                    Select proficiency
                  </option>
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option
                      key={level.value}
                      value={level.value}
                      className="text-black"
                    >
                      {level.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]" />
              </div>
            </div>

            <div className="pt-3">
              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                  className="h-[56px] flex-1 rounded-full border border-[#5A5A5A] bg-transparent text-[16px] font-semibold uppercase tracking-[0.04em] text-[#8F8F8F] hover:bg-transparent hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={disabled}
                  className="h-[56px] flex-1 rounded-full border-0 bg-[#D32F2F] text-[16px] font-semibold uppercase tracking-[0.04em] text-white hover:bg-[#C62828] disabled:bg-[#7C2D2D] disabled:text-white/70"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
