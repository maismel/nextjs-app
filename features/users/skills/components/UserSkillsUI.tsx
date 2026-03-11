"use client";

import { PlusIcon, Trash2 } from "lucide-react";
import { ProfileSkill } from "../api/getProfileSkills";

export type GroupedSkill = {
  categoryName: string;
  skills: ProfileSkill[];
};

interface UserSkillsUIProps {
  readOnly: boolean;
  groupedSkills: GroupedSkill[];
  isDeleteMode: boolean;
  onAdd: () => void;
  onToggleDeleteMode: () => void;
  onUpdate: (skill: ProfileSkill) => void;
  onDelete: (name: string) => void;
  getMasteryStyles: (mastery: string) => {
    fillColor: string;
    trackColor: string;
    width: string;
  };
}

export const UserSkillsUI = ({
  readOnly,
  groupedSkills,
  isDeleteMode,
  onAdd,
  onToggleDeleteMode,
  onUpdate,
  onDelete,
  getMasteryStyles,
}: UserSkillsUIProps) => {
  return (
    <div className="flex w-full flex-col gap-10">
      {!readOnly && (
        <div className="flex items-center justify-end gap-10">
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-3 text-sm uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add skill</span>
          </button>

          <button
            type="button"
            onClick={onToggleDeleteMode}
            className="flex items-center gap-3 text-sm uppercase text-red-500 transition-colors hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove skills</span>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-12">
        {groupedSkills.length === 0 ? (
          <p className="italic text-muted-foreground">No skills added yet.</p>
        ) : (
          groupedSkills.map((group) => (
            <div key={group.categoryName} className="flex flex-col gap-6">
              <h3 className="text-sm text-foreground">{group.categoryName}</h3>

              <div className="flex flex-wrap items-center gap-x-20 gap-y-8">
                {group.skills.map((skill) => {
                  const masteryStyles = getMasteryStyles(skill.mastery);

                  return (
                    <div
                      key={skill.name}
                      className={`flex items-center gap-3 ${
                        !readOnly && !isDeleteMode
                          ? "cursor-pointer transition-opacity hover:opacity-80"
                          : ""
                      }`}
                      onClick={() => onUpdate(skill)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="relative h-[4px] w-[92px]"
                          style={{ backgroundColor: masteryStyles.trackColor }}
                        >
                          <div
                            className="h-full"
                            style={{
                              width: masteryStyles.width,
                              backgroundColor: masteryStyles.fillColor,
                            }}
                          />
                        </div>

                        <span className="text-base text-foreground">
                          {skill.name}
                        </span>
                      </div>

                      {!readOnly && isDeleteMode && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(skill.name);
                          }}
                          className="ml-1 text-red-500 transition-colors hover:text-red-400"
                          aria-label={`Delete ${skill.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
