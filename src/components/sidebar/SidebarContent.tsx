import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "All Products", path: "/pages/products" },
];

export const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xl font-bold mb-6 logo-font px-3">ProductA</h1>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={cn(
                  "px-3 py-2 rounded hover:bg-muted hover:text-[#051d38] transition",
                  isActive && "bg-muted text-[#051d38] font-semibold"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link
        to="/"
        onClick={onNavigate}
        className="mt-6 px-3 py-2 hover:bg-muted hover:text-[#051d38] rounded transition cursor-pointer"
      >
        Log out
      </Link>
    </div>
  );
};
