import { client, type ArgumentTypes } from "./client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateRelationshipArgs = ArgumentTypes<
  typeof client.api.v0.relationships.$post
>[0]["json"];

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
