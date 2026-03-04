"use client";

interface SkillBarProps {
  mastery: "Novice" | "Advanced" | "Competent" | "Proficient" | "Expert";
}

export const SkillBar = ({ mastery }: SkillBarProps) => {
  const masteryStyles: Record<string, { width: string; color: string }> = {
    Novice: { width: "20%", color: "bg-green-400" },
    Advanced: { width: "40%", color: "bg-blue-400" },
    Competent: { width: "60%", color: "bg-yellow-400" },
    Proficient: { width: "80%", color: "bg-orange-400" },
    Expert: { width: "100%", color: "bg-red-500" },
  };

  const style = masteryStyles[mastery];

  return (
    <div className="h-1 bg-gray-300 rounded-full w-20">
      <div
        className={`${style.color} h-full rounded-full`}
        style={{ width: style.width }}
      />
    </div>
  );
};
