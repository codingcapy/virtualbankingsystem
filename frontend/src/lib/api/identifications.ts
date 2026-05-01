import type { Identification } from "@server/schemas/identifications";
import { type ArgumentTypes, client, type ExtractData } from "./client";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type CreateIdentificationArgs = ArgumentTypes<
  typeof client.api.v0.identifications.$post
>[0]["json"];

type SerializeIdentification = ExtractData<
  Awaited<
    ReturnType<(typeof client.api.v0.identifications)[":profileNumber"]["$get"]>
  >
>["identifications"][number];

export function mapSerializedIdentificationToSchema(
  serialized: SerializeIdentification,
): Identification {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}

async function createIdentification(args: CreateIdentificationArgs) {
  const res = await client.api.v0.identifications.$post({ json: args });
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating the identification. Please contact IT.";
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

export const useCreateIdentificationMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIdentification,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["identifications", data?.identification.profileNumber],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};

async function getIdentificationsByProfileNumber(profileNumber: number) {
  const res = await client.api.v0.identifications[":profileNumber"].$get({
    param: { profileNumber: profileNumber.toString() },
  });
  if (!res.ok) {
    throw new Error("Error getting identifications by profile number");
  }
  const { identifications } = await res.json();
  return identifications.map(mapSerializedIdentificationToSchema);
}

export const getIdentificationsByProfileNumberQueryOptions = (
  profileNumber: number,
) =>
  queryOptions({
    queryKey: ["identifications", profileNumber],
    queryFn: () => getIdentificationsByProfileNumber(profileNumber),
  });
