import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getProfilesQueryOptions } from "../lib/api/profiles";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    page: z.coerce.number().int().min(1).default(1),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { page } = Route.useSearch();
  const {
    data: data,
    isLoading: profilesLoading,
    error: profilesError,
  } = useQuery(getProfilesQueryOptions(page));

  return (
    <div className="flex flex-col">
      <div className="pt-25 pl-62.5 mx-auto">
        <div className="flex border-l border-t border-r border-[#a0a0a0] bg-gray-200">
          <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
            Profile #
          </div>
          <div className="w-[200px] p-2 border-r border-r-[#a0a0a0]">
            First name
          </div>
          <div className="w-[200px] p-2 border-r border-r-[#a0a0a0]">
            Middle name
          </div>
          <div className="w-[200px] p-2 border-r border-r-[#a0a0a0]">
            Last name
          </div>
          <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
            Date of birth
          </div>
          <div className="w-[225px] p-2 border-r border-r-[#a0a0a0]">Email</div>
          <div className="w-[100px] p-2">Phone #</div>
        </div>
        <div className="border border-[#a0a0a0] h-[500px] overflow-y-auto ">
          {profilesLoading ? (
            <div>Loading profiles...</div>
          ) : profilesError ? (
            <div>Error loading profiles</div>
          ) : data ? (
            data.profiles.map((p) => (
              <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
                <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
                  {p.profileNumber}
                </div>
                <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
                  {p.firstName}
                </div>
                <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
                  {p.middleName}
                </div>
                <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
                  {p.lastName}
                </div>
                <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
                  {p.dateOfBirth}
                </div>
                <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
                  {p.email}
                </div>
                <div className="w-[100px] p-2 overflow-x-hidden">
                  {p.phoneNumber}
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
