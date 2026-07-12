import { useEffect, useState } from "react";
import type { AddMode } from "../routes/profile/$profileNumber";
import { PiCaretDownBold } from "react-icons/pi";
import type { AccountTypes } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getRelationshipsByProfileNumberQueryOptions } from "../lib/api/relationships";
import { useCreateAccountMutation } from "../lib/api/accounts";
import type { Relationship } from "@server/schemas/relationships";

type MenuMode = "none" | "relationship" | "type" | "currency";
type Currency = "CAD" | "USD";

export function AddAccountModal(props: {
  setAddMode: React.Dispatch<React.SetStateAction<AddMode>>;
  profileNumber: number;
  relationships: Relationship[];
}) {
  const [selectedRelationship, setSelectedRelationship] = useState(
    props.relationships[0].relationshipNumber,
  );
  const [selectedType, setSelectedType] = useState<AccountTypes>("chequing");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("CAD");
  const {
    data: relationships,
    isLoading: relationshipsLoading,
    error: relationshipsError,
  } = useQuery(
    getRelationshipsByProfileNumberQueryOptions(props.profileNumber),
  );
  const [menuMode, setMenuMode] = useState<MenuMode>("none");
  const { mutate: createAccount, isPending: createAccountPending } =
    useCreateAccountMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createAccount({
      relationshipNumber: selectedRelationship,
      type: selectedType,
      currency: selectedCurrency,
    });
  }

  useEffect(() => {
    if (
      relationships &&
      relationships.length &&
      selectedRelationship === null
    ) {
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
            onClick={() => setMenuMode("relationship")}
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
          {menuMode === "relationship" && (
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
                      setMenuMode("none");
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
            onClick={() => setMenuMode("type")}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">{selectedType}</div>
            <PiCaretDownBold />
          </div>
          {menuMode === "type" && (
            <div className="absolute top-11 right-18 bg-white border rounded text-left">
              <div
                onClick={() => {
                  setSelectedType("chequing");
                  setMenuMode("none");
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "chequing" && "bg-gray-300"}`}
              >
                Chequing
              </div>
              <div
                onClick={() => {
                  setSelectedType("premium_chequing");
                  setMenuMode("none");
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "premium_chequing" && "bg-gray-300"}`}
              >
                Premium Chequing
              </div>
              <div
                onClick={() => {
                  setSelectedType("saving");
                  setMenuMode("none");
                }}
                className={`px-2 py-1 cursor-pointer ${selectedType === "saving" && "bg-gray-300"}`}
              >
                Saving
              </div>
              <div
                onClick={() => {
                  setSelectedType("high_interest_saving");
                  setMenuMode("none");
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
            onClick={() => setMenuMode("currency")}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">{selectedCurrency}</div>
            <PiCaretDownBold />
          </div>
        </div>
        {menuMode === "currency" && (
          <div className="absolute bottom-13 left-40 bg-white border rounded text-left">
            <div
              onClick={() => {
                setSelectedCurrency("CAD");
                setMenuMode("none");
              }}
              className={`px-2 py-1 cursor-pointer ${selectedCurrency === "CAD" && "bg-gray-300"}`}
            >
              CAD
            </div>
            <div
              onClick={() => {
                setSelectedCurrency("USD");
                setMenuMode("none");
              }}
              className={`px-2 py-1 cursor-pointer ${selectedCurrency === "USD" && "bg-gray-300"}`}
            >
              USD
            </div>
          </div>
        )}
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
