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
  return <div>Hello "/profile/$profileNumber"!</div>;
}
