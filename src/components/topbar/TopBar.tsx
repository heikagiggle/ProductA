import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const TopBar = ({ searchTerm, setSearchTerm }: TopBarProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap items-center gap-4 justify-between py-4">
      <div className="flex items-center">
        <FaArrowLeft
          size={20}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>

      <div className="relative flex-1 min-w-[200px] max-w-[100%] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[461px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <FaSearch />
        </div>

        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-md px-3 py-2 pl-8 text-sm text-[#051d38] outline-none"
        />
      </div>
    </div>
  );
};

export default TopBar;
