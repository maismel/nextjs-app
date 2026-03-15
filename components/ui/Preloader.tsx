"use client";

"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export const Preloader = ({ loading }: { loading: boolean }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      timer = setTimeout(() => setShow(true), 200); // delay 200ms
    } else {
      timer = setTimeout(() => setShow(false), 0); // отложенное скрытие
    }

    return () => clearTimeout(timer);
  }, [loading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50">
      <Spinner className="w-16 h-16 text-destructive animate-spin" />
    </div>
  );
};
