import Link from "next/link";
import { JSX } from "react/jsx-dev-runtime";

interface MobileNavProps {
  navItems: { label: string; href: string, icon: JSX.Element }[];
  pathname: string;
}

export function MobileNav({ navItems, pathname }: MobileNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t">
      <div className="flex justify-between py-2 px-4">
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
      </div>
    </div>
  );
}
