import { useState } from "react";
import { Close } from "../icons/close";
import { Menu } from "../icons/menu";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="flex justify-between px-8 md:px-16 pt-8 pb-4 border-b text-[#051d38]">
        <Link to="/">
          <h1 className="font-bold text-xl cursive logo-font">ProductA</h1>
        </Link>

        <ul className="hidden md:flex gap-x-5 cursor-pointer">
          <li>Products</li>
          <li>Contact Us</li>
          <li> Login</li>
        </ul>

        <button
          className="md:hidden border border-[#051d38] rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <Close /> : <Menu />}
        </button>
      </nav>

      <div
        className={`md:hidden fixed top-24 left-0 right-0 bg-white shadow-lg transition-all duration-300 z-40 mx-10 rounded-sm ${
          menuOpen ? "h-[300px] " : "h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col text-left items-center justify-center gap-y-3 pt-16">
          <li>Products</li>
          <li>Contact Us</li>
          <li> Login</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
