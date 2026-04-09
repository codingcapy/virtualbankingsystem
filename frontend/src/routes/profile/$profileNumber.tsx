import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { getprofileByNumberQueryOptions } from "../../lib/api/profiles";

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

  return (
    <div className="pl-[225px] pt-[70px]">
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
        <div className="w-[125px] overflow-x-auto">Phone #</div>
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
      </div>
      <div className="flex mt-2 font-semibold">
        <div className="w-[500px] mr-5 overflow-x-auto">Address</div>
        <div className="w-[500px] overflow-x-auto">Identification</div>
      </div>
      <div className="flex mt-2 font-semibold">
        <div className="w-[500px] mr-5 overflow-auto h-[60px] border rounded"></div>
        <div className="w-[500px] overflow-auto h-[60px] border rounded"></div>
      </div>
      <div className="flex">
        <div className="pt-5 pr-5 pb-5">
          <div>Accounts</div>
          <div className="border w-[500px] h-[300px] overflow-auto border rounded"></div>
        </div>
        <div className="pt-5 pr-5 pb-5">
          <div>Investments</div>
          <div className="border w-[500px] h-[300px] overflow-auto border rounded"></div>
        </div>
      </div>
      <div className="flex">
        <div className="pr-5 pb-5">
          <div>Loans</div>
          <div className="border w-[500px] h-[300px] overflow-auto border rounded"></div>
        </div>
      </div>
    </div>
  );
}
