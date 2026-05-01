import { useState, type SetStateAction } from "react";
import { useCreateAddressMutation } from "../lib/api/addresses";
import { useNavigate } from "@tanstack/react-router";
import { PiCaretDownBold } from "react-icons/pi";

export type AddressType = "home" | "billing" | "mailing" | "other";

export function AddAddressModal(props: {
  setAddAddressMode: (value: SetStateAction<boolean>) => void;
  profileNumber: number;
}) {
  const {
    mutate: createaAddress,
    isPending: createAddressPending,
    error: createAddressError,
  } = useCreateAddressMutation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [addressType, setAddressType] = useState<AddressType>("home");
  const [showTypes, setShowTypes] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createAddressPending) return;
    const line1 = (e.target as HTMLFormElement).firstname.value.toString();
    const line2 = (e.target as HTMLFormElement).middlename.value;
    const city = (e.target as HTMLFormElement).lastname.value;
    const region = (e.target as HTMLFormElement).emailaddress.value;
    const country = (e.target as HTMLFormElement).phonenumber.value;
    const postalCode = (e.target as HTMLFormElement).phonenumber.value;
    createaAddress(
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
            onClick={() => setShowTypes(true)}
            className="border rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          >
            <div className="mr-2 capitalize">{addressType}</div>
            <PiCaretDownBold />
          </div>
          {showTypes && (
            <div className="absolute top-10 left-11 bg-white border rounded text-left">
              <div className="px-2 py-1">Mailing</div>
              <div className="px-2 py-1">Billing</div>
              <div className="px-2 py-1">Home</div>
              <div className="px-2 py-1">Other</div>
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
          required
        />
        <input
          type="text"
          placeholder="City"
          className="border rounded my-1 px-2 py-1"
          required
        />
        <input
          type="text"
          placeholder="Region/Province/State"
          className="border rounded my-1 px-2 py-1"
          required
        />
        <input
          type="text"
          placeholder="Country"
          className="border rounded my-1 px-2 py-1"
          required
        />
        <input
          type="text"
          placeholder="Postal code"
          className="border rounded my-1 px-2 py-1"
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
