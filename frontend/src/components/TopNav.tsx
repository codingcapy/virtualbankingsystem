export function TopNav() {
  return (
    <div className="fixed top-0 left-0 w-screen flex justify-between bg-gray-300 p-2 border-b border-b-[#a0a0a0]">
      <div></div>
      <div className="flex">
        <div className="mx-2 px-5 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-white transition-all ease-in-out duration-300">
          + Create relationship
        </div>
        <div className="px-5 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-white transition-all ease-in-out duration-300">
          + Create profile
        </div>
      </div>
    </div>
  );
}
