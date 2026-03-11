"use client";

import { useState } from "react";
import { PlusIcon, Trash2 } from "lucide-react";
import { Preloader } from "@/components/ui/Preloader";

import {
  useGetProfileLanguages,
  ProfileLanguage,
} from "../api/getProfileLanguages";
import { useGetLanguages } from "../api/getLanguages";
import { useAddProfileLanguage } from "../api/addProfileLanguage";
import { useUpdateProfileLanguage } from "../api/updateProfileLanguage";
import { useDeleteProfileLanguage } from "../api/deleteProfileLanguage";
import { LanguageDialog, LanguageFormState } from "./LanguageDialog";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

export const UserLanguages = ({ userId }: { userId: string }) => {
  const currentUserId = getUserIdFromToken()?.toString();
  const readOnly = currentUserId !== userId;

  const {
    data: profileData,
    loading: profileLoading,
    refetch,
  } = useGetProfileLanguages(userId);

  const { data: allLanguagesData, loading: langsLoading } = useGetLanguages();

  const [addLanguage] = useAddProfileLanguage();
  const [updateLanguage] = useUpdateProfileLanguage();
  const [deleteLanguage] = useDeleteProfileLanguage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [editingLang, setEditingLang] = useState<LanguageFormState | undefined>(
    undefined,
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const loading = profileLoading || langsLoading;
  const userLanguages = profileData?.profile?.languages || [];
  const allLanguages = allLanguagesData?.languages || [];

  if (loading) return <Preloader />;

  const handleOpenAdd = () => {
    if (readOnly) return;
    setDialogMode("add");
    setEditingLang(undefined);
    setIsDeleteMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenUpdate = (lang: ProfileLanguage) => {
    if (readOnly || isDeleteMode) return;

    setDialogMode("update");
    setEditingLang({
      name: lang.name,
      proficiency: lang.proficiency,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (name: string) => {
    if (readOnly) return;

    try {
      await deleteLanguage({
        variables: {
          userId,
          name: [name],
        },
      });

      await refetch();
    } catch (error) {
      console.log("Delete language error:", error);
    }
  };

  const handleSubmit = async (values: LanguageFormState) => {
    if (readOnly) return;

    try {
      if (dialogMode === "add") {
        await addLanguage({
          variables: {
            userId,
            name: values.name,
            proficiency: values.proficiency,
          },
        });
      } else {
        await updateLanguage({
          variables: {
            userId,
            name: values.name,
            proficiency: values.proficiency,
          },
        });
      }

      await refetch();
      setIsDialogOpen(false);
    } catch (error) {
      console.log("Language mutation error:", error);
    }
  };

  const getProficiencyColor = (level: string) => {
    if (["A1", "A2"].includes(level)) return "text-[#F59E0B]";
    if (["B1", "B2"].includes(level)) return "text-[#22C55E]";
    if (["C1", "C2", "Native", "NATIVE"].includes(level))
      return "text-[#EF4444]";
    return "text-foreground";
  };

  return (
    <>
      <div className="flex w-full flex-col gap-10">
        {!readOnly && (
          <div className="flex items-center justify-end gap-10">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="flex items-center gap-3 text-sm uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add language</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteMode((prev) => !prev)}
              className="flex items-center gap-3 text-sm uppercase text-red-500 transition-colors hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              <span>Remove languages</span>
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-20 gap-y-8">
          {userLanguages.length === 0 ? (
            <p className="italic text-muted-foreground">
              No languages added yet.
            </p>
          ) : (
            userLanguages.map((lang) => (
              <div
                key={lang.name}
                className={`flex items-center gap-4 ${
                  !readOnly && !isDeleteMode
                    ? "cursor-pointer transition-opacity hover:opacity-80"
                    : ""
                }`}
                onClick={() => handleOpenUpdate(lang)}
              >
                <span
                  className={`text-[18px] font-semibold ${getProficiencyColor(
                    lang.proficiency,
                  )}`}
                >
                  {lang.proficiency}
                </span>

                <span className="text-[18px] text-foreground">{lang.name}</span>

                {!readOnly && isDeleteMode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(lang.name);
                    }}
                    className="ml-1 text-red-500 transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {!readOnly && (
        <LanguageDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          mode={dialogMode}
          initialData={editingLang}
          allLanguages={allLanguages}
          userLanguages={userLanguages}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};
