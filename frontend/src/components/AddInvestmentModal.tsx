import { useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";

export function AddInvestmentModal() {
  const [showRelationships, setShowRelationships] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    return;
  }
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center z-120`}
    >
      <div className="text-2xl text-gray-500 font-bold mb-5">
        Create Investment
      </div>
      <form onSubmit={handleSubmit} className="relative flex flex-col">
        <div className="flex my-1">
          <label htmlFor="" className="mr-2 py-1">
            Relationship:
          </label>
          <div
            onClick={() => setShowRelationships(!showRelationships)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize"></div>
            <PiCaretDownBold />
          </div>
          {showRelationships && (
            <div className="absolute top-1 right-23 bg-white border rounded text-left"></div>
          )}
        </div>
      </form>
    </div>
  );
}
