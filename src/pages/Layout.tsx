import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { SidebarContent } from "../components/sidebar/SidebarContent";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-[#051d38] text-white w-64 h-full p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setMenuOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 p-4 overflow-y-auto mx-4 lg:ml-[25%] xl:ml-[18%]">
        <div className="lg:hidden mb-14">
          <button onClick={() => setMenuOpen(true)}>
            <FiMenu size={24} />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
