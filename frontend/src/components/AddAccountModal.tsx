import { useEffect, useState } from "react";
import type { AddMode } from "../routes/profile/$profileNumber";
import { PiCaretDownBold } from "react-icons/pi";
import type { AccountTypes } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getRelationshipsByProfileNumberQueryOptions } from "../lib/api/relationships";

export function AddAccountModal(props: {
  setAddMode: React.Dispatch<React.SetStateAction<AddMode>>;
  profileNumber: number;
}) {
  const [showRelationships, setShowRelationships] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState<
    number | null
  >(null);
  const [selectedType, setSelectedType] = useState<AccountTypes>("chequing");
  const {
    data: relationships,
    isLoading: relationshipsLoading,
    error: relationshipsError,
  } = useQuery(
    getRelationshipsByProfileNumberQueryOptions(props.profileNumber),
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  useEffect(() => {
    if (relationships && selectedRelationship === null) {
      setSelectedRelationship(relationships[0].relationshipNumber);
    }
  }, [relationships, selectedRelationship]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center z-120`}
    >
      <div className="text-2xl text-gray-500 font-bold mb-5">
        Create Account
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
            <div className="mr-2 capitalize">
              {relationshipsLoading ? (
                <div>Loading...</div>
              ) : relationshipsError ? (
                <div>Error</div>
              ) : relationships?.length ? (
                <div>{String(selectedRelationship).padStart(8, "0")}</div>
              ) : (
                <div></div>
              )}
            </div>
            <PiCaretDownBold />
          </div>
          {showRelationships && (
            <div className="absolute top-1 right-23 bg-white border rounded text-left">
              {relationshipsLoading ? (
                <div>Loading...</div>
              ) : relationshipsError ? (
                <div>Error</div>
              ) : relationships ? (
                relationships.map((r) => (
                  <div
                    onClick={() => {
                      setSelectedRelationship(r.relationshipNumber);
                      setShowRelationships(false);
                    }}
                    className={`px-2 py-1 cursor-pointer ${selectedType === "high_interest_saving" && "bg-gray-300"}`}
                  >
                    {String(r.relationshipNumber).padStart(8, "0")}
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
        <div className="flex my-1">
          <label htmlFor="" className="mr-2 py-1">
            Type:
          </label>
          <div
            onClick={() => setShowTypes(!showTypes)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">{selectedType}</div>
            <PiCaretDownBold />
          </div>
          {showTypes && (
            <div className="absolute top-10 left-11 bg-white border rounded text-left">
              <div
                onClick={() => {
                  setSelectedType("chequing");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "chequing" && "bg-gray-300"}`}
              >
                Chequing
              </div>
              <div
                onClick={() => {
                  setSelectedType("premium_chequing");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "premium_chequing" && "bg-gray-300"}`}
              >
                Premium Chequing
              </div>
              <div
                onClick={() => {
                  setSelectedType("saving");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "saving" && "bg-gray-300"}`}
              >
                Saving
              </div>
              <div
                onClick={() => {
                  setSelectedType("high_interest_saving");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "high_interest_saving" && "bg-gray-300"}`}
              >
                High Interest Saving
              </div>
            </div>
          )}
        </div>
        <div className="flex my-1">
          <label htmlFor="" className="mr-2 py-1">
            Currency:
          </label>
          <div
            onClick={() => setShowCurrencies(!showCurrencies)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">CAD</div>
            <PiCaretDownBold />
          </div>
        </div>
        <div className="my-5 flex justify-end">
          <button className="p-2 mr-1 bg-sky-500 rounded text-white bold secondary-font font-bold cursor-pointer">
            ADD
          </button>
          <div
            onClick={() => props.setAddMode("none")}
            className="p-2 ml-1 bg-gray-300 rounded bold secondary-font font-bold cursor-pointer"
          >
            CANCEL
          </div>
        </div>
      </form>
    </div>
  );
}
