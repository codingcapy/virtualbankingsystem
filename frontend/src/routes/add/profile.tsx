import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import React, { useState } from "react";
import { useCreateProfileMutation } from "../../lib/api/profiles";
import { DatePickerField } from "../../components/DatePickerField";

export const Route = createFileRoute("/add/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const { mutate: createProfile, isPending: createProfilePending } =
    useCreateProfileMutation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createProfilePending) return;
    const firstName = (e.target as HTMLFormElement).firstname.value;
    const middleName = (e.target as HTMLFormElement).middlename.value;
    const lastName = (e.target as HTMLFormElement).lastname.value;
    const email = (e.target as HTMLFormElement).emailaddress.value;
    const phoneNumber = (e.target as HTMLFormElement).phonenumber.value;
    createProfile(
      {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth: format(targetDate, "yyyy-MM-dd"),
      },
      {
        onSuccess: (data) =>
          navigate({ to: `/profile/${data.profile.profileNumber}` }),
        onError: (e) => setNotification(`Error creating profile: ${e}`),
      },
    );
  }

  return (
    <div className="flex flex-col pt-25">
      <div className="mx-auto">
        <div className="text-2xl text-sky-500 font-semibold">
          Create Profile
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col w-[500px]"
        >
          <input
            type="text"
            placeholder="First name"
            name="firstname"
            id="firstname"
            className="px-2 py-1 my-1 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Middle name"
            name="middlename"
            id="middlename"
            className="px-2 py-1 my-1 border rounded"
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastname"
            id="lastname"
            className="px-2 py-1 my-1 border rounded"
            required
          />
          <DatePickerField
            label="Date of Birth"
            value={targetDate}
            onChange={setTargetDate}
          />
          <input
            type="email"
            placeholder="Email"
            name="emailaddress"
            id="emailaddress"
            className="px-2 py-1 my-1 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            name="phonenumber"
            id="phonenumber"
            className="px-2 py-1 my-1 border rounded"
            required
          />
          <button className="bg-sky-500 rounded my-5 py-2 text-white cursor-pointer hover:bg-sky-400 transition-all ease-in-out duration-300z">
            CREATE
          </button>
        </form>
        <div>{notification}</div>
      </div>
    </div>
  );
}
