"use client";

import { X, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skill } from "../api/getSkills";
import { SkillFormState } from "./SkillsDialog";

interface SkillDialogUIProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "update";
  form: SkillFormState;
  loading: boolean;
  disabled: boolean;
  availableSkills: Skill[];
  masteryLevels: { label: string; value: string }[];
  onSkillChange: (name: string) => void;
  onMasteryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SkillDialogUI = ({
  open,
  onOpenChange,
  mode,
  form,
  loading,
  disabled,
  availableSkills,
  masteryLevels,
  onSkillChange,
  onMasteryChange,
  onSubmit,
}: SkillDialogUIProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[680px] border border-[#4F4F4F] bg-[#2F2F2F] p-0 text-white shadow-2xl [&>button]:hidden">
        <div className="px-8 pt-7 pb-8">
          <DialogHeader className="mb-8 flex flex-row items-start justify-between space-y-0">
            <DialogTitle className="text-[22px] font-semibold text-white">
              {mode === "add" ? "Add skill" : "Update skill"}
            </DialogTitle>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-white/90 transition hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>
          </DialogHeader>

          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-[#BEBEBE]">Skill</label>

              <div className="relative">
                <select
                  value={form.name}
                  onChange={(e) => onSkillChange(e.target.value)}
                  disabled={mode === "update" || loading}
                  className="h-[56px] w-full appearance-none border border-[#666666] bg-transparent px-4 pr-12 text-[18px] text-white outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="" disabled className="text-black">
                    {availableSkills.length === 0
                      ? "No available skills"
                      : "Select skill"}
                  </option>
                  {availableSkills.map((skill) => (
                    <option
                      key={skill.id}
                      value={skill.name}
                      className="text-black"
                    >
                      {skill.name}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#8C8C8C]" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-[#BEBEBE]">
                Skill mastery
              </label>

              <div className="relative">
                <select
                  value={form.mastery}
                  onChange={(e) => onMasteryChange(e.target.value)}
                  disabled={loading}
                  className="h-[56px] w-full appearance-none border border-[#666666] bg-transparent px-4 pr-12 text-[18px] text-white outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="" disabled className="text-black">
                    Select mastery
                  </option>
                  {masteryLevels.map((level) => (
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
                  variant="destructive"
                  className="h-[56px] flex-1 rounded-full border-0 text-[16px] font-semibold uppercase tracking-[0.04em]"
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
