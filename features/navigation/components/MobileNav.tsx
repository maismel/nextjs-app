import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { JSX } from "react/jsx-dev-runtime";

interface MobileNavProps {
  navItems: { label: string; href: string; icon: JSX.Element }[];
  pathname: string;
  onLogout: () => void;
}

export function MobileNav({ navItems, pathname, onLogout }: MobileNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-accent">
      <div className="flex justify-between items-center py-2 px-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between gap-4 py-2 px-6 rounded-full text-lg ${
                active ? "text-primary bg-gray-200" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <Button
          variant="ghost"
          className="text-muted-foreground flex justify-start"
          onClick={onLogout}
        >
          <ChevronLeftIcon />
        </Button>
      </div>
    </div>
  );
}
