import type { Relationship } from "@server/schemas/relationships";
import { client, type ArgumentTypes, type ExtractData } from "./client";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type CreateRelationshipArgs = ArgumentTypes<
  typeof client.api.v0.relationships.$post
>[0]["json"];

type SerializeRelationship = ExtractData<
  Awaited<
    ReturnType<(typeof client.api.v0.relationships)[":profileNumber"]["$get"]>
  >
>["relationships"][number];

export function mapSerializedRelationshipToSchema(
  serialized: SerializeRelationship,
): Relationship {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}

async function createRelationship(args: CreateRelationshipArgs) {
  const res = await client.api.v0.relationships.$post({ json: args });
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating the relationship. Please contact IT.";
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
  return res.json();
}

export const useCreateRelationshipMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRelationship,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};

async function getRelationshipsByProfileNumber(profileNumber: number) {
  const res = await client.api.v0.relationships[":profileNumber"].$get({
    param: { profileNumber: profileNumber.toString() },
  });
  if (!res.ok) {
    throw new Error("Error getting addresses by id");
  }
  const { relationships } = await res.json();
  return relationships.map(mapSerializedRelationshipToSchema);
}

export const getRelationshipsByProfileNumberQueryOptions = (
  profileNumber: number,
) =>
  queryOptions({
    queryKey: ["addresses", profileNumber],
    queryFn: () => getRelationshipsByProfileNumber(profileNumber),
  });
