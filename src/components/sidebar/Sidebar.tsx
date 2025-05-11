import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "All Products", path: "/pages/products" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 fixed h-screen text-white bg-[#051d38] border-r p-4 hidden lg:flex flex-col justify-between">
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
        className="px-3 py-2 hover:bg-muted hover:text-[#051d38] rounded transition cursor-pointer"
      >
        Log out
      </Link>
    </aside>
  );
}
