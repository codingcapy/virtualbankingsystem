import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { getprofileByNumberQueryOptions } from "../../lib/api/profiles";
import {
  getCitizenshipsByProfileNumberQueryOptions,
  useCreateCitizenshipMutation,
} from "../../lib/api/citizenships";
import { useQuery } from "@tanstack/react-query";
import { countries, countryMap } from "../../lib/utils";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/profile/$profileNumber")({
  beforeLoad: async ({ context, params }) => {
    const { profileNumber: postIdParam } = params;
    try {
      const profileNumber = z.coerce.number().int().parse(postIdParam);
      const postQuery = await context.queryClient.fetchQuery({
        ...getprofileByNumberQueryOptions(profileNumber),
        retry: (failureCount, error) => {
          if (error instanceof Error && error.message.includes("404")) {
            return false;
          }
          if (error instanceof Error && error.message.includes("403")) {
            return false;
          }
          return failureCount < 1;
        },
      });
      return postQuery;
    } catch (e) {
      console.error(e, "redirect to dash on error");
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const profile = Route.useRouteContext();
  const {
    data: citizenships,
    isLoading: citizenshipsLoading,
    error: citizenshipsError,
  } = useQuery(
    getCitizenshipsByProfileNumberQueryOptions(profile.profileNumber),
  );
  const {
    mutate: createCitizenship,
    isPending: createCitizenshipPending,
    error: createCitizenshipError,
  } = useCreateCitizenshipMutation();
  const [showCountries, setShowCountries] = useState(false);
  const countriesRef = useRef<HTMLDivElement | null>(null);

  function handleSubmitCreateCitizenship(selected: string) {
    if (createCitizenshipPending) return;
    createCitizenship({
      profileNumber: profile.profileNumber,
      country: selected,
    });
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      countriesRef.current &&
      !countriesRef.current.contains(event.target as Node)
    ) {
      setShowCountries(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="pl-[250px] pt-[70px]">
      <div className="text-4xl font-bold text-gray-500">
        {profile.lastName}, {profile.firstName}
      </div>
      <div className="flex mt-2 font-semibold">
        <div className="w-[100px] overflow-x-auto">Profile #</div>
        <div className="w-[125px] overflow-x-auto">First name</div>
        <div className="w-[125px] overflow-x-auto">Middle name</div>
        <div className="w-[125px] overflow-x-auto">Last name</div>
        <div className="w-[125px] overflow-x-auto">Date of birth</div>
        <div className="w-[150px] mr-[25px] overflow-x-auto">Email</div>
        <div className="w-[100px] overflow-x-auto">Phone #</div>
        <div className="w-[125px] overflow-x-auto">Citizenship</div>
      </div>
      <div className="flex mt-1">
        <div className="w-[100px] overflow-x-auto">
          {profile.profileNumber.toString().padStart(8, "0")}
        </div>
        <div className="w-[125px] overflow-x-auto">{profile.firstName}</div>
        <div className="w-[125px] overflow-x-auto">{profile.middleName}</div>
        <div className="w-[125px] overflow-x-auto">{profile.lastName}</div>
        <div className="w-[125px] overflow-x-auto">{profile.dateOfBirth}</div>
        <div className="w-[150px] mr-[25px] overflow-x-auto">
          {profile.email}
        </div>
        <div className="w-[100px] overflow-x-auto">{profile.phoneNumber}</div>
        <div className="border w-[150px] h-[50px] overflow-auto border rounded">
          {citizenshipsLoading ? (
            <div>Loading...</div>
          ) : citizenshipsError ? (
            <div>Error</div>
          ) : citizenships ? (
            citizenships.length > 0 ? (
              <div>
                {citizenships.map((c) => (
                  <div key={c.country}>
                    {countryMap[c.country] ?? c.country}
                  </div>
                ))}
                <div
                  ref={countriesRef}
                  onClick={() => setShowCountries(true)}
                  className="cursor-pointer hover:bg-[#d0d0d0] transition-all ease-in-out duration-300"
                >
                  + add
                </div>
                {showCountries && (
                  <div className="absolute top-[180px] bg-white border rounded h-[300px] w-[125px] overflow-y-auto">
                    {countries.map((c) => (
                      <div
                        onClick={() => handleSubmitCreateCitizenship(c.value)}
                        className="cursor-pointer p-1 hover:bg-[#d0d0d0] transition-all ease-in-out duration-300"
                      >
                        {c.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div
                  ref={countriesRef}
                  onClick={() => setShowCountries(true)}
                  className="p-1 cursor-pointer hover:bg-[#d0d0d0] transition-all ease-in-out duration-300"
                >
                  + add
                </div>
                {showCountries && (
                  <div className="absolute top-[180px] bg-white border rounded h-[300px] w-[125px] overflow-y-auto">
                    {countries.map((c) => (
                      <div
                        onClick={() => handleSubmitCreateCitizenship(c.value)}
                        className="cursor-pointer p-1 hover:bg-[#d0d0d0] transition-all ease-in-out duration-300"
                      >
                        {c.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex mt-2 font-semibold">
        <div>
          <div className="flex pb-2">
            <div className="mr-2">Address</div>
            <div className="rounded-full border px-2 bg-gray-200">+ add</div>
          </div>
          <div className="w-[500px] mr-5 overflow-auto h-[60px] border rounded"></div>
        </div>
        <div>
          <div className="flex pb-2">
            <div className="mr-2">Identification</div>
            <div className="rounded-full border px-2 bg-gray-200">+ add</div>
          </div>
          <div className="w-[500px] overflow-auto h-[60px] border rounded"></div>
        </div>
      </div>
      <div className="flex">
        <div className="pt-5 pr-5 pb-5">
          <div className="flex pb-2">
            <div className="mr-2">Accounts</div>
            <div className="rounded-full border px-2 bg-gray-200">+ add</div>
          </div>
          <div className="border w-[500px] h-[300px] overflow-auto border rounded"></div>
        </div>
        <div className="pt-5 pr-5 pb-5">
          <div className="flex pb-2">
            <div className="mr-2">Investments</div>
            <div className="rounded-full border px-2 bg-gray-200">+ add</div>
          </div>
          <div className="border w-[500px] h-[300px] overflow-auto border rounded"></div>
        </div>
      </div>
      <div className="flex">
        <div className="pr-5 pb-5">
          <div className="flex pb-2">
            <div className="mr-2">Loans</div>
            <div className="rounded-full border px-2 bg-gray-200">+ add</div>
          </div>
          <div className="border w-[500px] h-[300px] overflow-auto border rounded"></div>
        </div>
      </div>
    </div>
  );
}
