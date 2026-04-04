import { FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export function LeftNav() {
  return (
    <div className="fixed top-0 left-0 h-screen w-[200px] bg-gray-200 z-20 border-r border-r-[#a0a0a0]">
      <div className="flex w-full pl-5 py-2 mt-25 hover:bg-gray-300 transition-all ease-in-out duration-300 cursor-pointer">
        <FaHome size={20} />
        <div className="pl-2">Home</div>
      </div>
      <div className="flex w-full pl-5 py-2 hover:bg-gray-300 transition-all ease-in-out duration-300 cursor-pointer">
        <IoSearch size={20} />
        <div className="pl-2">Search</div>
      </div>
    </div>
  );
}
