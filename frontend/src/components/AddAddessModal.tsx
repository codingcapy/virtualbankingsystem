import { useRef, useState, type SetStateAction } from "react";
import { useCreateAddressMutation } from "../lib/api/addresses";
import { useNavigate } from "@tanstack/react-router";
import { PiCaretDownBold } from "react-icons/pi";
import { countries, countryMap } from "../lib/utils";

export type AddressType = "home" | "billing" | "mailing" | "other";

export function AddAddressModal(props: {
  setAddAddressMode: (value: SetStateAction<boolean>) => void;
  profileNumber: number;
}) {
  const {
    mutate: createAddress,
    isPending: createAddressPending,
    error: createAddressError,
  } = useCreateAddressMutation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [addressType, setAddressType] = useState<AddressType>("home");
  const [showTypes, setShowTypes] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [countryValue, setCountryValue] = useState("Select");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createAddressPending) return;
    if (countryValue === "Select") return;
    const line1 = (e.target as HTMLFormElement).line1.value.toString();
    const line2 = (e.target as HTMLFormElement).line2.value;
    const city = (e.target as HTMLFormElement).city.value;
    const region = (e.target as HTMLFormElement).region.value;
    const country = countryValue;
    const postalCode = (e.target as HTMLFormElement).postalCode.value;
    createAddress(
      {
        profileNumber: props.profileNumber,
        type: addressType,
        line1,
        line2,
        city,
        region,
        country,
        postalCode,
      },
      {
        onSuccess: (data) => props.setAddAddressMode(false),
        onError: (e) => setNotification(`Error creating address: ${e}`),
      },
    );
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center z-120`}
    >
      <div className="text-2xl text-gray-500 font-bold mb-5">Add Address</div>
      <form onSubmit={handleSubmit} className="relative flex flex-col">
        <div className="flex my-1">
          <label htmlFor="" className="mr-2 py-1">
            Type:
          </label>
          <div
            onClick={() => setShowTypes(!showTypes)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">{addressType}</div>
            <PiCaretDownBold />
          </div>
          {showTypes && (
            <div className="absolute top-10 left-11 bg-white border rounded text-left">
              <div
                onClick={() => {
                  setAddressType("home");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${addressType === "home" && "bg-gray-300"}`}
              >
                Home
              </div>
              <div
                onClick={() => {
                  setAddressType("mailing");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${addressType === "mailing" && "bg-gray-300"}`}
              >
                Mailing
              </div>
              <div
                onClick={() => {
                  setAddressType("billing");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${addressType === "billing" && "bg-gray-300"}`}
              >
                Billing
              </div>
              <div
                onClick={() => {
                  setAddressType("other");
                  setShowTypes(false);
                }}
                className={`px-2 py-1 cursor-pointer ${addressType === "other" && "bg-gray-300"}`}
              >
                Other
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Address line 1"
          className="border rounded my-1 px-2 py-1"
          name="line1"
          id="line1"
          required
        />
        <input
          type="text"
          placeholder="Address line 2"
          className="border rounded my-1 px-2 py-1"
          name="line2"
          id="line2"
        />
        <input
          type="text"
          placeholder="City"
          className="border rounded my-1 px-2 py-1"
          name="city"
          id="city"
          required
        />
        <input
          type="text"
          placeholder="Region/Province/State"
          className="border rounded my-1 px-2 py-1"
          name="region"
          id="region"
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
            <div className="absolute top-[211px] left-[160px] bg-white border rounded h-[300px] w-[125px] overflow-y-auto">
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
        <input
          type="text"
          placeholder="Postal code"
          className="border rounded my-1 px-2 py-1"
          name="postalCode"
          id="postalCode"
          required
        />
        <div className="my-5 flex justify-end">
          <button className="p-2 mr-1 bg-sky-500 rounded text-white bold secondary-font font-bold cursor-pointer">
            ADD
          </button>
          <div
            onClick={() => props.setAddAddressMode(false)}
            className="p-2 ml-1 bg-gray-300 rounded bold secondary-font font-bold cursor-pointer"
          >
            CANCEL
          </div>
        </div>
      </form>
    </div>
  );
}
