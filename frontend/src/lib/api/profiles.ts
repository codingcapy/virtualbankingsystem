import type { Profile } from "@server/schemas/profiles";
import { client, type ArgumentTypes, type ExtractData } from "./client";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type CreateProfileArgs = ArgumentTypes<
  typeof client.api.v0.profiles.$post
>[0]["json"];

type SerializeProfile = ExtractData<
  Awaited<ReturnType<typeof client.api.v0.profiles.$get>>
>["profiles"][number];

export function mapSerializedProfileToSchema(
  serialized: SerializeProfile,
): Profile {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}

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

async function getProfiles(page: number) {
  const res = await client.api.v0.profiles.$get({
    query: { page: page.toString() },
  });
  if (!res.ok) {
    throw new Error("Error getting profiles");
  }
  const { profiles, page: currentPage, totalPages } = await res.json();
  return {
    profiles: profiles.map(mapSerializedProfileToSchema),
    page: currentPage,
    totalPages,
  };
}

export const getProfilesQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["profiles", page],
    queryFn: () => getProfiles(page),
  });

async function getProfileByNumber(profileNumber: number) {
  const profileNumberString = profileNumber.toString();
  const res = await client.api.v0.profiles[":profileNumber"].$get({
    param: { profileNumber: profileNumberString },
  });
  if (!res.ok) {
    throw new Error("Error getting profile by number");
  }
  const { profile } = await res.json();
  return mapSerializedProfileToSchema(profile as SerializeProfile);
}

export const getprofileByNumberQueryOptions = (profileNumber: number) =>
  queryOptions({
    queryKey: ["profile", profileNumber],
    queryFn: () => getProfileByNumber(profileNumber),
  });
