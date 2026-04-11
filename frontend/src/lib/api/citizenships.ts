import type { Citizenship } from "@server/schemas/citizenships";
import { type ArgumentTypes, client, type ExtractData } from "./client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateCitizenshipArgs = ArgumentTypes<
  typeof client.api.v0.citizenships.$post
>[0]["json"];

type SerializeCitizenship = ExtractData<
  Awaited<ReturnType<typeof client.api.v0.citizenships.$get>>
>["citizenships"][number];

export function mapSerializedCitizenshipToSchema(
  serialized: SerializeCitizenship,
): Citizenship {
  return {
    ...serialized,
    createdAt: new Date(serialized.createdAt),
    updatedAt: new Date(serialized.updatedAt),
  };
}

async function createCitizenship(args: CreateCitizenshipArgs) {
  const res = await client.api.v0.citizenships.$post({ json: args });
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating the citizenship. Please contact IT.";
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

export const useCreateCitizenshipMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCitizenship,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["citizenships", data?.citizenship.profileNumber],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};
