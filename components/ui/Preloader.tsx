"use client";

import { Spinner } from "@/components/ui/spinner";

export const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <Spinner className="w-16 h-16 text-white animate-spin" />
    </div>
  );
};
