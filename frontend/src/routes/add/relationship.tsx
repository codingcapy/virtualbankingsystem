import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCreateRelationshipMutation } from "../../lib/api/relationships";

export const Route = createFileRoute("/add/relationship")({
  component: RouteComponent,
});

type Role = "owner" | "co_owner" | "poa" | "beneficiary" | "authorized_user";

type ProfileEntry = { profileNumber: string; role: Role };

const ROLES: Role[] = [
  "owner",
  "co_owner",
  "poa",
  "beneficiary",
  "authorized_user",
];

function RouteComponent() {
  const [profiles, setProfiles] = useState<ProfileEntry[]>([
    { profileNumber: "", role: "owner" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: createRelationship, isPending } =
    useCreateRelationshipMutation((msg: string) => setErrorMessage(msg));

  function addProfile() {
    setProfiles((prev) => [...prev, { profileNumber: "", role: "co_owner" }]);
  }

  function removeProfile(index: number) {
    setProfiles((prev) => prev.filter((_, i) => i !== index));
  }

  function updateProfile(
    index: number,
    field: keyof ProfileEntry,
    value: string,
  ) {
    setProfiles((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isPending) return;
    setErrorMessage("");
    setSuccessMessage("");
    createRelationship(
      {
        profiles: profiles.map((p) => ({
          profileNumber: Number(p.profileNumber),
          role: p.role,
        })),
      },
      {
        onSuccess: () => {
          setProfiles([{ profileNumber: "", role: "owner" }]);
          setSuccessMessage("Relationship created successfully.");
        },
      },
    );
  }

  return (
    <div className="flex flex-col pt-25">
      <div className="mx-auto">
        <div className="text-2xl text-sky-500 font-semibold">
          Create Relationship
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col w-[500px]"
        >
          {profiles.map((entry, index) => (
            <div key={index} className="flex gap-2 my-1 items-center">
              <input
                className="px-2 py-1 border rounded flex-1"
                placeholder="Profile number"
                type="number"
                min={1}
                value={entry.profileNumber}
                onChange={(e) =>
                  updateProfile(index, "profileNumber", e.target.value)
                }
                required
              />
              <select
                className="px-2 py-1 border rounded"
                value={entry.role}
                onChange={(e) => updateProfile(index, "role", e.target.value)}
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              {profiles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProfile(index)}
                  className="text-red-500 hover:text-red-700 px-1"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProfile}
            className="text-sky-500 hover:text-sky-400 text-sm self-start mt-1"
          >
            + Add profile
          </button>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm mt-2">{successMessage}</div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="bg-sky-500 rounded my-5 py-2 text-white cursor-pointer hover:bg-sky-400 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "CREATING..." : "CREATE"}
          </button>
        </form>
      </div>
    </div>
  );
}
