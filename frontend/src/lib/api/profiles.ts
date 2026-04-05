import { client, type ArgumentTypes } from "./client";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type CreateProfileArgs = ArgumentTypes<
  typeof client.api.v0.profiles.$post
>[0]["json"];

async function createProfile(args: CreateProfileArgs) {
  const res = await client.api.v0.profiles.$post({ json: args });
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating the profile. Please contact IT.";
    try {
      const errorResponse = await res.json();
      if (
        errorResponse &&
        typeof errorResponse === "object" &&
        "message" in errorResponse
      ) {
        errorMessage = String(errorResponse.message);
      }
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }
    throw new Error(errorMessage);
  }
  const result = await res.json();
  return result;
}

export const useCreateProfileMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProfile,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["profiles", data?.profile.profileId],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};
