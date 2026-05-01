import { useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { countries, countryMap } from "../lib/utils";
import { DatePickerField } from "./DatePickerField";

export type IdType =
  | "drivers_license"
  | "passport"
  | "pr_card"
  | "citizen_card"
  | "other";

export function AddIdModal() {
  const [showTypes, setShowTypes] = useState(false);
  const [idType, setIdType] = useState<IdType>("drivers_license");
  const [showCountries, setShowCountries] = useState(false);
  const [countryValue, setCountryValue] = useState("Select");
  const [issueDate, setIssueDate] = useState<Date>(new Date());
  const [expiryDate, setExpiryDate] = useState<Date>(new Date());

  function handleSubmit() {}

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center z-120`}
    >
      <div className="text-2xl text-gray-500 font-bold mb-5">
        Add Identification
      </div>
      <form onSubmit={handleSubmit} className="relative flex flex-col">
        <div className="flex my-1">
          <label htmlFor="" className="mr-2 py-1">
            Type:
          </label>
          <div
            onClick={() => setShowTypes(!showTypes)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">{idType}</div>
            <PiCaretDownBold />
          </div>
          {showTypes && (
            <div className="absolute top-10 left-11 bg-white border rounded text-left">
              <div
                onClick={() => {
                  setIdType("drivers_license");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${idType === "drivers_license" && "bg-gray-300"}`}
              >
                Driver's license
              </div>
              <div
                onClick={() => {
                  setIdType("passport");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${idType === "passport" && "bg-gray-300"}`}
              >
                Passport
              </div>
              <div
                onClick={() => {
                  setIdType("pr_card");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${idType === "pr_card" && "bg-gray-300"}`}
              >
                Permanent resident card
              </div>
              <div
                onClick={() => {
                  setIdType("citizen_card");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${idType === "citizen_card" && "bg-gray-300"}`}
              >
                Citizen card
              </div>
              <div
                onClick={() => {
                  setIdType("other");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${idType === "other" && "bg-gray-300"}`}
              >
                Other
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="ID number"
          className="border rounded my-1 px-2 py-1"
          name="idNumber"
          id="idNumber"
          required
        />
        <div className="flex my-1">
          <label htmlFor="" className="mr-2 py-1">
            Country:
          </label>
          <div
            onClick={() => setShowCountries(!showCountries)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">
              {countryMap[countryValue] ?? countryValue}
            </div>
            <PiCaretDownBold />
          </div>
          {showCountries && (
            <div className="absolute top-[87px] left-[160px] bg-white border rounded h-[300px] w-[125px] overflow-y-auto">
              {countries.map((c) => (
                <div
                  onClick={() => {
                    setCountryValue(c.value);
                    setShowCountries(false);
                  }}
                  className="cursor-pointer p-1 hover:bg-[#d0d0d0] transition-all ease-in-out duration-300"
                >
                  {c.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <DatePickerField
          label="Issue date"
          value={issueDate}
          onChange={setIssueDate}
        />
        <DatePickerField
          label="Expiry date"
          value={expiryDate}
          onChange={setExpiryDate}
        />
        <div className="my-5 flex justify-end">
          <button className="p-2 mr-1 bg-sky-500 rounded text-white bold secondary-font font-bold cursor-pointer">
            ADD
          </button>
          <div
            // onClick={() => props.setAddAddressMode(false)}
            className="p-2 ml-1 bg-gray-300 rounded bold secondary-font font-bold cursor-pointer"
          >
            CANCEL
          </div>
        </div>
      </form>
    </div>
  );
}
