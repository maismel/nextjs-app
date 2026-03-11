"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { ProfileLanguage } from "../api/getProfileLanguages";
import { LanguageFormState } from "./LanguageDialog";

interface Props {
  languages: ProfileLanguage[];
  isEditable: boolean;
  onAdd: () => void;
  onUpdate: (lang: LanguageFormState) => void;
  onDelete: (name: string) => void;
}

const getProficiencyColor = (level: string) => {
  if (["A1", "A2", "B1", "B2"].includes(level)) return "text-green-500";
  if (level === "Native") return "text-red-500";
  return "text-yellow-500"; // C1, C2
};

export const UserLanguagesUI = ({
  languages,
  isEditable,
  onAdd,
  onUpdate,
  onDelete,
}: Props) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  return (
    <div className="flex flex-col relative w-full">
      {isEditable && (
        <div className="absolute top-0 right-0 flex items-center gap-6">
          <Button
            onClick={onAdd}
            className="flex items-center text-sm text-gray-400 hover:text-gray-200 transition-colors uppercase"
          >
            <PlusIcon className="w-4 h-4 mr-2" /> Add language
          </Button>

          <Button
            onClick={() => setIsDeleteMode(!isDeleteMode)}
            className={`flex items-center text-sm transition-colors uppercase ${
              isDeleteMode
                ? "text-red-400 font-bold"
                : "text-red-500 hover:text-red-400"
            }`}
          >
            <Trash2 className="w-4 h-4 mr-2" /> Remove languages
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-12 mt-12">
        {languages.length === 0 && (
          <span className="text-gray-500 italic">No languages added yet.</span>
        )}

        {languages.map((lang) => (
          <div
            key={lang.name}
            className={`flex items-center gap-3 text-base ${
              isEditable && !isDeleteMode
                ? "cursor-pointer hover:opacity-80 transition-opacity"
                : ""
            }`}
            onClick={() => {
              if (isEditable && !isDeleteMode) {
                onUpdate({
                  name: lang.name,
                  proficiency: lang.proficiency,
                });
              }
            }}
          >
            <span
              className={`font-medium ${getProficiencyColor(lang.proficiency)}`}
            >
              {lang.proficiency}
            </span>
            <span className="text-gray-300">{lang.name}</span>

            {isDeleteMode && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(lang.name);
                }}
                className="p-1 ml-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                title="Delete language"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
